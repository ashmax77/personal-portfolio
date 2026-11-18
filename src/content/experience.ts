import type { ExperienceItem } from "@/types/portfolio";

export const experience: ExperienceItem[] = [
  {
    id: "garbo-lead",
    role: "Team Leader & Full-Stack Contributor",
    organization: "Garbo Smart Waste Platform (Group Project)",
    period: "2026 — Present",
    type: "leadership",
    summary:
      "Coordinating architecture, sprint planning, and full-stack delivery across Next.js, Flutter, Spring Boot, and PostgreSQL.",
    highlights: [
      "Defined API contracts and database schemas so web and mobile tracks could ship in parallel",
      "Implemented core backend services and operator dashboard components",
    ],
    technologies: ["Next.js", "Spring Boot", "PostgreSQL", "Flutter"],
  },
  {
    id: "independent-builder",
    role: "Independent Full-Stack & 3D Web Developer",
    organization: "Personal Engineering Portfolio & Prototypes",
    period: "2024 — Present",
    type: "academic",
    summary:
      "Designing and shipping end-to-end web applications, AI study tools, and performance-budgeted 3D web experiences.",
    highlights: [
      "Built Ashen's World using demand-rendered React Three Fiber paired with accessible Next.js App Router pages",
      "Developed Vyroflix and CognifyAI prototypes with clean TypeScript architectures",
    ],
    technologies: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS"],
  },
];
