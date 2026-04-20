import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  Video,
  Radio,
  Users,
  FileText,
  ExternalLink,
  Clock,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import {
  mediaAppearances,
  type MediaAppearance,
  type MediaType,
} from "@/data/media";

type FilterKey = "all" | MediaType;

const FILTERS: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "podcast", label: "Podcasts" },
  { key: "interview", label: "Interviews" },
  { key: "speaking", label: "Speaking" },
  { key: "webinar", label: "Webinars" },
  { key: "panel", label: "Panels" },
];

const TYPE_ICON: Record<MediaType, React.ReactNode> = {
  podcast: <Mic className="w-4 h-4" />,
  interview: <FileText className="w-4 h-4" />,
  speaking: <Video className="w-4 h-4" />,
  webinar: <Radio className="w-4 h-4" />,
  panel: <Users className="w-4 h-4" />,
};

const TYPE_LABEL: Record<MediaType, string> = {
  podcast: "Podcast",
  interview: "Interview",
  speaking: "Speaking",
  webinar: "Webinar",
  panel: "Panel",
};

const PLATFORM_CTA: Record<MediaAppearance["platform"], string> = {
  spotify: "Listen on Spotify",
  apple: "Listen on Apple",
  youtube: "Watch on YouTube",
  web: "Read the piece",
  linkedin: "View on LinkedIn",
  other: "Open",
};

export default function MediaAppearances() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [filter, setFilter] = useState<FilterKey>("all");

  const { featured, rest } = useMemo(() => {
    const filtered =
      filter === "all"
        ? mediaAppearances
        : mediaAppearances.filter((m) => m.type === filter);
    const featured = filtered.find((m) => m.featured) ?? null;
    const rest = filtered.filter((m) => m.id !== featured?.id);
    return { featured, rest };
  }, [filter]);

  return (
    <section
      id="media"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 px-4 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[30rem] h-[30rem] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-3xl"
        >
          <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-primary mb-4">
            // in the wild
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-[1.1] tracking-tight">
            Interviews, podcasts, and panels.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Where the operator has shown up to talk shop — on
            technology leadership, AI in practice, cybersecurity for the
            under-500-employee world, and what it takes to ship.
          </p>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Filter media appearances"
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

        {/* Featured appearance */}
        {featured && (
          <motion.a
            key={`featured-${featured.id}`}
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn(
              "block mb-8 group",
              "bg-card/60 backdrop-blur-sm",
              "border border-primary/40 hover:border-primary/80",
              "rounded-xl p-7 md:p-10",
              "transition-all duration-300"
            )}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="font-mono text-[0.6875rem] tracking-[0.15em] uppercase bg-primary text-primary-foreground px-3 py-1 rounded-md">
                Featured
              </span>
              <span className="font-mono text-xs text-primary flex items-center gap-1.5 tracking-[0.1em] uppercase">
                {TYPE_ICON[featured.type]}
                {TYPE_LABEL[featured.type]}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                · {featured.date}
              </span>
              {featured.duration && (
                <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {featured.duration}
                </span>
              )}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
              {featured.title}
            </h3>
            <p className="text-muted-foreground mb-5 leading-relaxed max-w-3xl">
              {featured.summary}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="text-foreground">
                <span className="text-muted-foreground">on</span>{" "}
                <span className="font-medium">{featured.show}</span>
                {featured.host && (
                  <>
                    <span className="text-muted-foreground"> with </span>
                    <span>{featured.host}</span>
                  </>
                )}
              </div>
              <span className="text-primary font-medium flex items-center gap-1.5 group-hover:underline underline-offset-4">
                {PLATFORM_CTA[featured.platform]}
                <ExternalLink className="w-4 h-4" />
              </span>
            </div>
          </motion.a>
        )}

        {/* Grid of other appearances */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((m, index) => (
              <motion.a
                key={m.id}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + index * 0.05 }}
                className={cn(
                  "group flex flex-col",
                  "bg-card/40 backdrop-blur-sm",
                  "border border-border/50 hover:border-primary/50",
                  "rounded-lg p-5",
                  "transition-all duration-300"
                )}
              >
                {/* Type / date header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[0.6875rem] text-primary flex items-center gap-1.5 tracking-[0.1em] uppercase">
                    {TYPE_ICON[m.type]}
                    {TYPE_LABEL[m.type]}
                  </span>
                  <span className="font-mono text-[0.6875rem] text-muted-foreground">
                    {m.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                  {m.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {m.summary}
                </p>

                {/* Footer — show + CTA */}
                <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-2">
                  <div className="text-xs text-muted-foreground truncate">
                    <span className="font-medium text-foreground/80">
                      {m.show}
                    </span>
                    {m.duration && <span> · {m.duration}</span>}
                  </div>
                  <span className="font-mono text-[0.6875rem] text-primary flex items-center gap-1 shrink-0 tracking-wider uppercase group-hover:underline underline-offset-4">
                    Open
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Empty state */}
        {rest.length === 0 && !featured && (
          <div className="text-center py-12">
            <p className="font-mono text-sm text-muted-foreground">
              [ no {filter} appearances yet — check back soon ]
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
