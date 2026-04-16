import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import RouteTransitionIn from "@/components/RouteTransitionIn";
import { projects } from "@/lib/data";
import { PhosphorIcon } from "@/components/PhosphorIcons";


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

    return (
        <SmoothScroll>
            <main data-page-transition className="min-h-screen bg-black text-white">
                <RouteTransitionIn />
                {/* Back link */}
                <nav className="fixed top-0 left-0 w-full z-50 px-8 md:px-16 py-6">
                    <Link
                        href="/#projects"
                        className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                        &larr; Back to projects
                    </Link>
                </nav>

                {/* Hero image */}
                <div className="relative w-full h-[50vh] md:h-[65vh]">
                    <Image
                        src={project.src_detail}
                        alt={project.alt}
                        fill
                        priority
                        className="object-cover object-top"
                        sizes="100vw"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-8 md:px-16 -mt-24 pb-24">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-6xl font-serif mb-4">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                            {project.tags.map((tag, i) => (
                                <span key={tag} className="flex items-center gap-3">
                                    {i > 0 && (
                                        <span className="w-1 h-1 rounded-full bg-zinc-600" />
                                    )}
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </header>

                    {/* Meta grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-zinc-800 pt-8 mb-12">
                        <div>
                            <h3 className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                                Year
                            </h3>
                            <p className="text-sm text-zinc-200">{project.year}</p>
                        </div>
                        <div>
                            <h3 className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                                Role
                            </h3>
                            <p className="text-sm text-zinc-200">{project.role}</p>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <h3 className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                                Stack
                            </h3>
                            <p className="text-sm text-zinc-200">
                                {project.stack.join(" · ")}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-2xl">
                        {project.description}
                    </p>
                    <div className="flex mt-8 gap-4">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-neutral-300
                             transition-colors text-black text-sm font-semibold px-4 py-2">
                                GitHub
                                <Image src="/icons/github/GitHub_Invertocat_Black.svg" alt="GitHub" width={20} height={20} />
                            </a>
                        )}
                         {project.website && (
                            <a href={project.website} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 group rounded-full bg-white hover:bg-neutral-300
                             transition-colors text-black text-sm font-semibold px-4 py-2">
                                Website <PhosphorIcon name="ArrowUpRight" weight="bold" size={20} className="group-hover:translate-y-[-1px] group-hover:translate-x-[1px] transition-transform duration-300" />
                            </a>
                        )}
                    </div>
                </div>
            </main>
        </SmoothScroll>
    );
}
