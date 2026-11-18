import type { Metadata } from "next";
import { FolderGit2 } from "lucide-react";
import PageShell from "@/components/common/PageShell";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects & Case Studies",
  description:
    "Engineering case studies, system architectures, and personal contributions across full-stack, mobile, and AI web applications.",
};

export default function ProjectsPage() {
  return (
    <PageShell eyebrow="LAB-02 // PROJECT LAB">
      <div className="space-y-8">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-cyan-400">PROJECT ARCHIVE</p>
          <h1 className="mt-2 flex items-center gap-2.5 text-3xl font-bold text-slate-50">
            <FolderGit2 className="h-7 w-7 text-cyan-300" aria-hidden="true" />
            Projects & Case Studies
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Detailed breakdowns of architecture decisions, individual vs. team contributions,
            and verified results across completed builds and active prototypes.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
