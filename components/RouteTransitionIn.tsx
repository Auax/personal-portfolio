"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";

export default function RouteTransitionIn() {
  useLayoutEffect(() => {
    const shouldAnimate = sessionStorage.getItem("route-transition") === "1";
    if (!shouldAnimate) return;

    sessionStorage.removeItem("route-transition");

    const page = document.querySelector("[data-page-transition]");
    if (!page) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(page, { clearProps: "opacity,transform,filter" });
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        page,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          clearProps: "opacity,transform,filter",
        }
      );
    });

    return () => context.revert();
  }, []);

  return null;
}
