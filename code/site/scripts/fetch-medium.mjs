#!/usr/bin/env node
/**
 * Fetches Morgan's Medium RSS feed and writes it to src/data/medium.generated.json
 * in the `Publication` shape used by the Writing section.
 *
 * Runs automatically via the `prebuild` npm lifecycle hook, and on a daily cron
 * in .github/workflows/refresh-medium.yml.
 *
 * Failure is never fatal: if the feed is unreachable we warn and leave the
 * existing generated file in place, so a Medium outage can neither fail the
 * build nor blank the Writing section. Set SKIP_MEDIUM_FETCH=1 to opt out
 * entirely (offline builds, sandboxed Docker builds, PR CI).
 *
 * Note: Medium's RSS only exposes the 10 most recent posts.
 */

import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";

const FEED_URL = "https://medium.com/feed/@morgankreed";
const WORDS_PER_MINUTE = 220;
const EXCERPT_CHARS = 200;
const MAX_TAGS = 3;
const TIMEOUT_MS = 20_000;

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(here, "..", "src", "data", "medium.generated.json");

/** Medium appends tracking params (?source=rss-...). Keep the bare article URL. */
function cleanUrl(link) {
  try {
    const u = new URL(link);
    u.search = "";
    u.hash = "";
    return u.toString();
  } catch {
    return link;
  }
}

/** Last path segment carries the slug plus a hex id: keep the slug. */
function slugFrom(url) {
  const last = cleanUrl(url).split("/").filter(Boolean).pop() ?? "";
  return last.replace(/-[0-9a-f]{6,}$/i, "") || last;
}

function stripHtml(html) {
  return String(html)
    .replace(/<figure[\s\S]*?<\/figure>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/** Trim to a word boundary so excerpts never cut mid-word. */
function toExcerpt(text) {
  if (text.length <= EXCERPT_CHARS) return text;
  const cut = text.slice(0, EXCERPT_CHARS);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, "")}…`;
}

function toReadTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min`;
}

function toIsoDate(pubDate) {
  const t = Date.parse(pubDate);
  return Number.isNaN(t) ? String(pubDate) : new Date(t).toISOString().slice(0, 10);
}

function toArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

/** Map one RSS <item> onto the Publication shape in src/data/publications.ts. */
export function itemToPublication(item) {
  const url = cleanUrl(item.link);
  const body = stripHtml(item["content:encoded"] ?? item.description ?? "");
  const tags = toArray(item.category)
    .map((c) => String(c).trim())
    .filter(Boolean)
    .slice(0, MAX_TAGS);

  return {
    id: `medium-${slugFrom(url)}`,
    title: stripHtml(item.title),
    excerpt: toExcerpt(body),
    publication: "Medium",
    date: toIsoDate(item.pubDate),
    readTime: toReadTime(body),
    url,
    ...(tags.length > 0 ? { tags } : {}),
  };
}

export function parseFeed(xml) {
  const parsed = new XMLParser({
    ignoreAttributes: true,
    trimValues: true,
    // Titles are CDATA-wrapped; keep them as plain strings.
    parseTagValue: false,
  }).parse(xml);

  const items = toArray(parsed?.rss?.channel?.item);
  return items
    .filter((i) => i && i.link && i.title)
    .map(itemToPublication)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

async function existingCount() {
  try {
    return JSON.parse(await readFile(OUT_PATH, "utf8")).length;
  } catch {
    return 0;
  }
}

async function main() {
  if (process.env.SKIP_MEDIUM_FETCH === "1") {
    console.log("[medium] SKIP_MEDIUM_FETCH=1 — keeping existing feed data.");
    return;
  }

  let xml;
  try {
    const res = await fetch(FEED_URL, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "user-agent": "morgankreed-site-build/1.0 (+https://morgankreed.com)" },
    });
    if (!res.ok) throw new Error(`feed returned HTTP ${res.status}`);
    xml = await res.text();
  } catch (err) {
    console.warn(
      `[medium] WARNING: could not fetch feed (${err.message}). ` +
        `Keeping the ${await existingCount()} article(s) already in medium.generated.json.`
    );
    return;
  }

  let publications;
  try {
    publications = parseFeed(xml);
  } catch (err) {
    console.warn(`[medium] WARNING: could not parse feed (${err.message}). Keeping existing data.`);
    return;
  }

  if (publications.length === 0) {
    console.warn("[medium] WARNING: feed parsed but contained no articles. Keeping existing data.");
    return;
  }

  await writeFile(OUT_PATH, `${JSON.stringify(publications, null, 2)}\n`, "utf8");
  console.log(`[medium] Wrote ${publications.length} article(s) to src/data/medium.generated.json`);
}

main().catch((err) => {
  // Last-resort guard: never fail the build over the feed.
  console.warn(`[medium] WARNING: unexpected error (${err.message}). Keeping existing data.`);
});
