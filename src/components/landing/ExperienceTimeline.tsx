import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { ExternalLink, Building2 } from "lucide-react";

interface Experience {
  company: string;
  logo?: string;
  title: string;
  dateRange: string;
  description: string;
  linkedInUrl?: string;
}

const experiences: Experience[] = [
  {
    company: "Western Alliance Bank",
    title: "VP, Software Development Engineer",
    dateRange: "2022 - Present",
    description:
      "Leading digital transformation initiatives and AI implementation for enterprise banking solutions. Driving innovation in secure, compliant financial technology.",
  },
  {
    company: "Foundations Investment Advisors",
    title: "Director of Technology",
    dateRange: "2019 - 2022",
    description:
      "Architected and deployed cloud-first technology strategy. Established IT governance framework and led digital transformation across the organization.",
  },
  {
    company: "American Express",
    title: "Senior Software Engineer",
    dateRange: "2016 - 2019",
    description:
      "Developed secure payment processing systems and enterprise-scale applications. Implemented cybersecurity best practices across critical financial infrastructure.",
  },
  {
    company: "USAA",
    title: "Software Developer",
    dateRange: "2012 - 2016",
    description:
      "Built member-facing applications and internal tools supporting millions of military members and their families. Focused on security and accessibility.",
  },
  {
    company: "Early Career",
    title: "Various Technology Roles",
    dateRange: "2005 - 2012",
    description:
      "Progressive experience in software development, systems administration, and IT consulting. Built foundation in full-stack development and enterprise architecture.",
  },
];

const ExperienceTimeline = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="experience"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 px-4 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Professional <span className="text-primary">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={`${exp.company}-${index}`}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className={cn(
                  "relative mb-12 last:mb-0",
                  "pl-20 md:pl-0",
                  "md:w-1/2",
                  isEven ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"
                )}
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute top-0",
                    "left-6 md:left-auto",
                    isEven ? "md:right-[-8px]" : "md:left-[-8px]",
                    "w-4 h-4 rounded-full bg-primary border-4 border-background z-10"
                  )}
                />

                {/* Card */}
                <div
                  className={cn(
                    "group p-6 rounded-xl bg-card/50 border border-border/50",
                    "hover:border-primary/50 hover:bg-card transition-all duration-300",
                    "hover:shadow-lg hover:shadow-primary/10"
                  )}
                >
                  {/* Company header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                      <Building2 className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {exp.company}
                      </h3>
                      <p className="text-primary font-medium">{exp.title}</p>
                    </div>
                    {exp.linkedInUrl && (
                      <a
                        href={exp.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`View ${exp.company} on LinkedIn`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Date range */}
                  <p className="text-sm text-muted-foreground mb-3 font-medium">
                    {exp.dateRange}
                  </p>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
