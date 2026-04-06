export const projects = [
  {
    slug: "floral-landscape",
    title: "Ibai Farina",
    src: "/projects/project1.jpg",
    alt: "Floral landscape project",
    tags: ["NPL", "Deep Learning", "Web Design"],
    featured: true,
    description:
      "A generative landscape system that blends real-world floral photography with procedural terrain algorithms, producing immersive natural environments for interactive installations.",
    year: "2024",
    role: "Lead Developer",
    stack: ["Python", "Three.js", "TensorFlow", "WebGL"],
  },
  {
    slug: "abstract-geometry",
    src: "/projects/project2.jpg",
    alt: "Abstract geometry project",
    tags: ["NPL", "Deep Learning", "Web Design"],
    title: "Abstract Geometry",
    description:
      "An exploration of algorithmic geometry through recursive subdivision and ray-marching techniques, rendered in real-time on the GPU.",
    year: "2024",
    role: "Developer & Designer",
    stack: ["GLSL", "React", "WebGPU"],
  },
  {
    slug: "eclipse-visualization",
    src: "/projects/project3.jpg",
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

export type Project = (typeof projects)[number];

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
