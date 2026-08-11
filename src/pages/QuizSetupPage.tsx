import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListChecks, Play, Timer } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import { MODULES } from "@/data/modules";
import { QUESTIONS, getQuestionCountByModule } from "@/data/questions";
import { filterByModules, sampleQuestions } from "@/lib/quizUtils";
import { saveSession, clearSession } from "@/lib/quizState";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";
import type { ModuleId, QuizConfig } from "@/lib/types";

const LENGTHS: QuizConfig["count"][] = [5, 10, 20];

export default function QuizSetupPage() {
  const { t, L } = useI18n();
  const navigate = useNavigate();
  const counts = useMemo(getQuestionCountByModule, []);
  const available = MODULES.filter((m) => counts[m.id] > 0);

  const [selected, setSelected] = useState<ModuleId[]>(available.map((m) => m.id));
  const [count, setCount] = useState<QuizConfig["count"]>(10);
  const [timed, setTimed] = useState(false);

  const pool = filterByModules(QUESTIONS, selected.length ? selected : "all");

  const toggleModule = (id: ModuleId) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const start = () => {
    const config: QuizConfig = {
      moduleIds: selected.length ? selected : "all",
      count,
      timed,
      secondsPerQuestion: timed ? 60 : 0,
    };
    const questions = sampleQuestions(pool, Math.min(count, pool.length));
    if (!questions.length) return;
    clearSession();
    saveSession({ config, questions, startedAt: Date.now() });
    navigate("/quiz/run");
  };

  return (
    <PageTransition>
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{t("quizTitle")}</h1>
        <p className="mt-1.5 text-sm text-ink-dim">{t("quizLead")}</p>
      </header>

      <section className="card mt-6 p-5">
        <h2 className="text-sm font-semibold">{t("quizModules")}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {available.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => toggleModule(m.id)}
              className={cn(
                "rounded-xl border px-3 py-2 text-left text-xs transition-colors",
                selected.includes(m.id)
                  ? "border-transparent bg-accent text-white"
                  : "border-border bg-surface text-ink-dim hover:bg-muted hover:text-ink",
              )}
            >
              <div className="font-semibold">
                {m.id}. {L(m.title)}
              </div>
              <div className="opacity-80">{counts[m.id]} ?</div>
            </button>
          ))}
        </div>
      </section>

      <section className="card mt-4 p-5">
        <h2 className="text-sm font-semibold">{t("quizLength")}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {LENGTHS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setCount(n)}
              disabled={n > pool.length && pool.length > 0}
              className={cn(
                "h-10 w-16 rounded-xl border text-sm font-semibold transition-colors disabled:opacity-40",
                count === n
                  ? "border-transparent bg-accent text-white"
                  : "border-border bg-surface text-ink-dim hover:bg-muted hover:text-ink",
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </section>

      <section className="card mt-4 p-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={timed}
            onChange={(e) => setTimed(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-accent"
          />
          <span>
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Timer size={15} /> {t("quizTimed")}
            </span>
            <span className="mt-0.5 block text-xs text-ink-dim">{t("quizTimedHint")}</span>
          </span>
        </label>
      </section>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={start}
          disabled={pool.length === 0}
          className="btn-primary"
        >
          <Play size={16} /> {t("quizStart")}
        </button>
        <span className="text-xs text-ink-dim">
          <ListChecks size={12} className="mr-1 inline" />
          {pool.length === 0 ? t("quizNoQuestions") : `${pool.length} ?`}
        </span>
      </div>
    </PageTransition>
  );
}
