import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen, Clock, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { publications, MEDIUM_PROFILE_URL } from "@/data/publications";

export default function Writing() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const [featured, ...rest] = publications;

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
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div className="max-w-3xl">
            <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-primary mb-4">
              // long-form
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-[1.1] tracking-tight">
              Writing from the field.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Essays and deep dives on AI implementation, security for the
              under-500-employee world, fractional technology leadership, and
              what actually ships vs. what doesn't. Mostly on Medium.
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

        {/* Featured article — larger card */}
        {featured && (
          <motion.a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
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
                    · {featured.publication}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    · {featured.date}
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
                  Read on {featured.publication}
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.a>
        )}

        {/* Rest of articles — compact grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rest.map((pub, index) => (
            <motion.a
              key={pub.id}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
              className={cn(
                "group flex flex-col",
                "bg-card/40 backdrop-blur-sm",
                "border border-border/50 hover:border-primary/50",
                "rounded-lg p-6",
                "transition-all duration-300"
              )}
            >
              {/* Meta row */}
              <div className="flex items-center gap-2 mb-3 font-mono text-[0.6875rem] text-muted-foreground tracking-wider">
                <span className="text-primary uppercase">{pub.publication}</span>
                <span>·</span>
                <span>{pub.date}</span>
                {pub.readTime && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {pub.readTime}
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                {pub.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {pub.excerpt}
              </p>

              {/* Tags + CTA */}
              <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5 min-w-0">
                  {pub.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[0.6875rem] text-muted-foreground truncate"
                    >
                      #{tag.toLowerCase().replace(/\s+/g, "")}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-[0.6875rem] text-primary flex items-center gap-1 shrink-0 tracking-wider uppercase group-hover:underline underline-offset-4">
                  Read
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
