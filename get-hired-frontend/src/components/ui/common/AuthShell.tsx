import type { ReactNode } from "react";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  sideTitle: string;
  sideText: string;
  accent: string;
  children: ReactNode;
}

export default function AuthShell({
  eyebrow,
  title,
  description,
  sideTitle,
  sideText,
  accent,
  children,
}: AuthShellProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <div className="grid min-h-[620px] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative flex flex-col justify-between overflow-hidden p-8 sm:p-10">
          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-foreground/70 dark:border-white/10 dark:bg-white/10 dark:text-white/75">
              {eyebrow}
            </span>
            <div className="space-y-3">
              <h1 className="max-w-md text-4xl font-semibold tracking-tight sm:text-5xl">
                {sideTitle}
              </h1>
              <p className="max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                {sideText}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/60 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-2xl font-semibold">12k+</p>
              <p className="mt-1 text-sm text-muted-foreground">
                applications routed through the platform
              </p>
            </div>
            <div className="rounded-3xl border border-white/60 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-2xl font-semibold">94%</p>
              <p className="mt-1 text-sm text-muted-foreground">
                of recruiters return to post again
              </p>
            </div>
          </div>

          <div
            className="pointer-events-none absolute -left-24 top-8 h-52 w-52 rounded-full blur-3xl"
            style={{ background: accent }}
          />
          <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/30 blur-3xl dark:bg-white/10" />
        </div>

        <div className="flex items-center bg-white/70 p-6 sm:p-8 dark:bg-slate-950/40">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {eyebrow}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
              <p className="text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
