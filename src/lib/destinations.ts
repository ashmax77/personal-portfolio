import type { WorldDestination } from "@/types/portfolio";

/**
 * World destination registry.
 * Phase 2 ships the vertical slice with a single landmark (Developer HQ).
 * Phase 4 extends this list to all six campus destinations.
 */
export const destinations: WorldDestination[] = [
  {
    id: "developer-hq",
    section: "about",
    label: "Developer HQ",
    shortCode: "HQ-01",
    subtitle: "Profile & Introduction",
    hotkey: "1",
    coordinates: [0, 0, 0],
    cameraPosition: [9, 7, 9],
    cameraTarget: [0, 1.5, 0],
    accentColor: "#00F0FF",
  },
];

export function getDestination(id: WorldDestination["id"]) {
  return destinations.find((destination) => destination.id === id);
}
