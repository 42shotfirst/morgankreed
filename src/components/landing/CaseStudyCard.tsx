import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

interface CaseStudyCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const CaseStudyCard = ({
  title = "Digital Transformation Project",
  description = "Led a major digital transformation initiative for a Fortune 500 company, resulting in 40% improved operational efficiency",
  image = "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=450&q=80",
  tags = ["Digital Transformation", "Leadership", "Enterprise"],
  link = "#",
}: CaseStudyCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="w-full bg-white"
    >
      <Card className="h-full overflow-hidden border border-gray-200 shadow-lg">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="mb-2 text-xl font-bold">{title}</CardTitle>
          <CardDescription className="mb-4 text-gray-600">
            {description}
          </CardDescription>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gray-100 text-gray-700"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button
            variant="outline"
            className="w-full hover:bg-gray-100"
            onClick={() => window.open(link, "_blank")}
          >
            View Case Study
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CaseStudyCard;
