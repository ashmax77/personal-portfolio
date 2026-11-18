import type { Metadata } from "next";
import PageShell from "@/components/common/PageShell";
import AboutPanelContent from "@/components/panels/AboutPanelContent";
import { education, skillCategories } from "@/content";

export const metadata: Metadata = {
  title: "About",
  description: "Profile, engineering focus, education, and technical skills of Ashen Imalsha.",
};

export default function AboutPage() {
  return (
    <PageShell eyebrow="HQ-01 // ABOUT & SKILLS">
      <div className="space-y-8">
        <section className="hud-panel-strong rounded-2xl p-6 sm:p-8">
          <h1 className="mb-5 font-mono text-xs tracking-[0.2em] text-cyan-400">
            DEVELOPER PROFILE
          </h1>
          <AboutPanelContent />
        </section>

        <section className="space-y-4">
          <h2 className="font-mono text-xs tracking-[0.2em] text-cyan-400">TECHNICAL STACK</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {skillCategories.map((category) => (
              <div key={category.id} className="hud-panel rounded-xl p-5">
                <h3 className="font-semibold text-slate-100">{category.title}</h3>
                <p className="mt-1 text-xs text-slate-400">{category.summary}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {category.items.map((skill) => (
                    <li
                      key={skill.name}
                      className="rounded border border-sky-400/20 bg-slate-950/70 px-2 py-0.5 text-xs text-slate-200"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-mono text-xs tracking-[0.2em] text-cyan-400">EDUCATION</h2>
          {education.map((item) => (
            <div key={item.id} className="hud-panel rounded-xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold text-slate-100">{item.degree}</h3>
                <span className="font-mono text-xs text-cyan-300">{item.period}</span>
              </div>
              <p className="mt-0.5 text-sm text-sky-300">{item.institution}</p>
              <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-slate-300">
                {item.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </PageShell>
  );
}
