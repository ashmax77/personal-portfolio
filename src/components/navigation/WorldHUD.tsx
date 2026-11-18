"use client";

import Link from "next/link";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CodeXml,
  Compass,
  ExternalLink,
  LayoutList,
  Leaf,
  Moon,
  MousePointerClick,
  Navigation,
  RotateCcw,
  Sun,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";
import { profile } from "@/content/profile";
import { destinations } from "@/lib/destinations";
import type { LocationId } from "@/types/portfolio";
import type { TimeOfDay } from "@/components/world/WorldAtmosphere";
import WorldNavigation from "./WorldNavigation";

type WorldHUDProps = {
  selectedId: LocationId | null;
  visitedIds: LocationId[];
  timeOfDay: TimeOfDay;
  ecoMode: boolean;
  soundEnabled: boolean;
  tourActive: boolean;
  tourIndex: number;
  onToggleTimeOfDay: () => void;
  onToggleEcoMode: () => void;
  onToggleSound: () => void;
  onStartTour: () => void;
  onTourStep: (direction: -1 | 1) => void;
  onExitTour: () => void;
  onSelect: (id: LocationId) => void;
  onResetCamera: () => void;
  onClassicView: () => void;
};

export default function WorldHUD({
  selectedId,
  visitedIds,
  timeOfDay,
  ecoMode,
  soundEnabled,
  tourActive,
  tourIndex,
  onToggleTimeOfDay,
  onToggleEcoMode,
  onToggleSound,
  onStartTour,
  onTourStep,
  onExitTour,
  onSelect,
  onResetCamera,
  onClassicView,
}: WorldHUDProps) {
  const discoveredCount = visitedIds.length;
  const totalCount = destinations.length;
  const allDiscovered = discoveredCount >= totalCount;
  const currentTourStop = destinations[tourIndex] ?? destinations[0];

  return (
    <>
      {/* Top Bar */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-3 sm:p-5">
        <div className="hud-panel pointer-events-auto max-w-xs rounded-xl px-4 py-3 sm:max-w-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.2em] text-cyan-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
              ASHEN&apos;S WORLD
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] ${
                allDiscovered
                  ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-300"
                  : "border-sky-400/25 bg-slate-950/60 text-slate-300"
              }`}
              title="Campus locations discovered"
            >
              {allDiscovered && <Check className="h-2.5 w-2.5" aria-hidden="true" />}
              {discoveredCount}/{totalCount} EXPLORED
            </span>
          </div>
          <h1 className="mt-1 text-base font-semibold text-slate-50 sm:text-lg">{profile.name}</h1>
          <p className="text-xs text-cyan-200/90 sm:text-sm">{profile.role}</p>
          <p className="mt-1 hidden text-xs text-slate-400 sm:block">{profile.tagline}</p>
        </div>

        <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-2">
          {!tourActive && (
            <button
              type="button"
              onClick={onStartTour}
              title="Start a guided tour of all 6 destinations"
              className="hud-panel inline-flex items-center gap-1.5 rounded-lg border-cyan-400/40 px-3 py-2 text-xs font-medium text-cyan-200 transition-colors hover:border-cyan-300 hover:text-white focus-visible:outline focus-visible:outline-cyan-400 sm:text-sm"
            >
              <Navigation className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
              <span className="hidden sm:inline">Guided Tour</span>
            </button>
          )}

          <button
            type="button"
            onClick={onToggleSound}
            aria-pressed={soundEnabled}
            title={soundEnabled ? "Mute UI sound effects" : "Enable subtle UI sound effects"}
            aria-label={soundEnabled ? "Mute UI sound effects" : "Enable subtle UI sound effects"}
            className="hud-panel inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs text-slate-200 transition-colors hover:text-cyan-200 focus-visible:outline focus-visible:outline-cyan-400 sm:text-sm"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-emerald-300" aria-hidden="true" />
            ) : (
              <VolumeX className="h-4 w-4 text-slate-400" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={onToggleEcoMode}
            aria-pressed={ecoMode}
            title={
              ecoMode
                ? "Eco Mode active (demand rendering) — switch to Live"
                : "Live animations active — switch to Eco Mode"
            }
            className="hud-panel inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-slate-200 transition-colors hover:text-cyan-200 focus-visible:outline focus-visible:outline-cyan-400 sm:text-sm"
          >
            {ecoMode ? (
              <Leaf className="h-4 w-4 text-emerald-300" aria-hidden="true" />
            ) : (
              <Zap className="h-4 w-4 text-cyan-300" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">{ecoMode ? "Eco" : "Live"}</span>
          </button>

          <button
            type="button"
            onClick={onToggleTimeOfDay}
            title={timeOfDay === "night" ? "Switch to Day lighting" : "Switch to Night lighting"}
            aria-label={timeOfDay === "night" ? "Switch to Day lighting" : "Switch to Night lighting"}
            className="hud-panel inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-slate-200 transition-colors hover:text-cyan-200 focus-visible:outline focus-visible:outline-cyan-400 sm:text-sm"
          >
            {timeOfDay === "night" ? (
              <Sun className="h-4 w-4 text-amber-300" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4 text-cyan-300" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">{timeOfDay === "night" ? "Day" : "Night"}</span>
          </button>

          <Link
            href="/projects"
            className="hud-panel hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-slate-200 transition-colors hover:text-cyan-200 md:inline-flex"
          >
            <Compass className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
            Case Studies
          </Link>

          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hud-panel inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-slate-200 transition-colors hover:text-cyan-200 sm:text-sm"
          >
            <CodeXml className="h-4 w-4 text-cyan-300" aria-hidden="true" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {profile.socials.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-panel inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-slate-200 transition-colors hover:text-cyan-200 sm:text-sm"
            >
              <ExternalLink className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          )}

          <button
            type="button"
            onClick={onClassicView}
            className="hud-panel inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-cyan-100 transition-colors hover:border-cyan-300/60 hover:text-white focus-visible:outline focus-visible:outline-cyan-400 sm:text-sm"
          >
            <LayoutList className="h-4 w-4 text-cyan-300" aria-hidden="true" />
            <span className="hidden sm:inline">Classic View</span>
          </button>
        </div>
      </header>

      {/* Guided Tour Controls */}
      {tourActive && (
        <div
          role="region"
          aria-label="Guided tour controls"
          className="pointer-events-auto absolute left-1/2 top-20 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-950/90 px-3 py-1.5 shadow-lg backdrop-blur-md sm:top-24"
        >
          <span className="px-1 font-mono text-[11px] text-cyan-300">
            TOUR {tourIndex + 1}/{totalCount} · {currentTourStop.label}
          </span>
          <button
            type="button"
            onClick={() => onTourStep(-1)}
            aria-label="Previous tour stop"
            className="rounded-full border border-slate-700 p-1 text-slate-200 hover:border-cyan-400 hover:text-cyan-200"
          >
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onTourStep(1)}
            aria-label="Next tour stop"
            className="rounded-full border border-slate-700 p-1 text-slate-200 hover:border-cyan-400 hover:text-cyan-200"
          >
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onExitTour}
            aria-label="Exit guided tour"
            className="rounded-full border border-slate-700 p-1 text-slate-400 hover:border-rose-400/60 hover:text-rose-200"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Bottom Dock */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-wrap items-end justify-between gap-3 p-3 sm:p-5">
        <div className="pointer-events-auto max-w-full">
          <WorldNavigation selectedId={selectedId} visitedIds={visitedIds} onSelect={onSelect} />
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onResetCamera}
            title="Reset camera to campus overview"
            className="hud-panel inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-slate-200 transition-colors hover:border-cyan-300/60 hover:text-cyan-100 focus-visible:outline focus-visible:outline-cyan-400"
          >
            <RotateCcw className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
            <span className="hidden sm:inline">Reset Camera</span>
          </button>

          <p className="hud-panel hidden items-center gap-2 rounded-lg px-3 py-2 font-mono text-[11px] text-slate-400 lg:flex">
            <MousePointerClick className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
            Drag to orbit · Scroll to zoom · Keys 1–6
          </p>
        </div>
      </div>
    </>
  );
}
