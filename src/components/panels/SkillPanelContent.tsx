import { skillCategories } from "@/content/skills";

export default function SkillPanelContent() {
  return (
    <div className="space-y-4">
      {skillCategories.map((category) => (
        <section
          key={category.id}
          className="rounded-xl border border-sky-400/20 bg-slate-950/60 p-4"
        >
          <h3 className="font-semibold text-slate-100">{category.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">{category.summary}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {category.items.map((skill) => (
              <li
                key={skill.name}
                className="rounded-md border border-sky-400/20 bg-slate-900/90 px-2.5 py-1 text-xs text-slate-200"
              >
                {skill.name}
                <span className="ml-1.5 font-mono text-[10px] text-cyan-400/80">
                  {skill.level}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
