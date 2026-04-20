import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import {
  Brain,
  Users,
  Code,
  Lightbulb,
} from "lucide-react";

interface AttributeCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const attributes: AttributeCard[] = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI Software Architect",
    description:
      "Designs and ships practical AI systems for growth-stage and mid-market clients — measurable business outcomes, not demo-ware.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Technology Leadership",
    description:
      "Builds the engineering leadership and team structure clients are missing, turning IT from a cost line into a function that compounds enterprise value.",
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Full-Stack Developer",
    description:
      "Delivers secure, scalable applications across web, mobile, and cloud — with the hands-on engineering credibility to back every architectural call.",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Strategic Innovation",
    description:
      "Converts complex technical challenges into durable competitive advantages through transformation engagements that move the P&L.",
  },
];

export default function About() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 px-4 bg-secondary/30 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-primary mb-4">
            // the principal
          </p>
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-[1.1] tracking-tight">
            Who you're actually hiring.
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A CTO on Demand engagement is founder-led. Here's the operator —
            and the track record behind the work.
          </p>
        </motion.div>

        {/* Bio section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-card/50 rounded-2xl p-8 border border-border/50 backdrop-blur-sm">
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              <span className="text-foreground font-medium">
                Morgan K Reed
              </span>{" "}
              embeds senior technology leadership inside growth-stage and
              mid-market companies — owning the roadmap, running the vendor and
              stack decisions, hiring and mentoring engineering leads, and
              sitting in the exec room as the accountable technology voice. He
              founded{" "}
              <span className="text-foreground font-medium">
                CTO on Demand, Inc.
              </span>{" "}
              after two decades of engineering, architecture, and executive
              leadership at{" "}
              <span className="text-foreground font-medium">
                American Express
              </span>
              ,{" "}
              <span className="text-foreground font-medium">USAA</span>,{" "}
              <span className="text-foreground font-medium">
                Foundations Investment Advisors
              </span>
              , and{" "}
              <span className="text-foreground font-medium">
                Western Alliance Bank
              </span>
              {" "}— institutions where regulators are in the room and the
              margin for error is zero.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              The firm's engagements convert technology from a cost center into
              a compounding advantage. Recent outcomes include roughly{" "}
              <span className="text-foreground font-medium">
                $5M saved in nine months
              </span>
              , a{" "}
              <span className="text-foreground font-medium">
                75% reduction in cyber incidents
              </span>
              ,{" "}
              <span className="text-foreground font-medium">
                35 SMB clients
              </span>{" "}
              brought under a single managed-services umbrella, and a{" "}
              <span className="text-foreground font-medium">
                400% acquisition uplift
              </span>{" "}
              on a digital transformation — work that moved the P&amp;L, not
              the deck.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every engagement is founder-led. No account managers, no
              second-string bench — the principal on the sales call is the
              principal on the work.{" "}
              <span className="text-primary font-medium">
                If it isn't the right call, clients hear that first.
              </span>
            </p>
          </div>
        </motion.div>

        {/* Attribute cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {attributes.map((attr, index) => (
            <motion.div
              key={attr.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <div
                className={cn(
                  "hover-card group h-full p-6 rounded-xl bg-card/50 border border-border/50",
                  "hover:border-primary/50 hover:bg-card"
                )}
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  {attr.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {attr.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {attr.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
