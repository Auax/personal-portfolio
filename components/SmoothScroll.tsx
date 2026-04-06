"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.7,
      smoothWheel: true,
    });

    let rafId = 0;
    const onFrame = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(onFrame);
    };

    rafId = requestAnimationFrame(onFrame);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
