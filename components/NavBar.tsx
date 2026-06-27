"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

interface NavBarProps {
  onNavigate?: (id: string) => void;
}

type NavLink =
  | { label: string; href: string; type: "route" }
  | { label: string; href: string; type: "section" };

const links: NavLink[] = [
  { label: "Home", href: "/", type: "route" },
  { label: "My work", href: "/projects", type: "route" },
  { label: "Experience", href: "experience", type: "section" },
  { label: "About me", href: "about", type: "section" },
];

const contactLink: NavLink = {
  label: "Contact",
  href: "contact",
  type: "section",
};

export default function NavBar({ onNavigate }: NavBarProps) {
  const router = useRouter();
  const pathname = usePathname();
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

  const getHref = (link: NavLink) => {
    if (link.type === "route") return link.href;
    return pathname === "/" ? `#${link.href}` : `/#${link.href}`;
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
      <nav className="fixed top-0 inset-x-0 z-[80] pointer-events-none">
        <div className="container mx-auto w-full pt-4 sm:pt-5 pointer-events-auto">
          <div
            className={`w-full flex justify-between items-center rounded-full py-1.5 pl-4 pr-2 sm:py-2 transition-all duration-300 ${
              hasScrolled
                ? "backdrop-blur-md bg-black/40 border border-white/5"
                : "bg-transparent border border-transparent"
            }`}
          >
            <span className="text-sm sm:text-lg font-semibold font-serif tracking-tight">
              Ibai.F
            </span>

            <div className="hidden sm:flex items-center gap-6 md:gap-8">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={getHref(link)}
                  className="text-sm text-neutral-200 hover:text-white transition-colors"
                  onClick={(e) => handleLinkClick(link, e)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={getHref(contactLink)}
                className="rounded-full bg-white text-black text-sm font-medium px-4 py-1.5 hover:bg-white/85 transition-colors"
                onClick={(e) => handleLinkClick(contactLink, e)}
              >
                {contactLink.label}
              </a>
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
        </div>
      </nav>

      {menuOpen && (
        <div
          data-menu-overlay
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-sm flex flex-col items-start justify-end pb-16 sm:hidden"
        >
          <nav className="container mx-auto w-full flex flex-col gap-2">
            {[...links, contactLink].map((link) => (
              <a
                key={link.label}
                data-menu-link
                href={getHref(link)}
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
