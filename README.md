<div align="center">

# Ibai Farina — Personal Portfolio

**A bilingual, animation-rich portfolio where the experience is part of the work.**

[Visit ibaifarina.dev](https://ibaifarina.dev) · [Explore the projects](https://ibaifarina.dev/projects)

<br />

<img width="100%" alt="Homepage of the ibaifarina.dev personal portfolio" src="./public/projects/personal-portfolio/hero.webp" />

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-0AE448?style=flat-square&logo=greensock&logoColor=black)](https://gsap.com/)

</div>

## About the project

[ibaifarina.dev](https://ibaifarina.dev) is my personal portfolio as a software developer and Data Science student. I designed and developed it from scratch as a place to introduce myself, share the technologies I work with, and showcase the projects I build.

I wanted it to be more than a page of links. The website itself demonstrates how I approach development: combining a clear visual identity, a polished interface, and fluid interactions without losing usability or performance.

## Highlights

- **Project-driven content** — Every project has a dedicated route with its goals, my role, technologies, imagery, and relevant links.
- **Long-form case studies** — Projects can include English and Spanish Markdown articles that are loaded automatically on their detail pages.
- **Purposeful motion** — GSAP and ScrollTrigger power entrance animations, parallax, scroll-linked effects, and progressive reveals.
- **Smooth navigation** — Lenis provides fluid scrolling across the site and stays synchronized with GSAP's animation loop.
- **Bilingual experience** — The interface and project content are available in English and Spanish, with the selected language saved in the browser.
- **Responsive by design** — Navigation, layout, and motion are adapted for mobile rather than simply scaled down from desktop.
- **Accessible animation** — Motion-heavy behavior respects the user's `prefers-reduced-motion` setting.

## Design and development

The interface was initially planned in Figma and developed as a set of reusable React components for projects, experience, personal information, skills, and contact details. The visual direction is minimalist but expressive, with particular attention to typography, imagery, spacing, and transitions between sections.

Motion supports the content instead of competing with it. GSAP handles the richer sequences and scroll-linked effects, while Lenis keeps movement consistent between the home page, project index, and individual project pages.

<img width="100%" alt="Projects section of the portfolio on desktop" src="./public/projects/personal-portfolio/projects.webp" />

## Project and content system

Projects are generated from a shared data structure and rendered through dynamic Next.js routes. This makes it straightforward to add new work while keeping cards and detail pages consistent.

Each project can also include localized Markdown files under `content/projects/`. The corresponding article is loaded on the server and rendered on the project page, allowing case studies to go beyond a screenshot and a technology list with development notes, design decisions, features, and technical details.

<img width="100%" alt="Detailed project page with its Markdown case study" src="./public/projects/personal-portfolio/project-detail.webp" />

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 with the App Router |
| UI | React 19 and TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | GSAP, `@gsap/react`, and ScrollTrigger |
| Smooth scrolling | Lenis |
| Content | React Markdown, Remark GFM, and Rehype Raw |
| Typography | Geist and Instrument Serif through `next/font` |
| Analytics | Vercel Analytics |

## Getting started

### Requirements

- Node.js 20.9 or later
- pnpm

### Run locally

```bash
git clone https://github.com/ibaifarina/ibaifarina.dev.git
cd ibaifarina.dev
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available commands

```bash
pnpm dev      # Start the development server
pnpm build    # Create a production build
pnpm start    # Run the production server
pnpm lint     # Run ESLint
```

## Project structure

```text
app/
├── layout.tsx                 # Root layout, metadata, fonts, and providers
├── page.tsx                   # Home page
└── projects/
    ├── page.tsx               # Project index
    └── [slug]/page.tsx        # Dynamic project detail pages

components/                    # Sections, cards, navigation, motion, and content UI
content/projects/              # Localized Markdown case studies
lib/
├── data.ts                    # Project and experience data
├── i18n.tsx                   # English/Spanish translations and locale state
└── project-articles.ts        # Server-side Markdown article loading

public/
├── cv/                        # Localized CV files
└── projects/                  # Project imagery and media
```

## Responsive experience

The portfolio keeps the same visual identity across screen sizes while adjusting its navigation, composition, and animations for smaller devices.

<p align="center">
  <img width="48%" alt="Project listing adapted for mobile" src="./public/projects/personal-portfolio/mobile-projects.webp" />
  <img width="48%" alt="Mobile navigation menu of the portfolio" src="./public/projects/personal-portfolio/mobile-menu.webp" />
</p>

## Result

This portfolio brings together the areas I care about most: frontend development, UI/UX, animation, product thinking, and attention to detail. Its goal is not only to list the technologies I know, but to let the portfolio experience demonstrate what I can design and develop.
