import type { Metadata } from "next";
import { Award, Briefcase } from "lucide-react";
import PageShell from "@/components/common/PageShell";
import { achievements, experience } from "@/content";

export const metadata: Metadata = {
  title: "Experience & Achievements",
  description: "Engineering leadership, project delivery experience, and key milestones.",
};

export default function ExperiencePage() {
  return (
    <PageShell eyebrow="EXP-05 // EXPERIENCE & MILESTONES">
      <div className="space-y-10">
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-cyan-400">TRACK RECORD</p>
            <h1 className="mt-2 flex items-center gap-2.5 text-3xl font-bold text-slate-50">
              <Briefcase className="h-7 w-7 text-cyan-300" aria-hidden="true" />
              Experience & Leadership
            </h1>
          </div>

          <div className="space-y-4">
            {experience.map((item) => (
              <div key={item.id} className="hud-panel space-y-3 rounded-xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-slate-100">{item.role}</h2>
                  <span className="font-mono text-xs text-cyan-300">{item.period}</span>
                </div>
                <p className="text-sm text-sky-300">{item.organization}</p>
                <p className="text-sm leading-relaxed text-slate-300">{item.summary}</p>
                <ul className="list-disc space-y-1 pl-4 text-sm text-slate-300">
                  {item.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-sky-400/20 bg-slate-950/70 px-2 py-0.5 font-mono text-xs text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-slate-50">
            <Award className="h-5 w-5 text-cyan-300" aria-hidden="true" />
            Achievements & Milestones
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {achievements.map((item) => (
              <div key={item.id} className="hud-panel rounded-xl p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-300">
                  {item.category} · {item.date}
                </p>
                <h3 className="mt-1.5 font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-0.5 text-xs text-sky-300">{item.issuer}</p>
                <p className="mt-2 text-sm text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
