import type { WorldDestination } from "@/types/portfolio";

export const OVERVIEW_CAMERA = {
  position: [20, 17, 20] as [number, number, number],
  target: [0, 0.8, 0] as [number, number, number],
};

export const destinations: WorldDestination[] = [
  {
    id: "developer-hq",
    section: "about",
    label: "Developer HQ",
    shortCode: "HQ-01",
    subtitle: "Profile & Introduction",
    hotkey: "1",
    coordinates: [0, 0, 0],
    cameraPosition: [8, 7, 8],
    cameraTarget: [0, 1.5, 0],
    accentColor: "#00F0FF",
  },
  {
    id: "project-lab",
    section: "projects",
    label: "Project Lab",
    shortCode: "LAB-02",
    subtitle: "Projects & Case Studies",
    hotkey: "2",
    coordinates: [8, 0, -3],
    cameraPosition: [15, 7.5, 4],
    cameraTarget: [8, 1.4, -3],
    accentColor: "#38BDF8",
  },
  {
    id: "technology-center",
    section: "skills",
    label: "Technology Center",
    shortCode: "TECH-03",
    subtitle: "Languages & Stack",
    hotkey: "3",
    coordinates: [-7.5, 0, -4.5],
    cameraPosition: [-1, 7.5, 3],
    cameraTarget: [-7.5, 1.8, -4.5],
    accentColor: "#818CF8",
  },
  {
    id: "academy",
    section: "education",
    label: "Academy",
    shortCode: "ACAD-04",
    subtitle: "Education & Coursework",
    hotkey: "4",
    coordinates: [-7.5, 0, 6],
    cameraPosition: [-1, 7.5, 13],
    cameraTarget: [-7.5, 1.3, 6],
    accentColor: "#34D399",
  },
  {
    id: "achievement-hall",
    section: "achievements",
    label: "Achievement Hall",
    shortCode: "HALL-05",
    subtitle: "Awards & Milestones",
    hotkey: "5",
    coordinates: [0, 0, -9],
    cameraPosition: [6.5, 7.5, -2],
    cameraTarget: [0, 1.5, -9],
    accentColor: "#FBBF24",
  },
  {
    id: "communication-hub",
    section: "contact",
    label: "Communication Hub",
    shortCode: "COMM-06",
    subtitle: "Experience, CV & Contact",
    hotkey: "6",
    coordinates: [7.5, 0, 6.5],
    cameraPosition: [14, 7.5, 13],
    cameraTarget: [7.5, 1.8, 6.5],
    accentColor: "#F472B6",
  },
];

export function getDestination(id: WorldDestination["id"]) {
  return destinations.find((destination) => destination.id === id);
}
