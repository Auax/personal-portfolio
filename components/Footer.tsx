"use client";

import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";

const footerLinks = [
  { label: "Home", href: "#hero-text", route: "/" },
  { label: "Work", href: "#projects", route: "/projects" },
  { label: "Experience", href: "#experience", route: "/" },
  { label: "About", href: "#about", route: "/" },
  { label: "Contact", href: "#contact", route: "/" },
] as const;

export default function Footer() {
  const pathname = usePathname();

  const getFooterHref = (link: (typeof footerLinks)[number]) => {
    if (link.route === "/projects") return "/projects";
    return pathname === "/" ? link.href : `/${link.href}`;
  };

  const scrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (target: number, options?: unknown) => void };
      }
    ).__lenis;

    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="container mx-auto w-full pb-8 pt-16 md:pb-10 md:pt-24">
      <div className="border-t border-white/15 pt-8 md:pt-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6" data-animate="fade-up">
            <p className="max-w-sm text-xl leading-snug text-zinc-300 md:text-2xl">
              Full-stack developer creating thoughtful digital experiences from
              Barcelona.
            </p>
          </div>

          <div
            className="grid grid-cols-2 gap-8 md:col-span-5 md:col-start-8"
            data-animate="fade-up"
          >
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-zinc-600">
                Navigate
              </p>
              <nav className="flex flex-col items-start gap-2.5">
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={getFooterHref(link)}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-zinc-600">
                Elsewhere
              </p>
              <a
                href="https://github.com/auax"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
              >
                GitHub
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  fill="none"
                >
                  <path
                    d="M4 12 12 4M6 4h6v6"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <p
          aria-label="Ibai Farina"
          data-animate="fade-up"
          className="mt-20 overflow-hidden whitespace-nowrap font-serif text-[15vw] leading-[0.72] tracking-[-0.055em] text-white md:mt-28"
        >
          Ibai Farina
        </p>

        <div className="mt-8 flex items-end justify-between border-t border-white/10 pt-5 text-xs text-zinc-600 md:mt-10">
          <p>© {new Date().getFullYear()} Ibai Farina</p>
          <a
            href="#hero-text"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            Back to top
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
            >
              <path
                d="m4.5 7.5 3.5-3.5 3.5 3.5M8 4v8"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
