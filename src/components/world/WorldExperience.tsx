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
  const [resetTrigger, setResetTrigger] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("night");
  const [ecoMode, setEcoMode] = useState(false);

  const handleReady = useCallback(() => setWorldReady(true), []);
  const handleError = useCallback(() => setWorldError(true), []);
  const handleClosePanel = useCallback(() => setSelectedId(null), []);
  const handleEnter = useCallback(() => setView("world"), []);
  const handleClassic = useCallback(() => setView("classic"), []);
  const handleToggleTimeOfDay = useCallback(
    () => setTimeOfDay((prev) => (prev === "night" ? "day" : "night")),
    []
  );
  const handleToggleEcoMode = useCallback(() => setEcoMode((prev) => !prev), []);
  const handleResetCamera = useCallback(() => {
    setSelectedId(null);
    setResetTrigger((n) => n + 1);
  }, []);

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
              onSelect={setSelectedId}
              onReady={handleReady}
            />
          </WorldErrorBoundary>
        </div>
      )}

      {view === "world" && canRenderWorld && (
        <>
          <WorldHUD
            selectedId={selectedId}
            timeOfDay={timeOfDay}
            ecoMode={ecoMode}
            onToggleTimeOfDay={handleToggleTimeOfDay}
            onToggleEcoMode={handleToggleEcoMode}
            onSelect={setSelectedId}
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
