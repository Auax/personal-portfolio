"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NavBar from "@/components/NavBar";
import RouteTransitionIn from "@/components/RouteTransitionIn";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { projects } from "@/lib/data";
import { useLocale } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPageContent() {
  const containerRef = useRef<HTMLElement>(null);
  const { messages, translateProject } = useLocale();

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
          const cardTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.08,
          });

          cardTimeline.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          });

          const image = card.querySelector<HTMLElement>(
            "[data-project-card-image]"
          );
          if (image) {
            cardTimeline.from(
              image,
              {
                filter: "blur(30px)",
                duration: 0.7,
                ease: "power3.out",
              },
              0
            );
          }

          const overlay = card.querySelector<HTMLElement>(
            "[data-project-card-overlay]"
          );
          if (overlay) {
            cardTimeline.from(
              overlay,
              {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
              },
              0.08
            );
          }
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
          {messages.projects.title}
        </h1>
        <p
          data-animate="fade-up"
          className="text-zinc-400 text-base md:text-lg mb-12 md:mb-16 max-w-xl"
        >
          {messages.projects.intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              {...translateProject(project)}
              featured={false}
              backTo="/projects"
            />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
