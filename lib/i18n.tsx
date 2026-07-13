"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";

export type Locale = "en" | "es";

const messages = {
  en: {
    nav: { home: "Home", work: "My work", experience: "Experience", about: "About me", contact: "Contact", open: "Open menu", close: "Close menu", language: "Language" },
    hero: { greeting: "Hi! I'm Ibai Farina,", roleAccent: "full stack", role: "developer", location: "I'm based in Barcelona, Spain", cta: "View my work" },
    projects: { title: "Projects", intro: "A collection of work across design, development, and product.", viewAll: "View all projects" },
    experience: {
      title: "Experience",
      items: [
        { title: "Data Science Student at UPF", description: "I'm currently studying Data Science at Universitat Pompeu Fabra, where I'm learning about AI, data science, advanced mathematics and statistics, and how to apply them to real-world problems.", tags: ["AI", "Data Science", "Advanced Mathematics & Statistics"], period: "2025 — Present" },
        { title: "Freelance website developer", description: "Building websites for clients and businesses to help them showcase their products and services.", tags: ["Web design", "Figma", "SEO", "Sales"], period: "Present" },
      ],
    },
    about: {
      title: "About me",
      text: "I’m a software developer and Data Science student based in Barcelona. I enjoy turning ideas into polished products, from native iOS and macOS applications to modern web experiences. I care equally about how software works and how it feels to use.",
      groups: [
        { title: "Skills", items: ["Web design & development", "UI/UX design", "iOS & macOS development", "Data Science"] },
        { title: "Languages", items: ["Python", "TypeScript", "C++", "Swift", "Java"] },
        { title: "Frameworks", items: ["React", "Next.js", "SwiftUI", "Tailwind CSS"] },
        { title: "Tools", items: ["Vercel", "Supabase", "GitHub", "Figma", "Cursor"] },
      ],
    },
    contact: { title: "Let's talk", intro: "Tell me about your project", name: "Name", email: "Email", description: "Description", send: "Send" },
    footer: { intro: "Full-stack developer creating thoughtful digital experiences from Barcelona.", navigate: "Navigate", elsewhere: "Elsewhere", work: "Work", about: "About", backToTop: "Back to top" },
    project: { back: "Back", year: "Year", role: "Role", stack: "Stack", tags: "Tags", website: "Website" },
  },
  es: {
    nav: { home: "Inicio", work: "Proyectos", experience: "Experiencia", about: "Sobre mí", contact: "Contacto", open: "Abrir menú", close: "Cerrar menú", language: "Idioma" },
    hero: { greeting: "¡Hola! Soy Ibai Farina,", roleAccent: "desarrollador", role: "full stack", location: "Basado en Barcelona, España", cta: "Ver mi trabajo" },
    projects: { title: "Proyectos", intro: "Una selección de trabajos de diseño, desarrollo y producto.", viewAll: "Ver todos los proyectos" },
    experience: {
      title: "Experiencia",
      items: [
        { title: "Estudiante de Data Science en la UPF", description: "Estoy estudiando Data Science en la Universitat Pompeu Fabra, donde aprendo sobre IA, ciencia de datos, matemáticas avanzadas y estadística, y cómo aplicarlas a problemas reales.", tags: ["IA", "Data Science", "Matemáticas y Estadística Avanzadas"], period: "2025 — Actualidad" },
        { title: "Desarrollador web freelance", description: "Creo páginas web para clientes y empresas que quieren mostrar mejor sus productos y servicios.", tags: ["Diseño web", "Figma", "SEO", "Ventas"], period: "Actualidad" },
      ],
    },
    about: {
      title: "Sobre mí",
      text: "Soy desarrollador de software y estudiante de Ciencia de Datos en Barcelona. Me gusta convertir ideas en productos cuidados, desde aplicaciones nativas para iOS y macOS hasta experiencias web modernas. Me importa tanto cómo funciona el software como la experiencia que ofrece al utilizarlo.",
      groups: [
        { title: "Habilidades", items: ["Diseño y desarrollo web", "Diseño UI/UX", "Desarrollo para iOS y macOS", "Data Science"] },
        { title: "Lenguajes", items: ["Python", "TypeScript", "C++", "Swift", "Java"] },
        { title: "Frameworks", items: ["React", "Next.js", "SwiftUI", "Tailwind CSS"] },
        { title: "Herramientas", items: ["Vercel", "Supabase", "GitHub", "Figma", "Cursor"] },
      ],
    },
    contact: { title: "Hablemos", intro: "Cuéntame sobre tu proyecto", name: "Nombre", email: "Email", description: "Descripción", send: "Enviar" },
    footer: { intro: "Desarrollador full-stack creando experiencias digitales desde Barcelona.", navigate: "Navegar", elsewhere: "También en", work: "Proyectos", about: "Sobre mí", backToTop: "Volver arriba" },
    project: { back: "Volver", year: "Año", role: "Rol", stack: "Tecnologías", tags: "Etiquetas", website: "Sitio web" },
  },
} as const;

const projectTranslations: Record<string, { es: { description: string; role: string; tags: readonly string[]; alt: string } }> = {
  "IB-Studio": { es: { description: "Mi web freelance, donde ofrezco servicios de diseño web a negocios locales que quieren crear o mejorar su presencia online. Presenta varios proyectos para clientes y proyectos conceptuales, junto con tres planes de precios claros y un formulario de contacto sencillo para empezar nuevos proyectos.", role: "Desarrollador y diseñador", tags: ["Freelance", "Web", "Diseño"], alt: "Sitio web de IB Studio" } },
  omnitrack: { es: { description: "Un proyecto personal para llevar un registro de películas, series y anime, con especial atención a una interfaz fácil de usar. Lo creé para aprender SwiftUI y Swift y mejorar mis habilidades de diseño UI/UX, integrando las API de IMDb, TMDB y AniList.", role: "Desarrollador y diseñador", tags: ["iOS", "Seguimiento", "Películas"], alt: "Aplicación OmniTrack" } },
  haze: { es: { description: "Aplicación de grabación de vídeo para macOS con cursor fluido, zooms automáticos, edición de vídeo y más.", role: "Desarrollador y diseñador", tags: ["macOS", "Edición", "Grabación de vídeo"], alt: "Aplicación Haze" } },
  tempo: { es: { description: "Una aplicación de partituras sencilla y cuidada para practicar piano.", role: "Desarrollador y diseñador", tags: ["macOS", "Partituras", "Piano"], alt: "Aplicación Tempo" } },
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: (typeof messages)[Locale];
  translateProject: <T extends { slug: string; description: string; role: string; tags: readonly string[]; alt: string }>(project: T) => T;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const localeChangeEvent = "portfolio-locale-change";

function getLocaleSnapshot(): Locale {
  const saved = localStorage.getItem("portfolio-locale");
  return saved === "es" ? "es" : "en";
}

function subscribeToLocale(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(localeChangeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(localeChangeEvent, callback);
  };
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore<Locale>(
    subscribeToLocale,
    getLocaleSnapshot,
    () => "en" as Locale
  );

  const setLocale = (nextLocale: Locale) => {
    localStorage.setItem("portfolio-locale", nextLocale);
    window.dispatchEvent(new Event(localeChangeEvent));
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const translateProject: LocaleContextValue["translateProject"] = (project) => {
    if (locale === "en") return project;
    const translation = projectTranslations[project.slug]?.es;
    return translation ? { ...project, ...translation } : project;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, messages: messages[locale], translateProject }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
