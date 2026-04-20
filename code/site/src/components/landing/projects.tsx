import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface ClientOutcome {
  outcome: string;
  client: string;
  role: string;
  tech?: string[];
  logo?: string;
}

interface OwnedProduct {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
  status: "live" | "in-development";
}

const clientOutcomes: ClientOutcome[] = [
  {
    outcome: "Cut policy change processing time and labor costs",
    client: "AAA",
    role: "Self-Service Customer Portal",
    tech: ["Salesforce", "API Integration", "Process Automation"],
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/AAA_logo.svg/1200px-AAA_logo.svg.png",
  },
  {
    outcome: "Home acquisition compressed from weeks to hours",
    client: "Progress Residential",
    role: "Automated Purchase System",
    tech: ["Salesforce", "Workflow Automation", "Real Estate Tech"],
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Progress_Residential_logo.svg/2560px-Progress_Residential_logo.svg.png",
  },
  {
    outcome: "90% reduction in database crashes",
    client: "TriWest",
    role: "Data Warehouse Transformation",
    tech: ["Data Warehouse", "Agile", "Business Intelligence"],
    logo: "https://www.triwest.com/content/dam/triwest/images/logo/triwest-logo.png",
  },
  {
    outcome: "Ran digital transformation as acting CIO",
    client: "Birdiescope",
    role: "Fractional CIO engagement",
  },
  {
    outcome: "Rebuilt online sales and payments integration",
    client: "Private client",
    role: "E-commerce consulting",
  },
  {
    outcome: "Built and taught an AI curriculum for working professionals",
    client: "Learn Good Things",
    role: "AI instructor",
  },
  {
    outcome: "Custom Salesforce architecture and third-party integrations",
    client: "Harmon Solar",
    role: "Salesforce Architect",
  },
  {
    outcome: "Microservices web platform with improved performance",
    client: "Universal Liaison",
    role: "Web Software Architect",
  },
  {
    outcome: "SOC audit, controls, and compliance guidance",
    client: "Private client",
    role: "Security Auditor",
  },
];

const ownedProducts: OwnedProduct[] = [
  {
    title: "AI-Powered Real Estate Virtual Tours",
    tagline: "End-to-end MLS-ready walkthrough platform",
    description:
      "Turns raw property footage into polished, narrated virtual walkthroughs — auto-generated listing copy, multi-camera stitching, AI voiceover, and one-click MLS publishing.",
    tech: [
      "Python",
      "TensorFlow",
      "OpenCV",
      "React",
      "Node.js",
      "AWS",
      "FFmpeg",
      "WebRTC",
    ],
    image: "/images/ai-virtual-tour-showcase.png",
    status: "in-development",
  },
  {
    title: "ScrAIper",
    tagline: "Trainable web data extraction",
    description:
      "A no-code tool for finding, downloading, and structuring web data. Gets smarter over time as users train it — no engineering required.",
    tech: ["AI", "Web Scraping", "Data Extraction", "No-Code"],
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    link: "https://www.aiscraiper.com",
    status: "live",
  },
  {
    title: "Fuzzy Matcher",
    tagline: "Imperfect-data integration engine",
    description:
      "Plug in feeds from files, APIs, or databases; train the interface to match and merge records across sources, tolerating mistakes and inconsistencies.",
    tech: ["Data Matching", "Machine Learning", "Data Integration", "ETL"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    link: "https://www.fuzzymatcher.com",
    status: "live",
  },
  {
    title: "Neurocalendar",
    tagline: "Calendar for neurodivergent minds",
    description:
      "A calendar built for the neurodivergent — structured to ease distraction and anxiety, and support mental and emotional wellness day-to-day.",
    tech: [],
    image:
      "https://images.unsplash.com/photo-1496262967815-132206202600?w=800&q=80",
    status: "in-development",
  },
];

export default function Projects() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="work"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 px-4 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/4 right-0 w-[30rem] h-[30rem] rounded-full bg-cyan-400/5 blur-3xl" />
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
            // engagements &amp; products
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
            What the firm has{" "}
            <span className="text-muted-foreground font-normal">
              shipped — for clients, and for itself.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nine client outcomes from project-mode engagements, plus four
            products the firm builds and runs on its own. All of it is real
            work with specific owners — no stock-photo case studies.
          </p>
        </motion.div>

        {/* Row 1 — Client outcomes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-20"
        >
          <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
            <div>
              <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-primary mb-2">
                // client outcomes
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                What project-mode engagements have delivered.
              </h3>
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              {clientOutcomes.length} engagements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {clientOutcomes.map((item, index) => (
              <motion.div
                key={`${item.client}-${item.role}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.05,
                }}
                className={cn(
                  "group h-full flex flex-col p-6 rounded-xl",
                  "bg-card/50 border border-border/50",
                  "hover:border-primary/40 hover:bg-card transition-all duration-300"
                )}
              >
                {item.logo && (
                  <div className="h-8 mb-4 flex items-center">
                    <img
                      src={item.logo}
                      alt={`${item.client} logo`}
                      className="max-h-7 max-w-[140px] object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                )}
                <h4 className="text-lg font-semibold text-foreground leading-snug mb-3">
                  {item.outcome}
                </h4>
                <p className="font-mono text-xs text-muted-foreground mb-4 tracking-wide">
                  {item.client} · {item.role}
                </p>
                {item.tech && item.tech.length > 0 && (
                  <div className="mt-auto pt-4 border-t border-border/40">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tech.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="text-[0.6875rem] font-normal border-border/60 text-muted-foreground"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Row 2 — Owned products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
            <div>
              <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-primary mb-2">
                // owned products
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                The firm also ships products.
              </h3>
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              {ownedProducts.length} in the lineup
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ownedProducts.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.35 + index * 0.08,
                }}
                className={cn(
                  "group h-full flex flex-col rounded-xl overflow-hidden",
                  "bg-card/60 backdrop-blur-sm",
                  "border-2 border-primary/30",
                  "shadow-lg shadow-primary/5",
                  "hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10",
                  "transition-all duration-300"
                )}
              >
                {/* Image hero */}
                <div className="aspect-video relative overflow-hidden bg-secondary/40">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    {product.status === "live" ? (
                      <span className="font-mono text-[0.6875rem] tracking-[0.15em] uppercase bg-primary text-primary-foreground px-2.5 py-1 rounded-md">
                        Live
                      </span>
                    ) : (
                      <span className="font-mono text-[0.6875rem] tracking-[0.15em] uppercase bg-background/90 backdrop-blur-sm text-muted-foreground border border-border px-2.5 py-1 rounded-md inline-flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        In development
                      </span>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-6">
                  <h4 className="text-xl font-bold text-foreground mb-1">
                    {product.title}
                  </h4>
                  <p className="font-mono text-xs text-primary mb-3 tracking-wide">
                    {product.tagline}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {product.description}
                  </p>

                  {product.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {product.tech.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="text-[0.6875rem] font-normal bg-primary/5 border-primary/30 text-muted-foreground"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto">
                    {product.link ? (
                      <Button
                        asChild
                        variant="outline"
                        className="border-primary/40 hover:border-primary/80 hover:bg-primary/5 w-full sm:w-auto"
                      >
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit {product.title}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <p className="font-mono text-xs text-muted-foreground">
                        More details available on request.
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
