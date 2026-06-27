"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NavBar from "@/components/NavBar";
import RouteTransitionIn from "@/components/RouteTransitionIn";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPageContent() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from("[data-animate='section-heading']", {
        y: 30,
        opacity: 0,
        filter: "blur(30px)",
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from("[data-animate='fade-up']", {
        y: 30,
        opacity: 0,
        filter: "blur(30px)",
        duration: 0.7,
        delay: 0.12,
        ease: "power3.out",
      });

      gsap.utils
        .toArray<HTMLElement>("[data-animate='project-card']")
        .forEach((card, i) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            y: 60,
            opacity: 0,
            filter: "blur(30px)",
            duration: 0.7,
            delay: i * 0.08,
            ease: "power3.out",
          });
        });
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      data-page-transition
      className="min-h-screen bg-black text-white"
    >
      <RouteTransitionIn />
      <NavBar />

      <section className="w-full container mx-auto pt-32 pb-24 md:pb-32">
        <h1
          data-animate="section-heading"
          className="text-5xl md:text-7xl font-serif mb-4"
        >
          Projects
        </h1>
        <p
          data-animate="fade-up"
          className="text-zinc-400 text-base md:text-lg mb-12 md:mb-16 max-w-xl"
        >
          A collection of work across design, development, and product.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} featured={false} />
          ))}
        </div>
      </section>
    </main>
  );
}
