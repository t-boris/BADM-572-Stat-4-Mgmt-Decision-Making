import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw } from "lucide-react";
import { VARIABLE_DRILL, type VarKind } from "@/data/datasets";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

const KINDS: { key: VarKind; ru: string; en: string; tone: string }[] = [
  { key: "quantitative", ru: "Количественная", en: "Quantitative", tone: "m2" },
  { key: "nominal", ru: "Номинативная", en: "Nominative", tone: "m7" },
  { key: "ordinal", ru: "Порядковая", en: "Ordinal", tone: "m5" },
];

/**
 * The "Let's practice" drill from Lesson 1-1.1, made interactive: classify each
 * variable as quantitative, nominative or ordinal and get the reasoning back.
 */
export default function VariableClassifier() {
  const { pick } = useI18n();
  const [answers, setAnswers] = useState<Record<string, VarKind>>({});

  const score = useMemo(
    () =>
      VARIABLE_DRILL.filter((v) => answers[v.id] === v.kind).length,
    [answers],
  );
  const answered = Object.keys(answers).length;

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-dim">
            {pick("Практика · Lesson 1-1.1", "Practice · Lesson 1-1.1")}
          </div>
          <h4 className="mt-1 font-display text-base font-semibold">
            {pick(
              "Определите тип каждой переменной",
              "Classify each variable",
            )}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="chip">
            {score} / {VARIABLE_DRILL.length}
          </span>
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="btn-ghost h-9 px-3 text-xs"
          >
            <RotateCcw size={14} /> {pick("Сбросить", "Reset")}
          </button>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {VARIABLE_DRILL.map((v) => {
          const chosen = answers[v.id];
          const isRight = chosen === v.kind;
          return (
            <li
              key={v.id}
              className={cn(
                "rounded-xl border p-3 transition-colors",
                chosen === undefined
                  ? "border-border bg-muted/30"
                  : isRight
                    ? "border-success/50 bg-success/5"
                    : "border-danger/50 bg-danger/5",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-medium">{pick(v.label.ru, v.label.en)}</span>
                <div className="flex flex-wrap gap-1.5">
                  {KINDS.map((k) => (
                    <button
                      key={k.key}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [v.id]: k.key }))
                      }
                      className={cn(
                        "rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
                        chosen === k.key
                          ? "border-transparent text-white"
                          : "border-border bg-surface text-ink-dim hover:bg-muted hover:text-ink",
                      )}
                      style={
                        chosen === k.key
                          ? { background: `rgb(var(--${k.tone}))` }
                          : undefined
                      }
                    >
                      {pick(k.ru, k.en)}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence initial={false}>
                {chosen !== undefined && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 flex items-start gap-2 text-xs text-ink-dim">
                      {isRight ? (
                        <Check size={14} className="mt-0.5 shrink-0 text-success" />
                      ) : (
                        <X size={14} className="mt-0.5 shrink-0 text-danger" />
                      )}
                      <span>
                        {!isRight && (
                          <b className="text-ink">
                            {pick("Верно: ", "Correct: ")}
                            {pick(
                              KINDS.find((k) => k.key === v.kind)!.ru,
                              KINDS.find((k) => k.key === v.kind)!.en,
                            )}
                            {". "}
                          </b>
                        )}
                        {pick(v.why.ru, v.why.en)}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {answered === VARIABLE_DRILL.length && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-xs text-ink-dim"
        >
          {pick(
            "Подсказка для экзамена: числовое значение ещё не делает переменную количественной. Спросите себя, есть ли единица измерения и осмысленна ли разность.",
            "Exam tip: a numeric value does not make a variable quantitative. Ask whether there is a unit of measure and whether differences are meaningful.",
          )}
        </motion.p>
      )}
    </div>
  );
}
