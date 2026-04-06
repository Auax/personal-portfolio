# Portfolio Design

A dark, animation-rich personal portfolio built with Next.js App Router, Tailwind CSS, GSAP, and Lenis smooth scrolling.

The project includes:
- A desktop-first landing page with responsive mobile adaptations
- Project cards with route transitions to detail pages
- Scroll-triggered animations and parallax effects
- Mobile fullscreen menu behavior
- Smooth scrolling shared across home and project detail pages

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- GSAP (`gsap`, `@gsap/react`, `ScrollTrigger`)
- Lenis smooth scrolling
- `next/font` with Geist (body) and Instrument Serif (headings)

## Project Structure

```txt
app/
  layout.tsx                 # Root layout, metadata, font variables
  page.tsx                   # Home entry point
  projects/[slug]/page.tsx   # Project detail page

components/
  Portfolio.tsx              # Main home composition + GSAP section animation wiring
  SmoothScroll.tsx           # Shared Lenis setup (GSAP ticker-driven)
  NavBar.tsx
  HeroSection.tsx
  ProjectsSection.tsx
  ProjectCard.tsx
  ExperienceSection.tsx
  ExperienceCard.tsx
  AboutSection.tsx
  ContactSection.tsx
  RouteTransitionIn.tsx      # Detail page entry transition

lib/
  data.ts                    # Projects, experience and skills content
```

## Getting Started

### 1) Install dependencies

```bash
pnpm install
```

### 2) Run the app

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3) Production checks

```bash
pnpm lint
pnpm build
pnpm start
```

## Key Behaviors

### Smooth scrolling
- `SmoothScroll.tsx` is the single Lenis source per route.
- Lenis is driven by GSAP ticker to avoid competing RAF loops.
- `ScrollTrigger.update` is synced on Lenis scroll events.

### Scroll animations
- Scroll reveals and parallax are configured in `Portfolio.tsx`.
- Featured project animation is disabled on smaller breakpoints.

### Navigation
- Desktop: inline anchor navigation.
- Mobile: hamburger menu with animated overlay.
- Section jumps are routed through the smooth scroll controller when available.

### Projects
- Project cards are clickable and route to `/projects/[slug]`.
- Route transitions are animated for smoother page changes.

## Content and Assets

- Hero background image: `public/background.jpg`
- Project images: `public/projects/*`
- Project and section content lives in `lib/data.ts`

## Notes for Future Changes

- Keep `SmoothScroll.tsx` as the only Lenis initializer per page route.
- If adding new scroll-heavy sections, register animations in `Portfolio.tsx` (home) or the specific route component.
- For accessibility, consider conditionally reducing animation intensity using `prefers-reduced-motion`.

## License

Private project.
