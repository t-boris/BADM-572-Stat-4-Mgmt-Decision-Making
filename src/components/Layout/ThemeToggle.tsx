import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useI18n } from "@/i18n/I18nContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { pick } = useI18n();
  const isDark = theme === "dark";
  const label = isDark
    ? pick("Включить светлую тему", "Switch to light theme")
    : pick("Включить тёмную тему", "Switch to dark theme");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-ink-dim transition-colors hover:bg-muted hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="absolute"
          >
            <Moon size={18} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="absolute"
          >
            <Sun size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
