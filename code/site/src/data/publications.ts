// External writing — published on Medium, LinkedIn longform, or guest posts
// on other publications. This is distinct from internal /blog content
// (which is served from the content engine).
//
// If you want this to auto-populate from your Medium RSS feed instead,
// see src/hooks/useMediumFeed.ts — this array becomes the fallback / SSG seed.

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

export const publications: Publication[] = [
  // TODO(morgan): Replace with real articles. Keep the shape intact.
  {
    id: "pub-1",
    title: "The fractional CTO stack: what to buy, what to build, what to skip",
    excerpt:
      "A running list of the tools I reach for first on every engagement — and the ones I've stopped recommending after watching them fail in production.",
    publication: "Medium",
    date: "March 2025",
    readTime: "9 min",
    url: "https://medium.com/@morgankreed/replace-me",
    tags: ["Fractional CTO", "Tooling", "Stack"],
  },
  {
    id: "pub-2",
    title:
      "SOC 2 for 30-person companies: a real timeline, real cost, real scope",
    excerpt:
      "Most SOC 2 guides are written for Series B companies with a compliance hire. Here's what it looks like when you're thirty people and the founder is the one filling in the spreadsheet.",
    publication: "Medium",
    date: "February 2025",
    readTime: "14 min",
    url: "https://medium.com/@morgankreed/replace-me",
    tags: ["Compliance", "SOC 2", "SMB"],
  },
  {
    id: "pub-3",
    title: "Where AI implementations actually fail (it's not the model)",
    excerpt:
      "Seven AI projects, four of them stalled. The common thread wasn't the model — it was the data access layer underneath it. Notes from the field.",
    publication: "LinkedIn",
    date: "January 2025",
    readTime: "7 min",
    url: "https://linkedin.com/in/morgankreed/replace-me",
    tags: ["AI", "Implementation", "Data"],
  },
  {
    id: "pub-4",
    title: "The Salesforce transformation playbook I stole from a CFO",
    excerpt:
      "Salesforce implementations fail for predictable reasons. A CFO I worked with had a simple reframe that made every project I've run since go smoother.",
    publication: "Medium",
    date: "November 2024",
    readTime: "11 min",
    url: "https://medium.com/@morgankreed/replace-me",
    tags: ["Salesforce", "Transformation"],
  },
  {
    id: "pub-5",
    title: "Fractional isn't cheap — it's just differently priced",
    excerpt:
      "Pushback I hear constantly: 'I could hire a junior full-time for what you charge for three days a week.' Sure. Here's why the math still works.",
    publication: "LinkedIn",
    date: "October 2024",
    readTime: "5 min",
    url: "https://linkedin.com/in/morgankreed/replace-me",
    tags: ["Fractional CTO", "Pricing"],
  },
];

// When Morgan sets his Medium handle, swap this in:
export const MEDIUM_PROFILE_URL = "https://medium.com/@morgankreed";
