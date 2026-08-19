import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { ExternalLink, Building2 } from "lucide-react";

// TODO: "See the receipts" per-role context panels are not implemented yet.
// When built, each experience item should expose an expand/modal control that
// reveals the deeper per-role context (situation, actions, outcome, lesson,
// tech/methods) sourced from /context/*.txt files. The chat assistant
// (system_prompt_chat.txt) should link into these panels when prospects ask
// for evidence on a specific engagement.
interface Experience {
  company: string;
  logo?: string;
  title: string;
  location?: string;
  dateRange: string;
  description?: string;
  linkedInUrl?: string;
}

const experiences: Experience[] = [
  {
    company: "Transbridge Advisors",
    title: "Chief Technology Officer",
    location: "Phoenix, AZ",
    dateRange: "January 2026 – June 2026",
  },
  {
    company: "Western Alliance Bank",
    title: "AI Software Architect",
    location: "Phoenix, AZ",
    dateRange: "May 2025 – December 2025",
  },
  {
    company: "The Fruth Group",
    title: "Engineering and Cybersecurity Manager",
    location: "Phoenix, AZ",
    dateRange: "October 2023 – October 2024",
  },
  {
    company: "Foundations Investment Advisors",
    title: "Chief Technology Officer",
    location: "Phoenix, AZ",
    dateRange: "November 2020 – March 2023",
  },
  {
    company: "USAA",
    title: "Senior Program Leader (Contractor)",
    location: "Phoenix, AZ",
    dateRange: "May 2020 – November 2020",
  },
  {
    company: "Progress Residential",
    title: "Senior Project Manager",
    location: "Scottsdale, AZ",
    dateRange: "September 2019 – April 2020",
  },
  {
    company: "TriWest Healthcare",
    title: "Agile Coach",
    dateRange: "June 2019 – September 2019",
  },
  {
    company: "AAA",
    title: "Senior Manager",
    dateRange: "October 2017 – December 2018",
  },
  {
    company: "Pearson",
    title: "PMO Head / Product Manager",
    dateRange: "January 2016 – July 2017",
  },
  {
    company: "American Express",
    title: "Scrum Master, Mobile Applications",
    dateRange: "October 2013 – September 2015",
  },
];

const ExperienceTimeline = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="experience"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 px-4 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-primary mb-4">
            // track record
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-[1.1] tracking-tight">
            Two decades of building.{" "}
            <span className="text-muted-foreground font-normal">
              From enterprise engineering to fractional leadership.
            </span>
          </h2>
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
                    {exp.location && (
                      <span className="text-muted-foreground/70 font-normal">
                        {" · "}
                        {exp.location}
                      </span>
                    )}
                  </p>

                  {/* Description — optional */}
                  {exp.description && (
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  )}
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
