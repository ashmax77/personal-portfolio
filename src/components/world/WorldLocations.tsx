"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import type * as THREE from "three";
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

function DeveloperHQMesh({
  active,
  accent,
  animate,
}: {
  active: boolean;
  accent: string;
  animate: boolean;
}) {
  const beaconRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!animate || !beaconRef.current) return;
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 3.2) * 0.18;
    beaconRef.current.scale.setScalar(pulse);
  });

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
      <mesh ref={beaconRef} position={[0, 4.55, 0]}>
        <sphereGeometry args={[0.14, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.2} />
      </mesh>
    </>
  );
}

function ProjectLabMesh({
  active,
  accent,
  animate,
}: {
  active: boolean;
  accent: string;
  animate: boolean;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (!animate || !ringRef.current) return;
    ringRef.current.rotation.z += Math.min(delta, 0.05) * 0.9;
    ringRef.current.position.y = 1.7 + Math.sin(clock.getElapsedTime() * 2) * 0.08;
  });

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
      <mesh ref={ringRef} position={[0.9, 1.7, 0]} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[0.82, 0.045, 6, 20]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[-0.45, 2.3, 0]}>
        <boxGeometry args={[1.4, 0.4, 1.4]} />
        <meshStandardMaterial color={TRIM_COLOR} flatShading />
      </mesh>
    </>
  );
}

function TechnologyCenterMesh({
  active,
  accent,
  animate,
}: {
  active: boolean;
  accent: string;
  animate: boolean;
}) {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (!animate || !coreRef.current) return;
    coreRef.current.rotation.y += Math.min(delta, 0.05) * 0.85;
    coreRef.current.position.y = 3.25 + Math.sin(clock.getElapsedTime() * 2.2) * 0.14;
  });

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
      <mesh ref={coreRef} position={[0, 3.25, 0]}>
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

function AchievementHallMesh({
  active,
  accent,
  animate,
}: {
  active: boolean;
  accent: string;
  animate: boolean;
}) {
  const trophyRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (!animate || !trophyRef.current) return;
    trophyRef.current.rotation.y += Math.min(delta, 0.05) * 1.1;
    trophyRef.current.position.y = 3.15 + Math.sin(clock.getElapsedTime() * 2.4) * 0.12;
  });

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
      <mesh ref={trophyRef} position={[0, 3.15, 0]}>
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

function CommunicationHubMesh({
  active,
  accent,
  animate,
}: {
  active: boolean;
  accent: string;
  animate: boolean;
}) {
  const dishRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.getElapsedTime();
    if (dishRef.current) {
      dishRef.current.rotation.y = 0.3 + Math.sin(t * 0.9) * 0.45;
    }
    if (pulseRef.current) {
      pulseRef.current.scale.setScalar(1 + Math.sin(t * 4) * 0.2);
    }
  });

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
      <mesh position={[0.3, 2.9, 0]}>
        <cylinderGeometry args={[0.08, 0.14, 1.8, 6]} />
        <meshStandardMaterial color="#94A3B8" />
      </mesh>
      <mesh ref={dishRef} position={[-0.35, 2.55, 0.2]} rotation={[0.6, 0.3, 0.5]}>
        <coneGeometry args={[0.65, 0.35, 10, 1, true]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={active ? 0.85 : 0.4}
          side={2}
          flatShading
        />
      </mesh>
      <mesh ref={pulseRef} position={[0.3, 3.9, 0]}>
        <sphereGeometry args={[0.16, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.2} />
      </mesh>
    </>
  );
}

const LANDMARK_RENDERERS: Record<
  LocationId,
  {
    labelHeight: number;
    render: (active: boolean, accent: string, animate: boolean) => ReactNode;
  }
> = {
  "developer-hq": {
    labelHeight: 5.2,
    render: (active, accent, animate) => (
      <DeveloperHQMesh active={active} accent={accent} animate={animate} />
    ),
  },
  "project-lab": {
    labelHeight: 3.4,
    render: (active, accent, animate) => (
      <ProjectLabMesh active={active} accent={accent} animate={animate} />
    ),
  },
  "technology-center": {
    labelHeight: 4.4,
    render: (active, accent, animate) => (
      <TechnologyCenterMesh active={active} accent={accent} animate={animate} />
    ),
  },
  academy: {
    labelHeight: 3.6,
    render: (active, accent) => <AcademyMesh active={active} accent={accent} />,
  },
  "achievement-hall": {
    labelHeight: 4.1,
    render: (active, accent, animate) => (
      <AchievementHallMesh active={active} accent={accent} animate={animate} />
    ),
  },
  "communication-hub": {
    labelHeight: 4.5,
    render: (active, accent, animate) => (
      <CommunicationHubMesh active={active} accent={accent} animate={animate} />
    ),
  },
};

export default function WorldLocations({
  selectedId,
  animate,
  onSelect,
}: {
  selectedId: LocationId | null;
  animate: boolean;
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
            {(active) => config.render(active, destination.accentColor, animate)}
          </InteractiveLandmark>
        );
      })}
    </group>
  );
}
