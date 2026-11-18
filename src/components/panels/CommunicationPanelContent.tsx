import Link from "next/link";
import { ArrowUpRight, Briefcase, CodeXml, Mail } from "lucide-react";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";

export default function CommunicationPanelContent() {
  return (
    <div className="space-y-6">
      {/* Experience */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 font-mono text-xs tracking-[0.18em] text-cyan-400">
            <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
            EXPERIENCE
          </h3>
          <Link
            href="/experience"
            className="inline-flex items-center gap-1 font-mono text-xs text-cyan-300 hover:text-cyan-100"
          >
            Full Page
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>

        <div className="space-y-3">
          {experience.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-sky-400/20 bg-slate-950/60 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-semibold text-slate-100">{item.role}</h4>
                <span className="font-mono text-[11px] text-cyan-300">{item.period}</span>
              </div>
              <p className="text-xs text-sky-300">{item.organization}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">{item.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Channels */}
      <section className="space-y-3 border-t border-sky-400/15 pt-4">
        <h3 className="font-mono text-xs tracking-[0.18em] text-cyan-400">DIRECT CHANNELS</h3>
        <div className="flex flex-wrap gap-2">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/40 bg-cyan-400/10 px-3.5 py-2 text-xs font-medium text-cyan-100 hover:bg-cyan-400/20"
          >
            <CodeXml className="h-4 w-4" aria-hidden="true" />
            GitHub · @{profile.handle}
          </a>

          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-600/70 px-3.5 py-2 text-xs text-slate-200 hover:border-cyan-400/60"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email
            </a>
          )}

          <Link
            href="/contact"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-600/70 px-3.5 py-2 text-xs text-slate-200 hover:border-cyan-400/60"
          >
            Contact Page
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
