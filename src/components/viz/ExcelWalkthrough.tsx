import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Table2, RotateCcw, Keyboard } from "lucide-react";
import type { ExcelGuide } from "@/data/excelGuides";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

/** A stepper that walks through one Excel illustration video, step by step. */
export default function ExcelWalkthrough({ guide }: { guide: ExcelGuide }) {
  const { pick, t, L } = useI18n();
  const [step, setStep] = useState(0);
  const total = guide.steps.length;
  const current = guide.steps[step];
  const done = step === total - 1;

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border bg-muted/40 p-4">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-success/15 text-success">
            <Table2 size={18} />
          </span>
          <div>
            <div className="text-[11px] uppercase tracking-widest text-ink-dim">
              {guide.lesson}
            </div>
            <h4 className="font-display text-base font-semibold">{L(guide.title)}</h4>
            <p className="mt-0.5 text-xs text-ink-dim">{L(guide.goal)}</p>
          </div>
        </div>
        <span className="chip whitespace-nowrap">
          {t("step")} {step + 1} / {total}
        </span>
      </div>

      <div className="h-1 w-full bg-muted">
        <motion.div
          className="h-full bg-success"
          animate={{ width: `${((step + 1) / total) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-5">
        <div className="text-[11px] text-ink-dim">
          {pick("Файл", "File")}: <span className="font-mono">{L(guide.dataset)}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22 }}
            className="mt-3"
          >
            <h5 className="font-semibold">{L(current.title)}</h5>
            <p className="mt-1.5 text-sm leading-relaxed text-ink">{L(current.body)}</p>

            {current.formula && (
              <div className="mt-3 rounded-xl border border-border bg-elevated p-3">
                <div className="text-[10px] uppercase tracking-wider text-ink-dim">
                  {t("formulaLabel")}
                </div>
                <pre className="m-0 mt-1 whitespace-pre-wrap break-words font-mono text-[13px] text-ink">
                  {current.formula}
                </pre>
              </div>
            )}

            {current.shortcut && (
              <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-xs">
                <Keyboard size={14} className="text-ink-dim" />
                <span className="text-ink-dim">{t("shortcutLabel")}:</span>
                <span className="font-mono font-semibold">{current.shortcut}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="btn-secondary h-9 px-3 text-xs"
          >
            <ChevronLeft size={14} /> {pick("Назад", "Back")}
          </button>
          {done ? (
            <button
              type="button"
              onClick={() => setStep(0)}
              className="btn-secondary h-9 px-3 text-xs"
            >
              <RotateCcw size={14} /> {t("restart")}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
              className="btn-primary h-9 px-3 text-xs"
            >
              {pick("Дальше", "Next")} <ChevronRight size={14} />
            </button>
          )}
          <div className="ml-auto flex gap-1">
            {guide.steps.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${t("step")} ${i + 1}`}
                onClick={() => setStep(i)}
                className={cn(
                  "h-1.5 w-5 rounded-full transition-colors",
                  i === step ? "bg-success" : "bg-muted hover:bg-ink-dim/40",
                )}
              />
            ))}
          </div>
        </div>

        {done && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl border border-success/40 bg-success/5 p-3 text-sm"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-success">
              {pick("Главное", "Key takeaway")}
            </div>
            <div className="mt-1">{L(guide.takeaway)}</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
