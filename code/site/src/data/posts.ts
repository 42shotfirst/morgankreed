// Blog posts — content authored via the content engine and syndicated
// across LinkedIn, Facebook Business, Instagram, and YouTube.
//
// This shape matches the DynamoDB item shape in the content engine, so when
// the live API is wired up, only the data source changes — the component
// stays the same.

export type SyndicationPlatform =
  | "linkedin"
  | "facebook"
  | "instagram"
  | "youtube";

export type SyndicationStatus = "draft" | "scheduled" | "published" | "failed";

export interface SyndicationRecord {
  platform: SyndicationPlatform;
  status: SyndicationStatus;
  publishedAt?: string;
  url?: string;
  error?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  readTime?: string;
  tags: string[];
  coverImage?: string;
  syndication: SyndicationRecord[];
}

// TODO(morgan): Wire this to the content engine API. This is seed data.
export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "the-fractional-cto-intake-checklist",
    title: "The fractional CTO intake checklist I use on every engagement",
    excerpt:
      "Fifteen questions I ask in the first sixty minutes of every engagement. Half are technical, half are about people — and the second half matters more.",
    date: "2026-04-15",
    readTime: "8 min",
    tags: ["Fractional CTO", "Process"],
    syndication: [
      { platform: "linkedin", status: "published", publishedAt: "2026-04-15" },
      { platform: "facebook", status: "published", publishedAt: "2026-04-15" },
      { platform: "instagram", status: "published", publishedAt: "2026-04-16" },
    ],
  },
  {
    id: "post-2",
    slug: "ai-pilots-dont-fail-they-stall",
    title: "AI pilots don't fail — they stall",
    excerpt:
      "The pattern I see across stalled AI projects: the model works, the demo impresses, and then six weeks later nothing has shipped. Here's why.",
    date: "2026-04-02",
    readTime: "6 min",
    tags: ["AI", "Implementation"],
    syndication: [
      { platform: "linkedin", status: "published", publishedAt: "2026-04-02" },
      { platform: "youtube", status: "published", publishedAt: "2026-04-03" },
    ],
  },
  {
    id: "post-3",
    slug: "three-ways-smbs-outspend-enterprises-on-security",
    title: "Three ways SMBs outspend enterprises on security (and lose)",
    excerpt:
      "Small teams frequently spend more per employee on security tooling than mid-market companies — and end up less secure. Three common traps.",
    date: "2026-03-18",
    readTime: "5 min",
    tags: ["Cybersecurity", "SMB"],
    syndication: [
      { platform: "linkedin", status: "published", publishedAt: "2026-03-18" },
      { platform: "facebook", status: "published", publishedAt: "2026-03-18" },
    ],
  },
];
