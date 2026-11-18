import { CodeXml, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/content/profile";

/** Developer HQ panel body — renders profile content from `src/content/profile.ts`. */
export default function AboutPanelContent() {
  return (
    <div className="space-y-6 text-sm leading-relaxed text-slate-300">
      <div>
        <p className="text-lg font-semibold text-slate-50">{profile.name}</p>
        <p className="text-cyan-300">{profile.role}</p>
        <p className="mt-2 italic text-slate-400">{profile.tagline}</p>
      </div>

      <div className="space-y-3">
        {profile.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <dl className="grid grid-cols-2 gap-3 font-mono text-xs">
        <div className="rounded-lg border border-sky-400/15 bg-slate-950/60 p-3">
          <dt className="mb-1 flex items-center gap-1.5 text-slate-500">
            <MapPin className="h-3 w-3" aria-hidden="true" /> LOCATION
          </dt>
          <dd className="text-slate-200">{profile.location}</dd>
        </div>
        <div className="rounded-lg border border-sky-400/15 bg-slate-950/60 p-3">
          <dt className="mb-1 flex items-center gap-1.5 text-slate-500">
            <Sparkles className="h-3 w-3" aria-hidden="true" /> STATUS
          </dt>
          <dd className="text-emerald-300">{profile.availability}</dd>
        </div>
      </dl>

      <div>
        <h3 className="mb-2 font-mono text-[11px] tracking-[0.2em] text-slate-500">INTERESTS</h3>
        <ul className="flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <li
              key={interest}
              className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100"
            >
              {interest}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={profile.socials.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg border border-slate-600/60 px-3 py-2 text-slate-200 transition-colors hover:border-cyan-400/60 hover:text-cyan-200"
      >
        <CodeXml className="h-4 w-4" aria-hidden="true" />
        GitHub · @{profile.handle}
      </a>
    </div>
  );
}
