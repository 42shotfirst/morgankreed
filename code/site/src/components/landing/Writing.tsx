import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  BookOpen,
  Clock,
  ArrowRight,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { publications, MEDIUM_PROFILE_URL } from "@/data/publications";
import { blogPosts, type SyndicationPlatform } from "@/data/posts";

// -----------------------------------------------------------------------------
// Writing — unified surface for external publications (Medium, LinkedIn) AND
// internal blog posts. Filter chips trim the list; cards carry a source badge.
// -----------------------------------------------------------------------------

type Source = "external" | "own";
type Filter = "all" | Source;

interface FeedItem {
  id: string;
  source: Source;
  title: string;
  excerpt: string;
  date: string; // ISO or "Month YYYY"
  sortKey: number; // epoch for sort-desc
  url: string;
  venue: string; // "Medium", "LinkedIn", "From the desk"
  readTime?: string;
  tags?: string[];
  syndication?: SyndicationPlatform[];
}

function parseDate(input: string): number {
  // Handles "March 2025", "2026-04-15", etc. Falls back to Date parser.
  const t = Date.parse(input);
  return Number.isNaN(t) ? 0 : t;
}

function buildFeed(): FeedItem[] {
  const external: FeedItem[] = publications.map((p) => ({
    id: `ext-${p.id}`,
    source: "external",
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    sortKey: parseDate(p.date),
    url: p.url,
    venue: p.publication,
    readTime: p.readTime,
    tags: p.tags,
  }));

  const own: FeedItem[] = blogPosts.map((b) => ({
    id: `own-${b.id}`,
    source: "own",
    title: b.title,
    excerpt: b.excerpt,
    date: b.date,
    sortKey: parseDate(b.date),
    url: `/blog/${b.slug}`,
    venue: "From the desk",
    readTime: b.readTime,
    tags: b.tags,
    syndication: b.syndication
      .filter((s) => s.status === "published")
      .map((s) => s.platform),
  }));

  return [...external, ...own].sort((a, b) => b.sortKey - a.sortKey);
}

const PLATFORM_ICON: Record<SyndicationPlatform, React.ReactNode> = {
  linkedin: <Linkedin className="w-3.5 h-3.5" />,
  facebook: <Facebook className="w-3.5 h-3.5" />,
  instagram: <Instagram className="w-3.5 h-3.5" />,
  youtube: <Youtube className="w-3.5 h-3.5" />,
};

const FILTERS: Array<{ key: Filter; label: string }> = [
  { key: "all", label: "All" },
  { key: "external", label: "External" },
  { key: "own", label: "From the desk" },
];

function formatDate(input: string): string {
  const t = Date.parse(input);
  if (Number.isNaN(t)) return input;
  return new Date(t).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Writing() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [filter, setFilter] = useState<Filter>("all");

  const { featured, rest } = useMemo(() => {
    const feed = buildFeed();
    const filtered =
      filter === "all" ? feed : feed.filter((i) => i.source === filter);
    const [head, ...tail] = filtered;
    return { featured: head ?? null, rest: tail };
  }, [filter]);

  return (
    <section
      id="writing"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 px-4 relative overflow-hidden bg-secondary/20"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] rounded-full bg-cyan-400/5 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
        >
          <div className="max-w-3xl">
            <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-primary mb-4">
              // writing
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-[1.1] tracking-tight">
              Essays and dispatches.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Long-form from the firm — essays on AI implementation, security
              for the under-500-employee world, fractional technology
              leadership, and what actually ships. Published on Medium and
              LinkedIn, mirrored here.
            </p>
          </div>

          {/* Follow on Medium */}
          <a
            href={MEDIUM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group inline-flex items-center gap-2",
              "font-mono text-sm text-primary hover:text-foreground",
              "transition-colors duration-300 shrink-0"
            )}
          >
            <BookOpen className="w-4 h-4" />
            Follow on Medium
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="flex flex-wrap gap-2 mb-8"
          role="tablist"
          aria-label="Filter writing by source"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "font-mono text-xs tracking-[0.1em] uppercase",
                "px-3 py-1.5 rounded-md border transition-all duration-300",
                filter === f.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border/70 text-muted-foreground bg-card/40 hover:border-primary/50 hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Featured */}
        {featured && (
          <motion.a
            key={`featured-${featured.id}`}
            href={featured.url}
            target={featured.source === "external" ? "_blank" : undefined}
            rel={
              featured.source === "external" ? "noopener noreferrer" : undefined
            }
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className={cn(
              "group block mb-6",
              "bg-card/60 backdrop-blur-sm",
              "border border-border/50 hover:border-primary/60",
              "rounded-xl p-7 md:p-10",
              "transition-all duration-300"
            )}
          >
            <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="font-mono text-[0.6875rem] tracking-[0.15em] uppercase text-primary">
                    Latest
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    · {featured.venue}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    · {formatDate(featured.date)}
                  </span>
                  {featured.readTime && (
                    <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featured.readTime}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                  {featured.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed max-w-3xl">
                  {featured.excerpt}
                </p>
                {featured.tags && featured.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[0.6875rem] tracking-wider uppercase px-2 py-1 rounded border border-border/60 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 text-primary font-medium text-sm group-hover:underline underline-offset-4">
                  {featured.source === "external"
                    ? `Read on ${featured.venue}`
                    : "Read post"}
                  {featured.source === "external" ? (
                    <ExternalLink className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </span>
              </div>
            </div>
          </motion.a>
        )}

        {/* Rest — grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.url}
                target={item.source === "external" ? "_blank" : undefined}
                rel={
                  item.source === "external" ? "noopener noreferrer" : undefined
                }
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.22 + index * 0.04 }}
                className={cn(
                  "group flex flex-col",
                  "bg-card/40 backdrop-blur-sm",
                  "border border-border/50 hover:border-primary/50",
                  "rounded-lg p-5",
                  "transition-all duration-300"
                )}
              >
                {/* Meta row */}
                <div className="flex items-center gap-2 mb-3 font-mono text-[0.6875rem] text-muted-foreground tracking-wider">
                  <span className="text-primary uppercase truncate">
                    {item.venue}
                  </span>
                  <span>·</span>
                  <span className="truncate">{formatDate(item.date)}</span>
                  {item.readTime && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.readTime}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="text-base font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {item.excerpt}
                </p>

                {/* Footer */}
                <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-2">
                  {/* Syndication icons for own posts; tags for external */}
                  {item.source === "own" &&
                  item.syndication &&
                  item.syndication.length > 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.6875rem] text-muted-foreground tracking-wider">
                        Also on:
                      </span>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        {item.syndication.map((p) => (
                          <span key={p} title={p}>
                            {PLATFORM_ICON[p]}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5 min-w-0">
                      {item.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[0.6875rem] text-muted-foreground truncate"
                        >
                          #{tag.toLowerCase().replace(/\s+/g, "")}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="font-mono text-[0.6875rem] text-primary flex items-center gap-1 shrink-0 tracking-wider uppercase group-hover:underline underline-offset-4">
                    Read
                    {item.source === "external" ? (
                      <ExternalLink className="w-3 h-3" />
                    ) : (
                      <ArrowRight className="w-3 h-3" />
                    )}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {rest.length === 0 && !featured && (
          <div className="text-center py-12">
            <p className="font-mono text-sm text-muted-foreground">
              [ no entries match this filter yet ]
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
