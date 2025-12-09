import React, { useEffect } from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import About from "@/components/landing/about";
import ExperienceTimeline from "@/components/landing/ExperienceTimeline";
import ResultsSection from "@/components/landing/ResultsSection";
import ExpertiseSection from "@/components/landing/ExpertiseSection";
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

        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <About />

        {/* Experience Timeline */}
        <ExperienceTimeline />

        {/* Results/Achievements Section */}
        <ResultsSection />

        {/* Expertise Section */}
        <ExpertiseSection />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <footer className="bg-secondary/50 border-t border-border py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-muted-foreground text-sm">
                &copy; {new Date().getFullYear()} Morgan K Reed. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="#home"
                  className={cn(
                    "text-sm link-underline",
                    "text-muted-foreground hover:text-primary transition-colors"
                  )}
                >
                  Back to Top
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
          </div>
        </footer>
      </div>
    </>
  );
};

export default IndexPage;
