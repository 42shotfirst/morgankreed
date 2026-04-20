import React from "react";
import { Power } from "lucide-react";
import { cn } from "@/lib/utils";

// -----------------------------------------------------------------------------
// Logo — two variants
//
// `mark`: Just the power-button glyph. For tight spots like the header bar,
//         admin bar, and anywhere a compact brand mark belongs. Inherits
//         color from the surrounding element via `text-*` classes.
//
// `full`: "CT[power]" wordmark + "ON DEMAND" tagline beneath. For brand
//         moments — the hero eyebrow, the login page, and the footer
//         lockup. Also scales on font-size.
// -----------------------------------------------------------------------------

export interface LogoProps {
  variant?: "mark" | "full";
  /** Override stroke-width on the power glyph (default 2.5). */
  strokeWidth?: number;
  className?: string;
}

export function Logo({
  variant = "mark",
  strokeWidth = 2.5,
  className,
}: LogoProps) {
  if (variant === "mark") {
    return (
      <Power
        aria-label="CTO on Demand"
        strokeWidth={strokeWidth}
        className={cn("shrink-0", className)}
      />
    );
  }

  // Full lockup — the brand SVG (CT⏻ / ON DEMAND). Aspect ratio ~2.67:1,
  // so callers should set a height (e.g. `h-12 w-auto`) and the width follows.
  return (
    <img
      src="/logo.svg"
      alt="CTO on Demand"
      className={cn("select-none", className)}
      draggable={false}
    />
  );
}

export default Logo;
