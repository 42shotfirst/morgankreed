import React from "react";
import { motion } from "framer-motion";
import CaseStudyCard from "./CaseStudyCard";

interface PortfolioSectionProps {
  caseStudies?: Array<{
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
  }>;
}

const PortfolioSection = ({
  caseStudies = [
    {
      title: "AI Strategy Implementation",
      description:
        "Developed and implemented an enterprise-wide AI strategy for a Fortune 500 company",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      tags: ["AI", "Strategy", "Enterprise"],
      link: "#",
    },
    {
      title: "Security Transformation",
      description:
        "Led a comprehensive security infrastructure upgrade for a global financial institution",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
      tags: ["Cybersecurity", "Finance", "Infrastructure"],
      link: "#",
    },
    {
      title: "Digital Leadership Program",
      description:
        "Created and delivered a leadership development program for emerging tech leaders",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
      tags: ["Leadership", "Training", "Development"],
      link: "#",
    },
  ],
}: PortfolioSectionProps) => {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Case Studies</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore some of my most impactful projects and transformations
            across various industries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <CaseStudyCard
                title={study.title}
                description={study.description}
                image={study.image}
                tags={study.tags}
                link={study.link}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
