"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { destinations } from "@/lib/destinations";
import { CREATURE_MODELS } from "@/lib/modelManifest";
import CustomGLBAsset from "./CustomGLBAsset";
import WorldErrorBoundary from "./WorldErrorBoundary";

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

function DriftingClouds({ timeOfDay, animate }: WorldAtmosphereProps) {
  const cloudsRef = useRef<THREE.Group>(null);
  const cloudColor = timeOfDay === "night" ? "#1E293B" : "#F1F5F9";

  useFrame((_, delta) => {
    if (!animate || !cloudsRef.current) return;
    const step = Math.min(delta, 0.05) * 0.45;
    for (const child of cloudsRef.current.children) {
      child.position.x += step;
      if (child.position.x > 26) child.position.x = -26;
    }
  });

  const clouds: Array<{ pos: [number, number, number]; scale: number }> = [
    { pos: [-14, 11, -12], scale: 1.1 },
    { pos: [4, 12.5, 10], scale: 0.9 },
    { pos: [16, 10.5, -5], scale: 1.25 },
  ];

  return (
    <group ref={cloudsRef}>
      {clouds.map((cloud, index) => (
        <group key={index} position={cloud.pos} scale={cloud.scale}>
          <mesh position={[0, 0, 0]}>
            <dodecahedronGeometry args={[1.1, 0]} />
            <meshStandardMaterial color={cloudColor} flatShading transparent opacity={0.78} />
          </mesh>
          <mesh position={[1.05, -0.15, 0.2]}>
            <dodecahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial color={cloudColor} flatShading transparent opacity={0.78} />
          </mesh>
          <mesh position={[-1.0, -0.2, -0.15]}>
            <dodecahedronGeometry args={[0.75, 0]} />
            <meshStandardMaterial color={cloudColor} flatShading transparent opacity={0.78} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function CampusDrone({ animate }: { animate: boolean }) {
  const droneRef = useRef<THREE.Group>(null);
  const rotorsRef = useRef<THREE.Group>(null);
  const [glbFailed, setGlbFailed] = useState(false);
  const droneSpec = CREATURE_MODELS.drone;
  const useCustomDrone = Boolean(droneSpec) && !glbFailed;

  useFrame(({ clock }, delta) => {
    if (!animate) return;
    if (droneRef.current) {
      const t = clock.getElapsedTime() * 0.42;
      const radius = 5.4;
      droneRef.current.position.set(
        Math.cos(t) * radius,
        3.9 + Math.sin(t * 2.5) * 0.25,
        Math.sin(t) * radius
      );
      droneRef.current.rotation.y = -t;
    }
    if (!useCustomDrone && rotorsRef.current) {
      const spin = Math.min(delta, 0.05) * 18;
      for (const rotor of rotorsRef.current.children) {
        rotor.rotation.y += spin;
      }
    }
  });

  const armOffsets: Array<[number, number, number]> = [
    [0.24, 0.04, 0.24],
    [-0.24, 0.04, 0.24],
    [0.24, 0.04, -0.24],
    [-0.24, 0.04, -0.24],
  ];

  const proceduralDrone = (
    <>
      <mesh>
        <boxGeometry args={[0.28, 0.12, 0.34]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.68, 0.04, 0.06]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[0.68, 0.04, 0.06]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.35} />
      </mesh>
      <group ref={rotorsRef}>
        {armOffsets.map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.24, 0.015, 0.04]} />
            <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.8} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, -0.09, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={1.6} />
      </mesh>
    </>
  );

  return (
    <group ref={droneRef} position={[5.4, 3.9, 0]}>
      {useCustomDrone && droneSpec ? (
        <WorldErrorBoundary onError={() => setGlbFailed(true)}>
          <Suspense fallback={proceduralDrone}>
            <CustomGLBAsset spec={droneSpec} animate={animate} />
          </Suspense>
        </WorldErrorBoundary>
      ) : (
        proceduralDrone
      )}
    </group>
  );
}

function FlockingBirds({ timeOfDay, animate }: WorldAtmosphereProps) {
  const flockRef = useRef<THREE.Group>(null);
  const [glbFailed, setGlbFailed] = useState(false);
  const birdColor = timeOfDay === "night" ? "#94A3B8" : "#F8FAFC";
  const birdSpec = CREATURE_MODELS.bird;
  const useCustomBird = Boolean(birdSpec) && !glbFailed;

  useFrame(({ clock }) => {
    if (!animate || !flockRef.current) return;
    const t = clock.getElapsedTime();
    flockRef.current.children.forEach((bird, idx) => {
      const speed = 0.28 + idx * 0.04;
      const angle = t * speed + idx * 1.7;
      const radius = 10 + (idx % 2) * 3.5;
      bird.position.set(
        Math.cos(angle) * radius,
        7.4 + Math.sin(t * 1.4 + idx) * 0.6,
        Math.sin(angle) * radius
      );
      bird.rotation.y = -angle;

      if (!useCustomBird) {
        const leftWing = bird.children[1];
        const rightWing = bird.children[2];
        const flap = Math.sin(t * 7 + idx * 2) * 0.55;
        if (leftWing) leftWing.rotation.z = flap;
        if (rightWing) rightWing.rotation.z = -flap;
      }
    });
  });

  const renderProceduralBird = () => (
    <>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.08, 0.36, 5]} />
        <meshStandardMaterial color={birdColor} flatShading />
      </mesh>
      <mesh position={[-0.18, 0, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.32, 0.025, 0.14]} />
        <meshStandardMaterial color={birdColor} flatShading />
      </mesh>
      <mesh position={[0.18, 0, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.32, 0.025, 0.14]} />
        <meshStandardMaterial color={birdColor} flatShading />
      </mesh>
    </>
  );

  return (
    <group ref={flockRef}>
      {[0, 1, 2, 3].map((idx) => (
        <group key={idx} position={[10, 7.5, 0]}>
          {useCustomBird && birdSpec ? (
            <WorldErrorBoundary onError={() => setGlbFailed(true)}>
              <Suspense fallback={renderProceduralBird()}>
                <CustomGLBAsset spec={birdSpec} animate={animate} />
              </Suspense>
            </WorldErrorBoundary>
          ) : (
            renderProceduralBird()
          )}
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
      <DriftingClouds timeOfDay={timeOfDay} animate={animate} />
      <CampusDrone animate={animate} />
      <FlockingBirds timeOfDay={timeOfDay} animate={animate} />
    </>
  );
}
