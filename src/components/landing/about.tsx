import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-muted-foreground">
              A leader of Information Technology strategies bringing innovative
              solutions to complex challenges. Subject Matter Expert in
              Salesforce platform areas including Sales Cloud, Financial
              Services Cloud, API integrations, and ETL applications.
            </p>
            <p className="text-lg text-muted-foreground">
              Specialist in Financial Services, Mortgage, Insurance, and EdTech
              domains, with a proven track record of delivering transformative
              solutions that drive business efficiency and growth.
            </p>
          </div>
          <Card className="flex-1 max-w-md bg-gradient-to-br from-card to-card/95 border-2 border-primary/10">
            <CardContent className="p-8 space-y-6">
              <Avatar className="h-32 w-32 ring-4 ring-primary/10">
                <AvatarImage src="headshot.jpg" alt="Morgan K. Reed" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Morgan K. Reed
                </h3>
                <p className="text-lg text-muted-foreground">
                  Technology Leader & Subject Matter Expert
                </p>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="text-xl">🎓</span> BS, Cybersecurity (NAU,
                  2025)
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-xl">💼</span> PreSales Engineering
                  Manager at The Fruth Group
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-xl">🌟</span> Certified Salesforce
                  Administrator & AI Associate
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
