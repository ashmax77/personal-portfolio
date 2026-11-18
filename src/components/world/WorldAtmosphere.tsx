"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { destinations } from "@/lib/destinations";

export type TimeOfDay = "night" | "day";

type WorldAtmosphereProps = {
  timeOfDay: TimeOfDay;
  animate: boolean;
};

const WATER_VERTEX_SHADER = `
  uniform float uTime;
  varying float vElevation;

  void main() {
    vec3 pos = position;
    float waveA = sin(pos.x * 0.22 + uTime * 1.1) * cos(pos.y * 0.18 + uTime * 0.85);
    float waveB = sin((pos.x + pos.y) * 0.12 - uTime * 0.65);
    float elevation = (waveA * 0.18) + (waveB * 0.1);
    pos.z += elevation;
    vElevation = elevation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const WATER_FRAGMENT_SHADER = `
  uniform vec3 uDeepColor;
  uniform vec3 uCrestColor;
  varying float vElevation;

  void main() {
    float mixFactor = clamp((vElevation + 0.28) / 0.56, 0.0, 1.0);
    vec3 color = mix(uDeepColor, uCrestColor, mixFactor);
    gl_FragColor = vec4(color, 0.86);
  }
`;

function seededValue(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function StylizedWater({ timeOfDay, animate }: WorldAtmosphereProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeepColor: { value: new THREE.Color("#0A1F3C") },
      uCrestColor: { value: new THREE.Color("#0E7490") },
    }),
    []
  );

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uDeepColor.value.set(
      timeOfDay === "night" ? "#0A1F3C" : "#0369A1"
    );
    materialRef.current.uniforms.uCrestColor.value.set(
      timeOfDay === "night" ? "#0E7490" : "#38BDF8"
    );
  }, [timeOfDay]);

  useFrame((_, delta) => {
    if (!animate || !materialRef.current) return;
    materialRef.current.uniforms.uTime.value += Math.min(delta, 0.05);
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.85, 0]}>
      <planeGeometry args={[120, 120, 48, 48]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={WATER_VERTEX_SHADER}
        fragmentShader={WATER_FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

function FloatingSpores({
  count = 160,
  timeOfDay,
  animate,
}: {
  count?: number;
  timeOfDay: TimeOfDay;
  animate: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededValue(i * 3 + 1) - 0.5) * 34;
      pos[i * 3 + 1] = 0.4 + seededValue(i * 3 + 2) * 6.5;
      pos[i * 3 + 2] = (seededValue(i * 3 + 3) - 0.5) * 34;
      spd[i] = 0.25 + seededValue(i * 3 + 4) * 0.45;
    }
    return [pos, spd];
  }, [count]);

  useFrame((_, delta) => {
    if (!animate || !pointsRef.current) return;
    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const step = Math.min(delta, 0.05);

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * step;
      if (arr[i * 3 + 1] > 7.2) {
        arr[i * 3 + 1] = 0.4;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        color={timeOfDay === "night" ? "#38BDF8" : "#FDE68A"}
        transparent
        opacity={timeOfDay === "night" ? 0.72 : 0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function WalkwayLamps({ timeOfDay }: { timeOfDay: TimeOfDay }) {
  const lampPositions = useMemo(() => {
    return destinations
      .filter((d) => d.id !== "developer-hq")
      .map((d) => [d.coordinates[0] * 0.52, 0, d.coordinates[2] * 0.52] as [number, number, number]);
  }, []);

  const glow = timeOfDay === "night" ? 1.5 : 0.2;

  return (
    <group>
      {lampPositions.map((pos, index) => (
        <group key={index} position={pos}>
          <mesh position={[0.75, 0.35, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 0.7, 6]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <mesh position={[0.75, 0.75, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color="#7DD3FC"
              emissive="#38BDF8"
              emissiveIntensity={glow}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function WorldAtmosphere({ timeOfDay, animate }: WorldAtmosphereProps) {
  return (
    <>
      {timeOfDay === "night" && (
        <Stars radius={55} depth={30} count={1400} factor={2.8} saturation={0.2} fade speed={0} />
      )}
      <StylizedWater timeOfDay={timeOfDay} animate={animate} />
      <FloatingSpores timeOfDay={timeOfDay} animate={animate} />
      <WalkwayLamps timeOfDay={timeOfDay} />
    </>
  );
}
