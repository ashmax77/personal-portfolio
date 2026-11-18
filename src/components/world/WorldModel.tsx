"use client";

import { useEffect, useMemo, useState } from "react";
import { useGLTF } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import type { LocationId } from "@/types/portfolio";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const MODEL_URL = `${BASE_PATH}/models/world.optimized.glb`;

const BLENDER_NAME_TO_LOCATION: Record<string, LocationId> = {
  DEVELOPER_HQ: "developer-hq",
  PROJECT_LAB: "project-lab",
  TECHNOLOGY_CENTER: "technology-center",
  ACADEMY: "academy",
  ACHIEVEMENT_HALL: "achievement-hall",
  CONTACT_HUB: "communication-hub",
  COMMUNICATION_HUB: "communication-hub",
};

function resolveLocationId(object: THREE.Object3D | null): LocationId | null {
  let current: THREE.Object3D | null = object;
  while (current) {
    const key = current.name.trim().toUpperCase();
    if (key in BLENDER_NAME_TO_LOCATION) {
      return BLENDER_NAME_TO_LOCATION[key];
    }
    current = current.parent;
  }
  return null;
}

type WorldModelProps = {
  onSelect: (id: LocationId) => void;
};

export default function WorldModel({ onSelect }: WorldModelProps) {
  const { scene } = useGLTF(MODEL_URL);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const [hoveredId, setHoveredId] = useState<LocationId | null>(null);

  useEffect(() => {
    document.body.style.cursor = hoveredId ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hoveredId]);

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    const locationId = resolveLocationId(event.object);
    if (locationId) {
      event.stopPropagation();
      if (hoveredId !== locationId) setHoveredId(locationId);
    } else if (hoveredId !== null) {
      setHoveredId(null);
    }
  };

  const handlePointerOut = () => {
    if (hoveredId !== null) setHoveredId(null);
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    const locationId = resolveLocationId(event.object);
    if (locationId) {
      event.stopPropagation();
      onSelect(locationId);
    }
  };

  return (
    <primitive
      object={clonedScene}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    />
  );
}
