<div align="center">
  
# ✨ Portfolio Design

*A dark, animation-rich personal portfolio built for performance and fluidity.*

<br />

<img width="100%" alt="Portfolio Preview" src="https://github.com/user-attachments/assets/cdcc24da-c967-4bed-9cf0-592ab55436e1" style="border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);" />

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=flat-square&logo=greensock)](https://gsap.com/)

</div>

---

## 🎯 Overview

This project is a high-performance, visually engaging personal portfolio. It prioritizes smooth interactions, utilizing a tightly integrated stack of GSAP for complex animations and Lenis for seamless scroll hijacking.

**Key Features:**
- 🖥️ **Responsive Design:** Desktop-first landing page with tailored mobile adaptations.
- 🚀 **Dynamic Routing:** Project cards feature seamless route transitions to detail pages.
- ✨ **Rich Animations:** Scroll-triggered reveals, parallax effects, and animated mobile overlays.
- 🌊 **Fluid Scrolling:** Ticker-driven smooth scrolling shared across all routes.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 16 (App Router)
* **Core:** React 19 + TypeScript
* **Styling:** Tailwind CSS v4
* **Animation:** GSAP (`gsap`, `@gsap/react`, `ScrollTrigger`)
* **Scrolling:** Studio Freight Lenis
* **Typography:** `next/font` (Geist for body, Instrument Serif for headings)

---

## 📂 Project Structure

```text
app/
 ├── layout.tsx                 # Root layout, metadata, font variables
 ├── page.tsx                   # Home entry point
 └── projects/[slug]/page.tsx   # Project detail page

components/
 ├── Portfolio.tsx              # Main home composition + GSAP section wiring
 ├── SmoothScroll.tsx           # Shared Lenis setup (GSAP ticker-driven)
 ├── RouteTransitionIn.tsx      # Detail page entry transition
 ├── NavBar.tsx                 # Desktop & mobile navigation
 ├── HeroSection.tsx
 ├── ProjectsSection.tsx
 ├── ProjectCard.tsx
 ├── ExperienceSection.tsx
 ├── ExperienceCard.tsx
 ├── AboutSection.tsx
 └── ContactSection.tsx

lib/
 └── data.ts                    # Projects, experience, and skills content

public/
 ├── background.jpg             # Hero background asset
 └── projects/                  # Project imagery
