import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";

type Platform = "linkedin" | "facebook" | "instagram" | "youtube";

const PLATFORMS: Platform[] = ["linkedin", "facebook", "instagram", "youtube"];

const SECRET_ARN = process.env.CLAUDE_API_KEY_SECRET_ARN!;
const MODEL = process.env.CLAUDE_MODEL ?? "claude-sonnet-4-6";

const sm = new SecretsManagerClient({});

// Cached across warm invocations
let cachedApiKey: string | null = null;
const cachedPrompts = new Map<Platform, string>();

async function getApiKey(): Promise<string> {
  if (cachedApiKey) return cachedApiKey;
  const res = await sm.send(
    new GetSecretValueCommand({ SecretId: SECRET_ARN })
  );
  if (!res.SecretString) throw new Error("Claude API key secret is empty");
  cachedApiKey = res.SecretString;
  return cachedApiKey;
}

function loadPrompt(platform: Platform): string {
  const cached = cachedPrompts.get(platform);
  if (cached) return cached;
  // Prompts are copied into the bundle via CDK's afterBundling hook.
  const promptPath = path.join(__dirname, "prompts", `${platform}.txt`);
  const contents = fs.readFileSync(promptPath, "utf8");
  cachedPrompts.set(platform, contents);
  return contents;
}

interface RequestBody {
  title?: string;
  blogSource?: string;
}

interface GatewayEvent {
  body?: string | null;
  requestContext?: {
    authorizer?: {
      claims?: { sub?: string; email?: string };
    };
  };
}

interface GatewayResult {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

function respond(
  status: number,
  body: unknown,
  cors = true
): GatewayResult {
  return {
    statusCode: status,
    headers: cors
      ? {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        }
      : { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

async function generateVariant(
  client: Anthropic,
  platform: Platform,
  title: string,
  blogSource: string
): Promise<string> {
  const systemPrompt = loadPrompt(platform);

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `Title: ${title}\n\nBlog source:\n\n${blogSource}`,
      },
    ],
  });

  const textBlock = res.content.find((c) => c.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error(`No text content returned for ${platform}`);
  }
  return textBlock.text.trim();
}

export async function handler(
  event: GatewayEvent
): Promise<GatewayResult> {
  try {
    const body: RequestBody = event.body ? JSON.parse(event.body) : {};
    const title = (body.title ?? "").trim();
    const blogSource = (body.blogSource ?? "").trim();

    if (!title || !blogSource) {
      return respond(400, {
        error: "Both 'title' and 'blogSource' are required.",
      });
    }
    if (blogSource.length > 50_000) {
      return respond(400, { error: "Blog source exceeds 50,000 chars." });
    }

    const apiKey = await getApiKey();
    const client = new Anthropic({ apiKey });

    // Fan out in parallel — Promise.allSettled so one failure doesn't kill the
    // whole response; caller sees per-platform error rather than a blanket 500.
    const results = await Promise.allSettled(
      PLATFORMS.map((p) => generateVariant(client, p, title, blogSource))
    );

    const variants: Partial<Record<Platform, string>> = {};
    const errors: Partial<Record<Platform, string>> = {};
    results.forEach((r, i) => {
      const p = PLATFORMS[i];
      if (r.status === "fulfilled") {
        variants[p] = r.value;
      } else {
        errors[p] =
          r.reason instanceof Error ? r.reason.message : String(r.reason);
      }
    });

    return respond(200, {
      variants,
      errors: Object.keys(errors).length ? errors : undefined,
      model: MODEL,
    });
  } catch (err) {
    console.error("content-generate failed:", err);
    return respond(500, {
      error:
        err instanceof Error ? err.message : "Unknown error in content-generate",
    });
  }
}
