// Central data file for media appearances.
// Edit this list to add new appearances — the Media section reads from here.
// `featured: true` pins one item to the top.

export type MediaType =
  | "podcast"
  | "interview"
  | "speaking"
  | "webinar"
  | "panel";

export interface MediaAppearance {
  id: string;
  type: MediaType;
  title: string;
  show: string;
  host?: string;
  date: string; // ISO or human-readable, e.g. "March 2025"
  duration?: string; // e.g. "42 min"
  summary: string;
  url: string;
  platform: "spotify" | "apple" | "youtube" | "web" | "linkedin" | "other";
  featured?: boolean;
}

export const mediaAppearances: MediaAppearance[] = [
  // Add new appearances here. `featured: true` pins one item to the top.
  {
    id: "cyber-trench-ep-111",
    type: "podcast",
    title: "The Leadership Mistake That Breaks Security Systems",
    show: "Musings from the Cyber Trench",
    date: "April 2026",
    duration: "57 min",
    summary:
      "Why security programs fail in companies that already have the tools, the policies, and the compliance frameworks — and why the cause is almost always design, not technology. On how added controls can increase risk, how poor system design drives human workarounds, and why usability is now a security requirement.",
    url: "https://www.youtube.com/watch?v=-EBF4-CfhgE",
    platform: "youtube",
    featured: true,
  },
  {
    id: "business-reporter-dtt-dec-2023",
    type: "panel",
    title: "Digital Transformation Talk: Cyber Security",
    show: "Business Reporter",
    date: "December 2023",
    duration: "46 min",
    summary:
      "Panel discussion on cyber security, in Business Reporter's Digital Transformation Talk series.",
    url: "https://www.youtube.com/watch?v=tegO0D8dTGk&t=1065s",
    platform: "youtube",
  },
];
