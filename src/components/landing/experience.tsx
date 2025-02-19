import { useState } from "react";
import { Card } from "@/components/ui/card";

interface Position {
  title: string;
  company: string;
  period: string;
  highlights: string[];
}

interface SpecialProject {
  title: string;
  company: string;
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
    title: "Director of Technology",
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
    title: "Senior Project Manager",
    company: "Harmon Solar",
    period: "January 2019 - September 2019",
    highlights: [
      "Led digital transformation initiatives",
      "Implemented Salesforce platform",
      "Improved operational efficiency by 35%",
    ],
  },
  {
    title: "Technology Program Manager",
    company: "Vanguard",
    period: "March 2018 - January 2019",
    highlights: [
      "Managed $10M+ technology programs",
      "Led cloud migration initiatives",
      "Reduced system downtime by 40%",
    ],
  },
  {
    title: "IT Project Manager",
    company: "American Express",
    period: "June 2017 - March 2018",
    highlights: [
      "Delivered enterprise-scale projects",
      "Implemented security protocols",
      "Optimized IT infrastructure",
    ],
  },
  {
    title: "Technical Project Lead",
    company: "Wells Fargo",
    period: "January 2016 - June 2017",
    highlights: [
      "Led development team of 15",
      "Modernized legacy systems",
      "Improved deployment processes",
    ],
  },
];

const specialProjects: SpecialProject[] = [
  {
    title: "CIO",
    company: "Birdiescope",
    highlights: [
      "Led digital transformation initiatives",
      "Implemented cloud-first strategy",
      "Established IT governance framework",
    ],
  },
  {
    title: "E-Commerce Consultant",
    company: "Private Client",
    highlights: [
      "Optimized online sales platform",
      "Integrated payment systems",
      "Improved customer experience",
    ],
  },
  {
    title: "AI Instructor",
    company: "Learn Good Things",
    highlights: [
      "Developed AI curriculum",
      "Trained professionals in AI implementation",
      "Created hands-on workshops",
    ],
  },
  {
    title: "Salesforce Architect",
    company: "Harmon Solar",
    highlights: [
      "Designed custom Salesforce solutions",
      "Integrated third-party systems",
      "Optimized business processes",
    ],
  },
  {
    title: "Web Software Architect",
    company: "Universal Liaison",
    highlights: [
      "Led web application development",
      "Implemented microservices architecture",
      "Improved system performance",
    ],
  },
  {
    title: "SOC and Security Auditor",
    company: "Private Client",
    highlights: [
      "Conducted security assessments",
      "Implemented security controls",
      "Provided compliance guidance",
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
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {position.title}
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

        {/* Special Projects */}
        <h3 className="text-3xl font-bold tracking-tight mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Special Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialProjects.map((project) => (
            <FlipCard
              key={project.title}
              front={
                <Card className="h-full p-6 bg-gradient-to-br from-card to-card/95 border-2 border-primary/10 hover:shadow-lg transition-all">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {project.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {project.company}
                  </p>
                </Card>
              }
              back={
                <Card className="h-full p-6 bg-gradient-to-br from-card to-card/95 border-2 border-primary/10">
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    {project.highlights.map((highlight, index) => (
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
