"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function RouteTransitionIn() {
  useEffect(() => {
    const shouldAnimate = sessionStorage.getItem("route-transition") === "1";
    if (!shouldAnimate) return;

    sessionStorage.removeItem("route-transition");

    const page = document.querySelector("[data-page-transition]");
    if (!page) return;

    gsap.fromTo(
      page,
      { opacity: 0, y: 16, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "power2.out" }
    );
  }, []);

  return null;
}
