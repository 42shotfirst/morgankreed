import React, { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Github,
  Linkedin,
  Mail,
  CheckCircle,
  AlertCircle,
  Send,
  MapPin,
} from "lucide-react";
import { sendContactMessage } from "@/lib/emailer";

interface ContactSectionProps {
  email?: string;
  linkedin?: string;
  github?: string;
  location?: string;
}

const ContactSection = ({
  email = "morgan@morgankreed.com",
  linkedin = "https://linkedin.com/in/morgankreed",
  github = "https://github.com/morgankreed",
  location = "Phoenix, Arizona",
}: ContactSectionProps) => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await sendContactMessage(formData);
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error("Failed to send message:", err);
      setError(
        err instanceof Error ? err.message : "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const contactLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: email,
      href: `mailto:${email}`,
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn Profile",
      href: linkedin,
      external: true,
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub Profile",
      href: github,
      external: true,
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: location,
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 px-4 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to discuss how technology can transform your business? Let's connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className={cn(
                "p-8 rounded-xl bg-card/50 border border-border/50",
                "backdrop-blur-sm"
              )}
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I'll get back to you as soon as
                    possible.
                  </p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Error</h3>
                  <p className="text-muted-foreground">{error}</p>
                  <Button
                    onClick={() => setError(null)}
                    variant="outline"
                    className="border-border text-foreground hover:bg-secondary"
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can I help you?"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Let's Connect
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always interested in discussing new opportunities, innovative
                projects, and ways to help organizations leverage technology for
                growth. Feel free to reach out through any of these channels.
              </p>
            </div>

            <div className="space-y-4">
              {contactLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl",
                        "bg-card/30 border border-border/50",
                        "hover:border-primary/50 hover:bg-card/50 transition-all duration-300",
                        "group"
                      )}
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        {link.icon}
                      </div>
                      <span className="text-foreground group-hover:text-primary transition-colors">
                        {link.label}
                      </span>
                    </a>
                  ) : (
                    <div
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl",
                        "bg-card/30 border border-border/50"
                      )}
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        {link.icon}
                      </div>
                      <span className="text-muted-foreground">{link.label}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              I typically respond within 24-48 hours during business days.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
