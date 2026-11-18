"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { AlertTriangle, LayoutList, Play, SkipForward } from "lucide-react";

const BOOT_LINES = [
  "INITIALIZING ASHEN'S WORLD...",
  "Loading developer environment...",
  "Loading projects...",
  "Loading achievements...",
] as const;

const LINE_INTERVAL_MS = 420;

type BootSequenceProps = {
  /** True once the 3D engine chunk has loaded and the WebGL context rendered its first frame. */
  worldReady: boolean;
  /** `null` while unknown, `false` when the browser cannot create a WebGL context. */
  webglSupported: boolean | null;
  /** Set when the 3D experience threw during loading. */
  worldError: boolean;
  onEnter: () => void;
  onClassicView: () => void;
};

export default function BootSequence({
  worldReady,
  webglSupported,
  worldError,
  onEnter,
  onClassicView,
}: BootSequenceProps) {
  const prefersReducedMotion = useReducedMotion();
  const [animatedCount, setAnimatedCount] = useState(0);
  const enterButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      setAnimatedCount((count) => {
        if (count >= BOOT_LINES.length) {
          window.clearInterval(intervalId);
          return count;
        }
        return count + 1;
      });
    }, LINE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);

  const visibleCount = prefersReducedMotion ? BOOT_LINES.length : animatedCount;
  const linesComplete = visibleCount >= BOOT_LINES.length;
  const hasFailure = webglSupported === false || worldError;
  const systemReady = linesComplete && worldReady && !hasFailure;

  useEffect(() => {
    if (systemReady) enterButtonRef.current?.focus();
  }, [systemReady]);

  // Honest progress: boot copy stages + real engine readiness (no artificial delay).
  const stageProgress = (visibleCount / BOOT_LINES.length) * 0.6;
  const engineProgress = worldReady ? 0.4 : 0;
  const progress = Math.round((stageProgress + engineProgress) * 100);

  return (
    <section
      aria-label="Ashen's World boot sequence"
      className="engine-grid-bg absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div className="hud-scanlines pointer-events-none absolute inset-0" />

      <div className="hud-panel-strong relative w-full max-w-xl rounded-xl">
        {/* Terminal title bar */}
        <div className="flex items-center justify-between border-b border-sky-400/20 px-4 py-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-slate-400">
            ASHENS_WORLD://BOOT
          </p>
          <button
            type="button"
            onClick={onEnter}
            disabled={hasFailure}
            className="inline-flex items-center gap-1 rounded px-2 py-1 font-mono text-[11px] text-slate-400 transition-colors hover:text-cyan-300 focus-visible:outline focus-visible:outline-cyan-400 disabled:pointer-events-none disabled:opacity-40"
          >
            Skip Intro
            <SkipForward className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>

        {/* Terminal output */}
        <div
          className="min-h-[260px] space-y-2 px-5 py-5 font-mono text-sm sm:text-[15px]"
          role="log"
          aria-live="polite"
        >
          {BOOT_LINES.slice(0, visibleCount).map((line, index) => (
            <p
              key={line}
              className={
                index === 0
                  ? "pb-2 font-semibold tracking-wide text-cyan-300"
                  : "text-slate-300"
              }
            >
              <span className="mr-2 text-sky-500/70" aria-hidden="true">
                &gt;
              </span>
              {line}
            </p>
          ))}

          {linesComplete && !worldReady && !hasFailure && (
            <p className="text-slate-400">
              <span className="mr-2 text-sky-500/70" aria-hidden="true">
                &gt;
              </span>
              Compiling 3D environment
              <span className="ml-1 inline-block animate-pulse">_</span>
            </p>
          )}

          {systemReady && (
            <>
              <p className="pt-3 font-semibold tracking-wide text-emerald-400">
                <span className="mr-2 text-emerald-500/70" aria-hidden="true">
                  &gt;
                </span>
                SYSTEM READY.
              </p>
              <p className="pt-2 text-lg font-semibold text-slate-50 sm:text-xl">
                Welcome, Explorer!
              </p>
            </>
          )}

          {hasFailure && (
            <div
              role="alert"
              className="mt-3 flex gap-3 rounded-lg border border-amber-400/30 bg-amber-500/10 p-3 text-amber-200"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p className="text-sm leading-relaxed">
                {webglSupported === false
                  ? "WebGL is unavailable on this device or browser. The 3D world cannot start, but the full portfolio is available in Classic View."
                  : "The 3D environment failed to load. You can continue in Classic View."}
              </p>
            </div>
          )}

          {!linesComplete && !hasFailure && (
            <span className="inline-block animate-pulse text-cyan-300" aria-hidden="true">
              _
            </span>
          )}
        </div>

        {/* Progress + actions */}
        <div className="space-y-4 border-t border-sky-400/15 px-5 py-4">
          <div>
            <div className="mb-1.5 flex justify-between font-mono text-[11px] text-slate-400">
              <span>{hasFailure ? "BOOT HALTED" : systemReady ? "ENGINE ONLINE" : "LOADING"}</span>
              <span>{hasFailure ? "--" : `${progress}%`}</span>
            </div>
            <div
              className="h-1 overflow-hidden rounded-full bg-slate-800"
              role="progressbar"
              aria-label="World loading progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={hasFailure ? 0 : progress}
            >
              <div
                className={`h-full rounded-full transition-[width] duration-300 ${
                  hasFailure ? "bg-amber-400" : "bg-gradient-to-r from-sky-500 to-cyan-300"
                }`}
                style={{ width: `${hasFailure ? 100 : progress}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={onClassicView}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600/60 px-4 py-2.5 text-sm text-slate-300 transition-colors hover:border-slate-400 hover:text-white focus-visible:outline focus-visible:outline-cyan-400"
            >
              <LayoutList className="h-4 w-4" aria-hidden="true" />
              Classic View
            </button>

            {!hasFailure && (
              <button
                ref={enterButtonRef}
                type="button"
                onClick={onEnter}
                disabled={!systemReady}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-300/50 bg-cyan-400/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition-colors hover:bg-cyan-400/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Play className="h-4 w-4" aria-hidden="true" />
                Enter World
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
