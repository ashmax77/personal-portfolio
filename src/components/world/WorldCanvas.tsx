"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OVERVIEW_CAMERA, destinations } from "@/lib/destinations";
import type { LocationId } from "@/types/portfolio";
import WorldCamera from "./WorldCamera";
import WorldErrorBoundary from "./WorldErrorBoundary";
import WorldLocations from "./WorldLocations";
import WorldModel, { MODEL_URL } from "./WorldModel";

type WorldCanvasProps = {
  selectedId: LocationId | null;
  resetTrigger: number;
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
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[16, 16, 0.5, 12]} />
        <meshStandardMaterial color="#3F7D4E" flatShading />
      </mesh>
      <mesh position={[0, -2.0, 0]}>
        <cylinderGeometry args={[16, 10, 3.0, 12]} />
        <meshStandardMaterial color="#4B3F36" flatShading />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.2, 24]} />
        <meshStandardMaterial color="#475569" />
      </mesh>

      {destinations
        .filter((d) => d.id !== "developer-hq")
        .map((dest) => {
          const [x, , z] = dest.coordinates;
          const length = Math.hypot(x, z);
          const angle = Math.atan2(x, z);
          return (
            <mesh
              key={dest.id}
              position={[x / 2, 0.008, z / 2]}
              rotation={[-Math.PI / 2, 0, angle]}
            >
              <planeGeometry args={[1.1, length]} />
              <meshStandardMaterial color="#475569" />
            </mesh>
          );
        })}
    </group>
  );
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 0.7, 6]} />
        <meshStandardMaterial color="#6B4F3A" flatShading />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.65, 1.4, 6]} />
        <meshStandardMaterial color="#2F855A" flatShading />
      </mesh>
    </group>
  );
}

function Rock({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={[position[0], 0.2, position[2]]}>
      <dodecahedronGeometry args={[0.42, 0]} />
      <meshStandardMaterial color="#6B7280" flatShading />
    </mesh>
  );
}

function ProceduralCampus({
  selectedId,
  onSelect,
}: {
  selectedId: LocationId | null;
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
      <WorldLocations selectedId={selectedId} onSelect={onSelect} />
    </>
  );
}

export default function WorldCanvas({
  selectedId,
  resetTrigger,
  onSelect,
  onReady,
}: WorldCanvasProps) {
  const [hasCustomModel, setHasCustomModel] = useState(false);

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
      frameloop="demand"
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={() => {
        requestAnimationFrame(() => onReady());
      }}
    >
      <color attach="background" args={["#060A12"]} />
      <fog attach="fog" args={["#060A12", 34, 72]} />

      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#BAE6FD", "#1E293B", 0.55]} />
      <directionalLight position={[10, 18, 8]} intensity={1.35} />

      {hasCustomModel ? (
        <WorldErrorBoundary onError={() => setHasCustomModel(false)}>
          <Suspense fallback={<ProceduralCampus selectedId={selectedId} onSelect={onSelect} />}>
            <WorldModel onSelect={onSelect} />
          </Suspense>
        </WorldErrorBoundary>
      ) : (
        <ProceduralCampus selectedId={selectedId} onSelect={onSelect} />
      )}

      <WorldCamera selectedId={selectedId} resetTrigger={resetTrigger} />
    </Canvas>
  );
}
