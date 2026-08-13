"use client";

import ExperienceCard from "@/components/ExperienceCard";
import { useLocale } from "@/lib/i18n";

export default function ExperienceSection() {
  const { messages } = useLocale();

  return (
    <section className="w-full container mx-auto py-16 md:py-24" id="experience">
      <h2
        data-animate="section-heading"
        className="mb-16 text-5xl font-serif md:text-7xl"
      >
        {messages.experience.title}
      </h2>

      <div className="flex flex-col">
        {messages.experience.items.map((exp, i) => (
          <ExperienceCard key={i} experience={exp} />
        ))}
      </div>
    </section>
  );
}
