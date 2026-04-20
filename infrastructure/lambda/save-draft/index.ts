import {
  DynamoDBClient,
  PutItemCommand,
  AttributeValue,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { randomUUID } from "crypto";

const TABLE = process.env.DYNAMO_TABLE!;
const ddb = new DynamoDBClient({});

type Platform = "linkedin" | "facebook" | "instagram" | "youtube";

interface SaveDraftBody {
  id?: string;
  title?: string;
  blogSource?: string;
  variants?: Partial<Record<Platform, string>>;
  tags?: string[];
  coverImage?: string;
}

interface GatewayEvent {
  body?: string | null;
  requestContext?: {
    authorizer?: { claims?: { sub?: string; email?: string } };
  };
}

interface GatewayResult {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

function respond(status: number, body: unknown): GatewayResult {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify(body),
  };
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function handler(
  event: GatewayEvent
): Promise<GatewayResult> {
  try {
    const body: SaveDraftBody = event.body ? JSON.parse(event.body) : {};
    const title = (body.title ?? "").trim();
    const blogSource = (body.blogSource ?? "").trim();
    if (!title) return respond(400, { error: "title is required" });

    const id = body.id ?? `post-${randomUUID()}`;
    const now = new Date().toISOString();
    const authorEmail = event.requestContext?.authorizer?.claims?.email;

    const item: Record<string, unknown> = {
      pk: `POST#${id}`,
      sk: "META",
      id,
      slug: slugify(title),
      title,
      blogSource,
      variants: body.variants ?? {},
      tags: body.tags ?? [],
      coverImage: body.coverImage,
      status: "draft",
      createdAt: now,
      updatedAt: now,
      authorEmail,
    };

    await ddb.send(
      new PutItemCommand({
        TableName: TABLE,
        Item: marshall(item, { removeUndefinedValues: true }) as Record<
          string,
          AttributeValue
        >,
      })
    );

    return respond(200, { id, slug: item.slug, status: "draft" });
  } catch (err) {
    console.error("save-draft failed:", err);
    return respond(500, {
      error: err instanceof Error ? err.message : "save-draft failed",
    });
  }
}
