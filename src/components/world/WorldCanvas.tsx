"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";
import { OVERVIEW_CAMERA, destinations } from "@/lib/destinations";
import type { LocationId } from "@/types/portfolio";
import WorldAtmosphere, { type TimeOfDay } from "./WorldAtmosphere";
import WorldCamera from "./WorldCamera";
import WorldErrorBoundary from "./WorldErrorBoundary";
import WorldLocations from "./WorldLocations";
import WorldModel, { MODEL_URL } from "./WorldModel";

type WorldCanvasProps = {
  selectedId: LocationId | null;
  resetTrigger: number;
  timeOfDay: TimeOfDay;
  ecoMode: boolean;
  onSelect: (id: LocationId) => void;
  onReady: () => void;
};

const TREES: Array<[number, number, number]> = [
  [-12, 0, -2],
  [-11, 0, 2.5],
  [-4, 0, -11.5],
  [4.5, 0, -11],
  [12, 0, -7],
  [12.5, 0, 2],
  [3, 0, 12],
  [-3.5, 0, 11.5],
  [-11.5, 0, 9.5],
  [11.5, 0, 9.5],
];

const ROCKS: Array<[number, number, number]> = [
  [4.2, 0, -2.2],
  [-4.4, 0, -6.5],
  [-10.5, 0, -8.5],
  [10.2, 0, -8.2],
  [0.5, 0, 9.8],
];

function Island() {
  return (
    <group>
      {/* Coastal stone/sand shoreline ring */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[16.8, 17.2, 0.45, 16]} />
        <meshStandardMaterial color="#94A3B8" roughness={0.9} flatShading />
      </mesh>
      {/* Main grass plateau */}
      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[16.0, 16.3, 0.42, 16]} />
        <meshStandardMaterial color="#2E6F40" roughness={0.88} flatShading />
      </mesh>
      {/* Inner terraced lawn */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[11.2, 11.6, 0.08, 16]} />
        <meshStandardMaterial color="#37804C" roughness={0.85} flatShading />
      </mesh>
      {/* Rock underside */}
      <mesh position={[0, -2.1, 0]}>
        <cylinderGeometry args={[16.5, 9.5, 3.1, 16]} />
        <meshStandardMaterial color="#3F352E" roughness={0.95} flatShading />
      </mesh>
      {/* Central plaza disc */}
      <mesh position={[0, 0.055, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.4, 24]} />
        <meshStandardMaterial color="#334155" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Walkways radiating from Developer HQ */}
      {destinations
        .filter((d) => d.id !== "developer-hq")
        .map((dest) => {
          const [x, , z] = dest.coordinates;
          const length = Math.hypot(x, z);
          const angle = Math.atan2(x, z);
          return (
            <mesh
              key={dest.id}
              position={[x / 2, 0.052, z / 2]}
              rotation={[-Math.PI / 2, 0, angle]}
            >
              <planeGeometry args={[1.15, length]} />
              <meshStandardMaterial color="#475569" roughness={0.7} />
            </mesh>
          );
        })}
    </group>
  );
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.1, 0.16, 0.76, 6]} />
        <meshStandardMaterial color="#5C4033" roughness={0.9} flatShading />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <coneGeometry args={[0.72, 1.0, 7]} />
        <meshStandardMaterial color="#1E5631" roughness={0.82} flatShading />
      </mesh>
      <mesh position={[0, 1.48, 0]}>
        <coneGeometry args={[0.56, 0.9, 7]} />
        <meshStandardMaterial color="#2A7243" roughness={0.82} flatShading />
      </mesh>
      <mesh position={[0, 1.9, 0]}>
        <coneGeometry args={[0.38, 0.75, 7]} />
        <meshStandardMaterial color="#388E54" roughness={0.8} flatShading />
      </mesh>
    </group>
  );
}

function Rock({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.22, 0]}>
        <dodecahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial color="#64748B" roughness={0.9} flatShading />
      </mesh>
      <mesh position={[0.34, 0.12, 0.16]} scale={0.62}>
        <dodecahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial color="#475569" roughness={0.9} flatShading />
      </mesh>
    </group>
  );
}

function ProceduralCampus({
  selectedId,
  animate,
  onSelect,
}: {
  selectedId: LocationId | null;
  animate: boolean;
  onSelect: (id: LocationId) => void;
}) {
  return (
    <>
      <Island />
      {TREES.map((position) => (
        <Tree key={position.join(",")} position={position} />
      ))}
      {ROCKS.map((position) => (
        <Rock key={position.join(",")} position={position} />
      ))}
      <WorldLocations selectedId={selectedId} animate={animate} onSelect={onSelect} />
    </>
  );
}

export default function WorldCanvas({
  selectedId,
  resetTrigger,
  timeOfDay,
  ecoMode,
  onSelect,
  onReady,
}: WorldCanvasProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [hasCustomModel, setHasCustomModel] = useState(false);
  const cleanupContextListeners = useRef<(() => void) | null>(null);

  const shouldAnimate = !prefersReducedMotion && !ecoMode;
  const isNight = timeOfDay === "night";
  const skyColor = isNight ? "#060A12" : "#0F2942";

  useEffect(() => {
    return () => {
      cleanupContextListeners.current?.();
    };
  }, []);

  useEffect(() => {
    let active = true;
    fetch(MODEL_URL, { method: "HEAD" })
      .then((res) => {
        if (active && res.ok) setHasCustomModel(true);
      })
      .catch(() => {
        // Keep procedural campus fallback when no GLB is present.
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <Canvas
      className="touch-none"
      camera={{ position: OVERVIEW_CAMERA.position, fov: 40, near: 0.1, far: 200 }}
      dpr={[1, 1.5]}
      frameloop={shouldAnimate ? "always" : "demand"}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: isNight ? 1.05 : 1.15,
      }}
      onCreated={({ gl, invalidate }) => {
        const canvas = gl.domElement;
        const handleLost = (event: Event) => {
          event.preventDefault();
        };
        const handleRestored = () => {
          invalidate();
        };
        canvas.addEventListener("webglcontextlost", handleLost);
        canvas.addEventListener("webglcontextrestored", handleRestored);
        cleanupContextListeners.current = () => {
          canvas.removeEventListener("webglcontextlost", handleLost);
          canvas.removeEventListener("webglcontextrestored", handleRestored);
        };

        requestAnimationFrame(() => onReady());
      }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <color attach="background" args={[skyColor]} />
      <fog attach="fog" args={[skyColor, 34, 82]} />

      <Environment resolution={128}>
        <Lightformer
          form="ring"
          intensity={isNight ? 1.2 : 1.8}
          color={isNight ? "#38BDF8" : "#FEF3C7"}
          position={[0, 12, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={18}
        />
        <Lightformer
          form="rect"
          intensity={isNight ? 0.8 : 1.4}
          color="#BAE6FD"
          position={[-14, 6, -10]}
          scale={[10, 4, 1]}
        />
      </Environment>

      <ambientLight intensity={isNight ? 0.5 : 0.72} />
      <hemisphereLight
        args={[isNight ? "#BAE6FD" : "#E0F2FE", isNight ? "#1E293B" : "#334155", isNight ? 0.55 : 0.85]}
      />
      <directionalLight
        position={isNight ? [10, 18, 8] : [16, 22, 12]}
        intensity={isNight ? 1.25 : 1.75}
        color={isNight ? "#E0F2FE" : "#FFFBEB"}
      />

      <WorldAtmosphere timeOfDay={timeOfDay} animate={shouldAnimate} />
      <ContactShadows position={[0, 0.015, 0]} opacity={0.35} scale={34} blur={2} far={6} frames={1} />

      {hasCustomModel ? (
        <WorldErrorBoundary onError={() => setHasCustomModel(false)}>
          <Suspense
            fallback={
              <ProceduralCampus
                selectedId={selectedId}
                animate={shouldAnimate}
                onSelect={onSelect}
              />
            }
          >
            <WorldModel onSelect={onSelect} />
          </Suspense>
        </WorldErrorBoundary>
      ) : (
        <ProceduralCampus selectedId={selectedId} animate={shouldAnimate} onSelect={onSelect} />
      )}

      <WorldCamera selectedId={selectedId} resetTrigger={resetTrigger} />
    </Canvas>
  );
}
