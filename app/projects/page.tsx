import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import ProjectsPageContent from "@/components/ProjectsPageContent";

export const metadata: Metadata = {
  title: "Projects — Ibai Farina",
  description:
    "Selected projects across web design, iOS development, and product work by Ibai Farina.",
};

export default function ProjectsPage() {
  return (
    <SmoothScroll>
      <ProjectsPageContent />
    </SmoothScroll>
  );
}
