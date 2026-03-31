# Portfolio 2026

Personal design portfolio for Shao Linzhengrong — built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Features bilingual support (English / Chinese) and two in-depth case studies.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool and dev server |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations and page transitions |
| Lenis | Smooth scroll |
| React Router v6 | Client-side routing |

---

## Getting Started

```bash
npm install
npm run dev
```

The dev server will start at `http://localhost:5173`.

---

## Root Directory

```
Portfolio_2026/
  index.html              # HTML entry point (sets favicon, fonts, mounts #root)
  vite.config.js          # Vite config (React plugin)
  tailwind.config.js      # Tailwind config (custom fonts: Switzer, Playfair Display)
  postcss.config.js       # PostCSS config (Tailwind + Autoprefixer)
  tsconfig.json           # TypeScript config (strict, ESNext)
  tsconfig.node.json      # TypeScript config for Vite/Node build files
  package.json            # Dependencies and npm scripts
  package-lock.json       # Dependency lock file
  .gitignore              # Ignores node_modules, dist, .DS_Store, build caches
  README.md               # This file

  assests/                # Static assets committed to repo
    春招_linzhengrong Shao.pdf   # Resume PDF (linked from About page)

  src/                    # All source code (see below)
  dist/                   # Production build output — auto-generated, gitignored
  node_modules/           # Installed packages — gitignored
```

---

## Source Structure

```
src/
  App.tsx                  # Root app, routing, page transition wrapper
  main.tsx                 # React entry point
  index.css                # Global styles (Tailwind base, black bg, hide scrollbar)
  vite-env.d.ts            # Vite client type reference

  features/
    dogu/                  # DOGU – iROI case study (self-contained feature)
      DoguCaseStudyPage.tsx      # Full page component
      DoguHero.tsx               # Hero section with parallax scroll
      DoguSectionInfo.tsx        # Project info grid (role, year, client)
      doguCaseStudyMessages.tsx  # EN/ZH copy for the case study page
      doguSectionInfoMessages.ts # EN/ZH copy for the info section

    tencent/               # Tencent – QQ Speed case study (self-contained feature)
      CaseStudyPage.tsx          # Full page component
      Hero.tsx                   # Hero section with parallax scroll
      SectionInfo.tsx            # Project info grid (role, year, client)
      caseStudyMessages.tsx      # EN/ZH copy for the case study page
      sectionInfoMessages.ts     # EN/ZH copy for the info section

  components/              # Shared components used across pages
    Header.tsx             # Site-wide navigation bar
    Footer.tsx             # Site-wide footer
    MenuOverlay.tsx        # Full-screen mobile/overlay menu
    HomeHero.tsx           # Hero animation on the homepage
    FeaturedProjects.tsx   # Case study cards / project grid on homepage
    SectionResume.tsx      # Experience and skills section (About page)
    MoreWorks.tsx          # "More Works" section at the bottom of case studies

  pages/                   # Shared page-level components
    HomePage.tsx           # Main landing page
    AboutPage.tsx          # About / experience page

  i18n/                    # Shared internationalisation (EN / ZH)
    LanguageContext.tsx    # Language provider and useLanguage hook
    homeMessages.ts        # EN/ZH copy for the homepage
    aboutMessages.ts       # EN/ZH copy for the about page

  lib/
    useLenis.ts            # Custom hook that initialises Lenis smooth scroll
```

---

## Case Studies

| Slug | Feature folder | Description |
|---|---|---|
| `dogu - iroi` | `src/features/dogu/` | DOGU iROI — AI companion robot UX & engineering |
| `tencent - qq spend` | `src/features/tencent/` | Tencent QQ Speed — AI companion product design |

Routes follow the pattern `/case-studies/:slug` (and `/zh/case-studies/:slug` for Chinese). `App.tsx` matches the slug to decide which feature page to render.

---

## Internationalisation

The site supports English and Simplified Chinese. Language state is managed by `LanguageContext` (`src/i18n/LanguageContext.tsx`). Every page and feature folder contains its own message files (`*Messages.ts` / `*Messages.tsx`) that export a `{ en, zh }` object keyed by locale.

Toggle between languages via the language switcher in the Header.

---

## Routing

| Path | Page |
|---|---|
| `/` | HomePage |
| `/zh` | HomePage (Chinese) |
| `/about` | AboutPage |
| `/zh/about` | AboutPage (Chinese) |
| `/case-studies/dogu%20-%20iroi` | DoguCaseStudyPage |
| `/case-studies/:slug` | CaseStudyPage (Tencent) |
