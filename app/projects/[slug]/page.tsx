import { notFound } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import { projects } from "@/lib/data";
import ProjectDetailsContent from "@/components/ProjectDetailsContent";
import ProjectArticle from "@/components/ProjectArticle";
import { getProjectArticles } from "@/lib/project-articles";


export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return {};
    return {
        title: `${project.title} — Ibai Farina`,
        description: project.description,
    };
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) notFound();
    const articles = await getProjectArticles(slug);

    return (
        <SmoothScroll>
            <ProjectDetailsContent
                project={project}
                articleEn={articles.en && (
                    <ProjectArticle
                        markdown={articles.en}
                        repositoryUrl={project.github}
                    />
                )}
                articleEs={articles.es && (
                    <ProjectArticle
                        markdown={articles.es}
                        repositoryUrl={project.github}
                    />
                )}
            />
        </SmoothScroll>
    );
}
