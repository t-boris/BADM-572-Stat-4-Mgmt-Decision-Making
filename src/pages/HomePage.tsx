import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  FlaskConical,
  ListChecks,
  Sparkles,
  Table2,
  Clock,
} from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import StatCard from "@/components/ui/StatCard";
import { MODULES } from "@/data/modules";
import { GLOSSARY } from "@/data/glossary";
import { QUESTIONS } from "@/data/questions";
import { EXCEL_GUIDES } from "@/data/excelGuides";
import { getIcon } from "@/lib/icons";
import { useI18n } from "@/i18n/I18nContext";

const INTERACTIVES = 9;

export default function HomePage() {
  const { t, L, pick } = useI18n();
  const ready = MODULES.filter((m) => m.status === "ready").length;

  return (
    <PageTransition>
      <section className="card relative overflow-hidden p-7 sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent opacity-25 blur-3xl"
        />
        <div className="relative max-w-3xl">
          <div className="chip">
            <Sparkles size={12} /> {t("homeKicker")}
          </div>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            <span className="gradient-text">{t("homeTitle")}</span>
          </h1>
          <p className="mt-1.5 text-sm font-medium text-ink-dim">
            {t("courseTitle")} · BADM 572
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-dim">{t("homeLead")}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link to="/modules/1" className="btn-primary">
              {t("startModule")} <ArrowRight size={16} />
            </Link>
            <Link to="/lab" className="btn-secondary">
              <FlaskConical size={16} /> {t("openLab")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={t("statModules")} value={ready} icon={BookOpen} accentVar="var(--m1)" />
        <StatCard label={t("statTerms")} value={GLOSSARY.length} icon={Table2} accentVar="var(--m2)" />
        <StatCard label={t("statQuestions")} value={QUESTIONS.length} icon={ListChecks} accentVar="var(--m3)" />
        <StatCard
          label={t("statViz")}
          value={INTERACTIVES + EXCEL_GUIDES.length}
          icon={FlaskConical}
          accentVar="var(--accent)"
        />
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">{t("moduleList")}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {MODULES.map((m, i) => {
            const Icon = getIcon(m.iconName);
            const accent = `rgb(var(--${m.colorKey}))`;
            const isReady = m.status === "ready";
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  to={`/modules/${m.id}`}
                  className="card card-hover flex h-full items-start gap-4 p-5"
                >
                  <div
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white"
                    style={{ background: accent }}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] uppercase tracking-wider text-ink-dim">
                        {pick("Модуль", "Module")} {m.id}
                      </span>
                      {isReady ? (
                        <span className="chip py-0.5 text-[10px] text-success">
                          <Sparkles size={10} /> {t("contentReady")}
                        </span>
                      ) : (
                        <span className="chip py-0.5 text-[10px]">
                          <Clock size={10} /> {t("comingSoon")}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 font-semibold leading-snug">{L(m.title)}</div>
                    <p className="mt-1 text-xs text-ink-dim">{L(m.subtitle)}</p>
                    {m.topics.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {m.topics.slice(0, 3).map((topic) => (
                          <span
                            key={L(topic)}
                            className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-ink-dim"
                          >
                            {L(topic)}
                          </span>
                        ))}
                        {m.topics.length > 3 && (
                          <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-ink-dim">
                            +{m.topics.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mt-10 grid gap-3 sm:grid-cols-3">
        <Link to="/excel" className="card card-hover p-5">
          <Table2 size={20} className="text-success" />
          <div className="mt-2 font-semibold">{t("excelTitle")}</div>
          <p className="mt-1 text-xs text-ink-dim">{t("excelLead")}</p>
        </Link>
        <Link to="/glossary" className="card card-hover p-5">
          <BookOpen size={20} className="text-accent" />
          <div className="mt-2 font-semibold">{t("glossaryTitle")}</div>
          <p className="mt-1 text-xs text-ink-dim">{t("glossaryLead")}</p>
        </Link>
        <Link to="/quiz" className="card card-hover p-5">
          <ListChecks size={20} className="text-warning" />
          <div className="mt-2 font-semibold">{t("quizTitle")}</div>
          <p className="mt-1 text-xs text-ink-dim">{t("quizLead")}</p>
        </Link>
      </section>
    </PageTransition>
  );
}
