import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.15, triggerOnce = true, rootMargin = "0px 0px -50px 0px" } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Add is-visible class for CSS-based animations
          element.classList.add("is-visible");
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
          element.classList.remove("is-visible");
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, triggerOnce, rootMargin]);

  return { ref, isVisible };
}

// Easing functions
const easings = {
  easeOutExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};

interface UseCountUpOptions {
  duration?: number;
  startOnView?: boolean;
  delay?: number;
  easing?: keyof typeof easings;
  formatNumber?: boolean;
}

export function useCountUp(target: number, options: UseCountUpOptions = {}) {
  const {
    duration = 2000,
    startOnView = true,
    delay = 0,
    easing = "easeOutExpo",
    formatNumber = true,
  } = options;
  const [count, setCount] = useState(0);
  const [displayValue, setDisplayValue] = useState("0");
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const formatNumberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const startCounting = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    const startTime = Date.now() + delay;
    const endTime = startTime + duration;
    const easingFn = easings[easing];

    const updateCount = () => {
      const now = Date.now();
      if (now < startTime) {
        requestAnimationFrame(updateCount);
        return;
      }

      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFn(progress);
      const currentCount = Math.round(target * easedProgress);

      setCount(currentCount);
      setDisplayValue(
        formatNumber ? formatNumberWithCommas(currentCount) : currentCount.toString()
      );

      if (now < endTime) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
        setDisplayValue(
          formatNumber ? formatNumberWithCommas(target) : target.toString()
        );
      }
    };

    requestAnimationFrame(updateCount);
  }, [target, duration, delay, hasStarted, easing, formatNumber]);

  useEffect(() => {
    if (!startOnView) {
      startCounting();
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounting();
          observer.unobserve(element);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [startOnView, startCounting]);

  return { ref, count, displayValue };
}

// Hook for detecting scroll direction (useful for header show/hide)
export function useScrollDirection(scrollThreshold = 100) {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";

      // Only update direction if scroll difference is significant
      if (
        direction !== scrollDirection &&
        Math.abs(scrollY - lastScrollY) > 10
      ) {
        setScrollDirection(direction);
      }

      // Only hide header after scrolling past threshold
      setIsAtTop(scrollY < 50);
      setIsScrolled(scrollY > scrollThreshold);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDirection, scrollThreshold]);

  return { scrollDirection, isAtTop, isScrolled };
}

// Hook for detecting active section based on scroll position
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-100px 0px -66%",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds]);

  return activeSection;
}

// Hook for parallax effect
export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return ref;
}

// Hook for staggered children animations
export function useStaggeredAnimation(
  itemCount: number,
  baseDelay = 100,
  options: UseScrollAnimationOptions = {}
) {
  const { ref, isVisible } = useScrollAnimation(options);

  const getStaggerDelay = (index: number) => ({
    transitionDelay: `${baseDelay * index}ms`,
  });

  const getStaggerClass = (index: number) =>
    `stagger-${Math.min(index + 1, 5)}`;

  return { ref, isVisible, getStaggerDelay, getStaggerClass };
}

// Smooth scroll utility
export function smoothScrollTo(targetId: string, offset = 80) {
  const element = document.getElementById(targetId);
  if (!element) return;

  const targetPosition = element.offsetTop - offset;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
}

// Check if user prefers reduced motion
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}
