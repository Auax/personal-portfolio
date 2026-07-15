"use client";

import { useCallback, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useLocale } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { locale } = useLocale();

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: Element, opts?: unknown) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -96 });
      return;
    }

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    const scrollToHash = () => scrollToId(id);
    const frame = window.requestAnimationFrame(scrollToHash);

    window.addEventListener("load", scrollToHash, { once: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("load", scrollToHash);
    };
  }, [scrollToId]);

    useGSAP(
        () => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;
            if (prefersReducedMotion) return;

            gsap.from("[data-animate='hero-text'] > *", {
                y: 40,
                opacity: 0,
                filter: "blur(30px)",
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
            });

            gsap.from("[data-animate='hero-cta']", {
                y: 20,
                opacity: 0,
                filter: "blur(30px)",
                duration: 0.7,
                delay: 0.5,
                ease: "power3.out",
            });

            gsap.from("[data-animate='hero-bg']", {
                opacity: 0,
                scale: 1.05,
                duration: 1.4,
                ease: "power2.out",
            });

            const heroBg = containerRef.current?.querySelector<HTMLElement>(
                "[data-animate='hero-bg']"
            );
            if (heroBg) {
                gsap.to(heroBg, {
                    yPercent: 20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroBg.parentElement,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

            const heroSection = containerRef.current?.querySelector<HTMLElement>(
                "[data-animate='hero-section']"
            );
              const featuredCard = containerRef.current?.querySelector<HTMLElement>(
                "[data-animate='featured-project']"
            );
            const isMdUp = window.matchMedia("(min-width: 768px)").matches;
            if (featuredCard && isMdUp) {
                gsap.fromTo(
                    featuredCard,
                    { scale: .8, y: 0, opacity: 0, filter: "blur(30px)" },
                    {
                        scale: 1,
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        ease: "power1.out",
                        scrollTrigger: {
                            trigger: heroSection,
                            start: "bottom 80%",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            }

            gsap.utils
                .toArray<HTMLElement>("[data-animate='project-card']")
                .forEach((card, i) => {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                        y: 60,
                        opacity: 0,
                        filter: "blur(30px)",
                        duration: 0.7,
                        delay: i * 0.1,
                        ease: "power3.out",
                    });
                });

            gsap.utils
                .toArray<HTMLElement>("[data-animate='section-heading']")
                .forEach((heading) => {
                    gsap.from(heading, {
                        scrollTrigger: {
                            trigger: heading,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                        y: 30,
                        opacity: 0,
                        filter: "blur(30px)",
                        duration: 0.8,
                        ease: "power3.out",
                    });
                });

            gsap.utils
                .toArray<HTMLElement>("[data-animate='scroll-text']")
                .forEach((text) => {
                    const characters = text.querySelectorAll<HTMLElement>(
                        "[data-scroll-character]"
                    );

                    gsap.fromTo(
                        characters,
                        { color: "rgba(212, 212, 216, 0.2)" },
                        {
                            color: "rgba(212, 212, 216, 1)",
                            stagger: 0.04,
                            ease: "none",
                            scrollTrigger: {
                                trigger: text,
                                start: "top 85%",
                                end: "bottom 45%",
                                scrub: true,
                            },
                        }
                    );
                });

            gsap.utils
                .toArray<HTMLElement>("[data-animate='fade-up']")
                .forEach((el) => {
                    gsap.from(el, {
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            toggleActions: "play none none none",
                        },
                        y: 30,
                        opacity: 0,
                        filter: "blur(30px)",
                        duration: 0.7,
                        ease: "power3.out",
                    });
                });
        },
        { scope: containerRef, dependencies: [locale], revertOnUpdate: true }
    );

    return (
        <div
            ref={containerRef}
            data-page-transition
            className="flex flex-col min-h-screen bg-black"
        >
            <NavBar onNavigate={scrollToId} />
            <HeroSection onNavigate={scrollToId} />
            <ProjectsSection />
            <ExperienceSection />
            <AboutSection />
            <ContactSection />
            <Footer />
        </div>
    );
}
