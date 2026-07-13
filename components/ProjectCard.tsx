"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const PROJECT_BACK_KEY = "project-back";

interface ProjectCardProps {
  slug: string;
  src: string;
  alt: string;
  title?: string;
  tags: readonly string[];
  featured?: boolean;
  className?: string;
  backTo?: string;
}

function TagList({ tags }: { tags: readonly string[] }) {
  return (
    <div className="flex items-center gap-2 text-sm text-zinc-300">
      {tags.map((tag, i) => (
        <span key={tag} className="flex items-center gap-2">
          {i > 0 && <span className="w-1 h-1 rounded-full bg-zinc-400" />}
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function ProjectCard({
  slug,
  src,
  alt,
  tags,
  featured = false,
  className = "",
  title = "",
  backTo = "/projects",
}: ProjectCardProps) {
  const router = useRouter();
  const projectHref = `/projects/${slug}?from=${encodeURIComponent(backTo)}`;

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>) => {
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
    sessionStorage.setItem(PROJECT_BACK_KEY, backTo);

    const page = document.querySelector("[data-page-transition]");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!page || prefersReducedMotion) {
      router.push(projectHref);
      return;
    }

    gsap.to(page, {
      opacity: 0,
      y: -8,
      duration: 0.16,
      ease: "power2.in",
      overwrite: true,
      onComplete: () => {
        router.push(projectHref);
        gsap.set(page, { clearProps: "opacity,transform,filter" });
      },
    });
  };

  return (
    <Link
      href={projectHref}
      onClick={handleNavigate}
      data-animate={featured ? "featured-project" : "project-card"}
      className={`relative rounded-2xl overflow-hidden group block cursor-pointer ${
        featured ? "w-full md:aspect-[16/8] aspect-[4/3]" : "aspect-[4/3]"
      } ${className}`}
    >
      <Image
        priority
        src={src}
        alt={alt}
        fill
        sizes="50vw"
        // sizes={featured ? "(max-width: 768px) 100vw, 100vw" : "(max-width: 768px) 100vw, 50vw"}
        quality={100}
        unoptimized
        className="object-cover object-center scale-[1.02] transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className={`absolute ${featured ? "bottom-6 left-6" : "bottom-5 left-5"}`}>
        {title && <span className="text-lg font-medium">— {title}</span>}
        <TagList tags={tags} />
      </div>
    </Link>
  );
}
