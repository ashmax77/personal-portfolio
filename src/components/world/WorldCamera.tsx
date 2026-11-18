"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { OVERVIEW_CAMERA, getDestination } from "@/lib/destinations";
import type { LocationId } from "@/types/portfolio";

type WorldCameraProps = {
  selectedId: LocationId | null;
  resetTrigger: number;
};

export default function WorldCamera({ selectedId, resetTrigger }: WorldCameraProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { camera, invalidate } = useThree();

  const desiredPosition = useRef(new THREE.Vector3(...OVERVIEW_CAMERA.position));
  const desiredTarget = useRef(new THREE.Vector3(...OVERVIEW_CAMERA.target));
  const animating = useRef(false);

  useEffect(() => {
    if (selectedId) {
      const dest = getDestination(selectedId);
      if (dest) {
        desiredPosition.current.set(...dest.cameraPosition);
        desiredTarget.current.set(...dest.cameraTarget);
        animating.current = true;
        invalidate();
      }
    } else {
      desiredPosition.current.set(...OVERVIEW_CAMERA.position);
      desiredTarget.current.set(...OVERVIEW_CAMERA.target);
      animating.current = true;
      invalidate();
    }
  }, [selectedId, resetTrigger, invalidate]);

  useFrame((_, delta) => {
    if (!animating.current || !controlsRef.current) return;

    const step = 1 - Math.exp(-5 * Math.min(delta, 0.05));
    camera.position.lerp(desiredPosition.current, step);
    controlsRef.current.target.lerp(desiredTarget.current, step);
    controlsRef.current.update();

    const posDist = camera.position.distanceTo(desiredPosition.current);
    const tgtDist = controlsRef.current.target.distanceTo(desiredTarget.current);

    if (posDist < 0.04 && tgtDist < 0.04) {
      camera.position.copy(desiredPosition.current);
      controlsRef.current.target.copy(desiredTarget.current);
      controlsRef.current.update();
      animating.current = false;
    } else {
      invalidate();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      target={OVERVIEW_CAMERA.target}
      enablePan
      panSpeed={0.7}
      enableDamping
      dampingFactor={0.08}
      minDistance={7}
      maxDistance={36}
      minPolarAngle={Math.PI / 7}
      maxPolarAngle={Math.PI / 2.45}
      onStart={() => {
        // Yield immediately if the user grabs the camera mid-transition.
        animating.current = false;
      }}
    />
  );
}
