"use client";

import { useSyncExternalStore } from "react";

let cachedSupport: boolean | undefined;

function detectWebGL(): boolean {
  if (cachedSupport !== undefined) return cachedSupport;

  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    cachedSupport = Boolean(context);
  } catch {
    cachedSupport = false;
  }

  return cachedSupport;
}

const subscribe = () => () => {};

/**
 * Returns `null` during server rendering / before hydration,
 * then `true` or `false` once WebGL availability is known in the browser.
 */
export function useWebGLSupport(): boolean | null {
  return useSyncExternalStore(subscribe, detectWebGL, () => null);
}
