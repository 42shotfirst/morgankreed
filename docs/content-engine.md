# Content engine architecture

The content engine is the backend that powers `/engine` (the admin UI in
`src/components/admin/ContentEngine.tsx`) and the `/blog` endpoint that the
public `Blog.tsx` component reads from. This doc covers everything from auth
to the per-platform publishing flow.

## Goals

1. Morgan drafts one source post. AI generates platform-tailored versions.
2. He reviews and edits each variant, then publishes to any combination of
   LinkedIn, Facebook Business, Instagram Business, and YouTube (community
   posts).
3. All published history is queryable, and the public blog auto-lists the
   latest posts.
4. Everything runs in the existing AWS account. No new third-party SaaS.

## Components

```
                 Morgan (authenticated via Cognito)
                               |
                               v
                 +-----------------------------+
                 |   CloudFront + S3 (admin)   |
                 |   /engine, /admin/*         |
                 +--------------+--------------+
                                |
                                v
                 +-----------------------------+
                 |      API Gateway (REST)     |
                 |   /api/content/* endpoints  |
                 +--------------+--------------+
                                |
       +------------------------+------------------------+
       |                        |                        |
       v                        v                        v
 +------------+          +--------------+          +--------------+
 |  generate  |          |   publish    |          |   schedule   |
 |   Lambda   |          |   Lambda     |          |   Lambda     |
 |  (Claude)  |          |  (fan-out)   |          | (EventBridge)|
 +------------+          +------+-------+          +--------------+
                                |
               +----------------+----------------+
               v                v                v                v
          +---------+    +---------+    +----------+    +---------+
          |linkedin |    |facebook |    |instagram |    |youtube  |
          | Lambda  |    | Lambda  |    | Lambda   |    | Lambda  |
          +----+----+    +----+----+    +----+-----+    +----+----+
               |              |              |               |
               +--------------+------+-------+---------------+
                                     |
                                     v
                     +------------------------------+
                     | DynamoDB: posts, tokens      |
                     | Secrets Manager: OAuth       |
                     +------------------------------+
```

## Auth

**Who can access `/engine`:** only Morgan. This is not a multi-tenant SaaS.

Use **Amazon Cognito** user pool with a single user. Gate `/engine` and
`/admin/*` routes behind the Cognito hosted UI or with Amplify's `<Authenticator>`
wrapper. API Gateway endpoints use a Cognito authorizer so anything that isn't
a signed-in request gets a 401 at the edge.

Alternative for simplicity: a single Lambda@Edge or CloudFront Function that
validates a JWT from a hardcoded identity (GitHub OAuth, Google OAuth). Cognito
is the default because it's already AWS-native — one less vendor.

## Data model (DynamoDB)

One table, `content-engine-posts`, with two item types keyed by `pk`.

### Post items (`pk = POST#<id>`)

```json
{
  "pk": "POST#post-abc123",
  "sk": "META",
  "id": "post-abc123",
  "slug": "the-fractional-cto-intake-checklist",
  "title": "The fractional CTO intake checklist I use on every engagement",
  "excerpt": "Fifteen questions I ask in the first sixty minutes…",
  "blogSource": "# The fractional CTO intake checklist\n\n…",
  "variants": {
    "linkedin": "…",
    "facebook": "…",
    "instagram": "…",
    "youtube": "…"
  },
  "tags": ["Fractional CTO", "Process"],
  "coverImage": "s3://…",
  "status": "draft | scheduled | published",
  "scheduledFor": "2026-04-20T14:00:00Z",
  "createdAt": "2026-04-15T09:00:00Z",
  "updatedAt": "2026-04-15T09:30:00Z"
}
```

### Syndication items (`pk = POST#<id>`, `sk = SYND#<platform>`)

One per platform. Separate items so a partial publish doesn't require
overwriting the whole post.

```json
{
  "pk": "POST#post-abc123",
  "sk": "SYND#linkedin",
  "platform": "linkedin",
  "status": "published",
  "publishedAt": "2026-04-15T14:05:00Z",
  "url": "https://linkedin.com/feed/update/urn:li:activity:…",
  "externalId": "urn:li:activity:…",
  "retryCount": 0
}
```

**GSI for the public blog:** `status-updatedAt-index` on
`status`/`updatedAt` so the public `Blog.tsx` can list published posts in
reverse chronological order with a single `Query`.

## Secrets — OAuth tokens per platform

Each platform needs an OAuth access token (and usually a refresh token) to
post on Morgan's behalf. Never store these in DynamoDB — use **AWS Secrets
Manager**, one secret per platform:

```
/cto-on-demand/linkedin/access-token
/cto-on-demand/linkedin/refresh-token
/cto-on-demand/facebook/page-access-token
/cto-on-demand/instagram/access-token
/cto-on-demand/youtube/access-token
/cto-on-demand/youtube/refresh-token
```

Each platform Lambda has IAM permission to read only its own secrets via
resource-based policies.

The initial OAuth flow is a one-time thing — Morgan signs in via each
platform's OAuth consent screen via an admin setup page (`/admin/connections`),
which writes the initial tokens into Secrets Manager. After that, refresh
tokens are rotated automatically by the platform Lambdas when they expire.

## Platform-specific publishing notes

### LinkedIn

- API: **LinkedIn API (Posts)** — `POST /rest/posts`.
- Auth: OAuth 2.0, `w_member_social` scope.
- Token lifetime: 60 days, refreshable with `r_liteprofile` grants.
- Gotcha: LinkedIn strongly deranks posts with external links in the body.
  The established workaround: post the main body, then post the URL as the
  first comment. The Lambda should do both in one call.

### Facebook Business

- API: **Facebook Graph API** — `POST /{page-id}/feed`.
- Auth: Page Access Token (long-lived, doesn't expire if generated from a
  non-expiring user token + page admin role).
- Requires: Meta Developer app with Pages permissions approved. The
  `pages_manage_posts` permission is what you need.

### Instagram (Business)

- API: **Instagram Graph API** — two-step: `POST /{ig-user-id}/media` to
  create a container, then `POST /{ig-user-id}/media_publish` to publish.
- Auth: piggybacks on the Facebook Page Access Token (the IG Business
  account has to be linked to a Facebook Page).
- Gotcha: text-only posts aren't supported. IG requires an image or video.
  The Lambda should either (a) use the blog post's cover image, or (b)
  generate a branded quote-card SVG → PNG from the opening line of the
  LinkedIn variant.

### YouTube (Community)

- API: **YouTube Data API v3** — `POST /youtube/v3/community` (currently in
  limited rollout; fallback is to skip YouTube if the API isn't available
  to the channel yet).
- Auth: Google OAuth 2.0, `youtube.force-ssl` scope.
- Eligibility: channel must have 500+ subscribers to unlock community
  posts. Until Morgan clears that threshold, leave the YouTube toggle
  default-off in the UI.

## Lambdas

All Lambdas are Node.js 20 (or Python 3.12, whichever matches Morgan's
preference) runtime, packaged with esbuild. Environment-shared:
`DYNAMO_TABLE`, `SECRETS_PREFIX`, `CLAUDE_API_KEY_SECRET_ARN`.

### `content-generate`

**Input:** `{ title, blogSource }`
**Output:** `{ variants: { linkedin, facebook, instagram, youtube } }`

Calls the Claude API (`claude-sonnet-4-6` per existing project memory, or
whatever's current at implementation time) with **four separate prompts**,
each instructing Claude to rewrite the blog source for a specific platform.
Run them in parallel with `Promise.all` — single-trip cost is roughly equal
to one long prompt and gives cleaner variant-specific results.

Platform prompts should include: voice guidance, character budget, format
conventions (e.g. LinkedIn line breaks, IG hashtag block), and the hook
pattern ("first two lines must stop the scroll"). Keep the prompts in
`infrastructure/lambda/content-generate/prompts/`.

### `publish-*` (one per platform)

Each takes the post ID and its variant, calls the platform API, writes the
result back to the `SYND#<platform>` item. Retries with exponential backoff
on 5xx. On permanent failure, sets status to `failed` and stores the error.

### `content-publish` (fan-out)

Reads the `publishTo` map from the request, dispatches to each enabled
platform Lambda asynchronously (Lambda invoke with `Event` invocation type
for fire-and-forget, or Step Functions for a coordinated workflow with
visible state). Returns immediately with a tracking ID; client polls the
syndication items for status.

### `content-schedule`

Creates an EventBridge scheduled rule that invokes `content-publish` at the
target time. Rule is one-shot — deletes itself after firing.

## API endpoints

All behind API Gateway, Cognito authorizer:

| Method | Path                      | Purpose                            |
| ------ | ------------------------- | ---------------------------------- |
| POST   | `/api/content/generate`   | Generate platform variants         |
| GET    | `/api/content/posts`      | List posts (paginated)             |
| GET    | `/api/content/posts/:id`  | Get single post with syndication   |
| POST   | `/api/content/posts`      | Create draft                       |
| PUT    | `/api/content/posts/:id`  | Update draft                       |
| POST   | `/api/content/publish`    | Publish now                        |
| POST   | `/api/content/schedule`   | Schedule for later                 |
| GET    | `/api/blog/posts`         | **Public** — published posts only  |

The `/api/blog/posts` endpoint is the only public one. No auth. CloudFront
caches it at the edge with a 5-minute TTL.

## Cost envelope (rough)

Assuming ~20 posts/month, each generating four variants and publishing to
four platforms:

- Claude API: ~80 generations/month at roughly $0.03 each — **$2–3/mo**
- DynamoDB on-demand: **< $1/mo**
- Lambda invocations: **< $1/mo**
- API Gateway: **< $1/mo**
- Secrets Manager: 6 secrets × $0.40 = **$2.40/mo**
- EventBridge: **free tier**

Total: **~$6–8/month** on top of existing CloudFront/S3 hosting.

## Ordering of implementation

Build in this order. Each step is usable on its own.

1. **DynamoDB table** + public `GET /api/blog/posts` Lambda. Seed with the
   sample data from `src/data/posts.ts`. Swap the public `Blog.tsx` to
   fetch from it. Now the blog is live.
2. **Cognito user pool** + auth on `/engine`. Nothing functional yet, just
   the wall.
3. **`content-generate` Lambda** + the Generate button in the UI. This
   step alone makes the engine useful even before publishing works — Morgan
   can draft with AI help and copy-paste manually.
4. **Connections page** + OAuth flow for each platform. One at a time.
   Start with LinkedIn since it has the best API and Morgan's strongest
   professional audience there.
5. **`publish-linkedin` Lambda** + the Publish Now button wired to it.
   End-to-end for one platform proves the whole chain.
6. **The other three platform Lambdas**, one at a time.
7. **Scheduling** via EventBridge. Nice-to-have — manual publishing covers
   most needs.

## Open questions to answer before building

- Does Morgan want to store post images in S3, or just reference them by
  external URL? (S3 is cleaner but adds upload UX work.)
- Is the public blog served statically (prerendered at build time from the
  DynamoDB snapshot) or dynamically (fetched on each request)? Static is
  cheaper and faster; dynamic means new posts appear without a rebuild.
  Recommend **static with ISR-style rebuild on publish** — the publish
  Lambda triggers a CloudFront invalidation + a small rebuild.
- YouTube community post API has limited access. If Morgan's channel isn't
  eligible, hide the toggle until it is.
