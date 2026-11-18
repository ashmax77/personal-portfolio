import { Award, ExternalLink } from "lucide-react";
import { achievements } from "@/content/achievements";

export default function AchievementPanelContent() {
  return (
    <div className="space-y-3">
      {achievements.map((item) => (
        <article
          key={item.id}
          className="rounded-xl border border-sky-400/20 bg-slate-950/60 p-4"
        >
          <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
            <span className="inline-flex items-center gap-1.5 uppercase text-amber-300">
              <Award className="h-3.5 w-3.5" aria-hidden="true" />
              {item.category}
            </span>
            <span className="text-slate-400">{item.date}</span>
          </div>

          <h3 className="mt-1.5 font-semibold text-slate-100">{item.title}</h3>
          <p className="text-xs text-sky-300">{item.issuer}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>

          {item.credentialUrl && (
            <a
              href={item.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs text-cyan-300 hover:text-cyan-100"
            >
              View Credential
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          )}
        </article>
      ))}
    </div>
  );
}
