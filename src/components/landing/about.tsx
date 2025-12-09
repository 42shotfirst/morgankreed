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
      "Designing and implementing practical AI solutions that drive measurable business value.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Technology Leadership",
    description:
      "Building high-performing teams and transforming IT from cost center to growth engine.",
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Full-Stack Developer",
    description:
      "Creating secure, scalable applications across web, mobile, and cloud platforms.",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Strategic Innovation",
    description:
      "Converting complex challenges into competitive advantages through digital transformation.",
  },
];

export default function About() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 px-4 bg-secondary/30 relative overflow-hidden"
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
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
              I am a strategic technology leader who transforms digital ecosystems into
              competitive advantage. At <span className="text-foreground font-medium">American Express</span>,{" "}
              <span className="text-foreground font-medium">USAA</span>, and other leading institutions,
              I've consistently delivered secure, compliant solutions that drive measurable business value.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I excel at navigating complex regulatory environments while accelerating digital innovation.
              My leadership converts IT from cost center to growth engine, creating resilient platforms
              that enhance customer experience while safeguarding critical data.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I build high-performing teams that execute flawlessly, balancing technological ambition
              with pragmatic governance to deliver what matters:{" "}
              <span className="text-primary font-medium">results that strengthen the bottom line</span>.
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
