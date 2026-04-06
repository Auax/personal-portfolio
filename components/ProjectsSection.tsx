import { projects } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsSection() {
  const [featured, ...rest] = projects;

  return (
    // Add container class for style 2
    <section className="w-full  mx-auto px-4 py-16 md:py-24" id="projects">
      <ProjectCard {...featured} featured className="mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rest.map((project) => (
          <ProjectCard key={project.src} {...project} />
        ))}
      </div>
    </section>
  );
}
