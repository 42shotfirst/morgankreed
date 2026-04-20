import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Zap, Target, PhoneCall } from "lucide-react";
import {
  useScrollAnimation,
  smoothScrollTo,
} from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface EngagementMode {
  number: string;
  label: string;
  title: string;
  tagline: string;
  icon: React.ReactNode;
  cadence: string;
  description: string;
  deliverables: string[];
  bestFor: string;
  featured?: boolean;
}

const modes: EngagementMode[] = [
  {
    number: "01",
    label: "FRACTIONAL",
    title: "Embedded CTO",
    tagline: "Senior tech leadership, by the day.",
    icon: <Zap className="w-6 h-6" />,
    cadence: "1–3 days / week",
    description:
      "You get a fully accountable CTO without the full-time hire. I own the roadmap, run vendor decisions, hire and mentor your engineering leads, and sit in your exec room.",
    deliverables: [
      "Technology strategy and roadmap",
      "Engineering org design and hiring",
      "Vendor and stack decisions",
      "Board and investor-ready tech briefings",
      "Cybersecurity and compliance posture",
    ],
    bestFor:
      "Growth-stage companies with a real engineering function but no senior tech leader — or a CTO transition to cover.",
    featured: true,
  },
  {
    number: "02",
    label: "PROJECT",
    title: "Defined outcome",
    tagline: "Scoped, priced, shipped.",
    icon: <Target className="w-6 h-6" />,
    cadence: "4–16 week engagements",
    description:
      "A specific thing that needs to happen: an AI implementation, a security audit, a cloud migration, a Salesforce transformation. Fixed scope, fixed price, written into a statement of work.",
    deliverables: [
      "AI strategy and implementation",
      "SOC 2 / PCI readiness and audits",
      "Cloud transformation and cost optimization",
      "Salesforce architecture and integration",
      "Custom applications (web, mobile, automation)",
    ],
    bestFor:
      "Companies with a clear initiative and a deadline but no senior operator to own it end-to-end.",
  },
  {
    number: "03",
    label: "ADVISORY",
    title: "On call",
    tagline: "A CTO on speed dial.",
    icon: <PhoneCall className="w-6 h-6" />,
    cadence: "Monthly retainer",
    description:
      "You have a technical team. What you need is a senior second opinion on the big calls. I'm on a Slack, a call, or a review as needed — before the stakes get expensive.",
    deliverables: [
      "Architecture and code reviews",
      "Vendor and build-vs-buy evaluations",
      "M&A technology due diligence",
      "Incident post-mortems and response",
      "Executive coaching for your technical leads",
    ],
    bestFor:
      "Founders, CEOs, and technical leads who need judgment — not execution — on an ongoing basis.",
  },
];

export default function EngagementModes() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const scrollToContact = () => smoothScrollTo("contact", 80);

  return (
    <section
      id="engagements"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 px-4 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] rounded-full bg-cyan-400/5 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-primary mb-4">
            // how we work together
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
            Three ways to hire a CTO.{" "}
            <span className="text-muted-foreground font-normal">
              None of them require one on the payroll.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every engagement starts with a short fit conversation. If it's not
            the right call, I'll tell you — and point you at someone it is.
          </p>
        </motion.div>

        {/* Mode cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {modes.map((mode, index) => (
            <motion.div
              key={mode.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
              className={cn(
                "relative flex flex-col",
                "bg-card/60 backdrop-blur-sm",
                "border rounded-xl p-7",
                "transition-all duration-300",
                mode.featured
                  ? "border-primary/60 shadow-lg shadow-primary/5"
                  : "border-border/50 hover:border-primary/40"
              )}
            >
              {mode.featured && (
                <div className="absolute -top-3 left-7">
                  <span className="font-mono text-[0.6875rem] tracking-[0.15em] uppercase bg-primary text-primary-foreground px-3 py-1 rounded-md">
                    Most common
                  </span>
                </div>
              )}

              {/* Mode header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="font-mono text-xs text-primary mb-2 tracking-[0.15em]">
                    {mode.number} / {mode.label}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground leading-tight">
                    {mode.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 italic">
                    {mode.tagline}
                  </p>
                </div>
                <div
                  className={cn(
                    "rounded-lg p-2.5 shrink-0",
                    "bg-primary/10 text-primary"
                  )}
                >
                  {mode.icon}
                </div>
              </div>

              {/* Cadence */}
              <div className="font-mono text-xs text-muted-foreground mb-4 pb-4 border-b border-border/50">
                <span className="text-primary">▮</span> {mode.cadence}
              </div>

              {/* Description */}
              <p className="text-sm text-foreground/90 leading-relaxed mb-5">
                {mode.description}
              </p>

              {/* Deliverables */}
              <div className="mb-6 flex-1">
                <p className="font-mono text-[0.6875rem] tracking-[0.15em] uppercase text-muted-foreground mb-3">
                  What you get
                </p>
                <ul className="space-y-2">
                  {mode.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best for */}
              <div className="mb-6 pt-5 border-t border-border/50">
                <p className="font-mono text-[0.6875rem] tracking-[0.15em] uppercase text-muted-foreground mb-2">
                  Best fit
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {mode.bestFor}
                </p>
              </div>

              {/* CTA */}
              <Button
                onClick={scrollToContact}
                variant={mode.featured ? "default" : "outline"}
                className={cn(
                  "w-full",
                  mode.featured
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "border-primary/40 hover:border-primary/80 hover:bg-primary/5"
                )}
              >
                Start a conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="font-mono text-xs tracking-wider text-muted-foreground">
            Unsure which fits? —{" "}
            <button
              onClick={() => smoothScrollTo("fit-check", 80)}
              className="text-primary hover:underline underline-offset-4"
            >
              Run your situation through the fit checker
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
