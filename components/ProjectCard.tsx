"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

interface ProjectCardProps {
  slug: string;
  src: string;
  alt: string;
  title?: string;
  tags: readonly string[];
  featured?: boolean;
  className?: string;
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

export default function ProjectCard({ slug, src, alt, tags, featured = false, className = "", title = "" }: ProjectCardProps) {
  const router = useRouter();

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

    const page = document.querySelector("[data-page-transition]");
    if (!page) {
      router.push(`/projects/${slug}`);
      return;
    }

    gsap.to(page, {
      opacity: 0,
      y: -16,
      filter: "blur(10px)",
      duration: 0.35,
      ease: "power2.out",
      onComplete: () => router.push(`/projects/${slug}`),
    });
  };

  return (
    <Link
      href={`/projects/${slug}`}
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
        sizes="100vw"
        // sizes={featured ? "(max-width: 768px) 100vw, 100vw" : "(max-width: 768px) 100vw, 50vw"}
        quality={100}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className={`absolute ${featured ? "bottom-6 left-6" : "bottom-5 left-5"}`}>
        {title && <span className="text-lg font-medium">— {title}</span>}
        <TagList tags={tags} />
      </div>
    </Link>
  );
}
