import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import EmptyState from "@/components/ui/EmptyState";
import { useI18n } from "@/i18n/I18nContext";

export default function NotFoundPage() {
  const { t, pick } = useI18n();
  return (
    <PageTransition>
      <EmptyState
        icon={Compass}
        title={pick("Страница не найдена", "Page not found")}
        description={pick(
          "Такой страницы в приложении нет — возможно, ссылка устарела.",
          "There is no such page here — the link may be out of date.",
        )}
        action={
          <Link to="/" className="btn-primary">
            {t("backToDashboard")}
          </Link>
        }
      />
    </PageTransition>
  );
}
