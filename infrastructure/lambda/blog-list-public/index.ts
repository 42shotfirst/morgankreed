import {
  DynamoDBClient,
  QueryCommand,
  AttributeValue,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const TABLE = process.env.DYNAMO_TABLE!;
const GSI = "status-updatedAt-index";
const ddb = new DynamoDBClient({});

interface GatewayEvent {
  queryStringParameters?: Record<string, string | undefined> | null;
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
      "Cache-Control": "public, max-age=300",
    },
    body: JSON.stringify(body),
  };
}

function encodeCursor(key: Record<string, AttributeValue>): string {
  return Buffer.from(JSON.stringify(key)).toString("base64url");
}

function decodeCursor(
  cursor: string
): Record<string, AttributeValue> | undefined {
  try {
    return JSON.parse(Buffer.from(cursor, "base64url").toString());
  } catch {
    return undefined;
  }
}

export async function handler(
  event: GatewayEvent
): Promise<GatewayResult> {
  try {
    const qs = event.queryStringParameters ?? {};
    const limit = Math.min(Math.max(parseInt(qs.limit ?? "20", 10) || 20, 1), 50);
    const startKey = qs.cursor ? decodeCursor(qs.cursor) : undefined;

    const res = await ddb.send(
      new QueryCommand({
        TableName: TABLE,
        IndexName: GSI,
        KeyConditionExpression: "#s = :s",
        ExpressionAttributeNames: { "#s": "status" },
        ExpressionAttributeValues: { ":s": { S: "published" } },
        ScanIndexForward: false, // newest first
        Limit: limit,
        ExclusiveStartKey: startKey,
      })
    );

    const items = (res.Items ?? [])
      .map((it) => unmarshall(it))
      // Strip blogSource from list response — large + not needed in cards
      .map(({ blogSource: _bs, ...rest }) => rest);

    const cursor = res.LastEvaluatedKey
      ? encodeCursor(res.LastEvaluatedKey)
      : null;

    return respond(200, { items, cursor });
  } catch (err) {
    console.error("blog-list-public failed:", err);
    return respond(500, {
      error: err instanceof Error ? err.message : "blog-list-public failed",
    });
  }
}
