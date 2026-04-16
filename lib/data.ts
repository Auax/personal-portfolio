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
    slug: "freelance-website",
    title: "Freelance Website",
    src: "/projects/project1.jpg",
    src_detail: "/projects/project1-detail.jpg",
    alt: "Freelance Next.js website",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    featured: true,
    description:
      "My own website for a freelance developer to showcase my work and services.",
    year: "2026",
    role: "Lead Developer",
    stack: ["Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    slug: "omnitrack",
    src: "/projects/omnitrack.png",
    src_detail: "/projects/omnitrack-detail.png",
    alt: "OmniTrack app",
    tags: ["Swift", "APIs", "iOS"],
    title: "Omnitrack",
    description:
      "A personal project to track currently watching movies, TV shows and anime, with a focus on user-friendly interface.\
      I built it to learn SwiftUI and Swift and improve UI/UX design skills. It's a combinations of IMDB, TMDB and Anilist APIs integrated to get\
      the latest information about the movies, TV shows and anime.",
    year: "2026",
    role: "Developer & Designer",
    stack: ["Swift", "SwiftUI"],
    github: "https://github.com/auax/Omnitrack",
    website: "https://omnitrack.app",
  },
  {
    slug: "eclipse-visualization",
    src: "/projects/project3.jpg",
    src_detail: "/projects/project3-detail.jpg",
    alt: "Eclipse visualization project",
    tags: ["NPL", "Deep Learning", "Web Design"],
    title: "Eclipse Visualization",
    description:
      "A data-driven visualization of solar eclipse patterns over the past century, combining astronomical datasets with interactive storytelling.",
    year: "2023",
    role: "Full-Stack Developer",
    stack: ["D3.js", "Next.js", "Python", "NASA API"],
  },
  {
    slug: "generative-art",
    src: "/projects/project4.jpg",
    src_detail: "/projects/project4-detail.jpg",
    alt: "Generative art project",
    tags: ["NPL", "Deep Learning", "Web Design"],
    title: "Generative Art Engine",
    description:
      "A creative coding platform that lets artists define rule-based systems to produce unique visual outputs, powered by a custom node-graph editor.",
    year: "2023",
    role: "Creator",
    stack: ["TypeScript", "Canvas API", "Node.js"],
  },
  {
    slug: "medical-imaging",
    src: "/projects/project5.jpg",
    src_detail: "/projects/project5-detail.jpg",
    alt: "Medical imaging project",
    tags: ["NPL", "Deep Learning", "Web Design"],
    title: "Medical Imaging AI",
    description:
      "A deep learning pipeline for automated anomaly detection in X-ray and CT scans, deployed as a clinical decision-support tool achieving 96% sensitivity.",
    year: "2024",
    role: "ML Engineer",
    stack: ["PyTorch", "FastAPI", "Docker", "DICOM"],
  },
] as const;

// export type Project = (typeof projects)[number];

export const experiences = [
  {
    title: "Full-stack developer in Rever",
    description:
      "I collaborated with senior developers to build production systems using modern web technologies, contributing to real-world applications that handle thousands of daily requests.",
    tags: ["Deep Learning", "Python", "Cloud"],
    period: "2024 — Present",
  },
  {
    title: "Neural Sentiment Engine",
    description:
      "I designed and trained a deep learning model for classifying text sentiment across multiple languages, achieving state-of-the-art performance on benchmark datasets.",
    tags: ["NLP", "PyTorch", "Transformers"],
    period: "2023",
  },
] as const;

export const skills: Record<string, readonly string[]> = {
  Skills: ["Deep Learning", "Computer Vision", "Frontend Dev", "Data Science", "Cloud Architecture"],
  Languages: ["Python", "TypeScript", "Rust", "Go", "SQL"],
  Frameworks: ["React", "Next.js", "PyTorch", "TensorFlow", "FastAPI"],
  Platforms: ["AWS", "Docker", "Kubernetes", "Vercel", "PostgreSQL"],
};
