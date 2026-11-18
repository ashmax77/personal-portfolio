import Link from "next/link";
import { ArrowUpRight, CodeXml, ExternalLink } from "lucide-react";
import type { Project } from "@/types/portfolio";
import ProjectStatusBadge from "./ProjectStatusBadge";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export default function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <article className="hud-panel group flex flex-col justify-between rounded-xl p-5 transition-colors hover:border-cyan-300/45">
      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[11px] tracking-[0.16em] text-cyan-400">
            {project.category.toUpperCase()} · {project.period}
          </span>
          <ProjectStatusBadge status={project.status} />
        </div>

        <h3 className="text-lg font-semibold text-slate-50 group-hover:text-cyan-200">
          <Link href={`/projects/${project.slug}`} className="focus-visible:outline focus-visible:outline-cyan-400">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-sky-300/90">{project.tagline}</p>

        {!compact && (
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>
        )}

        <p className="mt-3 font-mono text-xs text-slate-400">
          Role: <span className="text-slate-200">{project.role}</span>
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded border border-sky-400/20 bg-slate-950/70 px-2 py-0.5 font-mono text-[11px] text-slate-300"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-sky-400/15 pt-4">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-100 focus-visible:outline focus-visible:outline-cyan-400"
        >
          Read Case Study
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-slate-100"
            >
              <CodeXml className="h-3.5 w-3.5" aria-hidden="true" />
              Repo
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-slate-100"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
