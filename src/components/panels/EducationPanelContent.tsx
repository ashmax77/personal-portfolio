import { GraduationCap } from "lucide-react";
import { education } from "@/content/education";

export default function EducationPanelContent() {
  return (
    <div className="space-y-4">
      {education.map((item) => (
        <section
          key={item.id}
          className="space-y-3 rounded-xl border border-sky-400/20 bg-slate-950/60 p-4"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-300">
                <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                {item.status === "in-progress" ? "IN PROGRESS" : "COMPLETED"} · {item.period}
              </p>
              <h3 className="mt-1 font-semibold text-slate-100">{item.degree}</h3>
              <p className="text-xs text-sky-300">{item.institution}</p>
            </div>
          </div>

          <ul className="list-disc space-y-1.5 pl-4 text-sm text-slate-300">
            {item.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          <div>
            <p className="mb-2 font-mono text-[11px] tracking-[0.18em] text-slate-500">
              CORE COURSEWORK
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.coursework.map((course) => (
                <span
                  key={course}
                  className="rounded border border-slate-700 bg-slate-900/80 px-2 py-0.5 text-xs text-slate-300"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
