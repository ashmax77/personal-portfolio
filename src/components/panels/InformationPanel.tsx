"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";

type InformationPanelProps = {
  open: boolean;
  eyebrow: string;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
};

/**
 * Accessible HTML information panel rendered outside the WebGL canvas.
 * Closes via the close button, backdrop click or the Escape key.
 */
export default function InformationPanel({
  open,
  eyebrow,
  title,
  subtitle,
  onClose,
  children,
}: InformationPanelProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  const slide = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: 48 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 48 },
      };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="panel-backdrop"
            className="absolute inset-0 z-30 bg-slate-950/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="hud-panel-strong absolute inset-x-3 bottom-3 top-auto z-40 flex max-h-[75vh] flex-col rounded-xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:top-6 sm:max-h-none sm:w-[420px]"
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.28, ease: "easeOut" }}
            {...slide}
          >
            <header className="flex items-start justify-between gap-4 border-b border-sky-400/20 px-5 py-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-cyan-400">{eyebrow}</p>
                <h2 id={titleId} className="mt-1 text-xl font-semibold text-slate-50">
                  {title}
                </h2>
                {subtitle && <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>}
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="rounded-md border border-slate-600/60 p-1.5 text-slate-300 transition-colors hover:border-cyan-400/60 hover:text-cyan-200 focus-visible:outline focus-visible:outline-cyan-400"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

            <footer className="border-t border-sky-400/15 px-5 py-2.5 font-mono text-[11px] text-slate-500">
              ESC to close
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
