"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import type { LocationId, WorldDestination } from "@/types/portfolio";
import { destinations } from "@/lib/destinations";
import LandmarkLabel from "./LandmarkLabel";

const BASE_COLOR = "#1E293B";
const TRIM_COLOR = "#334155";
const SLATE_LIGHT = "#475569";

type InteractiveLandmarkProps = {
  destination: WorldDestination;
  selected: boolean;
  labelHeight: number;
  onSelect: (id: LocationId) => void;
  children: (active: boolean) => ReactNode;
};

function InteractiveLandmark({
  destination,
  selected,
  labelHeight,
  onSelect,
  children,
}: InteractiveLandmarkProps) {
  const [hovered, setHovered] = useState(false);
  const active = hovered || selected;

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(destination.id);
  };

  return (
    <group position={destination.coordinates}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[2.15, 2.42, 48]} />
        <meshBasicMaterial
          color={selected ? "#10B981" : destination.accentColor}
          transparent
          opacity={active ? 0.92 : 0.25}
        />
      </mesh>

      <group
        scale={hovered ? 1.04 : 1}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        {/* Invisible generous hitbox for mobile touch accuracy */}
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[2.3, 2.3, 3.6, 12]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        {children(active)}
      </group>

      <LandmarkLabel
        position={[0, labelHeight, 0]}
        text={`${destination.shortCode} · ${destination.label.toUpperCase()}`}
        active={active}
        accentColor={destination.accentColor}
      />
    </group>
  );
}

function DeveloperHQMesh({ active, accent }: { active: boolean; accent: string }) {
  return (
    <>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[3.4, 0.4, 3.4]} />
        <meshStandardMaterial color={TRIM_COLOR} flatShading />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[2.6, 2, 2.6]} />
        <meshStandardMaterial
          color={BASE_COLOR}
          emissive={accent}
          emissiveIntensity={active ? 0.2 : 0.04}
          flatShading
        />
      </mesh>
      <mesh position={[0, 1.55, 0]}>
        <boxGeometry args={[2.66, 0.42, 2.66]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={active ? 0.9 : 0.45}
          flatShading
        />
      </mesh>
      <mesh position={[0, 2.95, 0]}>
        <boxGeometry args={[1.5, 1.1, 1.5]} />
        <meshStandardMaterial color={TRIM_COLOR} flatShading />
      </mesh>
      <mesh position={[0, 4.0, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 1, 6]} />
        <meshStandardMaterial color="#94A3B8" />
      </mesh>
      <mesh position={[0, 4.55, 0]}>
        <sphereGeometry args={[0.14, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.2} />
      </mesh>
    </>
  );
}

function ProjectLabMesh({ active, accent }: { active: boolean; accent: string }) {
  return (
    <>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[3.4, 0.4, 2.8]} />
        <meshStandardMaterial color={TRIM_COLOR} flatShading />
      </mesh>
      <mesh position={[-0.45, 1.25, 0]}>
        <boxGeometry args={[2.1, 1.7, 2.2]} />
        <meshStandardMaterial
          color={BASE_COLOR}
          emissive={accent}
          emissiveIntensity={active ? 0.2 : 0.04}
          flatShading
        />
      </mesh>
      <mesh position={[0.9, 1.0, 0]}>
        <cylinderGeometry args={[0.65, 0.75, 1.2, 8]} />
        <meshStandardMaterial color={SLATE_LIGHT} flatShading />
      </mesh>
      <mesh position={[0.9, 1.7, 0]}>
        <sphereGeometry args={[0.55, 10, 8]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={active ? 0.9 : 0.45}
          flatShading
        />
      </mesh>
      <mesh position={[-0.45, 2.3, 0]}>
        <boxGeometry args={[1.4, 0.4, 1.4]} />
        <meshStandardMaterial color={TRIM_COLOR} flatShading />
      </mesh>
    </>
  );
}

function TechnologyCenterMesh({ active, accent }: { active: boolean; accent: string }) {
  return (
    <>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[1.8, 2.0, 0.4, 6]} />
        <meshStandardMaterial color={TRIM_COLOR} flatShading />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 2.4, 6]} />
        <meshStandardMaterial
          color={BASE_COLOR}
          emissive={accent}
          emissiveIntensity={active ? 0.2 : 0.04}
          flatShading
        />
      </mesh>
      {[0.9, 1.6, 2.3].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[1.32, 1.32, 0.14, 6]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={active ? 0.95 : 0.5}
          />
        </mesh>
      ))}
      <mesh position={[0, 3.25, 0]}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={active ? 1.1 : 0.6}
          flatShading
        />
      </mesh>
    </>
  );
}

function AcademyMesh({ active, accent }: { active: boolean; accent: string }) {
  return (
    <>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[3.4, 0.4, 3.0]} />
        <meshStandardMaterial color={TRIM_COLOR} flatShading />
      </mesh>
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[2.8, 1.5, 2.4]} />
        <meshStandardMaterial
          color={BASE_COLOR}
          emissive={accent}
          emissiveIntensity={active ? 0.18 : 0.04}
          flatShading
        />
      </mesh>
      {/* Campus roof */}
      <mesh position={[0, 2.35, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2.1, 1.0, 4]} />
        <meshStandardMaterial color={SLATE_LIGHT} flatShading />
      </mesh>
      <mesh position={[0, 1.2, 1.22]}>
        <boxGeometry args={[1.8, 0.28, 0.08]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={active ? 0.9 : 0.45}
        />
      </mesh>
    </>
  );
}

function AchievementHallMesh({ active, accent }: { active: boolean; accent: string }) {
  return (
    <>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[1.9, 2.1, 0.4, 8]} />
        <meshStandardMaterial color={TRIM_COLOR} flatShading />
      </mesh>
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[1.45, 1.6, 1.5, 8]} />
        <meshStandardMaterial
          color={BASE_COLOR}
          emissive={accent}
          emissiveIntensity={active ? 0.2 : 0.04}
          flatShading
        />
      </mesh>
      <mesh position={[0, 2.15, 0]}>
        <sphereGeometry args={[1.15, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={SLATE_LIGHT} flatShading />
      </mesh>
      <mesh position={[0, 3.15, 0]}>
        <octahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={active ? 1.2 : 0.65}
          flatShading
        />
      </mesh>
    </>
  );
}

function CommunicationHubMesh({ active, accent }: { active: boolean; accent: string }) {
  return (
    <>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[3.0, 0.4, 3.0]} />
        <meshStandardMaterial color={TRIM_COLOR} flatShading />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[2.2, 1.7, 2.2]} />
        <meshStandardMaterial
          color={BASE_COLOR}
          emissive={accent}
          emissiveIntensity={active ? 0.2 : 0.04}
          flatShading
        />
      </mesh>
      {/* Comms mast */}
      <mesh position={[0.3, 2.9, 0]}>
        <cylinderGeometry args={[0.08, 0.14, 1.8, 6]} />
        <meshStandardMaterial color="#94A3B8" />
      </mesh>
      {/* Dish */}
      <mesh position={[-0.35, 2.55, 0.2]} rotation={[0.6, 0.3, 0.5]}>
        <coneGeometry args={[0.65, 0.35, 10, 1, true]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={active ? 0.85 : 0.4}
          side={2}
          flatShading
        />
      </mesh>
      <mesh position={[0.3, 3.9, 0]}>
        <sphereGeometry args={[0.16, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.2} />
      </mesh>
    </>
  );
}

const LANDMARK_RENDERERS: Record<
  LocationId,
  { labelHeight: number; render: (active: boolean, accent: string) => ReactNode }
> = {
  "developer-hq": {
    labelHeight: 5.2,
    render: (active, accent) => <DeveloperHQMesh active={active} accent={accent} />,
  },
  "project-lab": {
    labelHeight: 3.4,
    render: (active, accent) => <ProjectLabMesh active={active} accent={accent} />,
  },
  "technology-center": {
    labelHeight: 4.4,
    render: (active, accent) => <TechnologyCenterMesh active={active} accent={accent} />,
  },
  academy: {
    labelHeight: 3.6,
    render: (active, accent) => <AcademyMesh active={active} accent={accent} />,
  },
  "achievement-hall": {
    labelHeight: 4.1,
    render: (active, accent) => <AchievementHallMesh active={active} accent={accent} />,
  },
  "communication-hub": {
    labelHeight: 4.5,
    render: (active, accent) => <CommunicationHubMesh active={active} accent={accent} />,
  },
};

export default function WorldLocations({
  selectedId,
  onSelect,
}: {
  selectedId: LocationId | null;
  onSelect: (id: LocationId) => void;
}) {
  return (
    <group>
      {destinations.map((destination) => {
        const config = LANDMARK_RENDERERS[destination.id];
        return (
          <InteractiveLandmark
            key={destination.id}
            destination={destination}
            selected={selectedId === destination.id}
            labelHeight={config.labelHeight}
            onSelect={onSelect}
          >
            {(active) => config.render(active, destination.accentColor)}
          </InteractiveLandmark>
        );
      })}
    </group>
  );
}
