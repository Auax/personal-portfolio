export const projects = [
  {
    title: "Ibai Farina",
    src: "/projects/project1.jpg",
    alt: "Floral landscape project",
    tags: ["NPL", "Deep Learning", "Web Design"],
    featured: true,
  },
  {
    src: "/projects/project2.jpg",
    alt: "Abstract geometry project",
    tags: ["NPL", "Deep Learning", "Web Design"],
  },
  {
    src: "/projects/project3.jpg",
    alt: "Eclipse visualization project",
    tags: ["NPL", "Deep Learning", "Web Design"],
  },
  {
    src: "/projects/project4.jpg",
    alt: "Generative art project",
    tags: ["NPL", "Deep Learning", "Web Design"],
  },
  {
    src: "/projects/project5.jpg",
    alt: "Medical imaging project",
    tags: ["NPL", "Deep Learning", "Web Design"],
  },
] as const;

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
