import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  FileText,
  Camera,
  Mic,
  Play,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ShowcasePanel {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  gridArea: string;
}

const panels: ShowcasePanel[] = [
  {
    id: "narrative",
    title: "Auto-Generate Narrative",
    subtitle: "AI-Powered Listing Copy",
    description:
      "Intelligent content generation that analyzes property features, neighborhood data, and market positioning to produce compelling listing narratives in seconds — not hours.",
    icon: <FileText className="h-6 w-6" />,
    features: [
      "Natural language generation from property metadata",
      "Tone and style customization per brokerage",
      "SEO-optimized descriptions",
      "Multi-language support",
    ],
    gridArea: "top-left",
  },
  {
    id: "stitching",
    title: "Multi-Camera Stitching",
    subtitle: "Seamless 3D Capture",
    description:
      "Proprietary stitching engine that blends multiple camera angles into a seamless, immersive walkthrough — automatically correcting lighting, perspective, and color balance across sources.",
    icon: <Camera className="h-6 w-6" />,
    features: [
      "Multi-angle compositing with parallax correction",
      "Automated color and exposure matching",
      "Real-time stitching progress tracking",
      "Support for wide-angle and standard lenses",
    ],
    gridArea: "top-right",
  },
  {
    id: "voiceover",
    title: "Voice Over Generation",
    subtitle: "Professional AI Narration",
    description:
      "Select from a library of natural-sounding AI voices to narrate your walkthrough. Each voice is tuned for real estate — confident, warm, and professional.",
    icon: <Mic className="h-6 w-6" />,
    features: [
      "Multiple voice personas with tone control",
      "Synchronized narration with room transitions",
      "Custom pronunciation for neighborhood names",
      "Preview and swap voices instantly",
    ],
    gridArea: "bottom-left",
  },
  {
    id: "publish",
    title: "Finalized Walkthrough",
    subtitle: "One-Click MLS Publishing",
    description:
      "The finished product — a polished virtual tour with narration, property data overlay, and direct publishing to MLS portals, social media, and brokerage websites.",
    icon: <Play className="h-6 w-6" />,
    features: [
      "MLS-compliant video output formats",
      "Embedded property data overlays",
      "Social media cut-downs (15s, 30s, 60s)",
      "Analytics dashboard for view tracking",
    ],
    gridArea: "bottom-right",
  },
];

const ProjectShowcase = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
  });
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const activePanelData = panels.find((p) => p.id === activePanel);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(14, 165, 233, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Featured Project
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            AI-Powered Real Estate
            <span className="text-gradient block mt-1">Virtual Tours</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            End-to-end platform that transforms raw property footage into
            polished, narrated virtual walkthroughs — published directly to MLS
            portals.
          </p>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-12"
        >
          <div className="relative rounded-2xl overflow-hidden border border-primary/20 glow-sm">
            <img
              src="/images/ai-virtual-tour-showcase.png"
              alt="AI-Powered Virtual Tour Platform — four panels showing auto-generated narratives, multi-camera stitching, voice-over generation, and finalized MLS-ready walkthrough"
              className="w-full h-auto"
            />
            {/* Overlay grid on hover */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
              {panels.map((panel, index) => (
                <button
                  key={panel.id}
                  onClick={() => setActivePanel(panel.id)}
                  className={cn(
                    "group relative border border-transparent transition-all duration-300 cursor-pointer",
                    "hover:border-primary/40 hover:bg-primary/5",
                    "focus:outline-none focus:border-primary/60"
                  )}
                  aria-label={`Learn more about ${panel.title}`}
                >
                  {/* Corner label */}
                  <div
                    className={cn(
                      "absolute px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-lg",
                      "border border-primary/30 text-xs font-medium text-primary",
                      "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                      "flex items-center gap-1.5",
                      index === 0 && "bottom-3 right-3",
                      index === 1 && "bottom-3 left-3",
                      index === 2 && "top-3 right-3",
                      index === 3 && "top-3 left-3"
                    )}
                  >
                    {panel.icon}
                    {panel.title}
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Panel Detail Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {panels.map((panel, index) => (
            <motion.button
              key={panel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              onClick={() => setActivePanel(panel.id)}
              className={cn(
                "text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer",
                "hover:border-primary/40 hover:bg-primary/5",
                "focus:outline-none focus:border-primary/60",
                activePanel === panel.id
                  ? "border-primary/60 bg-primary/10"
                  : "border-border bg-card/50"
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {panel.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{panel.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {panel.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {panel.description}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Expanded Panel Detail */}
        <AnimatePresence>
          {activePanelData && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 md:p-8 rounded-xl border border-primary/30 bg-card/80 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                      {activePanelData.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        {activePanelData.title}
                      </h3>
                      <p className="text-sm text-primary">
                        {activePanelData.subtitle}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActivePanel(null)}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    aria-label="Close panel details"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-muted-foreground mb-5 max-w-2xl">
                  {activePanelData.description}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {activePanelData.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech stack badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {[
            "Python",
            "TensorFlow",
            "OpenCV",
            "React",
            "Node.js",
            "AWS",
            "FFmpeg",
            "WebRTC",
          ].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full border border-border bg-card/50 text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
