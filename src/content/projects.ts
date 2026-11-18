import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    slug: "garbo",
    title: "Garbo",
    tagline: "Smart Waste Management & Collection Coordination Platform",
    description:
      "A multi-platform smart waste management solution connecting citizens, collection crews, and municipal operators through real-time pickup scheduling, route visibility, and reporting.",
    problem:
      "Urban waste collection often suffers from missed pickups, uncoordinated routes, and lack of visibility for residents when reporting overflowing bins or scheduling bulky waste collection.",
    category: "Full-Stack & Mobile",
    role: "Group Leader & Full-Stack Contributor",
    team: "4-member university engineering team",
    period: "2026",
    status: "in-progress",
    technologies: ["Next.js", "Flutter", "Spring Boot", "PostgreSQL", "REST APIs", "Tailwind CSS"],
    contributions: [
      "Led sprint planning, system architecture alignment, and milestone tracking across web, mobile, and backend tracks",
      "Designed the core PostgreSQL relational schema for collection zones, pickup requests, and crew assignments",
      "Implemented key REST API endpoints in Spring Boot and integrated the Next.js operations dashboard",
    ],
    teamContributions: [
      "Teammates developed the Flutter citizen/driver mobile screens and push notification flows",
      "Collaborative QA testing and API contract reviews across all 4 team members",
    ],
    architectureSummary:
      "A decoupled three-client architecture: a Next.js web portal for municipal operators, a Flutter mobile app for residents and drivers, and a Spring Boot REST API backed by PostgreSQL for scheduling, role-based access, and status telemetry.",
    techDecisions: [
      "Chose Spring Boot + PostgreSQL for strong transactional consistency around pickup assignments and status transitions",
      "Selected Next.js App Router for the operator dashboard to share TypeScript contracts and enable fast server-rendered reporting views",
      "Used Flutter for cross-platform citizen and driver apps from a single Dart codebase",
    ],
    implementationHighlights: [
      "Completed: Core domain entities, database migrations, authentication flow, and operator dashboard layout",
      "In Progress: Live route optimization heuristics and automated driver dispatch notifications",
    ],
    challenges: [
      {
        challenge: "Keeping web and mobile teams unblocked while API schemas were still evolving.",
        solution:
          "Defined versioned OpenAPI/JSON contracts early and seeded mock fixtures so frontend and Flutter development could proceed in parallel.",
      },
      {
        challenge: "Preventing duplicate crew assignments when multiple operators update a zone concurrently.",
        solution:
          "Enforced optimistic locking and status-transition validation at the Spring Boot service layer.",
      },
    ],
    results: [
      "Core scheduling, zone management, and request-tracking workflows verified in integration testing",
      "Zero schema-drift blockers across web and mobile sprints after adopting shared API contracts",
    ],
    lessonsLearned: [
      "Clear API contracts and ownership boundaries matter more than feature velocity in multi-stack team projects",
      "Separating completed capabilities from planned milestones builds trust during technical reviews",
    ],
    futureImprovements: [
      "Integrate map-based route clustering for high-density collection zones",
      "Add IoT fill-level sensor ingestion for smart bin telemetry",
    ],
    thumbnail: "/images/projects/garbo.webp",
    github: "https://github.com/ashmax77",
    featured: true,
  },
  {
    slug: "vyroflix",
    title: "Vyroflix",
    tagline: "High-Responsiveness Media Discovery & Streaming Interface",
    description:
      "A modern video and media discovery web application focused on fast catalog browsing, clean metadata presentation, watchlist persistence, and responsive playback ergonomics.",
    problem:
      "Many media catalog prototypes feel sluggish due to unoptimized image grids, blocking API fetches, and cluttered detail views that bury key metadata.",
    category: "Frontend & Web Platform",
    role: "Lead Developer",
    team: "Solo / Independent Build",
    period: "2025",
    status: "completed",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "Responsive UI"],
    contributions: [
      "Architected the entire Next.js App Router frontend, reusable media cards, and detail view layouts",
      "Implemented debounced search, genre filtering, and client-side watchlist state",
      "Optimized image loading and skeleton states to minimize layout shift on mobile and desktop",
    ],
    architectureSummary:
      "Server-rendered catalog routes paired with lightweight client islands for search, filtering, and interactive watchlist management.",
    techDecisions: [
      "Used Next.js Server Components for initial catalog hydration to keep client JavaScript bundles small",
      "Adopted Tailwind CSS utility tokens for consistent card density across mobile, tablet, and widescreen viewports",
    ],
    implementationHighlights: [
      "Category carousels with keyboard-accessible navigation and instant search filtering",
      "Persistent local watchlist and detail pages with cast, synopsis, and trailer links",
    ],
    challenges: [
      {
        challenge: "Maintaining smooth scroll performance across dense poster grids on mid-range mobile devices.",
        solution:
          "Applied responsive image sizing, lazy loading below the fold, and CSS aspect-ratio containers to eliminate reflows.",
      },
    ],
    results: [
      "Delivered a complete, responsive media browsing experience with zero layout-shift regressions",
      "Verified clean keyboard navigation and mobile viewport usability",
    ],
    lessonsLearned: [
      "Perceived performance depends heavily on predictable skeleton states and image aspect ratios",
    ],
    futureImprovements: [
      "Add personalized recommendation rows backed by user watch history",
    ],
    thumbnail: "/images/projects/vyroflix.webp",
    github: "https://github.com/ashmax77",
    featured: true,
  },
  {
    slug: "cognifyai",
    title: "CognifyAI",
    tagline: "AI-Assisted Study & Knowledge Synthesis Workspace",
    description:
      "An intelligent study companion prototype that helps students organize notes, summarize technical readings, and generate targeted self-assessment quizzes.",
    problem:
      "Students reviewing dense lecture notes and documentation often struggle to turn passive reading into active recall without spending hours formatting flashcards.",
    category: "AI & Web Application",
    role: "Full-Stack Developer",
    team: "Solo Prototype",
    period: "2025",
    status: "prototype",
    technologies: ["TypeScript", "React", "Next.js", "LLM APIs", "Tailwind CSS"],
    contributions: [
      "Built the note ingestion UI, structured prompt pipeline, and interactive quiz review mode",
      "Designed JSON-schema-validated response parsing so generated study cards render reliably",
      "Implemented rate-limiting and error fallback states for resilient API calls",
    ],
    architectureSummary:
      "A Next.js client workspace communicating with a server-side API route that structures study material into validated summary and quiz JSON payloads.",
    techDecisions: [
      "Kept LLM API keys strictly server-side inside Next.js Route Handlers",
      "Enforced structured JSON output schemas rather than raw markdown blobs so flashcards and quizzes stay interactive",
    ],
    implementationHighlights: [
      "Structured note-to-quiz pipeline with instant score feedback",
      "Clean distraction-free reading and recall interface",
    ],
    challenges: [
      {
        challenge: "Handling inconsistent LLM output formatting when generating multi-choice questions.",
        solution:
          "Added strict schema validation with graceful retry/fallback parsing on the server route.",
      },
    ],
    results: [
      "Working end-to-end prototype capable of converting lecture summaries into interactive quizzes",
    ],
    lessonsLearned: [
      "Structured output contracts turn generative AI from a chat box into a dependable UI feature",
    ],
    futureImprovements: [
      "Add spaced-repetition scheduling and PDF/Markdown document upload",
    ],
    thumbnail: "/images/projects/cognifyai.webp",
    github: "https://github.com/ashmax77",
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
