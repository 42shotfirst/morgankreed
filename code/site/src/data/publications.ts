// External writing — published on Medium, LinkedIn longform, or guest posts
// on other publications. This is distinct from internal /blog content
// (which is served from the content engine).
//
// Medium articles are pulled in automatically at build time by
// scripts/fetch-medium.mjs, which writes medium.generated.json. Add anything
// Medium's RSS can't supply (LinkedIn longform, guest posts, or older Medium
// articles beyond the 10 the feed exposes) to `manualPublications` below.

import mediumGenerated from "./medium.generated.json";

export interface Publication {
  id: string;
  title: string;
  excerpt: string;
  publication:
    | "Medium"
    | "LinkedIn"
    | "Forbes"
    | "Substack"
    | "Dev.to"
    | "Guest post";
  publicationLogo?: string; // optional path or URL
  date: string;
  readTime?: string;
  url: string;
  tags?: string[];
  coverImage?: string;
}

// Hand-curated entries. Anything here wins over a generated entry with the
// same URL, so a Medium article can be overridden with a better excerpt.
const manualPublications: Publication[] = [];

const mediumPublications = mediumGenerated as Publication[];

function byUrl(p: Publication): string {
  return p.url.replace(/\/+$/, "").toLowerCase();
}

// Manual entries first so they take precedence on URL collision, then sorted
// newest-first across both sources.
export const publications: Publication[] = [
  ...new Map(
    [...manualPublications, ...mediumPublications].map((p) => [byUrl(p), p])
  ).values(),
].sort((a, b) => {
  const ta = Date.parse(a.date);
  const tb = Date.parse(b.date);
  return (Number.isNaN(tb) ? 0 : tb) - (Number.isNaN(ta) ? 0 : ta);
});

export const MEDIUM_PROFILE_URL = "https://medium.com/@morgankreed";
