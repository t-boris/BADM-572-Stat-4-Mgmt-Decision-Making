import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, X, Minus, RotateCcw } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import EmptyState from "@/components/ui/EmptyState";
import ProgressRing from "@/components/ui/ProgressRing";
import { loadResult } from "@/lib/quizState";
import { QUESTIONS } from "@/data/questions";
import { formatMs } from "@/lib/quizUtils";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

export default function QuizResultsPage() {
  const { t, L } = useI18n();
  const result = useMemo(loadResult, []);
  const byId = useMemo(() => new Map(QUESTIONS.map((q) => [q.id, q])), []);

  if (!result) {
    return (
      <PageTransition>
        <EmptyState
          title={t("noResult")}
          action={
            <Link to="/quiz" className="btn-primary">
              {t("backToQuizSetup")}
            </Link>
          }
        />
      </PageTransition>
    );
  }

  const total = result.answers.length;
  const correct = result.answers.filter((a) => {
    const q = byId.get(a.questionId);
    return q && a.selectedOptionId === q.answerId;
  }).length;
  const skipped = result.answers.filter((a) => a.selectedOptionId === null).length;
  const pct = total ? Math.round((correct / total) * 100) : 0;

  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl">
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="card flex flex-col items-center gap-6 p-7 sm:flex-row"
        >
          <ProgressRing value={pct} />
          <div className="flex-1 text-center sm:text-left">
            <div className="text-xs uppercase tracking-wider text-ink-dim">
              {t("yourScore")}
            </div>
            <div className="mt-1 text-3xl font-bold">
              {correct} / {total}
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
              <span className="chip text-success">
                <Check size={12} /> {correct} {t("correct")}
              </span>
              <span className="chip text-danger">
                <X size={12} /> {total - correct - skipped} {t("incorrect")}
              </span>
              <span className="chip">
                <Minus size={12} /> {skipped} {t("skipped")}
              </span>
              <span className="chip">
                {t("timeSpent")}: {formatMs(result.totalMs)}
              </span>
            </div>
          </div>
          <Link to="/quiz" className="btn-primary">
            <RotateCcw size={16} /> {t("retake")}
          </Link>
        </motion.section>

        <h2 className="mt-8 text-lg font-semibold">{t("reviewAnswers")}</h2>
        <div className="mt-3 space-y-3">
          {result.answers.map((a, i) => {
            const q = byId.get(a.questionId);
            if (!q) return null;
            const ok = a.selectedOptionId === q.answerId;
            const chosen = q.options.find((o) => o.id === a.selectedOptionId);
            const right = q.options.find((o) => o.id === q.answerId)!;
            return (
              <motion.article
                key={a.questionId}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i, 10) * 0.03 }}
                className={cn(
                  "card border-l-4 p-4",
                  ok ? "border-l-success" : "border-l-danger",
                )}
              >
                <div className="text-[11px] uppercase tracking-wider text-ink-dim">
                  {i + 1}. {L(q.topic)}
                </div>
                <div className="mt-1 text-sm font-medium">{L(q.prompt)}</div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className={ok ? "text-success" : "text-danger"}>
                    {t("yourAnswer")}: {chosen ? L(chosen.text) : t("skipped")}
                  </div>
                  {!ok && (
                    <div className="text-success">
                      {t("answer")}: {L(right.text)}
                    </div>
                  )}
                </div>
                <p className="mt-2 text-xs text-ink-dim">{L(q.explanation)}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
