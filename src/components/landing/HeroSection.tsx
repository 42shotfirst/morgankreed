import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Mail, ChevronDown } from "lucide-react";
import { smoothScrollTo, usePrefersReducedMotion } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  name?: string;
  tagline?: string;
  subtitle?: string;
  imageSrc?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  email?: string;
}

const HeroSection = ({
  name = "Morgan K Reed",
  tagline = "The Make-It-Happen Technology Executive",
  subtitle = "Transforming digital ecosystems into competitive advantage through strategic AI implementation, cybersecurity excellence, and visionary technology leadership.",
  imageSrc = "/images/MR Headshot 2022.PNG",
  linkedInUrl = "https://linkedin.com/in/morgankreed",
  githubUrl = "https://github.com/morgankreed",
  email = "morgan@morgankreed.com",
}: HeroSectionProps) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Parallax effect for background
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const yPos = scrolled * 0.3;
        parallaxRef.current.style.transform = `translateY(${yPos}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  const scrollToContact = () => smoothScrollTo("contact", 80);
  const scrollToAbout = () => smoothScrollTo("about", 80);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // ease-out-expo
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 -top-20 h-[120%]"
        style={{ willChange: prefersReducedMotion ? "auto" : "transform" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.p
              variants={itemVariants}
              className="text-primary font-medium mb-4"
            >
              Welcome, I'm
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
            >
              {name}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-primary font-medium mb-6"
            >
              {tagline}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6"
            >
              {["Strategic", "AI-Driven", "Results-Focused"].map((trait) => (
                <span
                  key={trait}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium",
                    "bg-secondary/50 text-muted-foreground border border-border",
                    "transition-all duration-300",
                    "hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {trait}
                </span>
              ))}
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {subtitle}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <Button
                onClick={scrollToContact}
                size="lg"
                className={cn(
                  "btn-ripple",
                  "bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8"
                )}
              >
                Contact Me
              </Button>
              <Button
                onClick={scrollToAbout}
                variant="outline"
                size="lg"
                className={cn(
                  "border-border text-foreground font-medium px-8",
                  "hover:bg-secondary/50 hover:border-primary/50",
                  "transition-all duration-300"
                )}
              >
                Learn More
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              {[
                { href: linkedInUrl, icon: Linkedin, label: "LinkedIn" },
                { href: githubUrl, icon: Github, label: "GitHub" },
                { href: `mailto:${email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  className={cn(
                    "p-3 rounded-full",
                    "bg-secondary/50 text-muted-foreground",
                    "hover:text-primary hover:bg-secondary hover:glow-sm",
                    "transition-all duration-300"
                  )}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow effect behind image */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }
                }
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-primary/30 to-cyan-400/30 rounded-full blur-3xl scale-110"
              />

              {/* Image container with gradient border */}
              <div className="relative p-1 rounded-full bg-gradient-to-r from-primary to-cyan-400">
                <div className="p-1 rounded-full bg-background">
                  <img
                    src={imageSrc}
                    alt={name}
                    className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover object-top"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Floating decorative elements */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : { y: [0, -10, 0], rotate: [12, 15, 12] }
                }
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-lg rotate-12"
              />
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : { y: [0, 10, 0], scale: [1, 1.1, 1] }
                }
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-cyan-400/20 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2",
          "text-muted-foreground hover:text-primary",
          "transition-colors duration-300"
        )}
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
