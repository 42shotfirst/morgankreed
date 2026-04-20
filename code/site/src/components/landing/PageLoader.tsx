import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PageLoaderProps {
  minDisplayTime?: number;
}

const PageLoader = ({ minDisplayTime = 500 }: PageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      // Ensure loader shows for minimum time for smooth UX
      setTimeout(() => {
        setIsFading(true);
        // Remove from DOM after fade animation
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }, minDisplayTime);
    };

    // Check if page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, [minDisplayTime]);

  if (!isLoading) return null;

  return (
    <div
      className={cn(
        "page-loader",
        isFading && "fade-out"
      )}
      aria-label="Loading"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="loader-spinner" />
        <p className="text-muted-foreground text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
