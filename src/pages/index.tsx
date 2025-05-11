import React, { useEffect } from "react";
import Header from "@/components/landing/Header";
import ServiceSection from "@/components/landing/ServiceSection";
import PortfolioSection from "@/components/landing/PortfolioSection";
import SpeakingSection from "@/components/landing/SpeakingSection";
import CertificationsSection from "@/components/landing/CertificationsSection";
import ContactSection from "@/components/landing/ContactSection";
import About from "@/components/landing/about";
import { motion } from "framer-motion";

const IndexPage = () => {
  useEffect(() => {
    // Check if we're in the browser environment before accessing document
    if (typeof window !== "undefined") {
      // Handle smooth scrolling for anchor links
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (
          target.tagName === "A" &&
          target.getAttribute("href")?.startsWith("#")
        ) {
          e.preventDefault();
          const id = target.getAttribute("href")?.substring(1);
          const element = document.getElementById(id || "");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      };

      document.addEventListener("click", handleAnchorClick);
      return () => document.removeEventListener("click", handleAnchorClick);
    }
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Morgan K Reed
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Technology Leadership Consultant specializing in AI
              implementation, cybersecurity, and digital transformation
            </p>
            <div className="flex justify-center gap-4">
              <motion.img
                src="/headshot.jpg"
                alt="Morgan K Reed"
                className="rounded-full w-48 h-48 object-cover shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Services Section */}
      <ServiceSection />

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Speaking Section */}
      <SpeakingSection />

      {/* Certifications Section */}
      <CertificationsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Morgan K Reed. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;
