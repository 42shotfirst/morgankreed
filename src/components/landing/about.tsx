import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const skills = [
  "AI Implementation",
  "Custom Software",
  "Salesforce",
  "Digital Transformation",
  "Cloud Solutions",
  "IT Strategy",
  "Project Management",
  "API Integration",
  "Process Automation",
  "Cybersecurity",
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

export default function About() {
  return (
    <section
      id="about"
      className="py-32 px-4 bg-gradient-to-b from-muted/80 to-background relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 transform">
          <div className="h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-3xl" />
        </div>
      </div>

      <div className="container relative">
        <h2 className="text-4xl font-bold tracking-tight mb-16 text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          About Me
        </h2>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <Card className="flex-1 max-w-md bg-gradient-to-br from-card to-card/95 border-2 border-primary/10 shadow-lg shadow-primary/5">
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-center">
                <Avatar className="h-40 w-40 ring-4 ring-primary/20">
                  <AvatarImage
                    src="/images/MR Headshot 2022.PNG"
                    alt="Morgan K. Reed"
                    className="object-cover object-top"
                  />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Morgan K. Reed
                </h3>
                <p className="text-lg text-muted-foreground">
                  Technology Leader & Subject Matter Expert
                </p>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="text-xl">💻</span> Fractional CIO/IT
                  Consultant, AI Specialist
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-xl">📚</span> Instructor, Coach, and
                  Author
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-xl">🔒</span> Cybersecurity SME
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex-1 space-y-8">
            <div className="space-y-6">
              <p className="text-muted-foreground mb-6">
                I am a strategic technology leader who transforms digital
                ecosystems into competitive advantage. At American Express,
                USAA, and other leading institutions, I've consistently
                delivered secure, compliant solutions that drive measurable
                business value. I excel at navigating complex regulatory
                environments while accelerating digital innovation. My
                leadership converts IT from cost center to growth engine,
                creating resilient platforms that enhance customer experience
                while safeguarding critical data. I build high-performing teams
                that execute flawlessly, balancing technological ambition with
                pragmatic governance to deliver what matters: results that
                strengthen the bottom line.
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <span className="font-semibold text-primary/90">
                      Fractional CIO
                    </span>{" "}
                    - Strategic technology leadership without the full-time
                    commitment
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <span className="font-semibold text-primary/90">
                      AI Implementation Specialist
                    </span>{" "}
                    - Practical artificial intelligence solutions tailored for
                    small businesses
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <span className="font-semibold text-primary/90">
                      Technology Coach
                    </span>{" "}
                    - Personalized guidance helping businesses leverage modern
                    tech effectively
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <span className="font-semibold text-primary/90">
                      Custom Application Developer
                    </span>{" "}
                    - Bespoke software solutions designed for your specific
                    needs
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <span className="font-semibold text-primary/90">
                      Cybersecurity Consultant
                    </span>{" "}
                    - Protection strategies for your business's most valuable
                    digital assets
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <span className="font-semibold text-primary/90">
                      Cloud Software Expert
                    </span>{" "}
                    - Maximizing efficiency through optimal cloud infrastructure
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary/90">
                Core Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/20 border-primary/30"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
