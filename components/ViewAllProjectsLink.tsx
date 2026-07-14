"use client";

import Link from "next/link";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useLocale } from "@/lib/i18n";

export default function ViewAllProjectsLink() {
  const router = useRouter();
  const { messages } = useLocale();

  const navigateToProjects = () => {
    const lenis = (
      window as unknown as {
        __lenis?: {
          scrollTo: (
            target: number,
            options?: { immediate?: boolean; force?: boolean }
          ) => void;
        };
      }
    ).__lenis;

    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    router.push("/projects", { scroll: false });
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    sessionStorage.setItem("route-transition", "1");

    const page = document.querySelector("[data-page-transition]");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!page || prefersReducedMotion) {
      navigateToProjects();
      return;
    }

    gsap.to(page, {
      opacity: 0,
      y: -8,
      duration: 0.16,
      ease: "power2.in",
      overwrite: true,
      onComplete: () => {
        navigateToProjects();
        gsap.set(page, { clearProps: "opacity,transform,filter" });
      },
    });
  };

  return (
    <Link
      href="/projects"
      onClick={handleClick}
      className="inline-flex items-center justify-center rounded-full border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900/50 transition-colors text-white text-sm font-medium px-8 py-3"
    >
      {messages.projects.viewAll}
    </Link>
  );
}
