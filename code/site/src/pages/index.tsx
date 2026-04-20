import React, { useEffect } from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import EngagementModes from "@/components/landing/EngagementModes";
import About from "@/components/landing/about";
import ExperienceTimeline from "@/components/landing/ExperienceTimeline";
import ResultsSection from "@/components/landing/ResultsSection";
import ExpertiseSection from "@/components/landing/ExpertiseSection";
import Projects from "@/components/landing/projects";
import MediaAppearances from "@/components/landing/MediaAppearances";
import Writing from "@/components/landing/Writing";
import FitCheck from "@/components/landing/FitCheck";
import Testimonials from "@/components/landing/testimonials";
import ContactSection from "@/components/landing/ContactSection";
import PageLoader from "@/components/landing/PageLoader";
import { smoothScrollTo } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

const IndexPage = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest("a");
        if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
          e.preventDefault();
          const id = anchor.getAttribute("href")?.substring(1);
          if (id) {
            smoothScrollTo(id, 80);
          }
        }
      };

      document.addEventListener("click", handleAnchorClick);
      return () => document.removeEventListener("click", handleAnchorClick);
    }
  }, []);

  return (
    <>
      <PageLoader minDisplayTime={500} />

      <div className="min-h-screen bg-background">
        <Header />

        {/* ======================================================= */}
        {/* HOOK — firm pitch + engagement modes                     */}
        {/* ======================================================= */}
        <HeroSection />
        <EngagementModes />

        {/* ======================================================= */}
        {/* WORK — client outcomes + owned products                  */}
        {/* ======================================================= */}
        <Projects />

        {/* ======================================================= */}
        {/* PROOF — who's behind it + track record + results         */}
        {/* ======================================================= */}
        <div id="operator" className="scroll-mt-20">
          <About />
        </div>

        <div id="track-record" className="scroll-mt-20">
          <ExperienceTimeline />
        </div>

        <ResultsSection />

        <div id="capabilities" className="scroll-mt-20">
          <ExpertiseSection />
        </div>

        {/* ======================================================= */}
        {/* AUTHORITY — thought leadership across three surfaces     */}
        {/* ======================================================= */}
        {/*
          Order matters here. Media first because third-party media
          appearances are the strongest external trust signal.
          Writing second — unified feed of external (Medium, LinkedIn)
          and own-surface (blog) posts, with filter chips.
        */}
        <MediaAppearances />
        <Writing />

        {/* ======================================================= */}
        {/* FIT CHECK — interactive pre-qual                         */}
        {/* ======================================================= */}
        <section
          id="fit-check"
          className="scroll-mt-20 py-24 md:py-32 px-4 bg-secondary/20 border-y border-border/40"
        >
          <div className="container mx-auto max-w-4xl">
            <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-primary mb-3">
              // is this a fit?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              Is this a <span className="text-primary">fit?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              Paste a job description or problem statement. The firm's
              pre-sales assistant will give a direct read — strong fit, weak
              fit, or partial — and point you to a better option when the
              answer is no. Judgment over pitch.
            </p>
            <FitCheck />
          </div>
        </section>

        {/* ======================================================= */}
        {/* SOCIAL — testimonials                                    */}
        {/* ======================================================= */}
        <Testimonials />

        {/* ======================================================= */}
        {/* CLOSE — contact                                          */}
        {/* ======================================================= */}
        <ContactSection />

        {/* Footer */}
        <footer className="bg-secondary/50 border-t border-border py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="flex items-center gap-2">
                  <Logo variant="mark" className="w-4 h-4 text-primary" />
                  <span className="font-bold text-sm tracking-tight">
                    CTO{" "}
                    <span className="text-muted-foreground font-normal text-[0.6875rem] tracking-[0.2em] uppercase">
                      on demand
                    </span>
                  </span>
                </div>
                <div className="h-4 w-px bg-border hidden md:block" />
                <p className="text-muted-foreground text-sm">
                  &copy; {new Date().getFullYear()} CTO on Demand, Inc. ·
                  Principal: Morgan K Reed
                </p>
              </div>

              <div className="flex items-center gap-6">
                <a
                  href="#home"
                  className={cn(
                    "text-sm link-underline",
                    "text-muted-foreground hover:text-primary transition-colors"
                  )}
                >
                  Back to top
                </a>
                <a
                  href="https://linkedin.com/in/morgankreed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "text-sm link-underline",
                    "text-muted-foreground hover:text-primary transition-colors"
                  )}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/42shotfirst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "text-sm link-underline",
                    "text-muted-foreground hover:text-primary transition-colors"
                  )}
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-2">
              <p className="font-mono text-xs text-muted-foreground/80 tracking-wider">
                $ exit 0
              </p>
              <p className="text-xs text-muted-foreground/80">
                Fractional technology leadership ·{" "}
                <span className="font-mono">ctoondemandinc.com</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default IndexPage;
