import { Box, CheckCircle2, Cpu, Layers, Terminal } from "lucide-react";

const diagnostics = [
  { label: "WEB_FRAMEWORK", value: "Next.js App Router + TypeScript", status: "ONLINE" },
  { label: "3D_ENGINE", value: "Three.js + React Three Fiber + Drei", status: "READY" },
  { label: "HUD_THEME", value: "Dark Sci-Fi / Game-Engine Viewport", status: "ACTIVE" },
  { label: "PHASE_TARGET", value: "Phase 2: Boot Sequence & 3D Vertical Slice", status: "NEXT" },
];

export default function Home() {
  return (
    <main className="engine-grid-bg relative flex min-h-screen flex-1 flex-col items-center justify-center overflow-hidden p-6">
      <div className="hud-scanlines pointer-events-none absolute inset-0" />

      <div className="hud-panel-strong relative z-10 w-full max-w-2xl rounded-xl p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-sky-400/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/35 bg-cyan-400/10 text-cyan-300">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-cyan-400">
                ASHEN&apos;S WORLD // ENGINE CORE
              </p>
              <h1 className="text-xl font-semibold tracking-tight text-slate-100 sm:text-2xl">
                Phase 1 Foundation Online
              </h1>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            BUILD READY
          </span>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-slate-300 sm:text-base">
          The Next.js App Router foundation, typed portfolio contracts, directory
          structure, and Dark Sci-Fi Game-Engine Viewport theme are configured.
          Next up in Phase 2: the terminal boot sequence, lazy-loaded 3D
          prototype canvas, and the first interactive{" "}
          <span className="font-mono text-cyan-300">Developer HQ</span> HTML panel.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {diagnostics.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-sky-400/15 bg-slate-950/60 p-3.5"
            >
              <div className="mb-1 flex items-center justify-between font-mono text-[11px] text-slate-400">
                <span>{item.label}</span>
                <span className="text-emerald-400">{item.status}</span>
              </div>
              <p className="text-sm font-medium text-slate-100">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-sky-400/15 pt-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-cyan-400" />
              frameloop=&quot;demand&quot;
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Box className="h-3.5 w-3.5 text-cyan-400" />
              src/types/portfolio.ts
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              HTML + WebGL split
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-cyan-300">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Phase 01 / 07
          </span>
        </div>
      </div>
    </main>
  );
}
