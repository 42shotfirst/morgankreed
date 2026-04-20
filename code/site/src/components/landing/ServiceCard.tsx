import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  features?: string[];
  ctaText?: string;
  onCtaClick?: () => void;
}

const ServiceCard = ({
  title = "AI Consulting",
  description = "Helping organizations leverage artificial intelligence to drive business value",
  icon = null,
  features = [
    "Strategy Development",
    "Implementation Planning",
    "Team Training",
    "ROI Analysis",
  ],
  ctaText = "Learn More",
  onCtaClick = () => {},
}: ServiceCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 w-full max-w-[400px] h-[500px] cursor-pointer bg-white">
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <Card className="absolute w-full h-full backface-hidden p-6 flex flex-col items-center justify-center gap-4 bg-white border-2">
          <div className="text-4xl text-primary mb-4">{icon}</div>
          <h3 className="text-2xl font-bold text-center mb-2">{title}</h3>
          <p className="text-center text-muted-foreground mb-4">
            {description}
          </p>
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onCtaClick();
            }}
          >
            {ctaText}
          </Button>
        </Card>

        {/* Back of card */}
        <Card className="absolute w-full h-full backface-hidden p-6 flex flex-col items-center justify-center gap-4 bg-white border-2 rotate-y-180">
          <h4 className="text-xl font-semibold mb-4">Key Features</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="text-center text-muted-foreground">
                {feature}
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            className="mt-4"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
          >
            Back to Overview
          </Button>
        </Card>
      </motion.div>
    </div>
  );
};

export default ServiceCard;
