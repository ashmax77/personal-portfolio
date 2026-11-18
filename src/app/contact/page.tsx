import type { Metadata } from "next";
import { CodeXml, Mail, MapPin, Sparkles } from "lucide-react";
import PageShell from "@/components/common/PageShell";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Connect with Ashen Imalsha via GitHub and professional channels.",
};

export default function ContactPage() {
  return (
    <PageShell eyebrow="COMMS-06 // COMMUNICATION HUB">
      <section className="hud-panel-strong space-y-6 rounded-2xl p-6 sm:p-8">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-cyan-400">COMMUNICATION HUB</p>
          <h1 className="mt-2 flex items-center gap-2.5 text-3xl font-bold text-slate-50">
            <Mail className="h-7 w-7 text-cyan-300" aria-hidden="true" />
            Get in Touch
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
            Open to software engineering internships, collaborative full-stack builds, and
            technical conversations.
          </p>
        </div>

        <dl className="grid gap-3 font-mono text-xs sm:grid-cols-2">
          <div className="rounded-lg border border-sky-400/20 bg-slate-950/60 p-4">
            <dt className="mb-1 flex items-center gap-1.5 text-slate-500">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> LOCATION
            </dt>
            <dd className="text-sm text-slate-100">{profile.location}</dd>
          </div>
          <div className="rounded-lg border border-sky-400/20 bg-slate-950/60 p-4">
            <dt className="mb-1 flex items-center gap-1.5 text-slate-500">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> AVAILABILITY
            </dt>
            <dd className="text-sm text-emerald-300">{profile.availability}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/45 bg-cyan-400/15 px-4 py-2.5 text-sm font-medium text-cyan-100 hover:bg-cyan-400/25"
          >
            <CodeXml className="h-4 w-4" aria-hidden="true" />
            GitHub · @{profile.handle}
          </a>
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-600/70 px-4 py-2.5 text-sm text-slate-100 hover:border-cyan-400/60"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {profile.email}
            </a>
          )}
        </div>
      </section>
    </PageShell>
  );
}
