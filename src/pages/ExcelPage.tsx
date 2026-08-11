import { Table2 } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import ExcelWalkthrough from "@/components/viz/ExcelWalkthrough";
import { EXCEL_GUIDES } from "@/data/excelGuides";
import { useI18n } from "@/i18n/I18nContext";

export default function ExcelPage() {
  const { t, pick } = useI18n();

  return (
    <PageTransition>
      <header>
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          <Table2 size={26} className="text-success" /> {t("excelTitle")}
        </h1>
        <p className="mt-1.5 max-w-3xl text-sm text-ink-dim">{t("excelLead")}</p>
      </header>

      <div className="card mt-6 p-5 text-sm">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-dim">
          {pick("Что понадобится", "What you need")}
        </div>
        <ul className="mt-2 ml-4 list-disc space-y-1 text-ink-dim">
          <li>
            {pick(
              "Файлы данных из Coursera: Customer Waiting Time, Best-selling Trucks, Scatter Plot.",
              "The Coursera data files: Customer Waiting Time, Best-selling Trucks, Scatter Plot.",
            )}
          </li>
          <li>
            {pick(
              "Подключённый пакет анализа (Analysis ToolPak) — он нужен только для гистограммы.",
              "The Analysis ToolPak enabled — needed only for the histogram.",
            )}
          </li>
          <li>
            {pick(
              "Три сочетания клавиш, которые встречаются во всех практикумах: Ctrl+Shift+↓ (выделить столбец), F4 (закрепить ссылку), Ctrl+Shift+Enter (формула массива).",
              "Three shortcuts that recur in every walkthrough: Ctrl+Shift+↓ (select the column), F4 (lock a reference), Ctrl+Shift+Enter (array formula).",
            )}
          </li>
        </ul>
      </div>

      <div className="mt-6 space-y-4">
        {EXCEL_GUIDES.map((g) => (
          <ExcelWalkthrough key={g.id} guide={g} />
        ))}
      </div>
    </PageTransition>
  );
}
