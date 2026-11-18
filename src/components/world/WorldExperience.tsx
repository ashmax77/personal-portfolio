"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { Building2, LayoutList, Loader2, MousePointerClick } from "lucide-react";
import BootSequence from "@/components/onboarding/BootSequence";
import InformationPanel from "@/components/panels/InformationPanel";
import AboutPanelContent from "@/components/panels/AboutPanelContent";
import ClassicPortfolioView from "@/components/common/ClassicPortfolioView";
import WorldErrorBoundary from "@/components/world/WorldErrorBoundary";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { destinations } from "@/lib/destinations";
import { profile } from "@/content/profile";
import type { LocationId } from "@/types/portfolio";

// The 3D engine (three + R3F + drei) is code-split and never server-rendered,
// so the boot screen paints immediately while the world loads in parallel.
const WorldCanvas = dynamic(() => import("@/components/world/WorldCanvas"), {
  ssr: false,
  loading: () => null,
});

type View = "boot" | "world" | "classic";

export default function WorldExperience() {
  const webglSupported = useWebGLSupport();
  const [view, setView] = useState<View>("boot");
  const [worldReady, setWorldReady] = useState(false);
  const [worldError, setWorldError] = useState(false);
  const [selectedId, setSelectedId] = useState<LocationId | null>(null);

  const handleReady = useCallback(() => setWorldReady(true), []);
  const handleError = useCallback(() => setWorldError(true), []);
  const handleClosePanel = useCallback(() => setSelectedId(null), []);
  const handleEnter = useCallback(() => setView("world"), []);
  const handleClassic = useCallback(() => setView("classic"), []);

  const canRenderWorld = webglSupported === true && !worldError;
  const showBoot = view === "boot" || (view === "world" && worldError);
  const selectedDestination = destinations.find((d) => d.id === selectedId) ?? null;

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#060A12]">
      {/* 3D layer — mounted as soon as WebGL is confirmed so assets load during the boot sequence */}
      {canRenderWorld && (
        <div className="absolute inset-0" aria-hidden={view !== "world"}>
          <WorldErrorBoundary onError={handleError}>
            <WorldCanvas selectedId={selectedId} onSelect={setSelectedId} onReady={handleReady} />
          </WorldErrorBoundary>
        </div>
      )}

      {/* World HUD (vertical-slice version; the full HUD arrives in Phase 4) */}
      {view === "world" && canRenderWorld && (
        <>
          <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-3 sm:p-5">
            <div className="hud-panel pointer-events-auto rounded-lg px-4 py-3">
              <p className="font-mono text-[10px] tracking-[0.22em] text-cyan-400">
                ASHEN&apos;S WORLD
              </p>
              <h1 className="text-base font-semibold text-slate-50 sm:text-lg">{profile.name}</h1>
              <p className="text-xs text-slate-400 sm:text-sm">{profile.role}</p>
            </div>

            <button
              type="button"
              onClick={handleClassic}
              className="hud-panel pointer-events-auto inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition-colors hover:text-cyan-200 focus-visible:outline focus-visible:outline-cyan-400"
            >
              <LayoutList className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Classic View</span>
            </button>
          </header>

          <nav
            aria-label="World destinations"
            className="absolute bottom-3 left-3 z-20 sm:bottom-5 sm:left-5"
          >
            <ul className="hud-panel flex gap-2 rounded-lg p-2">
              {destinations.map((destination) => (
                <li key={destination.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(destination.id)}
                    aria-pressed={selectedId === destination.id}
                    className="inline-flex items-center gap-2 rounded-md border border-cyan-400/25 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100 transition-colors hover:bg-cyan-400/20 focus-visible:outline focus-visible:outline-cyan-400 aria-pressed:border-emerald-400/60 aria-pressed:text-emerald-200"
                  >
                    <Building2 className="h-4 w-4" aria-hidden="true" />
                    {destination.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <p className="hud-panel absolute bottom-5 right-5 z-20 hidden items-center gap-2 rounded-lg px-3 py-2 font-mono text-[11px] text-slate-400 md:flex">
            <MousePointerClick className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
            Drag to orbit · Scroll to zoom · Click a building
          </p>

          {!worldReady && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <p className="hud-panel inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs text-slate-300">
                <Loader2 className="h-4 w-4 animate-spin text-cyan-400" aria-hidden="true" />
                Loading 3D environment…
              </p>
            </div>
          )}
        </>
      )}

      <InformationPanel
        open={view === "world" && selectedDestination !== null}
        eyebrow={
          selectedDestination
            ? `${selectedDestination.shortCode} // ${selectedDestination.subtitle.toUpperCase()}`
            : ""
        }
        title={selectedDestination?.label ?? ""}
        subtitle={selectedDestination?.subtitle}
        onClose={handleClosePanel}
      >
        {selectedDestination?.section === "about" && <AboutPanelContent />}
      </InformationPanel>

      {/* Boot sequence overlay */}
      <AnimatePresence>
        {showBoot && (
          <motion.div
            key="boot"
            className="absolute inset-0 z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <BootSequence
              worldReady={worldReady}
              webglSupported={webglSupported}
              worldError={worldError}
              onEnter={handleEnter}
              onClassicView={handleClassic}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Classic (non-3D) view overlay — keeps the world mounted for instant return */}
      {view === "classic" && (
        <div className="absolute inset-0 z-[60] overflow-y-auto">
          <ClassicPortfolioView
            onReturnToWorld={canRenderWorld ? () => setView(worldReady ? "world" : "boot") : undefined}
          />
        </div>
      )}
    </div>
  );
}
