"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";

type LandmarkLabelProps = {
  text: string;
  position: [number, number, number];
  active?: boolean;
  accentColor?: string;
};

/**
 * Pure Three.js sprite badge drawn onto an offscreen canvas.
 * Avoids drei <Html>'s nested ReactDOM root, which triggers React 19
 * synchronous unmount warnings under StrictMode / fast refresh.
 */
export default function LandmarkLabel({
  text,
  position,
  active = false,
  accentColor = "#00F0FF",
}: LandmarkLabelProps) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const width = 512;
    const height = 96;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, width, height);

      // Pill background
      const pad = 6;
      const radius = 16;
      ctx.fillStyle = active ? "rgba(8, 13, 24, 0.94)" : "rgba(8, 13, 24, 0.78)";
      ctx.strokeStyle = active ? accentColor : "rgba(56, 189, 248, 0.45)";
      ctx.lineWidth = active ? 3 : 2;

      ctx.beginPath();
      ctx.roundRect(pad, pad, width - pad * 2, height - pad * 2, radius);
      ctx.fill();
      ctx.stroke();

      // Monospace label
      ctx.font = "600 26px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = active ? "#CFFAFE" : "#CBD5E1";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, width / 2, height / 2 + 1);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, [text, active, accentColor]);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return (
    <sprite position={position} scale={[4.2, 0.78, 1]}>
      <spriteMaterial map={texture} transparent depthTest={false} />
    </sprite>
  );
}
