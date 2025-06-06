import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const newProjects = [
  {
    title: "ScrAIper",
    description:
      "A web program designed to help users find, download, and format info from websites. Unlike other applications, ScrAIper not only requires no code knowledge, but gets smarter over time as you train it.",
    tech: ["AI", "Web Scraping", "Data Extraction", "No-Code"],
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
  },
  {
    title: "Fuzzy Match",
    description:
      "Have imperfect data? No problem! Plug different data feeds from multiple sources and train our interface to match and merge the correct data, ignoring mistakes. Works with data files, API feeds, and Databases alike.",
    tech: ["Data Matching", "Machine Learning", "Data Integration", "ETL"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "Coming Soon",
    description: "Info coming soon",
    tech: [],
    image:
      "https://images.unsplash.com/photo-1496262967815-132206202600?w=800&q=80",
  },
];

interface SpecialProject {
  title: string;
  company: string;
  highlights: string[];
}

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

const existingProjects = [
  {
    title: "Insurance Self-Service Platform",
    description:
      "Created a Customer Self Service app that significantly reduced policy change processing time while cutting labor costs",
    tech: [
      "Salesforce",
      "API Integration",
      "Process Automation",
      "Customer Portal",
    ],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/AAA_logo.svg/1200px-AAA_logo.svg.png",
  },
  {
    title: "Automated Home Purchase System",
    description:
      "Automated the home purchase process across enterprise technologies, reducing asset acquisition time from weeks to hours",
    tech: [
      "Salesforce",
      "API Integration",
      "Workflow Automation",
      "Real Estate Tech",
    ],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Progress_Residential_logo.svg/2560px-Progress_Residential_logo.svg.png",
  },
  {
    title: "Data Warehouse Transformation",
    description:
      "Led an Agile Data Warehouse transformation resulting in a 90% reduction of database crashes",
    tech: ["Data Warehouse", "Agile", "Business Intelligence", "Analytics"],
    logo: "https://www.triwest.com/content/dam/triwest/images/logo/triwest-logo.png",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-32 px-4 bg-gradient-to-b from-muted/80 to-background relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 transform">
          <div className="h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-3xl" />
        </div>
      </div>

      <div className="container relative">
        <h2 className="text-4xl font-bold tracking-tight mb-6 text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
          Explore some of my recent work delivering innovative solutions across
          various industries
        </p>

        {/* New Projects Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {newProjects.map((project) => (
            <Card
              key={project.title}
              className="overflow-hidden bg-gradient-to-br from-card to-card/95 border-2 border-primary/10 transform transition-all hover:scale-[1.02] hover:shadow-xl shadow-lg shadow-primary/5 flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="px-3 py-1 bg-primary/10 hover:bg-primary/20 border-primary/30"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Existing Projects Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {existingProjects.map((project) => (
            <Card
              key={project.title}
              className="overflow-hidden bg-gradient-to-br from-card to-card/95 border-2 border-primary/10 transform transition-all hover:scale-[1.02] hover:shadow-xl shadow-lg shadow-primary/5 flex flex-col"
            >
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="px-3 py-1 bg-primary/10 hover:bg-primary/20 border-primary/30"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Special Projects */}
        <h3 className="text-3xl font-bold tracking-tight mt-16 mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
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
