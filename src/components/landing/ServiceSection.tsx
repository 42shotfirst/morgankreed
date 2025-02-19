import React from "react";
import ServiceCard from "./ServiceCard";
import { Brain, Shield, Users } from "lucide-react";

interface ServiceSectionProps {
  services?: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
  }>;
}

const ServiceSection = ({
  services = [
    {
      title: "AI Consulting",
      description:
        "Strategic AI implementation and optimization for enterprise solutions",
      icon: <Brain className="w-12 h-12" />,
      features: [
        "AI Strategy Development",
        "Implementation Planning",
        "Model Selection & Training",
        "Performance Optimization",
      ],
    },
    {
      title: "Cybersecurity Audits",
      description: "Comprehensive security assessments and risk management",
      icon: <Shield className="w-12 h-12" />,
      features: [
        "Vulnerability Assessment",
        "Security Architecture Review",
        "Compliance Auditing",
        "Risk Mitigation Planning",
      ],
    },
    {
      title: "Project Leadership",
      description: "Expert guidance for complex technical initiatives",
      icon: <Users className="w-12 h-12" />,
      features: [
        "Team Management",
        "Stakeholder Communication",
        "Resource Optimization",
        "Delivery Excellence",
      ],
    },
  ],
}: ServiceSectionProps) => {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized consulting services to help your organization thrive in
            the digital age
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              features={service.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
