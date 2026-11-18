"use client";

import { useEffect } from "react";
import { Award, Building2, Cpu, FolderGit2, GraduationCap, Radio } from "lucide-react";
import { destinations } from "@/lib/destinations";
import type { LocationId } from "@/types/portfolio";

type WorldNavigationProps = {
  selectedId: LocationId | null;
  onSelect: (id: LocationId) => void;
};

const LOCATION_ICONS: Record<LocationId, typeof Building2> = {
  "developer-hq": Building2,
  "project-lab": FolderGit2,
  "technology-center": Cpu,
  academy: GraduationCap,
  "achievement-hall": Award,
  "communication-hub": Radio,
};

export default function WorldNavigation({ selectedId, onSelect }: WorldNavigationProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

      const match = destinations.find((d) => d.hotkey === event.key);
      if (match) {
        onSelect(match.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSelect]);

  return (
    <nav aria-label="World destinations" className="max-w-full">
      <ul className="hud-panel flex flex-wrap gap-1.5 rounded-xl p-1.5 sm:gap-2 sm:p-2">
        {destinations.map((destination) => {
          const Icon = LOCATION_ICONS[destination.id];
          const isSelected = selectedId === destination.id;

          return (
            <li key={destination.id}>
              <button
                type="button"
                onClick={() => onSelect(destination.id)}
                aria-pressed={isSelected}
                title={`${destination.label} (Press ${destination.hotkey})`}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-xs transition-colors focus-visible:outline focus-visible:outline-cyan-400 sm:px-3 sm:text-sm ${
                  isSelected
                    ? "border-emerald-400/70 bg-emerald-500/15 text-emerald-200"
                    : "border-sky-400/20 bg-slate-950/60 text-slate-200 hover:border-cyan-400/50 hover:text-cyan-100"
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-300" aria-hidden="true" />
                <span className="hidden sm:inline">{destination.label}</span>
                <span className="sm:hidden">{destination.shortCode}</span>
                <kbd className="hidden rounded border border-slate-700 bg-slate-900 px-1 font-mono text-[10px] text-slate-400 lg:inline">
                  {destination.hotkey}
                </kbd>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
