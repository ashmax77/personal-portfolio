import { ArrowLeft, Construction } from "lucide-react";
import AboutPanelContent from "@/components/panels/AboutPanelContent";

type ClassicPreviewProps = {
  /** Omit when WebGL is unavailable so the visitor isn't offered a broken world. */
  onReturnToWorld?: () => void;
};

/**
 * Temporary non-3D fallback for Phase 2.
 * Phase 3 replaces this with the complete `ClassicPortfolioView`.
 */
export default function ClassicPreview({ onReturnToWorld }: ClassicPreviewProps) {
  return (
    <main className="engine-grid-bg min-h-screen px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-xs tracking-[0.2em] text-cyan-400">
            ASHEN&apos;S WORLD // CLASSIC VIEW
          </p>
          {onReturnToWorld && (
            <button
              type="button"
              onClick={onReturnToWorld}
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/40 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100 transition-colors hover:bg-cyan-400/20 focus-visible:outline focus-visible:outline-cyan-400"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to 3D World
            </button>
          )}
        </div>

        <section className="hud-panel-strong rounded-xl p-6" aria-labelledby="classic-about">
          <h1 id="classic-about" className="sr-only">
            About
          </h1>
          <AboutPanelContent />
        </section>

        <div className="flex gap-3 rounded-lg border border-amber-400/25 bg-amber-500/10 p-4 text-sm text-amber-100">
          <Construction className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            Projects, skills, education, experience and achievements arrive in the full Classic
            View in the next development phase.
          </p>
        </div>
      </div>
    </main>
  );
}
