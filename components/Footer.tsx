"use client";

import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/i18n";
import {
  getNavigationHref,
  navigationItems,
  type NavigationItem,
} from "@/lib/navigation";

export default function Footer() {
  const pathname = usePathname();
  const { messages } = useLocale();

  const scrollTo = (target: number | Element, offset = 0) => {
    const lenis = (
      window as unknown as {
        __lenis?: {
          scrollTo: (
            target: number | Element,
            options?: { offset?: number; duration?: number },
          ) => void;
        };
      }
    ).__lenis;

    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.1 });
      return;
    }

    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavigationClick = (
    event: MouseEvent<HTMLAnchorElement>,
    link: NavigationItem,
  ) => {
    if (pathname !== "/") return;

    if (link.type === "route") {
      if (link.href !== "/") return;
      event.preventDefault();
      scrollTo(0);
      return;
    }

    const target = document.getElementById(link.href);
    if (!target) return;

    event.preventDefault();
    window.history.replaceState(null, "", `#${link.href}`);
    scrollTo(target, -96);
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
    <footer className="relative w-full overflow-hidden bg-black">
      <div className="container relative z-10 mx-auto pb-8 pt-16 md:pb-10 md:pt-24">
        <div className="border-t border-white/15 pt-8 md:pt-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6" data-animate="fade-up">
            <p className="max-w-sm text-xl leading-snug text-zinc-300 md:text-2xl">
              {messages.footer.intro}
            </p>
          </div>

          <div
            className="grid grid-cols-2 gap-8 md:col-span-5 md:col-start-8"
            data-animate="fade-up"
          >
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-zinc-600">
                {messages.footer.navigate}
              </p>
              <nav className="flex flex-col items-start gap-2.5">
                {navigationItems.map((link) => (
                  <a
                    key={link.labelKey}
                    href={getNavigationHref(link, pathname)}
                    onClick={(event) => handleNavigationClick(event, link)}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {messages.nav[link.labelKey]}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-zinc-600">
                {messages.footer.elsewhere}
              </p>
              <div className="flex flex-col items-start gap-2.5">
                {[
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/ibai-farina-del-olmo-3bb55b243/",
                    external: true,
                  },
                  {
                    label: "GitHub",
                    href: "https://github.com/ibaifarina",
                    external: true,
                  },
                  {
                    label: "ibaifo8@gmail.com",
                    href: "mailto:ibaifo8@gmail.com",
                    external: false,
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {social.label}
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
                ))}
              </div>
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
              {messages.footer.backToTop}
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
      </div>
    </footer>
  );
}
