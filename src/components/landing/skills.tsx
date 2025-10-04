import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    title: "Leadership & Management",
    skills: [
      "Digital Transformation",
      "PMO Leadership",
      "Global Teams",
      "Coaching and Mentoring",
      "Innovation and Design Thinking",
      "Budgeting and Planning",
    ],
  },
  {
    title: "Technical Expertise",
    skills: [
      "AI",
      "Mobile and Web App Development",
      "Salesforce SME",
      "Cloud Transformation",
      "Software Architecture",
      "Advanced Automation",
    ],
  },
  {
    title: "Methodologies & Frameworks",
    skills: [
      "Certified Scrum Master",
      "Certified Scrum Product Owner",
      "SAFe and Lean Mastery",
      "Agile Models",
      "DevOps",
      "Process Improvement",
    ],
  },
  {
    title: "Compliance & Security",
    skills: [
      "SOC Certified Auditor",
      "PCI Certified Auditor",
      "Cyber Security",
      "FINRA/SEC Compliance",
      "NIST",
      "Article 7 Strategy",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 transform">
          <div className="h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-3xl" />
        </div>
      </div>

      <div className="container relative">
        <h2 className="text-4xl font-bold tracking-tight mb-16 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <Card
              key={category.title}
              className="bg-gradient-to-br from-card to-card/95 border-2 border-primary/10 transform transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-4 py-2 text-base bg-primary/10 hover:bg-primary/20"
                    >
                      {skill}
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
