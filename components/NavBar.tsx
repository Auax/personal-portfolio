"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { useLocale, type Locale } from "@/lib/i18n";
import {
  contactNavigationItem,
  getNavigationHref,
  mainNavigationItems,
  type NavigationItem,
} from "@/lib/navigation";

interface NavBarProps {
  onNavigate?: (id: string) => void;
}

type NavLink = NavigationItem & { label: string };

export default function NavBar({ onNavigate }: NavBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { locale, setLocale, messages } = useLocale();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isClosingRef = useRef(false);
  const links: NavLink[] = mainNavigationItems.map((link) => ({
    ...link,
    label: messages.nav[link.labelKey],
  }));
  const contactLink: NavLink = {
    ...contactNavigationItem,
    label: messages.nav[contactNavigationItem.labelKey],
  };

  const languageSelector = (mobile = false) => (
    <div
      className={`flex items-center rounded-full border border-white/15 p-0.5 ${mobile ? "w-fit" : ""}`}
      aria-label={messages.nav.language}
    >
      {(["en", "es"] as Locale[]).map((language) => (
        <button
          key={language}
          type="button"
          onClick={() => setLocale(language)}
          aria-pressed={locale === language}
          className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
            locale === language
              ? "bg-white text-black"
              : "text-zinc-500 hover:text-white"
          }`}
        >
          {language}
        </button>
      ))}
    </div>
  );

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

  const goToLink = (link: NavLink) => {
    if (link.type === "route") {
      if (link.href === pathname) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      router.push(link.href);
      return;
    }

    if (onNavigate && pathname === "/") {
      onNavigate(link.href);
      return;
    }

    router.push(`/#${link.href}`);
  };

  const shouldIntercept = (event: React.MouseEvent<HTMLAnchorElement>) =>
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey;

  const handleLinkClick = (
    link: NavLink,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (!shouldIntercept(event)) return;

    if (link.type === "route") {
      event.preventDefault();
      goToLink(link);
      return;
    }

    if (onNavigate && pathname === "/") {
      event.preventDefault();
      onNavigate(link.href);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-[80] transition-[background-color,border-color] duration-300 ${
          hasScrolled
            ? "border-b border-white/10 bg-black/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-0">
          <span className="text-xl font-serif tracking-tight text-white">
            Ibai.F
          </span>

          <div className="hidden sm:flex items-center gap-5 md:gap-7">
            {links.map((link) => (
              <a
                key={link.label}
                href={getNavigationHref(link, pathname)}
                className="text-[13px] font-medium text-zinc-400 transition-colors hover:text-white"
                onClick={(e) => handleLinkClick(link, e)}
              >
                {link.label}
              </a>
            ))}
            {languageSelector()}
            <a
              href={getNavigationHref(contactLink, pathname)}
              className="ml-1 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-black transition-colors hover:bg-white/85"
              onClick={(e) => handleLinkClick(contactLink, e)}
            >
              {contactLink.label}
            </a>
          </div>

          <button
            className="sm:hidden flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full"
            aria-label={menuOpen ? messages.nav.close : messages.nav.open}
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
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-sm flex flex-col items-start justify-end pb-16 sm:hidden"
        >
          <nav className="container mx-auto w-full flex flex-col gap-2">
            <div data-menu-link className="mb-5">
              {languageSelector(true)}
            </div>
            {[...links, contactLink].map((link) => (
              <a
                key={link.label}
                data-menu-link
                href={getNavigationHref(link, pathname)}
                className="text-5xl font-serif text-white py-2 border-b border-zinc-800 last:border-b-0"
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu(() => goToLink(link));
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
