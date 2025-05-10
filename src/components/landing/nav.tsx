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
              className="transition-colors hover:text-primary hover:bg-secondary/20 px-3 py-1 rounded-md cursor-pointer"
              onClick={() => scrollToSection("about")}
              href="#about"
            >
              About
            </a>
            <a
              className="transition-colors hover:text-primary hover:bg-secondary/20 px-3 py-1 rounded-md cursor-pointer"
              onClick={() => scrollToSection("experience")}
              href="#experience"
            >
              Experience
            </a>
            <a
              className="transition-colors hover:text-primary hover:bg-secondary/20 px-3 py-1 rounded-md cursor-pointer"
              onClick={() => scrollToSection("projects")}
              href="#projects"
            >
              Projects
            </a>
            <a
              className="transition-colors hover:text-primary hover:bg-secondary/20 px-3 py-1 rounded-md cursor-pointer"
              onClick={() => scrollToSection("skills")}
              href="#skills"
            >
              Skills
            </a>
            <a
              className="transition-colors hover:text-primary hover:bg-secondary/20 px-3 py-1 rounded-md cursor-pointer"
              onClick={() => scrollToSection("contact")}
              href="#contact"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end"></div>
      </nav>
    </header>
  );
}
