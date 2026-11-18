import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export default function ProjectPanelContent() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
        <span>{projects.length} featured engineering builds</span>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 font-mono text-cyan-300 hover:text-cyan-100"
        >
          All Case Studies
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} compact />
        ))}
      </div>
    </div>
  );
}
