import { CheckCircle2, Clock, FlaskConical } from "lucide-react";
import type { Project } from "@/types/portfolio";

const STATUS_STYLES: Record<
  Project["status"],
  { label: string; className: string; Icon: typeof CheckCircle2 }
> = {
  completed: {
    label: "Completed",
    className: "border-emerald-400/35 bg-emerald-500/10 text-emerald-300",
    Icon: CheckCircle2,
  },
  "in-progress": {
    label: "In Progress",
    className: "border-cyan-400/35 bg-cyan-500/10 text-cyan-300",
    Icon: Clock,
  },
  prototype: {
    label: "Prototype",
    className: "border-amber-400/35 bg-amber-500/10 text-amber-300",
    Icon: FlaskConical,
  },
};

export default function ProjectStatusBadge({ status }: { status: Project["status"] }) {
  const { label, className, Icon } = STATUS_STYLES[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${className}`}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {label}
    </span>
  );
}
