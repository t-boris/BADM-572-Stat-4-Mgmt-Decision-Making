import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, Timer as TimerIcon } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import EmptyState from "@/components/ui/EmptyState";
import { loadSession, saveResult, clearSession } from "@/lib/quizState";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";
import type { QuizAnswer } from "@/lib/types";

export default function QuizRunnerPage() {
  const { t, L, pick } = useI18n();
  const navigate = useNavigate();
  const session = useMemo(loadSession, []);

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(session?.config.secondsPerQuestion ?? 0);
  const questionStart = useRef<number>(Date.now());

  const question = session?.questions[index];
  const total = session?.questions.length ?? 0;
  const timed = Boolean(session?.config.timed);

  const commit = useCallback(
    (selectedOptionId: string | null) => {
      if (!question) return;
      const answer: QuizAnswer = {
        questionId: question.id,
        selectedOptionId,
        timeSpentMs: Date.now() - questionStart.current,
      };
      const nextAnswers = [...answers, answer];
      setAnswers(nextAnswers);

      if (index + 1 >= total) {
        if (session) {
          saveResult({
            config: session.config,
            answers: nextAnswers,
            totalMs: Date.now() - session.startedAt,
            startedAt: session.startedAt,
            endedAt: Date.now(),
          });
          clearSession();
        }
        navigate("/quiz/results");
        return;
      }
      setIndex((i) => i + 1);
      setPicked(null);
      setChecked(false);
      setSecondsLeft(session?.config.secondsPerQuestion ?? 0);
      questionStart.current = Date.now();
    },
    [answers, index, navigate, question, session, total],
  );

  useEffect(() => {
    if (!timed || checked) return;
    if (secondsLeft <= 0) {
      commit(null);
      return;
    }
    const id = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [timed, checked, secondsLeft, commit]);

  if (!session || !question) {
    return (
      <PageTransition>
        <EmptyState
          title={t("noActiveQuiz")}
          action={
            <Link to="/quiz" className="btn-primary">
              {t("backToQuizSetup")}
            </Link>
          }
        />
      </PageTransition>
    );
  }

  const isCorrect = picked === question.answerId;

  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between text-xs text-ink-dim">
          <span>
            {t("question")} {index + 1} {t("of")} {total}
          </span>
          <span className="flex items-center gap-3">
            <span className="chip py-0.5 text-[10px]">
              {t("difficulty")}: {t(question.difficulty)}
            </span>
            {timed && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 font-mono",
                  secondsLeft <= 10 && "text-danger",
                )}
              >
                <TimerIcon size={13} /> {secondsLeft}s
              </span>
            )}
          </span>
        </div>

        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full bg-accent"
            animate={{ width: `${((index + (checked ? 1 : 0)) / total) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.section
            key={question.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="card mt-4 p-6"
          >
            <div className="text-[11px] uppercase tracking-wider text-ink-dim">
              {L(question.topic)}
            </div>
            <h2 className="mt-1.5 text-lg font-semibold leading-snug">
              {L(question.prompt)}
            </h2>

            <ul className="mt-5 space-y-2">
              {question.options.map((opt) => {
                const isPicked = picked === opt.id;
                const isAnswer = opt.id === question.answerId;
                return (
                  <li key={opt.id}>
                    <button
                      type="button"
                      disabled={checked}
                      onClick={() => setPicked(opt.id)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-sm transition-colors",
                        !checked && isPicked && "border-accent bg-accent-soft/30",
                        !checked && !isPicked && "border-border bg-surface hover:bg-muted",
                        checked && isAnswer && "border-success/60 bg-success/10",
                        checked && isPicked && !isAnswer && "border-danger/60 bg-danger/10",
                        checked && !isAnswer && !isPicked && "border-border opacity-60",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-6 w-6 shrink-0 place-items-center rounded-lg border text-[11px] font-bold uppercase",
                          checked && isAnswer
                            ? "border-success bg-success text-white"
                            : checked && isPicked
                              ? "border-danger bg-danger text-white"
                              : "border-border text-ink-dim",
                        )}
                      >
                        {checked && isAnswer ? (
                          <Check size={13} />
                        ) : checked && isPicked ? (
                          <X size={13} />
                        ) : (
                          opt.id
                        )}
                      </span>
                      <span>{L(opt.text)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <AnimatePresence initial={false}>
              {checked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "mt-4 rounded-xl border p-4 text-sm",
                      isCorrect
                        ? "border-success/40 bg-success/5"
                        : "border-danger/40 bg-danger/5",
                    )}
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-wider">
                      {isCorrect ? (
                        <span className="text-success">{t("correct")}</span>
                      ) : (
                        <span className="text-danger">{t("incorrect")}</span>
                      )}
                    </div>
                    <p className="mt-1.5">{L(question.explanation)}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5 flex flex-wrap gap-2">
              {!checked ? (
                <button
                  type="button"
                  disabled={!picked}
                  onClick={() => setChecked(true)}
                  className="btn-primary"
                >
                  {t("check")}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => commit(picked)}
                  className="btn-primary"
                >
                  {index + 1 >= total ? t("finish") : t("nextQuestion")}{" "}
                  <ArrowRight size={16} />
                </button>
              )}
              <button
                type="button"
                onClick={() => commit(null)}
                className="btn-ghost"
              >
                {pick("Пропустить", "Skip")}
              </button>
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
