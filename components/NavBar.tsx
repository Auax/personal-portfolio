"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface NavBarProps {
  onNavigate?: (id: string) => void;
}

const links = [
  { href: "projects", label: "My work" },
  { href: "experience", label: "Experience" },
  { href: "about", label: "About me" },
  { href: "contact", label: "Contact" },
] as const;

export default function NavBar({ onNavigate }: NavBarProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isClosingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    gsap.fromTo(
      "[data-menu-overlay]",
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" }
    );
    gsap.fromTo(
      "[data-menu-link]",
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.08,
      }
    );
  }, [menuOpen]);

  const closeMenu = (afterClose?: () => void) => {
    if (!menuOpen || isClosingRef.current) {
      afterClose?.();
      return;
    }

    isClosingRef.current = true;
    gsap.to("[data-menu-link]", {
      y: 16,
      opacity: 0,
      duration: 0.2,
      stagger: 0.03,
      ease: "power2.in",
    });
    gsap.to("[data-menu-overlay]", {
      opacity: 0,
      duration: 0.22,
      ease: "power2.inOut",
      onComplete: () => {
        setMenuOpen(false);
        isClosingRef.current = false;
        afterClose?.();
      },
    });
  };

  const navigate = (id: string) => {
    closeMenu(() => onNavigate?.(id));
  };

  return (
    <>
      <nav className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-[80] sm:container">
        <div
          className={`flex justify-between items-center mx-auto w-full px-8 sm:px-10 py-4 mt-0 sm:mt-4 sm:rounded-full transition-all duration-300 ${
            hasScrolled
              ? "backdrop-blur-md bg-black/40 border border-white/5"
              : "bg-transparent border border-transparent"
          }`}
        >
          <span className="text-lg font-semibold tracking-tight font-serif italic">
            IF
          </span>

          <div className="hidden sm:flex items-center gap-6 text-sm text-neutral-200">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={`#${href}`}
                className="hover:text-white transition-colors"
                onClick={(e) => {
                  if (!onNavigate) return;
                  e.preventDefault();
                  onNavigate(href);
                }}
              >
                {label}
              </a>
            ))}
          </div>

          <button
            className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => {
              if (menuOpen) {
                closeMenu();
              } else {
                setMenuOpen(true);
              }
            }}
          >
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          data-menu-overlay
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-sm flex flex-col items-start justify-end px-8 pb-16 sm:hidden"
        >
          <nav className="flex flex-col gap-2 w-full">
            {links.map(({ href, label }) => (
              <a
                key={href}
                data-menu-link
                href={`#${href}`}
                className="text-5xl font-serif text-white py-2 border-b border-zinc-800 last:border-b-0"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(href);
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
