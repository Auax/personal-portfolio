"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PROJECT_BACK_KEY = "project-back";

function resolveBackHref(from: string | null): string {
  if (from === "/" || from === "/projects") return from;
  return "/projects";
}

export default function ProjectBackLink() {
  const searchParams = useSearchParams();
  const [href, setHref] = useState(() =>
    resolveBackHref(searchParams.get("from"))
  );

  useEffect(() => {
    const fromParam = searchParams.get("from");
    if (fromParam === "/" || fromParam === "/projects") {
      setHref(fromParam);
      return;
    }

    const stored = sessionStorage.getItem(PROJECT_BACK_KEY);
    setHref(resolveBackHref(stored));
  }, [searchParams]);

  return (
    <Link
      href={href}
      className="text-sm text-white/80 hover:text-white transition-colors"
    >
      &larr; Back
    </Link>
  );
}
