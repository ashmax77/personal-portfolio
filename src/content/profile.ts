import type { ProfileData } from "@/types/portfolio";

/**
 * Profile content used by the Developer HQ panel.
 *
 * TODO(Phase 3): Replace placeholder values with verified personal details
 * (role, bio, location, email, LinkedIn, CV). Phase 3 also adds the remaining
 * typed content files (projects, skills, education, experience, achievements).
 */
export const profile: ProfileData = {
  name: "Ashen Imalsha",
  handle: "ashmax77",
  role: "Software Developer",
  tagline: "Building software that feels engineered — and explorable.",
  bio: [
    "Welcome to Developer HQ, the command center of Ashen's World.",
    "This placeholder introduction will be replaced with a verified professional summary in Phase 3, when all portfolio content moves into typed content files.",
  ],
  location: "TBD",
  availability: "Open to opportunities",
  interests: ["Full-stack development", "3D on the web", "Game engines"],
  resumeUrl: "/resume.pdf",
  email: "",
  socials: {
    github: "https://github.com/ashmax77",
    linkedin: "",
  },
};
