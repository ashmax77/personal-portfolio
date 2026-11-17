# Ashen's World — Game-Engine Inspired Personal Portfolio

**Ashen's World** is an interactive, content-driven personal portfolio built around a lightweight 3D world and a Dark Sci-Fi / Game-Engine Viewport HUD. Visitors can explore a stylized low-poly 3D campus to inspect projects, skills, education, achievements, and contact details—or switch at any time to a conventional **Classic View** and standalone SEO-friendly project case-study pages.

> **Core Principle:** Build a professional website that happens to use a 3D world as its interface—not a 3D game that happens to contain a CV.

---

## Vision & Core Experience

The finished application follows a three-stage experience while keeping all portfolio data cleanly separated in typed TypeScript/MDX files (`src/content/`):

1. **Welcome (`BootSequence`)**: A sequential terminal boot screen (`INITIALIZING ASHEN'S WORLD...` → `SYSTEM READY.` → `Welcome, Explorer!`) that preloads essential 3D assets in parallel, includes **Enter World** and **Skip Intro** controls, honors `prefers-reduced-motion`, and provides a **Classic View** fallback if WebGL is unavailable.
2. **Interactive 3D World**: A compact, demand-rendered (`frameloop="demand"`) isometric/elevated 3D campus with bounded orbit controls, smooth camera transitions, and six selectable landmarks backed by custom Blender GLB support (`world.optimized.glb`).
3. **Accessible HTML Information & Routes**: Contextual HTML side/bottom-sheet panels rendered outside the WebGL `<Canvas>`, persistent HUD navigation (`1`–`6` hotkeys, CV download, GitHub/LinkedIn), Classic non-3D view, and standalone routes (`/projects/[slug]`, `/about`, `/experience`, `/contact`).

### Planned World Destinations

| Destination | Portfolio Section | Content |
| --- | --- | --- |
| **Developer HQ** | About / Profile | Introduction, professional positioning, and personal interests |
| **Project Lab** | Projects | Featured project previews, repositories, demos, and case-study links |
| **Technology Center** | Skills | Programming languages, frameworks, tools, and competencies |
| **Academy** | Education | University degree, coursework, and academic certifications |
| **Achievement Hall** | Achievements | Competitions, awards, and milestones |
| **Communication Hub** | Experience & Contact | Experience timeline, CV download, and social/contact channels |

---

## Technology Stack

- **Framework & Language:** Next.js `16.4.6` (App Router, Turbopack), React `19.3.0`, TypeScript `^5`
- **3D Engine:** Three.js (`^0.187.0`), React Three Fiber (`^9.8.2`), Drei (`^10.7.9`)
- **Styling & Animation:** Tailwind CSS `4.3.3` (`@tailwindcss/turbopack`), Motion (`^14.14.0`), Lucide Icons (`^1.74.0`)
- **3D Asset Pipeline (Planned):** Blender → `GLB/glTF` → `glTF-Transform` (Meshopt/Draco + WebP textures, targeting 2–4 MB initial download)
- **Content & Deployment:** Typed TypeScript data (`src/content/*`) + MDX case studies, deployed on Vercel

---

## Development Progress (Up to Now)

This project is being built incrementally in **7 verified phases**. Detailed per-feature tracking lives in [`PROGRESS.md`](./PROGRESS.md).

### Completed So Far — Phase 1: Project Scaffolding & Dependency Foundation
- Scaffolded the Next.js App Router application inside `ashens-world/` with TypeScript, ESLint, Tailwind CSS v4, `src/` directory, and `@/*` import alias.
- Installed and verified compatible 3D and UI runtime packages (`three`, `@types/three`, `@react-three/fiber`, `@react-three/drei`, `motion`, `lucide-react`, `clsx`, `tailwind-merge`).
- Created the modular directory architecture (`src/components/{onboarding,world,navigation,panels,projects,common}`, `src/content`, `src/hooks`, `src/lib`, `src/types`, `src/styles`, `public/{models,textures,images/projects,icons}`).
- Defined shared TypeScript contracts in [`src/types/portfolio.ts`](./src/types/portfolio.ts) (`LocationId`, `ActiveSection`, `ViewMode`, `WorldDestination`, `ProfileData`, `Project`, `SkillCategory`, `EducationItem`, `ExperienceItem`, `AchievementItem`) and class-merging helper [`src/lib/cn.ts`](./src/lib/cn.ts).
- Configured the **Dark Sci-Fi / Game-Engine Viewport** base theme (obsidian/slate translucent HUD surfaces, scanlines/grid background, cyan/emerald telemetry tokens) in [`src/app/globals.css`](./src/app/globals.css), [`src/app/layout.tsx`](./src/app/layout.tsx), and the Phase 1 foundation status view in [`src/app/page.tsx`](./src/app/page.tsx).
- Verified `npm run lint` and `npm run build` pass cleanly.

### Upcoming Phases
- **Phase 2:** Vertical Slice PoC (`BootSequence.tsx` → lazy `WorldCanvas.tsx` with `Developer HQ` → `InformationPanel.tsx`)
- **Phase 3:** Typed portfolio content (`src/content/*`), Classic View, and `/projects/[slug]` case studies
- **Phase 4:** All 6 3D landmarks, demand-driven camera controller, and Game-Engine HUD
- **Phase 5:** Blender `.glb` model loader (`WorldModel.tsx`) & `glTF-Transform` optimization scripts
- **Phase 6:** Mobile touch ergonomics, `sitemap.ts`, `robots.ts`, Open Graph & JSON-LD SEO
- **Phase 7:** Performance budget QA (`AdaptiveDpr`, WebGL context recovery) & Vercel production readiness

---

## Project Structure

```text
ashens-world/
├── public/
│   ├── models/              # Exported & optimized .glb world models
│   ├── textures/
│   ├── images/projects/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── globals.css      # Dark Sci-Fi / Game-Engine Viewport theme tokens
│   │   ├── layout.tsx       # Root layout, Geist fonts & base metadata
│   │   └── page.tsx         # Entry page (currently Phase 1 foundation status)
│   ├── components/
│   │   ├── common/          # Classic view & shared UI primitives
│   │   ├── navigation/      # Persistent Game-Engine HUD & world map dock
│   │   ├── onboarding/      # Terminal boot sequence
│   │   ├── panels/          # Accessible HTML overlay panels
│   │   ├── projects/        # Case-study UI components
│   │   └── world/           # React Three Fiber Canvas, camera & 3D locations
│   ├── content/             # Typed portfolio & project data (Phase 3+)
│   ├── hooks/
│   ├── lib/
│   │   └── cn.ts
│   ├── styles/
│   └── types/
│       └── portfolio.ts     # Shared portfolio & 3D destination interfaces
├── PROGRESS.md              # Live phase & feature checklist
├── package.json
└── tsconfig.json
```

---

## Local Development

Run commands from inside the `ashens-world/` directory:

```bash
# Start development server
npm run dev

# Run ESLint
npm run lint

# Create optimized production build
npm run build

# Serve production build locally
npm run start
```
