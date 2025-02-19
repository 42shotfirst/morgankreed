import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CertificationProps {
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
    image: string;
    description: string;
  }>;
}

const CertificationsSection = ({
  certifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      image:
        "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=200&h=200&fit=crop",
      description: "Professional level certification for AWS architecture",
    },
    {
      name: "Certified Information Systems Security Professional",
      issuer: "ISC2",
      date: "2022",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&h=200&fit=crop",
      description: "Advanced cybersecurity certification",
    },
    {
      name: "Project Management Professional",
      issuer: "PMI",
      date: "2021",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop",
      description: "Global standard in project management",
    },
  ],
}: CertificationProps) => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Certifications & Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden">
                            <img
                              src={cert.image}
                              alt={cert.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">
                              {cert.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {cert.issuer}
                            </p>
                            <Badge variant="secondary" className="mt-2">
                              {cert.date}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{cert.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
