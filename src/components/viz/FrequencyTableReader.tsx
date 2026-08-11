import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Eye } from "lucide-react";
import {
  DISTRACTED_DRIVING_2011 as ROWS,
  DISTRACTED_DRIVING_TOTALS as TOTALS,
} from "@/data/datasets";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

type Column = "total" | "distracted" | "cellPhone";

interface Task {
  id: string;
  question: { ru: string; en: string };
  /** Row index + column that answers it. */
  row: number;
  column: Column;
  answer: { ru: string; en: string };
  explain: { ru: string; en: string };
}

const TASKS: Task[] = [
  {
    id: "t1",
    question: {
      ru: "В какой возрастной группе доля отвлёкшихся среди всех попавших в смертельные ДТП самая высокая?",
      en: "Which age group has the highest share of distracted drivers among all drivers in fatal crashes?",
    },
    row: 0,
    column: "distracted",
    answer: { ru: "15–19 лет: 344 из 3 212 = 11 %", en: "15–19: 344 of 3,212 = 11%" },
    explain: {
      ru: "Знаменатель здесь — все водители этой группы (3 212), а не все отвлёкшиеся. У остальных групп доля 6–9 %.",
      en: "The denominator here is all drivers in that group (3,212), not all distracted drivers. Every other group sits at 6–9%.",
    },
  },
  {
    id: "t2",
    question: {
      ru: "Какая доля отвлёкшихся водителей 15–19 лет отвлеклась именно на телефон?",
      en: "What share of distracted 15–19-year-old drivers were distracted by a phone?",
    },
    row: 0,
    column: "cellPhone",
    answer: { ru: "72 из 344 = 21 %", en: "72 of 344 = 21%" },
    explain: {
      ru: "Обратите внимание на смену знаменателя: теперь это 344 отвлёкшихся, а не 3 212 водителей группы.",
      en: "Note the change of denominator: it is now the 344 distracted drivers, not the group's 3,212 drivers.",
    },
  },
  {
    id: "t3",
    question: {
      ru: "Какая доля отвлёкшихся водителей 20–29 лет пользовалась телефоном? (задание из лекции)",
      en: "What share of distracted 20–29-year-old drivers were using a phone? (the lecture's exercise)",
    },
    row: 1,
    column: "cellPhone",
    answer: { ru: "117 из 790 = 15 %", en: "117 of 790 = 15%" },
    explain: {
      ru: "По абсолютному числу телефонных ДТП группа 20–29 лидирует (117 против 72), но по доле — уступает подросткам.",
      en: "In absolute numbers the 20–29 group leads on phone-related crashes (117 vs 72), but as a share it trails the teenagers.",
    },
  },
];

/**
 * Reading a published frequency table is a skill in itself: the lecture's whole
 * point is that the denominator changes from column to column.
 */
export default function FrequencyTableReader() {
  const { pick } = useI18n();
  const [taskIdx, setTaskIdx] = useState(0);
  const [picked, setPicked] = useState<{ row: number; column: Column } | null>(null);
  const [revealed, setRevealed] = useState(false);

  const task = TASKS[taskIdx];
  const isRight = picked?.row === task.row && picked?.column === task.column;

  const selectCell = (row: number, column: Column) => {
    setPicked({ row, column });
  };

  const nextTask = () => {
    setTaskIdx((i) => (i + 1) % TASKS.length);
    setPicked(null);
    setRevealed(false);
  };

  return (
    <div className="card p-5">
      <div className="text-[11px] uppercase tracking-widest text-ink-dim">
        {pick("Практика · чтение таблицы", "Practice · reading a table")}
      </div>
      <h4 className="mt-1 font-display text-base font-semibold">
        {pick(
          "Водители в смертельных ДТП по возрасту, 2011",
          "Drivers in fatal crashes by age, 2011",
        )}
      </h4>

      <div className="mt-3 rounded-xl border border-accent/40 bg-accent-soft/20 p-3 text-sm">
        {pick(task.question.ru, task.question.en)}
        <div className="mt-1 text-[11px] text-ink-dim">
          {pick(
            "Кликните по ячейке, которая даёт ответ.",
            "Click the cell that answers it.",
          )}
        </div>
      </div>

      <div className="mt-3 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-xs">
          <thead className="bg-muted/60 text-left uppercase tracking-wider text-ink-dim">
            <tr>
              <th className="px-3 py-2 font-medium">{pick("Возраст", "Age")}</th>
              <th className="px-3 py-2 text-right font-medium">
                {pick("Всего водителей", "Total drivers")}
              </th>
              <th className="px-3 py-2 text-right font-medium">
                {pick("Отвлёкшихся", "Distracted")}
              </th>
              <th className="px-3 py-2 text-right font-medium">
                {pick("Из них с телефоном", "Of those, on a phone")}
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, ri) => (
              <tr key={r.age} className="border-t border-border">
                <td className="px-3 py-1.5 font-medium">{r.age}</td>
                {(["total", "distracted", "cellPhone"] as Column[]).map((col) => {
                  const active = picked?.row === ri && picked?.column === col;
                  const correct = task.row === ri && task.column === col;
                  return (
                    <td key={col} className="px-1 py-1 text-right">
                      <button
                        type="button"
                        onClick={() => selectCell(ri, col)}
                        className={cn(
                          "w-full rounded-md px-2 py-1 text-right font-mono transition-colors",
                          active && correct && "bg-success/20 text-success",
                          active && !correct && "bg-danger/20 text-danger",
                          !active && revealed && correct && "bg-success/15 text-success",
                          !active && "hover:bg-muted",
                        )}
                      >
                        {r[col].toLocaleString()}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className="border-t-2 border-border bg-muted/40 font-semibold">
              <td className="px-3 py-2">{pick("Итого", "Total")}</td>
              <td className="px-3 py-2 text-right font-mono">
                {TOTALS.total.toLocaleString()}
              </td>
              <td className="px-3 py-2 text-right font-mono">
                {TOTALS.distracted.toLocaleString()}
              </td>
              <td className="px-3 py-2 text-right font-mono">
                {TOTALS.cellPhone.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AnimatePresence initial={false}>
        {(picked || revealed) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "mt-3 rounded-xl border p-3 text-sm",
                isRight || revealed
                  ? "border-success/40 bg-success/5"
                  : "border-danger/40 bg-danger/5",
              )}
            >
              <div className="flex items-center gap-2 font-medium">
                {isRight || revealed ? (
                  <Check size={15} className="text-success" />
                ) : (
                  <X size={15} className="text-danger" />
                )}
                {isRight || revealed
                  ? pick(task.answer.ru, task.answer.en)
                  : pick("Не та ячейка — попробуйте ещё раз.", "Wrong cell — try again.")}
              </div>
              {(isRight || revealed) && (
                <p className="mt-1.5 text-xs text-ink-dim">
                  {pick(task.explain.ru, task.explain.en)}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="btn-ghost h-9 px-3 text-xs"
        >
          <Eye size={14} /> {pick("Показать ответ", "Reveal answer")}
        </button>
        <button type="button" onClick={nextTask} className="btn-secondary h-9 px-3 text-xs">
          {pick("Следующий вопрос", "Next question")}
        </button>
      </div>

      <p className="mt-3 text-[11px] text-ink-dim">
        {pick(
          "Источник: NCSA, FARS 2011 (U.S. Department of Transportation, «Distracted Driving 2011»). Итог включает 60 водителей 14 лет и младше, четверо из них были отвлечены.",
          "Source: NCSA, FARS 2011 (U.S. Department of Transportation, 'Distracted Driving 2011'). The total includes 60 drivers aged 14 and under, four of them noted as distracted.",
        )}
      </p>
    </div>
  );
}
