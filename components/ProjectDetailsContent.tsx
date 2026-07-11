"use client";

import Image from "next/image";
import { Suspense } from "react";
import ProjectBackLink from "@/components/ProjectBackLink";
import RouteTransitionIn from "@/components/RouteTransitionIn";
import { PhosphorIcon } from "@/components/PhosphorIcons";
import Footer from "@/components/Footer";
import type { Project } from "@/lib/data";
import { useLocale } from "@/lib/i18n";

export default function ProjectDetailsContent({ project }: { project: Project }) {
  const { messages, translateProject } = useLocale();
  const localizedProject = translateProject(project);

  return (
    <main data-page-transition className="min-h-screen bg-black text-white">
      <RouteTransitionIn />
      <nav className="fixed left-0 top-0 z-50 w-full px-8 py-6 md:px-16">
        <Suspense>
          <ProjectBackLink />
        </Suspense>
      </nav>

      <div className="relative h-[50vh] w-full md:h-[65vh]">
        <Image
          src={localizedProject.src_detail}
          alt={localizedProject.alt}
          fill
          priority
          className="object-cover object-top opacity-70"
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
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
            {localizedProject.tags.map((tag, index) => (
              <span key={tag} className="flex items-center gap-3">
                {index > 0 && <span className="h-1 w-1 rounded-full bg-zinc-600" />}
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mb-12 grid grid-cols-2 gap-8 border-t border-zinc-800 pt-8 md:grid-cols-3">
          <div>
            <h3 className="mb-1 text-xs uppercase tracking-wider text-zinc-500">{messages.project.year}</h3>
            <p className="text-sm text-zinc-200">{localizedProject.year}</p>
          </div>
          <div>
            <h3 className="mb-1 text-xs uppercase tracking-wider text-zinc-500">{messages.project.role}</h3>
            <p className="text-sm text-zinc-200">{localizedProject.role}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-1 text-xs uppercase tracking-wider text-zinc-500">{messages.project.stack}</h3>
            <p className="text-sm text-zinc-200">{localizedProject.stack.join(" · ")}</p>
          </div>
        </div>

        <p className="max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
          {localizedProject.description}
        </p>
        <div className="mt-8 flex gap-4">
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
