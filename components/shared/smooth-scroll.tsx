"use client";

import { useEffect, useRef } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Dynamic import untuk avoid SSR issue
    const initLenis = async () => {
      const { default: Lenis } = await import("lenis");

      const lenis = new Lenis({
        duration: 1.2, // PayBox-style: cukup smooth tapi tidak lambat
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential out (seperti PayBox)
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.95, // sedikit lebih lambat dari default
        touchMultiplier: 1.5,
        infinite: false,
      });

      lenisRef.current = lenis;

      // RAF loop
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Smooth scroll untuk semua anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          const href = anchor.getAttribute("href");
          if (href && href !== "#") {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              lenis.scrollTo(target as HTMLElement, { offset: -100 });
            }
          }
        });
      });
    };

    initLenis();

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return children;
}
