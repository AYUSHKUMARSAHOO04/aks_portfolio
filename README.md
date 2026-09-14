# Ayush Kumar Sahoo : Personal Portfolio Website
**Data Analyst | Product Analytics | Business Intelligence Professional**

A high-end editorial portfolio website built from scratch with React, TypeScript, Vite, TailwindCSS, and Framer Motion. Features GPU-friendly fluid portrait displacement, interactive retention cohort heatmaps, conversion funnel diagnostics, SQL inspectors, and a 100% decoupled data-driven architecture.

---

## Quick Start

```bash
# 1. Navigate to the project directory
cd "C:\Users\Debraj\.gemini\antigravity\scratch\ayush-portfolio"

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build
npm run preview
```

---

## 🛠️ How to Update Your Content (100% Data-Driven)

All content is decoupled from the UI components. You never need to touch the layout JSX to update your projects, work experience, or skills.

### 1. Update Personal Profile & Links
Edit: [`src/data/profile.ts`](file:///C:/Users/Debraj/.gemini/antigravity/scratch/ayush-portfolio/src/data/profile.ts)
- Update your email, LinkedIn URL, GitHub URL, location, and availability status.
- Changes propagate automatically across Navbar, Hero, About, Contact, and Footer.

### 2. Add or Edit Projects & Case Studies
Edit: [`src/data/projects.ts`](file:///C:/Users/Debraj/.gemini/antigravity/scratch/ayush-portfolio/src/data/projects.ts)
- Add a new project object with:
  - `title`, `category` (`PRODUCT ANALYTICS`, `DATA ANALYTICS`, `BUSINESS INTELLIGENCE`, `AI & PRODUCT`), `year`, `tagline`
  - `problem`, `data`, `approach`, `analysis` (key findings)
  - `insights` & `recommendations`
  - `metrics` (KPI stat cards)
  - Optional `sqlSnippets`, `cohortData`, or `funnelData`
- The project will automatically appear in the Selected Work list, filter pills, and interactive Case Study reader.

### 3. Add or Edit Experience
Edit: [`src/data/experience.ts`](file:///C:/Users/Debraj/.gemini/antigravity/scratch/ayush-portfolio/src/data/experience.ts)
- Add new roles or internships with `current: true / false`, responsibilities, achievements, and tools.

### 4. Add or Edit Education
Edit: [`src/data/education.ts`](file:///C:/Users/Debraj/.gemini/antigravity/scratch/ayush-portfolio/src/data/education.ts)
- Update degrees, institutions, grades, and coursework.

### 5. Add or Edit Skills
Edit: [`src/data/skills.ts`](file:///C:/Users/Debraj/.gemini/antigravity/scratch/ayush-portfolio/src/data/skills.ts)
- Add or modify skills organized by capability (Analytics, Product Analytics, BI & Visualization, Technology & AI).

### 6. Update Personal Portrait & Resume PDF
- Portrait: Replace [`public/assets/ayush-portrait.png`](file:///C:/Users/Debraj/.gemini/antigravity/scratch/ayush-portfolio/public/assets/ayush-portrait.png)
- Resume: Place your updated PDF at [`public/assets/resume.pdf`](file:///C:/Users/Debraj/.gemini/antigravity/scratch/ayush-portfolio/public/assets/resume.pdf)

---

## 🎨 Creative & Technical Architecture
- **Hero & Liquid Effect**: Centered portrait with dynamic lerp mouse tracking, SVG displacement filter, and oversized typography layering (`src/components/hero/LiquidPortrait.tsx`).
- **Interactive Visuals**:
  - `RetentionCohortChart.tsx`: Interactive monthly cohort heatmap.
  - `ConversionFunnelChart.tsx`: Multi-stage checkout drop-off diagnosis.
  - `SqlInspector.tsx`: Interactive SQL query reader with 1-click clipboard copy.
- **Responsive Layout**: Designed for 4K/Desktop, Tablet, and Mobile viewports with touch adaptations and `prefers-reduced-motion` compliance.
