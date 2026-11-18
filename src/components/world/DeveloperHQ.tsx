"use client";

import { useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import type { WorldDestination } from "@/types/portfolio";

type DeveloperHQProps = {
  destination: WorldDestination;
  selected: boolean;
  onSelect: (id: WorldDestination["id"]) => void;
};

const BASE_COLOR = "#1E293B";
const TRIM_COLOR = "#334155";
const GLASS_COLOR = "#0EA5E9";

export default function DeveloperHQ({ destination, selected, onSelect }: DeveloperHQProps) {
  const [hovered, setHovered] = useState(false);
  const active = hovered || selected;
  const accent = destination.accentColor;

  // Always restore the cursor if the landmark unmounts while hovered.
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
      {/* Selection / hover ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[2.3, 2.55, 48]} />
        <meshBasicMaterial
          color={selected ? "#10B981" : accent}
          transparent
          opacity={active ? 0.9 : 0.25}
        />
      </mesh>

      {/* Interactive building body */}
      <group
        scale={hovered ? 1.04 : 1}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        {/* Plinth */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[3.6, 0.4, 3.6]} />
          <meshStandardMaterial color={TRIM_COLOR} flatShading />
        </mesh>

        {/* Main block */}
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[2.8, 2, 2.8]} />
          <meshStandardMaterial
            color={BASE_COLOR}
            emissive={accent}
            emissiveIntensity={active ? 0.18 : 0.03}
            flatShading
          />
        </mesh>

        {/* Glass window band */}
        <mesh position={[0, 1.55, 0]}>
          <boxGeometry args={[2.86, 0.45, 2.86]} />
          <meshStandardMaterial
            color={GLASS_COLOR}
            emissive={GLASS_COLOR}
            emissiveIntensity={active ? 0.9 : 0.45}
            flatShading
          />
        </mesh>

        {/* Upper tower */}
        <mesh position={[0, 3, 0]}>
          <boxGeometry args={[1.6, 1.2, 1.6]} />
          <meshStandardMaterial color={TRIM_COLOR} flatShading />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 4.1, 0]}>
          <cylinderGeometry args={[0.05, 0.08, 1, 6]} />
          <meshStandardMaterial color="#94A3B8" />
        </mesh>
        <mesh position={[0, 4.65, 0]}>
          <sphereGeometry args={[0.14, 8, 8]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* Floating HTML label (decorative; panel & HUD carry the accessible content) */}
      <Html position={[0, 5.4, 0]} center distanceFactor={14} zIndexRange={[10, 0]}>
        <div
          aria-hidden="true"
          className={`pointer-events-none select-none whitespace-nowrap rounded border px-2.5 py-1 font-mono text-[11px] tracking-[0.18em] transition-colors ${
            active
              ? "border-cyan-300/70 bg-slate-950/90 text-cyan-200"
              : "border-sky-400/30 bg-slate-950/70 text-slate-300"
          }`}
        >
          {destination.shortCode} · {destination.label.toUpperCase()}
        </div>
      </Html>
    </group>
  );
}
