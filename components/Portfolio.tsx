"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: .7,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const onFrame = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(onFrame);
    };

    rafId = requestAnimationFrame(onFrame);

    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      cancelAnimationFrame(rafId);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -96 });
      return;
    }

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            data-page-transition
            className="flex flex-col min-h-screen bg-black"
        >
            <NavBar onNavigate={scrollToId} />
            <HeroSection />
            <ProjectsSection />
            <ExperienceSection />
            <AboutSection />
            <ContactSection />
            <div className="h-16" />
        </div>
    );
}
