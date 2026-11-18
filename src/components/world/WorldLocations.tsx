"use client";

import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { RoundedBox } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import type * as THREE from "three";
import type { LocationId, WorldDestination } from "@/types/portfolio";
import { destinations } from "@/lib/destinations";
import { LANDMARK_MODELS } from "@/lib/modelManifest";
import CustomGLBAsset from "./CustomGLBAsset";
import LandmarkLabel from "./LandmarkLabel";
import WorldErrorBoundary from "./WorldErrorBoundary";

const BASE_WALL = "#1A2438";
const DARK_METAL = "#0F172A";
const TRIM_METAL = "#475569";
const LIGHT_STONE = "#334155";

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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[2.25, 2.52, 48]} />
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
          <cylinderGeometry args={[2.35, 2.35, 3.6, 12]} />
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
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 3.2) * 0.2;
    beaconRef.current.scale.setScalar(pulse);
  });

  return (
    <>
      {/* Stepped foundation */}
      <RoundedBox args={[3.7, 0.36, 3.7]} radius={0.08} smoothness={2} position={[0, 0.18, 0]}>
        <meshStandardMaterial color={DARK_METAL} metalness={0.5} roughness={0.45} />
      </RoundedBox>
      {/* Lower command block */}
      <RoundedBox args={[2.8, 1.4, 2.8]} radius={0.1} smoothness={3} position={[0, 1.05, 0]}>
        <meshStandardMaterial
          color={BASE_WALL}
          emissive={accent}
          emissiveIntensity={active ? 0.16 : 0.03}
          metalness={0.35}
          roughness={0.55}
        />
      </RoundedBox>
      {/* Corner structural fins */}
      {[
        [-1.38, -1.38],
        [1.38, -1.38],
        [-1.38, 1.38],
        [1.38, 1.38],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 1.15, z]}>
          <boxGeometry args={[0.18, 1.7, 0.18]} />
          <meshStandardMaterial color={TRIM_METAL} metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
      {/* Glowing panoramic visor band */}
      <RoundedBox args={[2.88, 0.34, 2.88]} radius={0.06} smoothness={2} position={[0, 1.35, 0]}>
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={active ? 1.0 : 0.55}
          metalness={0.2}
          roughness={0.15}
        />
      </RoundedBox>
      {/* Upper bridge tower */}
      <RoundedBox args={[1.8, 1.1, 1.8]} radius={0.1} smoothness={3} position={[0, 2.25, 0]}>
        <meshStandardMaterial color={LIGHT_STONE} metalness={0.45} roughness={0.4} />
      </RoundedBox>
      <RoundedBox args={[1.86, 0.22, 1.86]} radius={0.04} smoothness={2} position={[0, 2.38, 0]}>
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={active ? 0.95 : 0.45}
        />
      </RoundedBox>
      {/* Rooftop solar wings */}
      <mesh position={[-1.1, 2.85, 0]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[0.85, 0.06, 1.2]} />
        <meshStandardMaterial color="#0284C7" metalness={0.75} roughness={0.2} />
      </mesh>
      <mesh position={[1.1, 2.85, 0]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[0.85, 0.06, 1.2]} />
        <meshStandardMaterial color="#0284C7" metalness={0.75} roughness={0.2} />
      </mesh>
      {/* Spire + beacon */}
      <mesh position={[0, 3.45, 0]}>
        <cylinderGeometry args={[0.04, 0.09, 1.3, 8]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh ref={beaconRef} position={[0, 4.18, 0]}>
        <sphereGeometry args={[0.15, 10, 10]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.4} />
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
  const innerRingRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (!animate) return;
    const dt = Math.min(delta, 0.05);
    if (ringRef.current) {
      ringRef.current.rotation.z += dt * 0.95;
      ringRef.current.position.y = 1.75 + Math.sin(clock.getElapsedTime() * 2) * 0.08;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x -= dt * 1.1;
    }
  });

  return (
    <>
      <RoundedBox args={[3.7, 0.35, 3.0]} radius={0.08} smoothness={2} position={[0, 0.175, 0]}>
        <meshStandardMaterial color={DARK_METAL} metalness={0.5} roughness={0.45} />
      </RoundedBox>
      {/* Main R&D Hangar */}
      <RoundedBox args={[2.2, 1.65, 2.2]} radius={0.12} smoothness={3} position={[-0.5, 1.15, 0]}>
        <meshStandardMaterial
          color={BASE_WALL}
          emissive={accent}
          emissiveIntensity={active ? 0.16 : 0.03}
          metalness={0.35}
          roughness={0.5}
        />
      </RoundedBox>
      {/* Glowing skylight strip */}
      <RoundedBox args={[1.5, 0.25, 2.26]} radius={0.05} smoothness={2} position={[-0.5, 1.98, 0]}>
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={active ? 0.95 : 0.45}
        />
      </RoundedBox>
      {/* Side reactor pod */}
      <mesh position={[1.0, 0.9, 0]}>
        <cylinderGeometry args={[0.68, 0.78, 1.1, 10]} />
        <meshStandardMaterial color={TRIM_METAL} metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[1.0, 1.75, 0]}>
        <sphereGeometry args={[0.52, 14, 12]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={active ? 1.0 : 0.5}
          metalness={0.2}
          roughness={0.15}
        />
      </mesh>
      <mesh ref={ringRef} position={[1.0, 1.75, 0]} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[0.84, 0.045, 8, 24]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.95} />
      </mesh>
      <mesh ref={innerRingRef} position={[1.0, 1.75, 0]} rotation={[0.4, 0.5, 0]}>
        <torusGeometry args={[0.7, 0.03, 6, 20]} />
        <meshStandardMaterial color="#E0F2FE" emissive="#E0F2FE" emissiveIntensity={0.7} />
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
  const coreRef = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    if (!animate || !coreRef.current) return;
    coreRef.current.rotation.y += Math.min(delta, 0.05) * 0.9;
    coreRef.current.position.y = 3.35 + Math.sin(clock.getElapsedTime() * 2.2) * 0.14;
  });

  return (
    <>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[1.85, 2.05, 0.36, 6]} />
        <meshStandardMaterial color={DARK_METAL} metalness={0.5} roughness={0.45} />
      </mesh>
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[1.18, 1.42, 2.4, 6]} />
        <meshStandardMaterial
          color={BASE_WALL}
          emissive={accent}
          emissiveIntensity={active ? 0.18 : 0.04}
          metalness={0.4}
          roughness={0.45}
        />
      </mesh>
      {/* Glowing data rings */}
      {[0.85, 1.55, 2.25].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[1.34, 1.34, 0.12, 6]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={active ? 1.0 : 0.55}
          />
        </mesh>
      ))}
      {/* Vertical cooling ribs */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.28, 1.55, Math.sin(angle) * 1.28]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.12, 2.2, 0.22]} />
            <meshStandardMaterial color={TRIM_METAL} metalness={0.7} roughness={0.3} />
          </mesh>
        );
      })}
      {/* Floating dual-layer octahedron core */}
      <group ref={coreRef} position={[0, 3.35, 0]}>
        <mesh>
          <octahedronGeometry args={[0.52, 0]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={active ? 1.2 : 0.7}
            metalness={0.3}
            roughness={0.15}
          />
        </mesh>
        <mesh rotation={[0.4, 0.4, 0]}>
          <octahedronGeometry args={[0.72, 0]} />
          <meshStandardMaterial color="#E0E7FF" wireframe transparent opacity={0.45} />
        </mesh>
      </group>
    </>
  );
}

function AcademyMesh({ active, accent }: { active: boolean; accent: string }) {
  return (
    <>
      {/* Stepped campus plinth */}
      <RoundedBox args={[3.7, 0.36, 3.3]} radius={0.08} smoothness={2} position={[0, 0.18, 0]}>
        <meshStandardMaterial color={DARK_METAL} metalness={0.4} roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[2.9, 1.45, 2.2]} radius={0.08} smoothness={2} position={[0, 1.08, -0.15]}>
        <meshStandardMaterial
          color={BASE_WALL}
          emissive={accent}
          emissiveIntensity={active ? 0.15 : 0.03}
          metalness={0.25}
          roughness={0.6}
        />
      </RoundedBox>
      {/* Front colonnade pillars */}
      {[-1.1, -0.37, 0.37, 1.1].map((x) => (
        <mesh key={x} position={[x, 1.1, 1.1]}>
          <cylinderGeometry args={[0.11, 0.13, 1.48, 8]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.3} roughness={0.45} />
        </mesh>
      ))}
      {/* Glowing frieze / clerestory */}
      <RoundedBox args={[3.15, 0.22, 2.65]} radius={0.04} smoothness={2} position={[0, 1.9, 0.02]}>
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={active ? 0.9 : 0.45}
        />
      </RoundedBox>
      {/* Pyramid/gable roof */}
      <mesh position={[0, 2.55, 0.02]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2.25, 1.1, 4]} />
        <meshStandardMaterial color={LIGHT_STONE} metalness={0.35} roughness={0.5} flatShading />
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
  const trophyRef = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    if (!animate || !trophyRef.current) return;
    trophyRef.current.rotation.y += Math.min(delta, 0.05) * 1.1;
    trophyRef.current.position.y = 3.25 + Math.sin(clock.getElapsedTime() * 2.4) * 0.12;
  });

  return (
    <>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[1.95, 2.15, 0.36, 8]} />
        <meshStandardMaterial color={DARK_METAL} metalness={0.5} roughness={0.45} />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[1.42, 1.58, 1.48, 8]} />
        <meshStandardMaterial
          color={BASE_WALL}
          emissive={accent}
          emissiveIntensity={active ? 0.16 : 0.03}
          metalness={0.35}
          roughness={0.5}
        />
      </mesh>
      {/* Rotunda pillars */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 1.68, 1.1, Math.sin(angle) * 1.68]}>
            <cylinderGeometry args={[0.09, 0.1, 1.48, 8]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.45} roughness={0.35} />
          </mesh>
        );
      })}
      {/* Glowing crown ring */}
      <mesh position={[0, 1.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.56, 0.08, 8, 24]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={active ? 0.95 : 0.5}
        />
      </mesh>
      {/* Dome */}
      <mesh position={[0, 1.95, 0]}>
        <sphereGeometry args={[1.38, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={LIGHT_STONE} metalness={0.45} roughness={0.38} />
      </mesh>
      {/* Floating Trophy Monument */}
      <group ref={trophyRef} position={[0, 3.25, 0]}>
        <mesh>
          <octahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={active ? 1.25 : 0.7}
            metalness={0.4}
            roughness={0.15}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.62, 0.035, 6, 20]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} />
        </mesh>
      </group>
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
  const dishRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.getElapsedTime();
    if (dishRef.current) {
      dishRef.current.rotation.y = 0.3 + Math.sin(t * 0.9) * 0.5;
    }
    if (pulseRef.current) {
      pulseRef.current.scale.setScalar(1 + Math.sin(t * 4) * 0.22);
    }
  });

  return (
    <>
      <RoundedBox args={[3.2, 0.35, 3.2]} radius={0.08} smoothness={2} position={[0, 0.175, 0]}>
        <meshStandardMaterial color={DARK_METAL} metalness={0.5} roughness={0.45} />
      </RoundedBox>
      <RoundedBox args={[2.3, 1.6, 2.3]} radius={0.12} smoothness={3} position={[0, 1.15, 0]}>
        <meshStandardMaterial
          color={BASE_WALL}
          emissive={accent}
          emissiveIntensity={active ? 0.16 : 0.03}
          metalness={0.35}
          roughness={0.5}
        />
      </RoundedBox>
      {/* Status visor strip */}
      <RoundedBox args={[2.36, 0.24, 2.36]} radius={0.04} smoothness={2} position={[0, 1.45, 0]}>
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={active ? 0.9 : 0.45}
        />
      </RoundedBox>
      {/* Comms mast */}
      <mesh position={[0.42, 2.85, 0]}>
        <cylinderGeometry args={[0.07, 0.14, 1.9, 8]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.75} roughness={0.25} />
      </mesh>
      <mesh position={[0.42, 2.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.03, 6, 16]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} />
      </mesh>
      {/* Sweeping Dish */}
      <group ref={dishRef} position={[-0.45, 2.4, 0.2]}>
        <mesh rotation={[0.6, 0, 0.5]}>
          <coneGeometry args={[0.68, 0.36, 14, 1, true]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={active ? 0.85 : 0.4}
            side={2}
            metalness={0.4}
            roughness={0.25}
          />
        </mesh>
        <mesh position={[0, 0.2, 0.2]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" emissive={accent} emissiveIntensity={1.2} />
        </mesh>
      </group>
      <mesh ref={pulseRef} position={[0.42, 3.88, 0]}>
        <sphereGeometry args={[0.16, 10, 10]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.4} />
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
    labelHeight: 5.0,
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
    labelHeight: 4.5,
    render: (active, accent, animate) => (
      <TechnologyCenterMesh active={active} accent={accent} animate={animate} />
    ),
  },
  academy: {
    labelHeight: 3.7,
    render: (active, accent) => <AcademyMesh active={active} accent={accent} />,
  },
  "achievement-hall": {
    labelHeight: 4.2,
    render: (active, accent, animate) => (
      <AchievementHallMesh active={active} accent={accent} animate={animate} />
    ),
  },
  "communication-hub": {
    labelHeight: 4.6,
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
  const [failedModels, setFailedModels] = useState<Partial<Record<LocationId, boolean>>>({});

  return (
    <group>
      {destinations.map((destination) => {
        const config = LANDMARK_RENDERERS[destination.id];
        const modelSpec = LANDMARK_MODELS[destination.id];
        const useCustom = Boolean(modelSpec) && !failedModels[destination.id];

        return (
          <InteractiveLandmark
            key={destination.id}
            destination={destination}
            selected={selectedId === destination.id}
            labelHeight={config.labelHeight}
            onSelect={onSelect}
          >
            {(active) =>
              useCustom && modelSpec ? (
                <WorldErrorBoundary
                  onError={() =>
                    setFailedModels((prev) => ({ ...prev, [destination.id]: true }))
                  }
                >
                  <Suspense fallback={config.render(active, destination.accentColor, animate)}>
                    <CustomGLBAsset spec={modelSpec} animate={animate} />
                  </Suspense>
                </WorldErrorBoundary>
              ) : (
                config.render(active, destination.accentColor, animate)
              )
            }
          </InteractiveLandmark>
        );
      })}
    </group>
  );
}
