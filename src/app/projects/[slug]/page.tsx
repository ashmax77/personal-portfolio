import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CodeXml, ExternalLink, Layers, Wrench } from "lucide-react";
import PageShell from "@/components/common/PageShell";
import ProjectStatusBadge from "@/components/projects/ProjectStatusBadge";
import { getProjectBySlug, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Case Study`,
    description: `${project.tagline}. ${project.description}`,
  };
}

function CaseStudySkeleton() {
  return (
    <div className="hud-panel-strong animate-pulse space-y-4 rounded-2xl p-6 sm:p-8">
      <div className="h-4 w-36 rounded bg-slate-800" />
      <div className="h-8 w-64 rounded bg-slate-800" />
      <div className="h-20 w-full rounded bg-slate-800/70" />
    </div>
  );
}

export default function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <PageShell eyebrow="LAB-02 // PROJECT CASE STUDY">
      <Suspense fallback={<CaseStudySkeleton />}>
        <CaseStudyContent params={params} />
      </Suspense>
    </PageShell>
  );
}

async function CaseStudyContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <article className="space-y-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-300 hover:text-cyan-100"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          All Projects
        </Link>

        {/* 1. Overview & Metadata */}
        <header className="hud-panel-strong space-y-5 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-xs tracking-[0.2em] text-cyan-400">
              {project.category.toUpperCase()} · {project.period}
            </span>
            <ProjectStatusBadge status={project.status} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-1.5 text-lg text-sky-300">{project.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {project.description}
            </p>
          </div>

          <dl className="grid gap-3 border-t border-sky-400/15 pt-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[11px] text-slate-500">MY ROLE</dt>
              <dd className="mt-0.5 font-medium text-slate-100">{project.role}</dd>
            </div>
            {project.team && (
              <div>
                <dt className="font-mono text-[11px] text-slate-500">TEAM & TIMELINE</dt>
                <dd className="mt-0.5 font-medium text-slate-100">
                  {project.team} ({project.period})
                </dd>
              </div>
            )}
          </dl>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded border border-sky-400/25 bg-slate-950/70 px-2.5 py-1 font-mono text-xs text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {(project.github || project.demo) && (
            <div className="flex flex-wrap gap-3 pt-1">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-600/70 px-4 py-2 text-sm text-slate-100 hover:border-cyan-400/60 hover:text-cyan-200"
                >
                  <CodeXml className="h-4 w-4" aria-hidden="true" />
                  View Repository
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/45 bg-cyan-400/15 px-4 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-400/25"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Live Demo
                </a>
              )}
            </div>
          )}
        </header>

        {/* 2. Problem & Motivation */}
        {project.problem && (
          <section className="hud-panel space-y-2 rounded-xl p-6">
            <h2 className="font-mono text-xs tracking-[0.2em] text-cyan-400">
              02 // PROBLEM & MOTIVATION
            </h2>
            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{project.problem}</p>
          </section>
        )}

        {/* 3 & 4. Role, Personal vs Team Contributions */}
        <section className="grid gap-5 md:grid-cols-2">
          <div className="hud-panel space-y-3 rounded-xl p-6">
            <h2 className="font-mono text-xs tracking-[0.2em] text-cyan-400">
              03 // MY CONTRIBUTIONS
            </h2>
            <ul className="list-disc space-y-2 pl-4 text-sm text-slate-200">
              {project.contributions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {project.teamContributions && (
            <div className="hud-panel space-y-3 rounded-xl p-6">
              <h2 className="font-mono text-xs tracking-[0.2em] text-cyan-400">
                04 // TEAM CONTRIBUTIONS
              </h2>
              <ul className="list-disc space-y-2 pl-4 text-sm text-slate-300">
                {project.teamContributions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* 5 & 6. System Architecture & Tech Decisions */}
        {project.architectureSummary && (
          <section className="hud-panel space-y-4 rounded-xl p-6">
            <h2 className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-cyan-400">
              <Layers className="h-4 w-4" aria-hidden="true" />
              05 // SYSTEM ARCHITECTURE & TECH DECISIONS
            </h2>
            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              {project.architectureSummary}
            </p>
            {project.techDecisions && (
              <ul className="list-disc space-y-1.5 pl-4 text-sm text-slate-300">
                {project.techDecisions.map((decision) => (
                  <li key={decision}>{decision}</li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* 7. Key Implementation Details */}
        {project.implementationHighlights && (
          <section className="hud-panel space-y-3 rounded-xl p-6">
            <h2 className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-cyan-400">
              <Wrench className="h-4 w-4" aria-hidden="true" />
              06 // KEY IMPLEMENTATION DETAILS
            </h2>
            <ul className="list-disc space-y-2 pl-4 text-sm text-slate-300">
              {project.implementationHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* 8. Technical Challenges & Solutions */}
        {project.challenges && (
          <section className="hud-panel space-y-4 rounded-xl p-6">
            <h2 className="font-mono text-xs tracking-[0.2em] text-cyan-400">
              07 // CHALLENGES & SOLUTIONS
            </h2>
            <div className="space-y-4">
              {project.challenges.map((entry) => (
                <div
                  key={entry.challenge}
                  className="rounded-lg border border-sky-400/15 bg-slate-950/60 p-4 text-sm"
                >
                  <p className="font-medium text-slate-100">Challenge: {entry.challenge}</p>
                  <p className="mt-1.5 text-slate-300">Solution: {entry.solution}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 9 & 10. Results & Lessons Learned */}
        <section className="grid gap-5 md:grid-cols-2">
          {project.results && (
            <div className="hud-panel space-y-3 rounded-xl p-6">
              <h2 className="font-mono text-xs tracking-[0.2em] text-emerald-400">
                08 // VERIFIED RESULTS
              </h2>
              <ul className="list-disc space-y-2 pl-4 text-sm text-slate-200">
                {project.results.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </div>
          )}

          {(project.lessonsLearned || project.futureImprovements) && (
            <div className="hud-panel space-y-3 rounded-xl p-6">
              <h2 className="font-mono text-xs tracking-[0.2em] text-cyan-400">
                09 // LESSONS & NEXT STEPS
              </h2>
              <ul className="list-disc space-y-2 pl-4 text-sm text-slate-300">
                {project.lessonsLearned?.map((lesson) => <li key={lesson}>{lesson}</li>)}
                {project.futureImprovements?.map((next) => (
                  <li key={next} className="text-slate-400">
                    Next: {next}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </article>
  );
}
