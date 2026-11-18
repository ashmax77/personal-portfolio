import type { SkillCategory } from "@/types/portfolio";

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages & Core",
    summary: "Strongly typed application development across web, mobile, and backend services.",
    items: [
      { name: "TypeScript", level: "core" },
      { name: "JavaScript (ES2023+)", level: "core" },
      { name: "Java", level: "proficient" },
      { name: "Python", level: "proficient" },
      { name: "Dart", level: "familiar" },
      { name: "SQL", level: "proficient" },
    ],
  },
  {
    id: "frontend-3d",
    title: "Frontend & Interactive 3D",
    summary: "Accessible, responsive web interfaces paired with lightweight WebGL experiences.",
    items: [
      { name: "Next.js (App Router)", level: "core" },
      { name: "React", level: "core" },
      { name: "Tailwind CSS", level: "core" },
      { name: "Three.js / React Three Fiber", level: "proficient" },
      { name: "Motion (Framer Motion)", level: "proficient" },
      { name: "Flutter", level: "familiar" },
    ],
  },
  {
    id: "backend-data",
    title: "Backend & Data",
    summary: "Clean REST APIs, relational data modeling, and server-side validation.",
    items: [
      { name: "Spring Boot", level: "proficient" },
      { name: "PostgreSQL", level: "proficient" },
      { name: "Node.js", level: "proficient" },
      { name: "REST API Design", level: "core" },
    ],
  },
  {
    id: "tooling-3d",
    title: "Engineering & 3D Pipeline",
    summary: "Version control, asset optimization, and production deployment workflows.",
    items: [
      { name: "Git & GitHub", level: "core" },
      { name: "Vercel", level: "core" },
      { name: "Blender (Low-Poly / GLB)", level: "familiar" },
      { name: "glTF-Transform", level: "familiar" },
    ],
  },
];
