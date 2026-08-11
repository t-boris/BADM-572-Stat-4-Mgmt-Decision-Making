import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  BookOpen,
  ListChecks,
  Sigma,
  Info,
  Sparkles,
  FlaskConical,
  Table2,
} from "lucide-react";
import { MODULES } from "@/data/modules";
import { cn } from "@/lib/cn";
import { useI18n } from "@/i18n/I18nContext";
import type { UiKey } from "@/i18n/strings";

const NAV: { to: string; labelKey: UiKey; icon: typeof Home; end?: boolean }[] = [
  { to: "/", labelKey: "navHome", icon: Home, end: true },
  { to: "/lab", labelKey: "navLab", icon: FlaskConical },
  { to: "/excel", labelKey: "navExcel", icon: Table2 },
  { to: "/glossary", labelKey: "navGlossary", icon: BookOpen },
  { to: "/quiz", labelKey: "navQuiz", icon: ListChecks },
  { to: "/about", labelKey: "navAbout", icon: Info },
];

interface Props {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: Props) {
  const { t, L } = useI18n();

  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-surface/70 backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-2 px-5 pb-4 pt-6">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-m3 text-white shadow-glow">
          <Sigma size={18} />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-ink">{t("appName")}</div>
          <div className="text-[11px] text-ink-dim">BADM 572 · iMBA</div>
        </div>
      </div>

      <nav className="px-3 py-2">
        <ul className="space-y-1">
          {NAV.map(({ to, labelKey, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent-soft/40 text-ink"
                      : "text-ink-dim hover:bg-muted hover:text-ink",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={16}
                      className={cn(
                        "transition-transform",
                        isActive ? "text-accent" : "group-hover:scale-110",
                      )}
                    />
                    <span>{t(labelKey)}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-accent"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-2 px-5 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-wider text-ink-dim">
        {t("navModules")}
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        <ul className="space-y-1">
          {MODULES.map((m) => (
            <li key={m.id}>
              <NavLink
                to={`/modules/${m.id}`}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-muted text-ink"
                      : "text-ink-dim hover:bg-muted hover:text-ink",
                  )
                }
              >
                <span
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-[11px] font-bold text-white"
                  style={{ background: `rgb(var(--${m.colorKey}))` }}
                >
                  {m.id}
                </span>
                <span className="truncate">{L(m.title)}</span>
                {m.status === "ready" ? (
                  <Sparkles size={12} className="ml-auto shrink-0 text-success" />
                ) : null}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-border px-5 py-4 text-[11px] text-ink-dim">
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {t("visualLearner")}
        </span>
      </div>
    </aside>
  );
}
