import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    value: 30,
    suffix: "+",
    label: "Organizations Served",
    description:
      "Successfully delivered technology solutions across diverse industries and company sizes.",
  },
  {
    value: 20,
    suffix: "+",
    label: "Years Experience",
    description:
      "Two decades of progressive technology leadership and hands-on development expertise.",
  },
  {
    value: 50,
    suffix: "%",
    label: "Cost Reduction",
    description:
      "Average operational cost savings achieved through strategic technology optimization.",
  },
  {
    value: 15,
    suffix: "M+",
    prefix: "$",
    label: "Projects Delivered",
    description:
      "Total value of technology projects successfully delivered and implemented.",
  },
];

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  const { ref, count } = useCountUp(stat.value, {
    duration: 2000,
    delay: index * 200,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "group p-8 rounded-xl bg-card/50 border border-border/50 text-center",
        "hover:border-primary/50 hover:bg-card transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/10"
      )}
    >
      <div className="mb-4">
        <span className="text-5xl md:text-6xl font-bold text-primary">
          {stat.prefix}
          {count}
          {stat.suffix}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{stat.label}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {stat.description}
      </p>
    </div>
  );
};

const ResultsSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="results"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 px-4 bg-secondary/30 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Proven <span className="text-primary">Results</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Measurable impact across technology leadership, digital transformation,
            and enterprise solutions delivery.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <StatCard stat={stat} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
