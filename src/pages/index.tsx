import React, { useEffect } from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import EngagementModes from "@/components/landing/EngagementModes";
import About from "@/components/landing/about";
import ExperienceTimeline from "@/components/landing/ExperienceTimeline";
import ResultsSection from "@/components/landing/ResultsSection";
import ExpertiseSection from "@/components/landing/ExpertiseSection";
import ProjectShowcase from "@/components/landing/ProjectShowcase";
import FitCheck from "@/components/landing/FitCheck";
import Testimonials from "@/components/landing/testimonials";
import ContactSection from "@/components/landing/ContactSection";
import PageLoader from "@/components/landing/PageLoader";
import { smoothScrollTo } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const IndexPage = () => {
  useEffect(() => {
    // Handle smooth scrolling for anchor links
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
      {/* Page Loader */}
      <PageLoader minDisplayTime={500} />

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero — firm-forward, with engagement modes preview */}
        <HeroSection />

        {/* Engagement Modes — detailed three-tier service section */}
        <EngagementModes />

        {/* The Operator — Morgan as the principal behind the firm */}
        <div id="operator" className="scroll-mt-20">
          <div className="container mx-auto px-4 pt-12">
            <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-primary mb-2">
              // the operator
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 leading-tight">
              Who you're actually hiring.
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              A CTO on Demand engagement is a founder-led engagement. Here's the
              principal — and the track record that stands behind the work.
            </p>
          </div>
          <About />
        </div>

        {/* Track Record — reframed experience timeline */}
        <div id="track-record" className="scroll-mt-20">
          <ExperienceTimeline />
        </div>

        {/* Results — outcome proof */}
        <ResultsSection />

        {/* Capabilities — what we can be hired to do */}
        <div id="capabilities" className="scroll-mt-20">
          <ExpertiseSection />
        </div>

        {/* Product Showcase — owned products / productized capabilities */}
        <ProjectShowcase />

        {/* Fit Check — anchor target for the AI assessment tool (swap in FitCheck component when built) */}
        <section
          id="fit-check"
          className="scroll-mt-20 py-20 px-4 bg-secondary/20 border-y border-border/40"
        >
          <div className="container mx-auto max-w-4xl">
            <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-primary mb-3">
              // is this a fit?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              Paste a job description or problem statement.{" "}
              <span className="text-muted-foreground font-normal">
                Get a candid read in seconds.
              </span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              The fit checker tells you whether this is something CTO on Demand
              should take on, what the engagement would probably look like, and
              what's out of scope. No sales pitch — just judgment.
            </p>
            <FitCheck />
          </div>
        </section>

        {/* Voices */}
        <Testimonials />

        {/* Contact */}
        <ContactSection />

        {/* Footer — LLC lockup */}
        <footer className="bg-secondary/50 border-t border-border py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Firm mark + principal */}
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="flex items-center gap-2">
                  <span
                    className="text-primary font-mono text-base"
                    aria-hidden="true"
                  >
                    ▮
                  </span>
                  <span className="font-mono text-sm font-medium">
                    cto-on-demand
                    <span className="text-muted-foreground">.inc</span>
                  </span>
                </div>
                <div className="h-4 w-px bg-border hidden md:block" />
                <p className="text-muted-foreground text-sm">
                  &copy; {new Date().getFullYear()} CTO on Demand, Inc. ·
                  Principal: Morgan K Reed
                </p>
              </div>

              {/* Links */}
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
                  href="https://github.com/morgankreed"
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

            {/* Fine print */}
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
