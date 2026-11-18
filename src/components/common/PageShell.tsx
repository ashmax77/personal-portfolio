import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

type PageShellProps = {
  eyebrow: string;
  children: ReactNode;
};

const NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
] as const;

export default function PageShell({ eyebrow, children }: PageShellProps) {
  return (
    <div className="engine-grid-bg min-h-screen text-slate-100">
      <header className="sticky top-0 z-30 border-b border-sky-400/20 bg-[#060A12]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-300/40 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-100 transition-colors hover:bg-cyan-400/20"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              3D World
            </Link>
            <span className="hidden font-mono text-[11px] tracking-[0.2em] text-cyan-400 sm:inline">
              {eyebrow}
            </span>
          </div>

          <nav aria-label="Standalone portfolio pages" className="flex items-center gap-4 text-xs sm:text-sm">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-300 transition-colors hover:text-cyan-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">{children}</main>
    </div>
  );
}
