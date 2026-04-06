import Image from "next/image";

interface ProjectCardProps {
  src: string;
  alt: string;
  title?: string;
  tags: readonly string[];
  featured?: boolean;
  className?: string;
}

function TagList({ tags }: { tags: readonly string[] }) {
  return (
    <div className="flex items-center gap-2 text-sm text-zinc-300">
      {tags.map((tag, i) => (
        <span key={tag} className="flex items-center gap-2">
          {i > 0 && <span className="w-1 h-1 rounded-full bg-zinc-400" />}
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function ProjectCard({ src, alt, tags, featured = false, className = "", title = "" }: ProjectCardProps) {
  return (
    <div
      data-animate={featured ? "featured-project" : "project-card"}
      className={`relative rounded-2xl overflow-hidden group ${featured ? "w-full aspect-[16/8]" : "aspect-[4/3]"
        } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes={featured ? "(max-width: 768px) 100vw, 1200px" : "(max-width: 768px) 100vw, 600px"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className={`absolute ${featured ? "bottom-6 left-6" : "bottom-5 left-5"}`}>
        {title && <span className="text-lg font-medium">— {title}</span>}
        <TagList tags={tags} />
      </div>
    </div>
  );
}
