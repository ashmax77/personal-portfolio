export type LocationId =
  | "developer-hq"
  | "project-lab"
  | "technology-center"
  | "academy"
  | "achievement-hall"
  | "communication-hub";

export type ActiveSection =
  | "about"
  | "projects"
  | "skills"
  | "education"
  | "experience"
  | "achievements"
  | "contact"
  | null;

export type ViewMode = "world" | "classic";

export interface WorldDestination {
  id: LocationId;
  section: Exclude<ActiveSection, null>;
  label: string;
  shortCode: string;
  subtitle: string;
  hotkey: string;
  coordinates: [number, number, number];
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  accentColor: string;
}

export interface ProfileData {
  name: string;
  handle: string;
  role: string;
  tagline: string;
  bio: string[];
  location: string;
  availability: string;
  interests: string[];
  resumeUrl: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    website?: string;
  };
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem?: string;
  category: string;
  role: string;
  team?: string;
  period: string;
  status: "completed" | "in-progress" | "prototype";
  technologies: string[];
  contributions: string[];
  teamContributions?: string[];
  architectureSummary?: string;
  techDecisions?: string[];
  implementationHighlights?: string[];
  challenges?: ProjectChallenge[];
  results?: string[];
  lessonsLearned?: string[];
  futureImprovements?: string[];
  thumbnail: string;
  github?: string;
  demo?: string;
  featured: boolean;
}

export interface SkillItem {
  name: string;
  level: "core" | "proficient" | "familiar";
  note?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  summary: string;
  items: SkillItem[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  status: "completed" | "in-progress";
  highlights: string[];
  coursework: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: "industry" | "leadership" | "academic" | "freelance";
  summary: string;
  highlights: string[];
  technologies: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: "competition" | "certification" | "milestone" | "award";
  description: string;
  credentialUrl?: string;
}
