import type { LocationId } from "@/types/portfolio";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export interface GLBAssetSpec {
  /** Path relative to `public/` (e.g. "/models/developer-hq.glb"). */
  path: string;
  scale?: number;
  position?: [number, number, number];
  rotationY?: number;
}

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}

/**
 * Option B: Individual `.glb` overrides for landmarks.
 * Drop a `.glb` file into `public/models/` and set its spec below
 * (e.g. `{ path: "/models/developer-hq.glb", scale: 1.2 }`).
 * Leave `null` to use the built-in procedural 3D model.
 */
export const LANDMARK_MODELS: Record<LocationId, GLBAssetSpec | null> = {
  "developer-hq": null,
  "project-lab": null,
  "technology-center": null,
  academy: null,
  "achievement-hall": null,
  "communication-hub": null,
};

/**
 * Option B: Individual `.glb` overrides for animated creatures & drones.
 */
export const CREATURE_MODELS: {
  drone: GLBAssetSpec | null;
  bird: GLBAssetSpec | null;
} = {
  drone: null,
  bird: null,
};
