import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import {
  Brain,
  Cloud,
  Code2,
  Database,
  Lock,
  Users,
  Smartphone,
  Globe,
  GitBranch,
  Cpu,
  LineChart,
  Layers,
} from "lucide-react";

interface Expertise {
  icon: React.ReactNode;
  title: string;
  category: string;
}

const expertiseAreas: Expertise[] = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI & Machine Learning",
    category: "Intelligence",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Python",
    category: "Languages",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "JavaScript/TypeScript",
    category: "Languages",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Flutter/Dart",
    category: "Mobile",
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud Architecture",
    category: "Infrastructure",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Cybersecurity",
    category: "Security",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Database Design",
    category: "Data",
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: "DevOps & CI/CD",
    category: "Operations",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Team Leadership",
    category: "Management",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Enterprise Architecture",
    category: "Strategy",
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "Digital Transformation",
    category: "Strategy",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "API Development",
    category: "Integration",
  },
];

const ExpertiseSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="expertise"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 px-4 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
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
            Technical <span className="text-primary">Expertise</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive skill set spanning development, architecture, security,
            and leadership across modern technology stacks.
          </p>
        </motion.div>

        {/* Expertise grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {expertiseAreas.map((expertise, index) => (
            <motion.div
              key={expertise.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            >
              <div
                className={cn(
                  "group p-5 rounded-xl bg-card/30 border border-border/50",
                  "hover:border-primary/50 hover:bg-card/60 transition-all duration-300",
                  "hover:shadow-lg hover:shadow-primary/10 cursor-default"
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                      "bg-primary/10 text-primary",
                      "group-hover:bg-primary group-hover:text-primary-foreground",
                      "transition-all duration-300"
                    )}
                  >
                    {expertise.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {expertise.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {expertise.category}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Continuously expanding expertise through hands-on projects,
            certifications, and industry engagement.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
