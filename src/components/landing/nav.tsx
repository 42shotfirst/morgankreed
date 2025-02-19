import { Button } from "@/components/ui/button";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              Morgan K. Reed
            </span>
          </a>
          <div className="flex gap-6 text-sm">
            <a
              className="transition-colors hover:text-foreground/80"
              onClick={() => scrollToSection("about")}
              href="#about"
              className="cursor-pointer"
            >
              About
            </a>
            <a
              className="transition-colors hover:text-foreground/80"
              onClick={() => scrollToSection("projects")}
              href="#projects"
              className="cursor-pointer"
            >
              Projects
            </a>
            <a
              className="transition-colors hover:text-foreground/80"
              onClick={() => scrollToSection("skills")}
              href="#skills"
              className="cursor-pointer"
            >
              Skills
            </a>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button variant="ghost" className="px-2">
            Contact
          </Button>
        </div>
      </nav>
    </header>
  );
}
