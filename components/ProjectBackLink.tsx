"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSyncExternalStore } from "react";
import { useLocale } from "@/lib/i18n";

const PROJECT_BACK_KEY = "project-back";

function resolveBackHref(from: string | null): string {
  if (from === "/" || from === "/projects") return from;
  return "/projects";
}

export default function ProjectBackLink() {
  const searchParams = useSearchParams();
  const { messages } = useLocale();
  const fromParam = searchParams.get("from");
  const storedHref = useSyncExternalStore(
    () => () => undefined,
    () => resolveBackHref(sessionStorage.getItem(PROJECT_BACK_KEY)),
    () => "/projects"
  );
  const href =
    fromParam === "/" || fromParam === "/projects" ? fromParam : storedHref;

  return (
    <Link
      href={href}
      className="text-sm text-white/80 hover:text-white transition-colors"
    >
      &larr; {messages.project.back}
    </Link>
  );
}
