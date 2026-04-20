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
  // TODO(morgan): Replace these with real appearances. Keep the shape intact.
  {
    id: "sample-1",
    type: "podcast",
    title: "Why fractional CTO is the default for SMBs under 500 people",
    show: "The CTO Playbook",
    host: "Jane Doe",
    date: "March 2025",
    duration: "48 min",
    summary:
      "On the shape of a fractional engagement, how to scope one, and the signals that mean a company is ready for one.",
    url: "https://example.com/replace-me",
    platform: "spotify",
    featured: true,
  },
  {
    id: "sample-2",
    type: "interview",
    title: "Practical AI implementation for mid-market financial services",
    show: "Forbes Tech Council",
    date: "January 2025",
    summary:
      "A written interview on the gap between AI pilots and AI in production — what breaks, and what to budget for.",
    url: "https://example.com/replace-me",
    platform: "web",
  },
  {
    id: "sample-3",
    type: "speaking",
    title: "SOC 2 without the theater: what auditors actually look at",
    show: "FinTech Phoenix 2024",
    date: "October 2024",
    duration: "35 min",
    summary:
      "A conference talk on how to pass SOC 2 Type II in under six months at a 30-person company.",
    url: "https://example.com/replace-me",
    platform: "youtube",
  },
  {
    id: "sample-4",
    type: "webinar",
    title: "When to hire a CTO, when to rent one, when to do neither",
    show: "Vistage Executive Briefing",
    date: "August 2024",
    duration: "60 min",
    summary:
      "A decision framework for founders deciding between full-time, fractional, and advisor-only technology leadership.",
    url: "https://example.com/replace-me",
    platform: "web",
  },
  {
    id: "sample-5",
    type: "podcast",
    title: "Leading offshore engineering teams without burning them out",
    show: "The Agile CTO",
    date: "June 2024",
    duration: "55 min",
    summary:
      "On running global teams across four time zones, the rituals that work, and the ones that don't.",
    url: "https://example.com/replace-me",
    platform: "apple",
  },
  {
    id: "sample-6",
    type: "panel",
    title: "What small businesses get wrong about cybersecurity spend",
    show: "Phoenix Technology Roundtable",
    date: "April 2024",
    summary:
      "Panel discussion on budget allocation for sub-500-employee companies facing the same threats as the enterprise.",
    url: "https://example.com/replace-me",
    platform: "linkedin",
  },
];
