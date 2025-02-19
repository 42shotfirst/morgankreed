import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative flex min-h-[85vh] flex-col items-center justify-center bg-gradient-to-b from-background to-background/95 px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 transform">
          <div className="h-[50rem] w-[50rem] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="absolute -bottom-1/2 right-1/2 translate-x-1/2 transform">
          <div className="h-[50rem] w-[50rem] rounded-full bg-primary/5 blur-3xl" />
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full max-w-[85rem] text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Digital Transformation Leader
          </h1>
          <div className="flex justify-center gap-x-3 text-lg sm:text-xl font-semibold text-muted-foreground">
            <span>Strategy Expert</span>
            <span className="text-primary">|</span>
            <span>IT Operations</span>
            <span className="text-primary">|</span>
            <span>Trusted Advisor</span>
          </div>
        </div>

        <p className="text-lg sm:text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
          Driving innovative solutions for cloud digital transformations,
          implementing best practices for applications, cloud platforms, and
          cyber security.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            size="lg"
            className="text-lg px-8 py-6"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Projects <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Contact Me
          </Button>
        </div>
      </div>
    </div>
  );
}
