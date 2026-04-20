import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const clientList = [
  "BirdieScope",
  "Harmon Solar",
  "2ALogic",
  "Utopia",
  "Davis Signs",
  "Ploom",
  "PayNearMe",
];

export default function Clients() {
  return (
    <section
      id="clients"
      className="py-24 px-4 bg-gradient-to-b from-background to-muted/50 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 transform">
          <div className="h-[30rem] w-[30rem] rounded-full bg-primary/5 blur-3xl" />
        </div>
      </div>

      <div className="container relative">
        <h2 className="text-4xl font-bold tracking-tight mb-12 text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Trusted By
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {clientList.map((client) => (
            <Card
              key={client}
              className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300"
            >
              <CardContent className="flex items-center justify-center p-6 h-full">
                <span className="text-xl font-semibold text-center text-primary/90">
                  {client}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Badge
            variant="outline"
            className="px-4 py-2 text-sm bg-primary/10 hover:bg-primary/20 border-primary/30"
          >
            And many more...
          </Badge>
        </div>
      </div>
    </section>
  );
}
