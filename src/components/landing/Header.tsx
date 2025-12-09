import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useScrollDirection, useActiveSection, smoothScrollTo } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface HeaderProps {
  links?: Array<{ href: string; label: string }>;
  logoText?: string;
}

const Header = ({
  links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#results", label: "Results" },
    { href: "#expertise", label: "Expertise" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ],
  logoText = "Morgan K Reed",
}: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollDirection, isAtTop, isScrolled } = useScrollDirection(100);
  const activeSection = useActiveSection(links.map((l) => l.href.replace("#", "")));

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    smoothScrollTo(id, 80);
    setIsOpen(false);
  };

  const scrollToContact = () => {
    smoothScrollTo("contact", 80);
    setIsOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-300 ease-out",
        // Background states
        isAtTop
          ? "bg-transparent"
          : "glass-strong border-b border-border/50",
        // Scrolled state adds shadow
        isScrolled && !isAtTop && "header-scrolled",
        // Hide on scroll down (after threshold)
        scrollDirection === "down" && isScrolled
          ? "header-hidden"
          : "translate-y-0"
      )}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className={cn(
            "text-xl font-bold transition-colors duration-300",
            "text-foreground hover:text-primary"
          )}
        >
          {logoText}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {links.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "nav-link-animated text-sm font-medium",
                  isActive
                    ? "text-primary active"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </a>
            );
          })}
          <Button
            onClick={scrollToContact}
            className={cn(
              "btn-ripple",
              "bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            )}
          >
            Contact Me
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-foreground">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px] bg-background/98 backdrop-blur-lg border-border"
          >
            <div className="flex flex-col space-y-6 mt-8">
              {links.map((link, index) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "text-lg font-medium transition-all duration-300",
                      "transform translate-x-0",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground hover:translate-x-2"
                    )}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {link.label}
                  </a>
                );
              })}
              <Button
                onClick={scrollToContact}
                className={cn(
                  "w-full btn-ripple",
                  "bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                )}
              >
                Contact Me
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
