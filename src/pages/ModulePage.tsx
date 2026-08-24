import { lazy, Suspense } from "react";
import type { ComponentType } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ListChecks,
  Clock,
  CheckCircle2,
} from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import EmptyState from "@/components/ui/EmptyState";
import { MODULES, getModule } from "@/data/modules";
import { GLOSSARY } from "@/data/glossary";
import { getQuestionsByModule } from "@/data/questions";
import { getIcon } from "@/lib/icons";
import { useI18n } from "@/i18n/I18nContext";
import type { ModuleId } from "@/lib/types";

const Module1Content = lazy(() => import("@/components/modules/Module1Content"));
const Module2Content = lazy(() => import("@/components/modules/Module2Content"));

const MODULE_CONTENT: Partial<Record<ModuleId, ComponentType>> = {
  1: Module1Content,
  2: Module2Content,
};

export default function ModulePage() {
  const { moduleId } = useParams();
  const { t, L } = useI18n();
  const id = Number(moduleId);
  const module = getModule(id);

  if (!module) {
    return (
      <PageTransition>
        <EmptyState
          title={t("moduleNotFound")}
          action={
            <Link to="/" className="btn-secondary">
              <ArrowLeft size={16} /> {t("backToDashboard")}
            </Link>
          }
        />
      </PageTransition>
    );
  }

  const Icon = getIcon(module.iconName);
  const accent = `rgb(var(--${module.colorKey}))`;
  const moduleQuestions = getQuestionsByModule(module.id);
  const moduleGlossary = GLOSSARY.filter((g) => g.moduleId === module.id);

  const prev = MODULES.find((m) => m.id === module.id - 1);
  const next = MODULES.find((m) => m.id === module.id + 1);

  return (
    <PageTransition>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-ink-dim hover:text-ink"
      >
        <ArrowLeft size={14} /> {t("allModules")}
      </Link>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card relative overflow-hidden p-7"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: accent }}
        />
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <div
            className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-white shadow-glow"
            style={{ background: accent }}
          >
            <Icon size={28} />
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-dim">
              {t("moduleOf")
                .replace("{n}", String(module.id))
                .replace("{total}", String(MODULES.length))}
            </div>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">{L(module.title)}</h1>
            <p className="mt-2 text-sm text-ink-dim">{L(module.subtitle)}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-end">
            {module.status === "ready" ? (
              <span className="chip text-success">
                <CheckCircle2 size={12} /> {t("contentReady")}
              </span>
            ) : (
              <span className="chip">
                <Clock size={12} /> {t("comingSoon")}
              </span>
            )}
            <span className="chip">
              {moduleGlossary.length} {t("glossaryTerms")}
            </span>
            <span className="chip">
              {moduleQuestions.length} {t("quizQuestions")}
            </span>
          </div>
        </div>
      </motion.section>

      {module.topics.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold">{t("whatYouLearn")}</h2>
          <p className="text-sm text-ink-dim">{t("topicChecklist")}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {module.topics.map((topic, i) => (
              <motion.div
                key={L(topic)}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="card flex items-start gap-3 p-4"
              >
                <div
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white"
                  style={{ background: accent }}
                >
                  {i + 1}
                </div>
                <div className="text-sm font-medium">{L(topic)}</div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        {module.status === "ready" && MODULE_CONTENT[module.id] ? (
          <Suspense
            fallback={<div className="text-sm text-ink-dim">{t("loadingContent")}</div>}
          >
            {(() => {
              const Comp = MODULE_CONTENT[module.id]!;
              return <Comp />;
            })()}
          </Suspense>
        ) : (
          <EmptyState
            title={t("moduleSoonTitle")}
            description={t("moduleSoonBody")}
            action={
              <div className="flex flex-wrap items-center gap-2">
                <Link to="/glossary" className="btn-secondary">
                  <BookOpen size={16} /> {t("glossaryTitle")}
                </Link>
                <Link to="/quiz" className="btn-primary">
                  <ListChecks size={16} /> {t("quizTitle")}
                </Link>
              </div>
            }
          />
        )}
      </section>

      <nav className="mt-10 flex items-center justify-between gap-3">
        {prev ? (
          <Link
            to={`/modules/${prev.id}`}
            className="card card-hover flex min-w-0 flex-1 items-center gap-3 p-4"
          >
            <ArrowLeft size={16} className="text-ink-dim" />
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-ink-dim">
                {t("prev")}
              </div>
              <div className="truncate text-sm font-medium">{L(prev.title)}</div>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            to={`/modules/${next.id}`}
            className="card card-hover flex min-w-0 flex-1 items-center justify-end gap-3 p-4 text-right"
          >
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-ink-dim">
                {t("next")}
              </div>
              <div className="truncate text-sm font-medium">{L(next.title)}</div>
            </div>
            <ArrowRight size={16} className="text-ink-dim" />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </PageTransition>
  );
}
