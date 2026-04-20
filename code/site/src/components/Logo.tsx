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

  // Full lockup — render inline so text aligns with the glyph baseline.
  return (
    <span
      aria-label="CTO on Demand"
      className={cn("inline-flex flex-col items-center leading-none", className)}
    >
      <span className="inline-flex items-center font-bold tracking-tight text-[1.5em]">
        <span>CT</span>
        <Power
          aria-hidden="true"
          strokeWidth={strokeWidth}
          className="h-[1em] w-[1em] mx-[0.05em]"
        />
      </span>
      <span className="mt-1 text-[0.45em] tracking-[0.35em] uppercase text-muted-foreground">
        On Demand
      </span>
    </span>
  );
}

export default Logo;
