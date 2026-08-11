import { Link } from "react-router-dom";
import { Sigma, Github } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import { useI18n } from "@/i18n/I18nContext";

const REPO_URL = "https://github.com/t-boris/BADM-572-Stat-4-Mgmt-Decision-Making";

export default function TopBar() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface/70 backdrop-blur-xl">
      <div className="flex h-14 items-center gap-3 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 lg:hidden">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-m3 text-white">
            <Sigma size={16} />
          </div>
          <span className="text-sm font-semibold text-ink">{t("appName")}</span>
        </Link>

        <div className="hidden text-sm text-ink-dim lg:block">{t("courseLine")}</div>

        <div className="ml-auto flex items-center gap-2">
          <LangToggle />
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-ink-dim transition-colors hover:bg-muted hover:text-ink"
          >
            <Github size={18} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
