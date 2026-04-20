import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Facebook, Instagram, Youtube, Clock, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { blogPosts, type SyndicationPlatform } from "@/data/posts";

const PLATFORM_ICON: Record<SyndicationPlatform, React.ReactNode> = {
  linkedin: <Linkedin className="w-3.5 h-3.5" />,
  facebook: <Facebook className="w-3.5 h-3.5" />,
  instagram: <Instagram className="w-3.5 h-3.5" />,
  youtube: <Youtube className="w-3.5 h-3.5" />,
};

const PLATFORM_LABEL: Record<SyndicationPlatform, string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function Blog() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="blog"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 px-4 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/3 w-[30rem] h-[30rem] rounded-full bg-primary/5 blur-3xl" />
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
              // from the desk
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-[1.1] tracking-tight">
              Notes and dispatches.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Original posts from CTO on Demand. Each one is drafted here,
              distributed across LinkedIn, Facebook, Instagram, and YouTube —
              and built through the firm's own content engine.
            </p>
          </div>

          <a
            href="#all-posts"
            className={cn(
              "group inline-flex items-center gap-2",
              "font-mono text-sm text-primary hover:text-foreground",
              "transition-colors duration-300 shrink-0"
            )}
          >
            All posts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogPosts.map((post, index) => {
            const publishedPlatforms = post.syndication.filter(
              (s) => s.status === "published"
            );

            return (
              <motion.a
                key={post.id}
                href={`/blog/${post.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.06 }}
                className={cn(
                  "group flex flex-col",
                  "bg-card/40 backdrop-blur-sm",
                  "border border-border/50 hover:border-primary/50",
                  "rounded-lg p-6",
                  "transition-all duration-300"
                )}
              >
                {/* Date + read time */}
                <div className="flex items-center gap-3 mb-4 font-mono text-[0.6875rem] text-muted-foreground tracking-wider uppercase">
                  <span>{formatDate(post.date)}</span>
                  {post.readTime && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {post.excerpt}
                </p>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[0.6875rem] tracking-wider uppercase px-2 py-0.5 rounded border border-border/60 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer — syndication indicators + CTA */}
                <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-2">
                  {/* Where else it lives */}
                  {publishedPlatforms.length > 0 ? (
                    <div
                      className="flex items-center gap-2"
                      aria-label="Also syndicated to"
                    >
                      <span className="font-mono text-[0.6875rem] text-muted-foreground tracking-wider">
                        Also on:
                      </span>
                      <div className="flex items-center gap-1.5">
                        {publishedPlatforms.map((s) => (
                          <span
                            key={s.platform}
                            className="text-muted-foreground"
                            title={PLATFORM_LABEL[s.platform]}
                          >
                            {PLATFORM_ICON[s.platform]}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <span className="font-mono text-[0.6875rem] text-muted-foreground tracking-wider">
                      This site
                    </span>
                  )}

                  <span className="font-mono text-[0.6875rem] text-primary flex items-center gap-1 shrink-0 tracking-wider uppercase group-hover:underline underline-offset-4">
                    Read
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Content engine footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 pt-8 border-t border-border/40"
        >
          <p className="font-mono text-xs tracking-wider text-muted-foreground text-center">
            <span className="text-primary">&gt;</span> Publishing powered by the
            firm's own content engine. See how it works →{" "}
            <a
              href="/engine"
              className="text-primary hover:underline underline-offset-4"
            >
              /engine
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
