export interface Project {
  slug: string;
  title: string;
  src: string;
  src_detail: string;
  alt: string;
  tags: string[];
  featured?: boolean;
  description: string;
  year: string;
  role: string;
  stack: string[];
  github?: string;
  website?: string;
}

export const projects: Project[] = [
  {
    slug: "IB-Studio",
    title: "IB Studio",
    src: "/projects/ibstudio.jpg",
    src_detail: "/projects/ibstudio.jpg",
    alt: "IB Studio website",
    tags: ["Freelance", "Website", "Design"],
    featured: true,
    description:
      "My freelance website, where I offer web design services to local businesses looking to establish or improve their online presence. It showcases a few client and demo projects. Alongside a clear three-tier pricing structure and a simple contact form to kick off new projects..",
    year: "2026",
    role: "Developer & Designer",
    stack: ["Next.js", "TypeScript", "SEO"],
    github: "https://github.com/auax/freelancePortfolio",
    website: "https://ibstudio.es",
  },
  {
    slug: "omnitrack",
    src: "/projects/omnitrack.png",
    src_detail: "/projects/omnitrack-detail.png",
    alt: "OmniTrack app",
    tags: ["iOS", "Tracking", "Movies"],
    title: "Omnitrack",
    description:
      "A personal project to track currently watching movies, TV shows and anime, with a focus on user-friendly interface.\
      I built it to learn SwiftUI and Swift and improve UI/UX design skills. It's a combinations of IMDB, TMDB and Anilist APIs integrated to get\
      the latest information about the movies, TV shows and anime.",
    year: "2026",
    role: "Developer & Designer",
    stack: ["Swift", "SwiftUI"],
    github: "https://github.com/auax/Omnitrack",
  },
  {
    slug: "haze",
    src: "/projects/haze.jpg",
    src_detail: "/projects/haze.jpg",
    alt: "Haze",
    tags: ["MacOS", "Video Editing", "Video recording"],
    title: "Haze",
    description:
      "Video recording app for MacOS with smooth cursor, automatic zooms, video editing and more.",
    year: "2026",
    role: "Developer & Designer",
    stack: ["Swift", "SwiftUI", "Metal API", "Xcode"],
    github: "https://github.com/auax/Haze",
  },
  {
    slug: "tempo",
    src: "/projects/tempo.jpg",
    src_detail: "/projects/tempo.jpg",
    alt: "Tempo",
    tags: ["MacOS","Music Scores", "Piano"],
    title: "Tempo",
    description:
      "Simple and beautiful scores app to practice piano.",
    year: "2026",
    role: "Developer & Designer",
    stack: ["Swift", "SwiftUI", "Metal API", "Xcode"],
    github: "https://github.com/auax/Tempo",
  }
] as const;

export const HOMEPAGE_PROJECTS_LIMIT = 3;

export function getFeaturedProject(): Project {
  return projects.find((p) => p.featured) ?? projects[0];
}

export function getHomepageProjects() {
  const featured = getFeaturedProject();
  const rest = projects.filter((p) => p.slug !== featured.slug);

  return {
    featured,
    rest: rest.slice(0, HOMEPAGE_PROJECTS_LIMIT - 1),
    hasMore: projects.length > HOMEPAGE_PROJECTS_LIMIT,
  };
}

// export type Project = (typeof projects)[number];

export const experiences = [
  {
    title: "Data Science Student at UPF",
    description:
      "I'm currently studying Data Science at the Universitat Pompeu Fabra, where I'm learning about AI, Data Science, Advanced Math and Statistics and how to apply them to real-world problems.",
    tags: ["AI", "Data Science", "Advanced Math and Statistics"],
    period: "2025 — Present",
  },
  {
    title: "Freelance website developer",
    description:
      "Building websites for clients and businesses to help them showcase their products and services.",
    tags: ["Next.js", "TypeScript", "SEO", "Sales"],
    period: "Present",
  },
] as const;

export const skills: Record<string, readonly string[]> = {
  Skills: ["Deep Learning", "Computer Vision", "Frontend Dev", "Data Science", "Cloud Architecture"],
  Languages: ["Python", "TypeScript", "Rust", "Go", "SQL"],
  Frameworks: ["React", "Next.js", "PyTorch", "TensorFlow", "FastAPI"],
  Platforms: ["AWS", "Docker", "Kubernetes", "Vercel", "PostgreSQL"],
};
