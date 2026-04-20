import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  useScrollDirection,
  useActiveSection,
  smoothScrollTo,
} from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface HeaderProps {
  links?: Array<{ href: string; label: string }>;
  firmName?: string;
}

const Header = ({
  links = [
    { href: "#engagements", label: "Engagements" },
    { href: "#operator", label: "Operator" },
    { href: "#track-record", label: "Track Record" },
    { href: "#media", label: "Media" },
    { href: "#writing", label: "Writing" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ],
  firmName = "cto-on-demand",
}: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollDirection, isAtTop, isScrolled } = useScrollDirection(100);
  const activeSection = useActiveSection(
    links.map((l) => l.href.replace("#", ""))
  );

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
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
        isAtTop ? "bg-transparent" : "glass-strong border-b border-border/50",
        isScrolled && !isAtTop && "header-scrolled",
        scrollDirection === "down" && isScrolled
          ? "header-hidden"
          : "translate-y-0"
      )}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className={cn(
            "flex items-center gap-2 transition-colors duration-300",
            "text-foreground hover:text-primary group"
          )}
          aria-label="CTO on Demand, Inc. — home"
        >
          <span
            className="text-primary font-mono text-base leading-none group-hover:animate-pulse"
            aria-hidden="true"
          >
            ▮
          </span>
          <span className="font-mono text-base font-medium tracking-tight">
            {firmName}
            <span className="text-muted-foreground">.inc</span>
          </span>
        </a>

        {/* Desktop Navigation — shown at xl+ now since the link list is longer */}
        <nav className="hidden xl:flex items-center space-x-7">
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
            Book a call
          </Button>
        </nav>

        {/* Mobile Navigation — open below xl so tablets use drawer */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px] bg-background/98 backdrop-blur-lg border-border"
          >
            <div className="flex flex-col space-y-6 mt-8">
              <div className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground pb-2 border-b border-border/50">
                ▮ {firmName}.inc
              </div>
              {links.map((link, index) => {
                const isActive =
                  activeSection === link.href.replace("#", "");
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
                Book a call
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
