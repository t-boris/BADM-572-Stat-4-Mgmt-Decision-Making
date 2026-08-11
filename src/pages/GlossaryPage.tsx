import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import EmptyState from "@/components/ui/EmptyState";
import { GLOSSARY } from "@/data/glossary";
import { MODULES } from "@/data/modules";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";
import type { ModuleId } from "@/lib/types";

export default function GlossaryPage() {
  const { t, L, pick } = useI18n();
  const [query, setQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState<ModuleId | "all">("all");

  const byId = useMemo(
    () => new Map(GLOSSARY.map((g) => [g.id, g])),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY.filter((g) => {
      if (moduleFilter !== "all" && g.moduleId !== moduleFilter) return false;
      if (!q) return true;
      return (
        g.term.ru.toLowerCase().includes(q) ||
        g.term.en.toLowerCase().includes(q) ||
        g.definition.ru.toLowerCase().includes(q) ||
        g.definition.en.toLowerCase().includes(q) ||
        (g.formula ?? "").toLowerCase().includes(q)
      );
    }).sort((a, b) => L(a.term).localeCompare(L(b.term)));
  }, [query, moduleFilter, L]);

  return (
    <PageTransition>
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{t("glossaryTitle")}</h1>
        <p className="mt-1.5 text-sm text-ink-dim">{t("glossaryLead")}</p>
      </header>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-dim"
          />
          <input
            className="input pl-10"
            placeholder={t("searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <FilterBtn
            active={moduleFilter === "all"}
            onClick={() => setModuleFilter("all")}
          >
            {t("allModulesFilter")}
          </FilterBtn>
          {MODULES.filter((m) => GLOSSARY.some((g) => g.moduleId === m.id)).map((m) => (
            <FilterBtn
              key={m.id}
              active={moduleFilter === m.id}
              onClick={() => setModuleFilter(m.id)}
            >
              {pick("М", "M")}
              {m.id}
            </FilterBtn>
          ))}
        </div>
      </div>

      <div className="mt-3 text-xs text-ink-dim">
        {filtered.length} / {GLOSSARY.length}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={BookOpen}
            title={t("nothingFound")}
            description={t("nothingFoundBody")}
          />
        </div>
      ) : (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {filtered.map((g, i) => (
            <motion.article
              key={g.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(i, 12) * 0.02 }}
              className="card p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold leading-snug">{L(g.term)}</h3>
                <span
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md text-[10px] font-bold text-white"
                  style={{
                    background: `rgb(var(--m${g.moduleId}))`,
                  }}
                >
                  {g.moduleId}
                </span>
              </div>
              <div className="mt-0.5 text-[11px] uppercase tracking-wider text-ink-dim">
                {pick(g.term.en, g.term.ru)}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink">{L(g.definition)}</p>
              {g.formula && (
                <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-elevated px-3 py-2 font-mono text-xs text-ink">
                  {g.formula}
                </pre>
              )}
              {g.related && g.related.length > 0 && (
                <div className="mt-3">
                  <div className="text-[10px] uppercase tracking-wider text-ink-dim">
                    {t("relatedTerms")}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {g.related.map((rid) => {
                      const rel = byId.get(rid);
                      if (!rel) return null;
                      return (
                        <button
                          key={rid}
                          type="button"
                          onClick={() => setQuery(L(rel.term))}
                          className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-ink-dim transition-colors hover:bg-accent-soft/50 hover:text-ink"
                        >
                          {L(rel.term)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      )}
    </PageTransition>
  );
}

function FilterBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
        active
          ? "border-transparent bg-accent text-white"
          : "border-border bg-surface text-ink-dim hover:bg-muted hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
