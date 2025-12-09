import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Quote, Linkedin } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  linkedInUrl?: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Morgan's strategic vision and technical expertise transformed our technology infrastructure. His ability to bridge business needs with technical solutions is exceptional.",
    author: "Sarah Chen",
    title: "Chief Technology Officer",
    company: "Enterprise Solutions Inc.",
    linkedInUrl: "#",
  },
  {
    quote:
      "Working with Morgan was a game-changer for our digital transformation initiative. He delivered results that exceeded expectations while keeping our team engaged and aligned.",
    author: "Michael Rodriguez",
    title: "VP of Engineering",
    company: "Innovation Labs",
    linkedInUrl: "#",
  },
  {
    quote:
      "Morgan combines deep technical knowledge with outstanding leadership skills. He built our security framework from the ground up and mentored our team along the way.",
    author: "Emily Thompson",
    title: "Director of Product",
    company: "TechForward Co.",
    linkedInUrl: "#",
  },
  {
    quote:
      "An exceptional leader who understands both the technical and human aspects of technology delivery. Morgan's impact on our organization continues to be felt years later.",
    author: "David Kim",
    title: "CEO",
    company: "NextGen Ventures",
    linkedInUrl: "#",
  },
];

export default function Testimonials() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="testimonials"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 px-4 bg-secondary/30 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Client <span className="text-primary">Testimonials</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Feedback from leaders and colleagues I've had the privilege of working with.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div
                className={cn(
                  "group h-full p-8 rounded-xl bg-card/50 border border-border/50",
                  "hover:border-primary/50 hover:bg-card transition-all duration-300",
                  "hover:shadow-lg hover:shadow-primary/10"
                )}
              >
                {/* Quote icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Quote className="w-6 h-6 text-primary" />
                </div>

                {/* Quote text */}
                <p className="text-muted-foreground text-lg leading-relaxed mb-8 italic">
                  "{testimonial.quote}"
                </p>

                {/* Author info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-cyan-400 flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </p>
                      <p className="text-sm text-primary">{testimonial.company}</p>
                    </div>
                  </div>

                  {testimonial.linkedInUrl && testimonial.linkedInUrl !== "#" && (
                    <a
                      href={testimonial.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`View ${testimonial.author}'s LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
