"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import BootSequence from "@/components/onboarding/BootSequence";
import WorldHUD from "@/components/navigation/WorldHUD";
import InformationPanel from "@/components/panels/InformationPanel";
import AboutPanelContent from "@/components/panels/AboutPanelContent";
import ProjectPanelContent from "@/components/panels/ProjectPanelContent";
import SkillPanelContent from "@/components/panels/SkillPanelContent";
import EducationPanelContent from "@/components/panels/EducationPanelContent";
import AchievementPanelContent from "@/components/panels/AchievementPanelContent";
import CommunicationPanelContent from "@/components/panels/CommunicationPanelContent";
import ClassicPortfolioView from "@/components/common/ClassicPortfolioView";
import WorldErrorBoundary from "@/components/world/WorldErrorBoundary";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { destinations } from "@/lib/destinations";
import {
  playDiscoveryComplete,
  playPanelClose,
  playSelectChime,
  playTourStep,
} from "@/lib/sound";
import type { LocationId } from "@/types/portfolio";
import type { TimeOfDay } from "@/components/world/WorldAtmosphere";

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
  const [visitedIds, setVisitedIds] = useState<LocationId[]>([]);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("night");
  const [ecoMode, setEcoMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);

  const selectDestination = useCallback(
    (id: LocationId, isTour = false) => {
      setSelectedId(id);
      setVisitedIds((prev) => {
        if (prev.includes(id)) {
          if (isTour) {
            playTourStep(soundEnabled);
          } else {
            playSelectChime(soundEnabled);
          }
          return prev;
        }
        const next = [...prev, id];
        if (next.length === destinations.length) {
          playDiscoveryComplete(soundEnabled);
        } else if (isTour) {
          playTourStep(soundEnabled);
        } else {
          playSelectChime(soundEnabled);
        }
        return next;
      });
    },
    [soundEnabled]
  );

  const handleReady = useCallback(() => setWorldReady(true), []);
  const handleError = useCallback(() => setWorldError(true), []);

  const handleClosePanel = useCallback(() => {
    setSelectedId(null);
    setTourActive(false);
    playPanelClose(soundEnabled);
  }, [soundEnabled]);

  const handleEnter = useCallback(() => setView("world"), []);
  const handleClassic = useCallback(() => setView("classic"), []);
  const handleToggleTimeOfDay = useCallback(
    () => setTimeOfDay((prev) => (prev === "night" ? "day" : "night")),
    []
  );
  const handleToggleEcoMode = useCallback(() => setEcoMode((prev) => !prev), []);
  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) playSelectChime(true);
      return next;
    });
  }, []);

  const handleStartTour = useCallback(() => {
    setTourActive(true);
    setTourIndex(0);
    selectDestination(destinations[0].id, true);
  }, [selectDestination]);

  const handleTourStep = useCallback(
    (direction: -1 | 1) => {
      setTourIndex((prev) => {
        const next = (prev + direction + destinations.length) % destinations.length;
        selectDestination(destinations[next].id, true);
        return next;
      });
    },
    [selectDestination]
  );

  const handleExitTour = useCallback(() => {
    setTourActive(false);
  }, []);

  const handleResetCamera = useCallback(() => {
    setSelectedId(null);
    setTourActive(false);
    setResetTrigger((n) => n + 1);
    playPanelClose(soundEnabled);
  }, [soundEnabled]);

  const canRenderWorld = webglSupported === true && !worldError;
  const showBoot = view === "boot" || (view === "world" && worldError);
  const selectedDestination = destinations.find((d) => d.id === selectedId) ?? null;

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#060A12]">
      {canRenderWorld && (
        <div className="absolute inset-0" aria-hidden={view !== "world"}>
          <WorldErrorBoundary onError={handleError}>
            <WorldCanvas
              selectedId={selectedId}
              resetTrigger={resetTrigger}
              timeOfDay={timeOfDay}
              ecoMode={ecoMode}
              onSelect={(id) => {
                setTourActive(false);
                selectDestination(id);
              }}
              onReady={handleReady}
            />
          </WorldErrorBoundary>
        </div>
      )}

      {view === "world" && canRenderWorld && (
        <>
          <WorldHUD
            selectedId={selectedId}
            visitedIds={visitedIds}
            timeOfDay={timeOfDay}
            ecoMode={ecoMode}
            soundEnabled={soundEnabled}
            tourActive={tourActive}
            tourIndex={tourIndex}
            onToggleTimeOfDay={handleToggleTimeOfDay}
            onToggleEcoMode={handleToggleEcoMode}
            onToggleSound={handleToggleSound}
            onStartTour={handleStartTour}
            onTourStep={handleTourStep}
            onExitTour={handleExitTour}
            onSelect={(id) => {
              setTourActive(false);
              selectDestination(id);
            }}
            onResetCamera={handleResetCamera}
            onClassicView={handleClassic}
          />

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
        {selectedDestination?.section === "projects" && <ProjectPanelContent />}
        {selectedDestination?.section === "skills" && <SkillPanelContent />}
        {selectedDestination?.section === "education" && <EducationPanelContent />}
        {selectedDestination?.section === "achievements" && <AchievementPanelContent />}
        {selectedDestination?.section === "contact" && <CommunicationPanelContent />}
      </InformationPanel>

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
