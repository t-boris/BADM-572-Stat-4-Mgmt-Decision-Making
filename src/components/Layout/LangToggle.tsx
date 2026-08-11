import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

/**
 * RU / EN switch. The initial value is autodetected from the browser locale
 * and, failing that, the IANA timezone (see `detectLang`); this control lets
 * the user override it and the choice is remembered in localStorage.
 */
export default function LangToggle() {
  const { lang, setLang } = useI18n();

  return (
    <div
      className="relative flex items-center gap-1 rounded-xl border border-border bg-surface p-1"
      role="group"
      aria-label={lang === "ru" ? "Язык интерфейса" : "Interface language"}
    >
      <Languages size={14} className="ml-1 mr-0.5 shrink-0 text-ink-dim" aria-hidden />
      {(["ru", "en"] as const).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={cn(
              "relative rounded-lg px-2.5 py-1 text-xs font-semibold uppercase transition-colors",
              active ? "text-white" : "text-ink-dim hover:text-ink",
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-lg bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{code}</span>
          </button>
        );
      })}
    </div>
  );
}
