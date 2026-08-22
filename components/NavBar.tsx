"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { PhosphorIcon } from "@/components/PhosphorIcons";
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

const languageOptions: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

export default function NavBar({ onNavigate }: NavBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { locale, setLocale, messages } = useLocale();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState<
    "desktop" | "mobile" | null
  >(null);
  const isClosingRef = useRef(false);
  const links: NavLink[] = mainNavigationItems.map((link) => ({
    ...link,
    label: messages.nav[link.labelKey],
  }));
  const homeLink = links[0];
  const primaryLinks = links;
  const contactLink: NavLink = {
    ...contactNavigationItem,
    label: messages.nav[contactNavigationItem.labelKey],
  };
  const navigationLinks = [...links, contactLink];

  const languageSelector = (mobile = false) => {
    const menuKey = mobile ? "mobile" : "desktop";
    const menuId = `${menuKey}-language-menu`;
    const isOpen = languageMenuOpen === menuKey;

    return (
      <div
        data-language-menu
        className={`relative ${mobile ? "w-fit" : ""}`}
      >
        <button
          type="button"
          aria-label={messages.nav.language}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setLanguageMenuOpen(isOpen ? null : menuKey)}
          className={`inline-flex items-center gap-1.5 py-1 font-medium text-zinc-400 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
            mobile ? "text-sm" : "text-[13px]"
          }`}
        >
          {locale.toUpperCase()}
          <svg
            viewBox="0 0 12 12"
            aria-hidden="true"
            className={`h-3 w-3 text-zinc-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          >
            <path
              d="m3 4.5 3 3 3-3"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            id={menuId}
            role="menu"
            aria-label={messages.nav.language}
            className={`absolute z-20 min-w-36 overflow-hidden rounded-xl border border-white/10 bg-zinc-950/95 p-1 shadow-2xl shadow-black/40 backdrop-blur-xl ${
              mobile ? "bottom-full left-0 mb-3" : "right-0 top-full mt-3"
            }`}
          >
            {languageOptions.map((language) => {
              const isSelected = locale === language.value;

              return (
                <button
                  key={language.value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isSelected}
                  onClick={() => {
                    setLocale(language.value);
                    setLanguageMenuOpen(null);
                  }}
                  className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {language.label}
                  <PhosphorIcon
                    name="Check"
                    size={14}
                    weight="bold"
                    aria-hidden="true"
                    className={isSelected ? "text-white" : "opacity-0"}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!languageMenuOpen) return;

    const closeOnPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Element &&
        !event.target.closest("[data-language-menu]")
      ) {
        setLanguageMenuOpen(null);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLanguageMenuOpen(null);
    };

    document.addEventListener("pointerdown", closeOnPointerDown);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [languageMenuOpen]);

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
    setLanguageMenuOpen(null);

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
        className={`fixed top-0 inset-x-0 z-[80] px-6 transition-[background-color,border-color] duration-300 ${
          hasScrolled
            ? "border-b border-white/10 bg-black/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between">
          <Link
            href="/"
            aria-label={homeLink.label}
            className="text-2xl font-serif tracking-tight text-white"
            onClick={(event) => handleLinkClick(homeLink, event)}
          >
            Ibai Farina
          </Link>

          <div className="hidden sm:flex items-center gap-5 md:gap-7">
            {primaryLinks.map((link) => (
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
            <div className="ml-1 flex items-center gap-2">
              <a
                href={getNavigationHref(contactLink, pathname)}
                className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-black transition-colors hover:bg-white/85"
                onClick={(event) => handleLinkClick(contactLink, event)}
              >
                {contactLink.label}
              </a>
              <a
                href="https://github.com/ibaifarina"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-zinc-400 transition-[color,border-color,background-color] hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <PhosphorIcon
                  name="GithubLogo"
                  size={17}
                  weight="fill"
                  aria-hidden="true"
                />
              </a>
            </div>
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
            {navigationLinks.map((link) => (
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
