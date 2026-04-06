import { experiences } from "@/lib/data";
import ExperienceCard from "@/components/ExperienceCard";

export default function ExperienceSection() {
  return (
    <section className="w-full container mx-auto py-16 md:py-24" id="experience">
      <h2
        data-animate="section-heading"
        className="text-5xl md:text-7xl font-serif mb-16"
      >
        Experience
      </h2>

      <div className="flex flex-col">
        {experiences.map((exp, i) => (
          <ExperienceCard key={i} experience={exp} />
        ))}
      </div>
    </section>
  );
}
