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

## Development Progress

All **7 implementation phases** are complete and verified. Detailed per-feature tracking lives in [`PROGRESS.md`](./PROGRESS.md).

- **Phase 1:** Next.js App Router, TypeScript, Tailwind CSS v4, R3F/Drei/Three.js/Motion dependencies, Dark Sci-Fi HUD theme
- **Phase 2:** Terminal `BootSequence`, lazy-loaded `WorldCanvas`, WebGL fallback, and HTML `InformationPanel`
- **Phase 3:** Typed portfolio data (`src/content/*`), `ClassicPortfolioView`, `/projects/[slug]` case studies, `/about`, `/experience`, `/contact`
- **Phase 4:** All 6 3D campus destinations, demand-driven `WorldCamera`, persistent `WorldHUD` & `1`–`6` hotkey `WorldNavigation`, and all 6 HTML panels
- **Phase 5:** `WorldModel` GLB loader with Blender collection binding + `@gltf-transform/cli` optimization scripts (`model:inspect`, `model:optimize`)
- **Phase 6:** Mobile touch hitboxes, `touch-none` canvas, bottom-sheet panel ergonomics, `/sitemap.xml`, `/robots.txt`, Open Graph & JSON-LD `Person` metadata
- **Phase 7:** `<AdaptiveDpr pixelated />`, `<AdaptiveEvents />`, WebGL context-loss recovery, and production build/route verification

---

## Project Structure

```text
personal-portfolio/ (Ashen's World)
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

Run commands from the repository root:

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

---

## CI/CD & Deployment

- **Continuous Integration ([`.github/workflows/ci.yml`](./.github/workflows/ci.yml)):** Automatically runs `npm ci`, `npm run lint`, `npx tsc --noEmit`, and `npm run build` on every push and pull request to `main`.
- **Continuous Deployment ([`vercel.json`](./vercel.json)):** Connect this repository to [Vercel](https://vercel.com) for automatic preview deployments on pull requests and production deployments on every merge/push to `main`.
