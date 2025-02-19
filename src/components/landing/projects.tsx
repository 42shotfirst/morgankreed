import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
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
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500",
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
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
  },
  {
    title: "Data Warehouse Transformation",
    description:
      "Led an Agile Data Warehouse transformation resulting in a 90% reduction of database crashes",
    tech: ["Data Warehouse", "Agile", "Business Intelligence", "Analytics"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500",
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
        <h2 className="text-4xl font-bold tracking-tight mb-16 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="overflow-hidden bg-gradient-to-br from-card to-card/95 border-2 border-primary/10 transform transition-all hover:scale-[1.02] hover:shadow-lg"
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
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="px-3 py-1 bg-primary/10 hover:bg-primary/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
