import { getHomepageProjects } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import ViewAllProjectsLink from "@/components/ViewAllProjectsLink";

export default function ProjectsSection() {
  const { featured, rest, hasMore } = getHomepageProjects();

  return (
    <section className="w-full container mx-auto py-16 md:py-24" id="projects">
      <ProjectCard {...featured} featured className="mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rest.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <ViewAllProjectsLink />
        </div>
      )}
    </section>
  );
}
