"use client";

import Link from "next/link";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function ViewAllProjectsLink() {
  const router = useRouter();

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
    if (!page) {
      router.push("/projects");
      return;
    }

    gsap.to(page, {
      opacity: 0,
      y: -16,
      filter: "blur(10px)",
      duration: 0.35,
      ease: "power2.out",
      onComplete: () => router.push("/projects"),
    });
  };

  return (
    <Link
      href="/projects"
      onClick={handleClick}
      className="inline-flex items-center justify-center rounded-full border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900/50 transition-colors text-white text-sm font-medium px-8 py-3"
    >
      View all projects
    </Link>
  );
}
