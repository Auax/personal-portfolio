"use client";

import { useEffect, useState } from "react";

export default function NavBar() {
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setHasScrolled(window.scrollY > 0);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className="fixed top-0 left-1/2 translate-x-[-50%] w-full z-50 flex items-center justify-between container">
            <div
                className={`flex justify-between mx-auto w-full px-10 py-4 mt-4 gap-10 rounded-full transition-all duration-300 ${hasScrolled
                    ? "backdrop-blur-md bg-black/40  border border-white/5"
                    : "bg-transparent border border-transparent"
                    }`}
            >
                <span className="text-lg font-semibold tracking-tight font-serif italic">
                    IF
                </span>
                <div className="flex items-center gap-6 text-sm text-neutral-200">
                    <a href="#projects" className="hover:text-white transition-colors">
                        My work
                    </a>
                    <a href="#experience" className="hover:text-white transition-colors">
                        Experience
                    </a>
                    <a href="#about" className="hover:text-white transition-colors">
                        About me
                    </a>
                    <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                </div>
            </div>
        </nav>
    ); 
} 
