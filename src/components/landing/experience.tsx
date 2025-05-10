import { useState } from "react";
import { Card } from "@/components/ui/card";

interface Position {
  title: string;
  subtitle?: string;
  company: string;
  period: string;
  highlights: string[];
}

const recentPositions: Position[] = [
  {
    title: "PreSales Engineering Manager",
    company: "The Fruth Group",
    period: "October 2023 - Present",
    highlights: [
      "Created automation and simplified processes to cut issue resolution time by 25%",
      "Led several important initiatives to convert infrastructure and operations to cloud-based services",
      "Acted as fractional CIO and CISO for approximately 35 clients with over 100 employees",
    ],
  },
  {
    title: "Chief Technology Officer",
    subtitle: "(Formerly Director of Technology)",
    company: "Foundations Investment Advisors",
    period: "November 2020 - March 2023",
    highlights: [
      "Achieved savings of approximately $5M in 9 months",
      "Reduced Cybersecurity incidents by approximately 75%",
      "Created business process efficiency improvements, leading to a 20% increase in overall business",
    ],
  },
  {
    title: "Senior Program Leader",
    company: "USAA",
    period: "May 2020 - November 2020",
    highlights: [
      "Improved processes within Scaled Agile Framework release train",
      "Participated in Article 7 committee tasks and analysis",
      "Decreased application testing time by approximately 95%",
    ],
  },
  {
    title: "Senior Project Manager",
    company: "Progress Residential",
    period: "September 2019 - April 2020",
    highlights: [
      "Increased acquisitions 400% with new automated home acquisition engine",
      "Achieved 15% in soft cost savings via technology projects",
      "Led multiple Scrum/Agile teams and staff augmentation",
    ],
  },
];

const previousPositions: Position[] = [
  {
    title: "Agile Coach (Contractor)",
    company: "TriWest Healthcare",
    period: "June 2019 - September 2019",
    highlights: [
      "Led Agile Warehouse transformation process",
      "Reduced outages and soft costs by 95%",
      "Provided real-time Business Intelligence dashboards",
    ],
  },
  {
    title: "Agile Coach (Contractor)",
    company: "Axway",
    period: "December 2018 - June 2019",
    highlights: [
      "Led cross-functional scrum teams",
      "Coordinated work between product owners and program managers",
      "Provided direction to internal scrum community",
    ],
  },
  {
    title: "Senior Manager (Contractor)",
    company: "AAA",
    period: "October 2017 - December 2018",
    highlights: [
      "Led Scrum cross-functional development teams",
      "Increased monitoring/testing/deployment by 70%",
      "Improved business satisfaction scores by 10-15%",
    ],
  },
  {
    title: "Senior Project Manager (Contractor)",
    company: "McKesson",
    period: "July 2017 - October 2017",
    highlights: [
      "Led Salesforce transformation project",
      "Managed ETL utilizing Informatica ICRT",
      "Handled project planning and resource management",
    ],
  },
  {
    title: "PMO Head/Product Manager (Contractor)",
    company: "Pearson",
    period: "January 2016 - July 2017",
    highlights: [
      "Led initiative replacing 42 legacy systems",
      "Scaled up PMO staff by 30%",
      "Achieved overall savings of 15% on resources",
    ],
  },
  {
    title: "Scrum Master, Mobile Applications (Contractor)",
    company: "American Express",
    period: "October 2013 - September 2015",
    highlights: [
      "Led mobile development and QA team",
      "Coordinated two-week Agile Sprint cycles",
      "Managed project funding and executive communication",
    ],
  },
  {
    title: "Senior Software Engineer/Project Manager",
    company: "Limelight Networks",
    period: "September 2012 - September 2013",
    highlights: [
      "Led migration to Salesforce for customer support",
      "Resolved bugs in in-house Content Management System",
      "Provided technical troubleshooting",
    ],
  },
];

function FlipCard({
  front,
  back,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-[200px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: "1000px" }}
    >
      <div
        className={`absolute w-full h-full transition-all duration-500 ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute w-full h-full backface-hidden">{front}</div>
        <div className="absolute w-full h-full backface-hidden [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      <div className="container relative">
        <h2 className="text-4xl font-bold tracking-tight mb-16 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Experience
        </h2>

        {/* Recent Positions */}
        <h3 className="text-3xl font-bold tracking-tight mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Recent Positions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {recentPositions.map((position) => (
            <FlipCard
              key={position.title}
              front={
                <Card className="h-full p-6 bg-gradient-to-br from-card to-card/95 border-2 border-primary/10 hover:shadow-lg transition-all">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {position.title}
                    {position.subtitle && (
                      <span className="text-xs font-light block">
                        {position.subtitle}
                      </span>
                    )}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {position.company}
                  </p>
                  <p className="text-sm text-muted-foreground/80">
                    {position.period}
                  </p>
                </Card>
              }
              back={
                <Card className="h-full p-6 bg-gradient-to-br from-card to-card/95 border-2 border-primary/10">
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    {position.highlights.map((highlight, index) => (
                      <li key={index} className="text-muted-foreground">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </Card>
              }
            />
          ))}
        </div>

        {/* Previous Positions */}
        <h3 className="text-3xl font-bold tracking-tight mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Previous Positions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {previousPositions.map((position) => (
            <FlipCard
              key={position.title}
              front={
                <Card className="h-full p-6 bg-gradient-to-br from-card to-card/95 border-2 border-primary/10 hover:shadow-lg transition-all">
                  <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent break-words hyphens-auto">
                    {position.title}
                    {position.subtitle && (
                      <span className="text-xs font-light block">
                        {position.subtitle}
                      </span>
                    )}
                  </h3>
                  <p className="text-base text-muted-foreground">
                    {position.company}
                  </p>
                  <p className="text-sm text-muted-foreground/80">
                    {position.period}
                  </p>
                </Card>
              }
              back={
                <Card className="h-full p-6 bg-gradient-to-br from-card to-card/95 border-2 border-primary/10">
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    {position.highlights.map((highlight, index) => (
                      <li key={index} className="text-muted-foreground">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </Card>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
