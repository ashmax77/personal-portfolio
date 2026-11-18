import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Briefcase,
  CodeXml,
  Cpu,
  FolderGit2,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import {
  achievements,
  education,
  experience,
  profile,
  projects,
  skillCategories,
} from "@/content";
import ProjectCard from "@/components/projects/ProjectCard";

type ClassicPortfolioViewProps = {
  /** Omit when WebGL is unavailable so visitors aren't offered a broken 3D toggle. */
  onReturnToWorld?: () => void;
};

const SECTION_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
] as const;

export default function ClassicPortfolioView({ onReturnToWorld }: ClassicPortfolioViewProps) {
  return (
    <div className="engine-grid-bg min-h-screen text-slate-100">
      <header className="sticky top-0 z-30 border-b border-sky-400/20 bg-[#060A12]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs tracking-[0.2em] text-cyan-400">
              ASHEN&apos;S WORLD // CLASSIC VIEW
            </span>
          </div>

          <nav aria-label="Portfolio sections" className="hidden items-center gap-4 text-xs text-slate-300 md:flex">
            {SECTION_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-cyan-300 focus-visible:outline focus-visible:outline-cyan-400"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {onReturnToWorld && (
            <button
              type="button"
              onClick={onReturnToWorld}
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/40 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-100 transition-colors hover:bg-cyan-400/20 focus-visible:outline focus-visible:outline-cyan-400 sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              3D World
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-14 px-4 py-10 sm:px-6 sm:py-14">
        {/* About / Hero */}
        <section id="about" className="hud-panel-strong rounded-2xl p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-cyan-400">HQ-01 // DEVELOPER HQ</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
                {profile.name}
              </h1>
              <p className="mt-1 text-lg text-cyan-300">{profile.role}</p>
              <p className="mt-2 text-sm italic text-slate-400">{profile.tagline}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/projects"
                className="rounded-lg border border-cyan-300/45 bg-cyan-400/15 px-4 py-2 text-sm font-medium text-cyan-100 transition-colors hover:bg-cyan-400/25"
              >
                All Case Studies
              </Link>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-600/70 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-cyan-400/50 hover:text-cyan-200"
              >
                <CodeXml className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-sky-400/15 pt-5 font-mono text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5 text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.availability}
            </span>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-cyan-400">LAB-02 // PROJECT LAB</p>
              <h2 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-slate-50">
                <FolderGit2 className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="font-mono text-xs text-cyan-300 hover:text-cyan-100"
            >
              View standalone /projects →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-cyan-400">TECH-03 // TECHNOLOGY CENTER</p>
            <h2 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-slate-50">
              <Cpu className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              Technical Skills & Stack
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {skillCategories.map((category) => (
              <div key={category.id} className="hud-panel rounded-xl p-5">
                <h3 className="text-base font-semibold text-slate-100">{category.title}</h3>
                <p className="mt-1 text-xs text-slate-400">{category.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <li
                      key={skill.name}
                      className="rounded-md border border-sky-400/20 bg-slate-950/70 px-2.5 py-1 text-xs text-slate-200"
                    >
                      {skill.name}
                      <span className="ml-1.5 font-mono text-[10px] text-cyan-400/80">
                        {skill.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Experience */}
        <div className="grid gap-6 lg:grid-cols-2">
          <section id="education" className="space-y-4">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-cyan-400">ACAD-04 // ACADEMY</p>
              <h2 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-slate-50">
                <GraduationCap className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                Education
              </h2>
            </div>

            {education.map((item) => (
              <div key={item.id} className="hud-panel space-y-3 rounded-xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-slate-100">{item.degree}</h3>
                  <span className="font-mono text-xs text-cyan-300">{item.period}</span>
                </div>
                <p className="text-sm text-sky-300">{item.institution}</p>
                <ul className="list-disc space-y-1 pl-4 text-sm text-slate-300">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.coursework.map((course) => (
                    <span
                      key={course}
                      className="rounded border border-slate-700 bg-slate-950/70 px-2 py-0.5 text-xs text-slate-300"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section id="experience" className="space-y-4">
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-cyan-400">EXP-05 // EXPERIENCE</p>
                <h2 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-slate-50">
                  <Briefcase className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                  Experience & Leadership
                </h2>
              </div>
              <Link href="/experience" className="font-mono text-xs text-cyan-300 hover:text-cyan-100">
                /experience →
              </Link>
            </div>

            <div className="space-y-4">
              {experience.map((item) => (
                <div key={item.id} className="hud-panel space-y-2 rounded-xl p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold text-slate-100">{item.role}</h3>
                    <span className="font-mono text-xs text-cyan-300">{item.period}</span>
                  </div>
                  <p className="text-sm text-sky-300">{item.organization}</p>
                  <p className="text-sm text-slate-300">{item.summary}</p>
                  <ul className="list-disc space-y-1 pl-4 text-xs text-slate-400">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Achievements */}
        <section id="achievements" className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-cyan-400">HALL-05 // ACHIEVEMENT HALL</p>
            <h2 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-slate-50">
              <Award className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              Milestones & Achievements
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {achievements.map((item) => (
              <div key={item.id} className="hud-panel rounded-xl p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-300">
                  {item.category} · {item.date}
                </p>
                <h3 className="mt-1.5 font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-0.5 text-xs text-sky-300">{item.issuer}</p>
                <p className="mt-2.5 text-sm text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="hud-panel-strong rounded-2xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-cyan-400">
                COMMS-06 // COMMUNICATION HUB
              </p>
              <h2 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-slate-50">
                <Mail className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                Connect & Direct Routes
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Explore independent portfolio routes or reach out via GitHub.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              <Link
                href="/about"
                className="rounded-lg border border-sky-400/25 px-3 py-2 text-slate-200 hover:border-cyan-400/50 hover:text-cyan-200"
              >
                /about
              </Link>
              <Link
                href="/projects"
                className="rounded-lg border border-sky-400/25 px-3 py-2 text-slate-200 hover:border-cyan-400/50 hover:text-cyan-200"
              >
                /projects
              </Link>
              <Link
                href="/experience"
                className="rounded-lg border border-sky-400/25 px-3 py-2 text-slate-200 hover:border-cyan-400/50 hover:text-cyan-200"
              >
                /experience
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-sky-400/25 px-3 py-2 text-slate-200 hover:border-cyan-400/50 hover:text-cyan-200"
              >
                /contact
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
