import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nContext";

/**
 * Shared content primitives for module pages. Labels inside the primitives are
 * localized; the body content is passed in by the module page, which picks its
 * own language with `useI18n().pick`.
 */

export function LessonBlock({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className="card p-5 sm:p-6"
    >
      {(eyebrow || title) && (
        <header className="mb-3">
          {eyebrow && (
            <div className="text-[11px] uppercase tracking-widest text-ink-dim">
              {eyebrow}
            </div>
          )}
          {title && (
            <h3 className="mt-1 font-display text-lg font-semibold leading-snug">
              {title}
            </h3>
          )}
        </header>
      )}
      <div className="space-y-3 text-sm leading-relaxed text-ink">{children}</div>
    </motion.section>
  );
}

export function Definition({
  term,
  en,
  children,
}: {
  term: string;
  /** English term shown alongside, so the exam vocabulary stays visible in RU. */
  en?: string;
  children: ReactNode;
}) {
  const { pick } = useI18n();
  return (
    <div className="rounded-xl border border-border bg-muted/50 p-4">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-dim">
        {pick("Определение", "Definition")} · {term}
        {en ? <span className="normal-case text-ink-dim/80"> · {en}</span> : null}
      </div>
      <div className="mt-1 text-sm">{children}</div>
    </div>
  );
}

export function Formula({
  caption,
  children,
}: {
  caption?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-elevated p-4">
      <pre className="m-0 whitespace-pre-wrap break-words font-mono text-sm text-ink">
        {children}
      </pre>
      {caption && <div className="mt-1 text-[11px] text-ink-dim">{caption}</div>}
    </div>
  );
}

export function KeyTakeaway({ children }: { children: ReactNode }) {
  const { pick } = useI18n();
  return (
    <div className="rounded-xl border border-success/40 bg-success/5 p-4 text-sm">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-success">
        {pick("Главное", "Key takeaway")}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export function Pitfall({ children }: { children: ReactNode }) {
  const { pick } = useI18n();
  return (
    <div className="rounded-xl border border-warning/40 bg-warning/5 p-4 text-sm">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-warning">
        {pick("Ловушка", "Pitfall")}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export function CaseStudy({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const { pick } = useI18n();
  return (
    <div className="rounded-xl border border-border bg-muted/40 p-4">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-dim">
        {pick("Кейс", "Case study")}
      </div>
      <div className="mt-0.5 font-semibold">{title}</div>
      <div className="mt-2 space-y-2 text-sm">{children}</div>
    </div>
  );
}

export function CompareTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: (string | ReactNode)[][];
  caption?: string;
}) {
  return (
    <figure className="m-0">
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-[11px] uppercase tracking-wider text-ink-dim">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-3 py-2 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-t border-border">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2 align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption ? (
        <figcaption className="mt-1.5 text-[11px] text-ink-dim">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function SectionHeader({
  icon,
  eyebrow,
  title,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <header className="mt-2 flex items-center gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted/60 text-ink">
        {icon}
      </span>
      <div>
        <div className="text-[11px] uppercase tracking-widest text-ink-dim">
          {eyebrow}
        </div>
        <h2 className="font-display text-xl font-semibold leading-tight">{title}</h2>
      </div>
    </header>
  );
}

export function SourceNote({ children }: { children: ReactNode }) {
  const { pick } = useI18n();
  return (
    <p className="text-[11px] leading-relaxed text-ink-dim">
      <span className="font-semibold uppercase tracking-wider">
        {pick("Источник", "Source")}:
      </span>{" "}
      {children}
    </p>
  );
}
