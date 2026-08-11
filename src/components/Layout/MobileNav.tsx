import { NavLink } from "react-router-dom";
import { Home, BookOpen, ListChecks, LayoutGrid, FlaskConical } from "lucide-react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/i18n/I18nContext";
import type { UiKey } from "@/i18n/strings";

const TABS: { to: string; labelKey: UiKey; icon: typeof Home; end?: boolean }[] = [
  { to: "/", labelKey: "navHome", icon: Home, end: true },
  { to: "/modules/1", labelKey: "navModules", icon: LayoutGrid },
  { to: "/lab", labelKey: "navLab", icon: FlaskConical },
  { to: "/glossary", labelKey: "navGlossary", icon: BookOpen },
  { to: "/quiz", labelKey: "navQuiz", icon: ListChecks },
];

export default function MobileNav() {
  const { t } = useI18n();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-surface/95 backdrop-blur-xl lg:hidden">
      <ul className="grid grid-cols-5">
        {TABS.map(({ to, labelKey, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 py-3 text-[10px] transition-colors",
                  isActive ? "text-accent" : "text-ink-dim",
                )
              }
            >
              <Icon size={18} />
              <span>{t(labelKey)}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
