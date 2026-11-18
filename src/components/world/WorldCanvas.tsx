"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { WorldDestination } from "@/types/portfolio";
import { destinations } from "@/lib/destinations";
import DeveloperHQ from "./DeveloperHQ";

type WorldCanvasProps = {
  selectedId: WorldDestination["id"] | null;
  onSelect: (id: WorldDestination["id"]) => void;
  onReady: () => void;
};

// Fixed decorative layout (deterministic — no random values during render).
const TREES: Array<[number, number, number]> = [
  [-6, 0, -3],
  [-5, 0, 3.5],
  [5.5, 0, -4.5],
  [6.2, 0, 2.5],
  [-2.5, 0, 6.2],
  [3, 0, 6],
  [-6.6, 0, 0.4],
];

const ROCKS: Array<[number, number, number]> = [
  [4.2, 0, -1.2],
  [-3.8, 0, -5.4],
  [1.2, 0, -6.4],
];

function Island() {
  return (
    <group>
      {/* Grass top */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[9, 9, 0.5, 10]} />
        <meshStandardMaterial color="#3F7D4E" flatShading />
      </mesh>
      {/* Rock underside */}
      <mesh position={[0, -1.6, 0]}>
        <cylinderGeometry args={[9, 5.5, 2.2, 10]} />
        <meshStandardMaterial color="#4B3F36" flatShading />
      </mesh>
      {/* Plaza path */}
      <mesh position={[0, 0.01, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.4, 5]} />
        <meshStandardMaterial color="#64748B" />
      </mesh>
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
      <dodecahedronGeometry args={[0.4, 0]} />
      <meshStandardMaterial color="#6B7280" flatShading />
    </mesh>
  );
}

export default function WorldCanvas({ selectedId, onSelect, onReady }: WorldCanvasProps) {
  return (
    <Canvas
      camera={{ position: [14, 12, 14], fov: 40, near: 0.1, far: 200 }}
      dpr={[1, 1.5]}
      frameloop="demand"
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={() => {
        // Signal readiness after the first frame has actually been painted.
        requestAnimationFrame(() => onReady());
      }}
    >
      <color attach="background" args={["#060A12"]} />
      <fog attach="fog" args={["#060A12", 28, 60]} />

      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#BAE6FD", "#1E293B", 0.5]} />
      <directionalLight position={[8, 14, 6]} intensity={1.4} />

      <Island />
      {TREES.map((position) => (
        <Tree key={position.join(",")} position={position} />
      ))}
      {ROCKS.map((position) => (
        <Rock key={position.join(",")} position={position} />
      ))}

      {destinations.map((destination) => (
        <DeveloperHQ
          key={destination.id}
          destination={destination}
          selected={selectedId === destination.id}
          onSelect={onSelect}
        />
      ))}

      <OrbitControls
        makeDefault
        target={[0, 1, 0]}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={10}
        maxDistance={30}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.6}
      />
    </Canvas>
  );
}
