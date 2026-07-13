"use client";

import Image from "next/image";
import { Suspense, type ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectBackLink from "@/components/ProjectBackLink";
import RouteTransitionIn from "@/components/RouteTransitionIn";
import { PhosphorIcon } from "@/components/PhosphorIcons";
import Footer from "@/components/Footer";
import type { Project } from "@/lib/data";
import { useLocale } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailsContent({
  project,
  articleEn,
  articleEs,
}: {
  project: Project;
  articleEn?: ReactNode;
  articleEs?: ReactNode;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const { locale, messages, translateProject } = useLocale();
  const localizedProject = translateProject(project);
  const article = locale === "es" ? articleEs ?? articleEn : articleEn ?? articleEs;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const heroImage = containerRef.current?.querySelector<HTMLElement>(
        "[data-project-hero-image]"
      );
      const hero = heroImage?.parentElement;
      if (!heroImage || !hero) return;

      gsap.fromTo(
        heroImage,
        { yPercent: -3, scale: 1.05 },
        {
          yPercent: 7,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} data-page-transition className="min-h-screen bg-black text-white">
      <RouteTransitionIn />
      <nav className="fixed left-0 top-0 z-50 w-full px-8 py-6 md:px-16">
        <Suspense>
          <ProjectBackLink />
        </Suspense>
      </nav>

      <div className="relative h-[50vh] w-full overflow-hidden md:h-[65vh]">
        <Image
          data-project-hero-image
          src={localizedProject.src_detail}
          alt={localizedProject.alt}
          fill
          priority
          className="object-cover object-top opacity-70 will-change-transform"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto -mt-24 max-w-4xl px-8 pb-24 md:px-16">
        <header className="mb-12">
          <h1 className="mb-4 font-serif text-4xl md:text-6xl">
            {localizedProject.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-6">
            {localizedProject.github && (
              <a href={localizedProject.github} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-zinc-500 underline decoration-zinc-800 underline-offset-4 transition-colors hover:text-zinc-300 hover:decoration-zinc-500">
                GitHub
                <PhosphorIcon name="ArrowUpRight" weight="bold" size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
            {localizedProject.website && (
              <a href={localizedProject.website} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-zinc-500 underline decoration-zinc-800 underline-offset-4 transition-colors hover:text-zinc-300 hover:decoration-zinc-500">
                {messages.project.website}
                <PhosphorIcon name="ArrowUpRight" weight="bold" size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </header>

        <div className="mb-12 grid grid-cols-2 gap-8 border-b border-zinc-800 pb-8 md:grid-cols-[repeat(4,max-content)] md:justify-between md:gap-6">
          <div className="min-w-0">
            <h3 className="mb-1 text-xs uppercase tracking-wider text-zinc-500">{messages.project.year}</h3>
            <p className="text-sm text-zinc-200">{localizedProject.year}</p>
          </div>
          <div className="min-w-0">
            <h3 className="mb-1 text-xs uppercase tracking-wider text-zinc-500">{messages.project.role}</h3>
            <p className="text-sm text-zinc-200">{localizedProject.role}</p>
          </div>
          <div className="min-w-0">
            <h3 className="mb-1 text-xs uppercase tracking-wider text-zinc-500">{messages.project.stack}</h3>
            <p className="text-sm text-zinc-200">{localizedProject.stack.join(" · ")}</p>
          </div>
          <div className="min-w-0">
            <h3 className="mb-1 text-xs uppercase tracking-wider text-zinc-500">{messages.project.tags}</h3>
            <p className="text-sm text-zinc-200">{localizedProject.tags.join(" · ")}</p>
          </div>
        </div>

        {!article && (
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
            {localizedProject.description}
          </p>
        )}
        {article && (
          <div className="mt-16">{article}</div>
        )}
        <div className="mt-12 flex flex-wrap gap-4">
          {localizedProject.github && (
            <a href={localizedProject.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-neutral-300">
              GitHub
              <Image src="/icons/github/GitHub_Invertocat_Black.svg" alt="GitHub" width={20} height={20} />
            </a>
          )}
          {localizedProject.website && (
            <a href={localizedProject.website} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-neutral-300">
              {messages.project.website}
              <PhosphorIcon name="ArrowUpRight" weight="bold" size={20} className="transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
            </a>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
