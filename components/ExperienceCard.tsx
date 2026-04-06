import { experiences } from "@/lib/data";

type ExperienceItem = (typeof experiences)[number];

interface ExperienceCardProps {
  experience: ExperienceItem;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div
      data-animate="fade-up"
      className="py-10 border-b border-zinc-800 last:border-b-0"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <h3 className="font-serif text-2xl md:text-3xl">{experience.title}</h3>
        <span className="text-sm text-zinc-500 shrink-0">{experience.period}</span>
      </div>
      <p className="text-zinc-400 text-base leading-relaxed max-w-2xl mb-5">
        {experience.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {experience.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-zinc-400 border border-zinc-700 rounded-full px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
