"use client";

import { useLocale } from "@/lib/i18n";

export default function AboutSection() {
  const { messages } = useLocale();
  const aboutText = messages.about.text;

  return (
    <section className="w-full container mx-auto py-16 md:py-24" id="about">
      <h2
        data-animate="section-heading"
        className="text-5xl md:text-7xl font-serif mb-12"
      >
        {messages.about.title}
      </h2>

      <p
        data-animate="scroll-text"
        aria-label={aboutText}
        className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-4xl mb-16"
      >
        <span aria-hidden="true">
          {Array.from(aboutText).map((character, index) => (
            <span key={index} data-scroll-character>
              {character}
            </span>
          ))}
        </span>
      </p>

      <div
        data-animate="fade-up"
        className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-800 pt-10"
      >
        {messages.about.groups.map((group) => (
          <div key={group.title}>
            <h4 className="text-sm text-zinc-500 uppercase tracking-wider mb-4">
              {group.title}
            </h4>
            <ul className="flex flex-col gap-2">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-zinc-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
