import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, ChevronDown } from "lucide-react";
import {
  smoothScrollTo,
  usePrefersReducedMotion,
} from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  firmName?: string;
  headline?: string;
  subtitle?: string;
}

const HeroSection = ({
  firmName = "cto-on-demand.inc",
  headline = "The CTO your roadmap's been waiting for.",
  subtitle = "CTO-grade thinking without the CTO-grade overhead. Fractional and project-based technology leadership for companies that need a senior operator — not a consultant, not a recruiter's shortlist — and need one this quarter.",
}: HeroSectionProps) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Parallax effect for background
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  const scrollToContact = () => smoothScrollTo("contact", 80);
  const scrollToOperator = () => smoothScrollTo("operator", 80);
  const scrollToEngagements = () => smoothScrollTo("engagements", 80);
  const scrollToFitCheck = () => smoothScrollTo("fit-check", 80);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const proofMetrics = [
    { value: "~$5M", label: "saved in 9 months" },
    { value: "75%", label: "fewer cyber incidents" },
    { value: "35", label: "SMB clients covered" },
    { value: "400%", label: "acquisition uplift" },
  ];

  const engagementModes = [
    {
      number: "01",
      label: "FRACTIONAL",
      title: "Embedded CTO",
      description:
        "Ongoing leadership, 1–3 days/week. Roadmap, hiring, vendor calls, the hard decisions.",
    },
    {
      number: "02",
      label: "PROJECT",
      title: "Defined outcome",
      description:
        "AI implementation, security audits, cloud transformations. Scoped, priced, shipped.",
    },
    {
      number: "03",
      label: "ADVISORY",
      title: "On call",
      description:
        "Monthly retainer. Architecture reviews, due diligence, second opinions.",
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-28 pb-16"
    >
      {/* Parallax background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 -top-20 h-[120%]"
        style={{
          willChange: prefersReducedMotion ? "auto" : "transform",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          {/* Terminal prompt preamble */}
          <motion.div
            variants={itemVariants}
            className="font-mono text-sm text-muted-foreground mb-6 flex items-center gap-2 flex-wrap"
          >
            <span className="text-primary">$</span>
            <span className="text-primary">hire</span>
            <span>--fractional --senior --this-quarter</span>
            <motion.span
              animate={
                prefersReducedMotion ? {} : { opacity: [1, 0, 1] }
              }
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-primary ml-1"
              aria-hidden="true"
            />
          </motion.div>

          {/* Eyebrow wordmark */}
          <motion.p
            variants={itemVariants}
            className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-5"
          >
            ▮ {firmName}
          </motion.p>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.05] tracking-tight max-w-4xl"
          >
            The CTO your roadmap's been{" "}
            <span className="bg-gradient-to-r from-primary via-[#0080ff] to-[#0047ff] bg-clip-text text-transparent">
              waiting for.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* Traits */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 mb-10"
          >
            {["Fractional", "Project-based", "On-call"].map((trait) => (
              <span
                key={trait}
                className={cn(
                  "font-mono text-xs tracking-[0.15em] px-3 py-1.5 rounded-md",
                  "border border-border/70 text-muted-foreground bg-card/40",
                  "transition-colors duration-300",
                  "hover:border-primary/50 hover:text-foreground"
                )}
              >
                {trait.toUpperCase()}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16"
          >
            <Button
              onClick={scrollToContact}
              size="lg"
              className={cn(
                "btn-ripple text-base px-6 py-6",
                "bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              )}
            >
              Schedule an intro
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={scrollToOperator}
              size="lg"
              variant="outline"
              className={cn(
                "text-base px-6 py-6",
                "border-primary/40 hover:border-primary/80 hover:bg-primary/5"
              )}
            >
              <Terminal className="mr-2 h-4 w-4" />
              Talk to the operator
            </Button>
            <button
              onClick={scrollToFitCheck}
              className={cn(
                "font-mono text-sm text-muted-foreground ml-0 sm:ml-2",
                "hover:text-primary transition-colors duration-300",
                "underline-offset-4 hover:underline"
              )}
            >
              or fit-check your JD →
            </button>
          </motion.div>

          {/* Proof metrics strip */}
          <motion.div
            variants={itemVariants}
            className="border-t border-border/50 pt-6 mb-16"
          >
            <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-muted-foreground mb-5">
              // track record, at a glance
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {proofMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="font-mono text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 leading-snug">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Engagement modes preview */}
          <motion.div variants={itemVariants}>
            <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-muted-foreground mb-5">
              // engagement modes
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {engagementModes.map((mode) => (
                <button
                  key={mode.number}
                  onClick={scrollToEngagements}
                  className={cn(
                    "text-left group",
                    "bg-card/40 hover:bg-card/70",
                    "border border-border/50 hover:border-primary/50",
                    "rounded-lg p-5 transition-all duration-300"
                  )}
                >
                  <div className="font-mono text-xs text-primary mb-2 tracking-[0.15em]">
                    {mode.number} / {mode.label}
                  </div>
                  <div className="font-semibold text-lg mb-1.5 group-hover:text-primary transition-colors">
                    {mode.title}
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {mode.description}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToOperator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className={cn(
          "absolute bottom-6 left-1/2 -translate-x-1/2",
          "text-muted-foreground hover:text-primary",
          "transition-colors duration-300 hidden md:block"
        )}
        aria-label="Scroll to operator section"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
