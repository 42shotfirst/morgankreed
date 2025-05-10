import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/25 z-10"></div>
        <img
          src="/images/nordwood-themes-kRNZiGKtz48-unsplash.jpg"
          alt="Technology Leadership"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-[85rem] text-center space-y-8 z-20">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl text-[#00a2ff]">
            Technology Leadership That Scales With Your Business
          </h1>
          <h2 className="text-3xl sm:text-4xl font-semibold">
            <span className="text-[#0080ff]">Fractional CIO</span> |{" "}
            <span className="text-[#0047ff]">AI Implementation Expert</span> |{" "}
            <span className="text-[#00a2ff]">Technology Strategist</span>
          </h2>
        </div>

        <p className="text-lg sm:text-xl leading-8 text-[#0047ff] max-w-3xl mx-auto">
          Empowering small businesses to leverage enterprise-grade technology
          solutions through strategic guidance, custom applications, and
          practical AI implementation. Translating complex tech into competitive
          advantage without the enterprise price tag.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
          <Button
            size="lg"
            className="text-lg px-8 py-6 w-full sm:w-auto bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90"
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
            className="text-lg px-8 py-6 w-full sm:w-auto border-primary/30 hover:border-primary/60"
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-primary/60" />
      </div>
    </div>
  );
}
