"use client";

import { useEffect, useMemo, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import type * as THREE from "three";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import { withBasePath, type GLBAssetSpec } from "@/lib/modelManifest";

type CustomGLBAssetProps = {
  spec: GLBAssetSpec;
  animate?: boolean;
};

/**
 * Loads an individual `.glb` asset with SkeletonUtils cloning
 * (safe for multiple rigged/animated instances) and plays embedded animations.
 */
export default function CustomGLBAsset({ spec, animate = true }: CustomGLBAssetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(withBasePath(spec.path));
  const cloned = useMemo(() => cloneSkeleton(scene), [scene]);
  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    for (const name of names) {
      const action = actions[name];
      if (!action) continue;
      if (animate) {
        action.reset().fadeIn(0.2).play();
      } else {
        action.stop();
      }
    }
    return () => {
      for (const name of names) {
        actions[name]?.stop();
      }
    };
  }, [actions, names, animate]);

  return (
    <group
      ref={groupRef}
      position={spec.position ?? [0, 0, 0]}
      rotation={[0, spec.rotationY ?? 0, 0]}
      scale={spec.scale ?? 1}
    >
      <primitive object={cloned} />
    </group>
  );
}
