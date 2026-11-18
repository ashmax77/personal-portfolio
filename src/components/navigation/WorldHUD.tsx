"use client";

import Link from "next/link";
import { CodeXml, Compass, ExternalLink, LayoutList, Moon, MousePointerClick, RotateCcw, Sun } from "lucide-react";
import { profile } from "@/content/profile";
import type { LocationId } from "@/types/portfolio";
import type { TimeOfDay } from "@/components/world/WorldAtmosphere";
import WorldNavigation from "./WorldNavigation";

type WorldHUDProps = {
  selectedId: LocationId | null;
  timeOfDay: TimeOfDay;
  onToggleTimeOfDay: () => void;
  onSelect: (id: LocationId) => void;
  onResetCamera: () => void;
  onClassicView: () => void;
};

export default function WorldHUD({
  selectedId,
  timeOfDay,
  onToggleTimeOfDay,
  onSelect,
  onResetCamera,
  onClassicView,
}: WorldHUDProps) {
  return (
    <>
      {/* Top Bar */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-3 sm:p-5">
        <div className="hud-panel pointer-events-auto max-w-xs rounded-xl px-4 py-3 sm:max-w-sm">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            ASHEN&apos;S WORLD // ONLINE
          </div>
          <h1 className="mt-1 text-base font-semibold text-slate-50 sm:text-lg">{profile.name}</h1>
          <p className="text-xs text-cyan-200/90 sm:text-sm">{profile.role}</p>
          <p className="mt-1 hidden text-xs text-slate-400 sm:block">{profile.tagline}</p>
        </div>

        <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-2">
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

      {/* Bottom Dock */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-wrap items-end justify-between gap-3 p-3 sm:p-5">
        <div className="pointer-events-auto max-w-full">
          <WorldNavigation selectedId={selectedId} onSelect={onSelect} />
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
