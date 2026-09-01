import { useState } from "react";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

type Method = "volunteer" | "cluster" | "stratified" | "srs";

const METHODS: Record<
  Method,
  {
    label: { ru: string; en: string };
    short: { ru: string; en: string };
    probability: boolean;
  }
> = {
  volunteer: {
    label: { ru: "Добровольная", en: "Volunteer" },
    short: {
      ru: "Люди включают себя сами; сильные мнения представлены чаще.",
      en: "People include themselves; strong opinions are over-represented.",
    },
    probability: false,
  },
  cluster: {
    label: { ru: "Кластерная", en: "Cluster" },
    short: {
      ru: "Выбираем некоторые группы и обследуем людей внутри них.",
      en: "Select some groups, then study people inside those groups.",
    },
    probability: true,
  },
  stratified: {
    label: { ru: "Стратифицированная", en: "Stratified" },
    short: {
      ru: "Берём случайную часть из каждой важной подгруппы.",
      en: "Take a random part from every important subgroup.",
    },
    probability: true,
  },
  srs: {
    label: { ru: "Простая случайная", en: "Simple random" },
    short: {
      ru: "Выбираем людей из общей базы без учёта их группы.",
      en: "Select people from the full list without regard to group.",
    },
    probability: true,
  },
};

const SCENARIOS: {
  id: number;
  text: { ru: string; en: string };
  answer: Method;
  why: { ru: string; en: string };
}[] = [
  {
    id: 1,
    text: {
      ru: "Телефон печатают на каждом чеке; клиент сам решает, звонить ли с отзывом.",
      en: "A phone number is printed on every receipt; customers decide whether to call with feedback.",
    },
    answer: "volunteer",
    why: {
      ru: "Решение об участии принимает клиент, поэтому особенно довольные или недовольные отвечают непропорционально часто.",
      en: "The customer chooses to participate, so unusually happy or unhappy customers answer disproportionately often.",
    },
  },
  {
    id: 2,
    text: {
      ru: "Из 10 ресторанов случайно выбирают 3 и опрашивают всех их недавних клиентов.",
      en: "Three of ten restaurants are selected at random and all their recent customers are surveyed.",
    },
    answer: "cluster",
    why: {
      ru: "Ресторан — кластер. В исследование входят лишь некоторые кластеры, зато внутри них берут всех.",
      en: "A restaurant is a cluster. Only some clusters enter the study, but everyone inside them is included.",
    },
  },
  {
    id: 3,
    text: {
      ru: "В каждом из 10 ресторанов случайно выбирают по 50 клиентов.",
      en: "Fifty customers are selected at random from each of the ten restaurants.",
    },
    answer: "stratified",
    why: {
      ru: "Каждый ресторан — strata; случайные наблюдения берутся из всех десяти, поэтому ни одна локация не исчезнет из данных.",
      en: "Each restaurant is a stratum; random observations come from all ten, so no location can disappear from the data.",
    },
  },
  {
    id: 4,
    text: {
      ru: "Из общей базы прошлых клиентов случайно выбирают 500 человек.",
      en: "Five hundred people are selected at random from the full customer database.",
    },
    answer: "srs",
    why: {
      ru: "Принадлежность к ресторану не влияет на отбор: каждая запись общей базы имеет одинаковый шанс.",
      en: "Restaurant membership does not affect selection: every record in the full list has the same chance.",
    },
  },
];

export default function SamplingMethodsExplorer() {
  const { pick, L } = useI18n();
  const [scenario, setScenario] = useState(0);
  const [choice, setChoice] = useState<Method | null>(null);
  const item = SCENARIOS[scenario];
  const correct = choice === item.answer;

  function move(next: number) {
    setScenario(next);
    setChoice(null);
  }

  return (
    <div className="card p-5">
      <div className="text-[11px] uppercase tracking-widest text-ink-dim">
        {pick("Lesson 3-2 · тренажёр", "Lesson 3-2 · practice lab")}
      </div>
      <h4 className="mt-1 font-display text-base font-semibold">
        {pick("Strata или cluster?", "Strata or cluster?")}
      </h4>
      <p className="mt-1 text-xs text-ink-dim">
        {pick(
          "Кейс сети ресторанов из лекции. Классифицируйте процедуру, затем проверьте логику.",
          "The lecture's restaurant-chain case. Classify the procedure, then check the logic.",
        )}
      </p>

      <div className="mt-4 flex gap-1.5" aria-label={pick("Сценарии", "Scenarios")}>
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => move(i)}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full border text-xs font-semibold transition-colors",
              scenario === i
                ? "border-transparent bg-m3 text-white"
                : "border-border bg-surface text-ink-dim hover:bg-muted",
            )}
          >
            {s.id}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4 text-sm font-medium">
        {L(item.text)}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {(Object.keys(METHODS) as Method[]).map((method) => (
          <button
            key={method}
            type="button"
            onClick={() => setChoice(method)}
            className={cn(
              "rounded-xl border p-3 text-left transition-colors",
              choice === method
                ? "border-m3 bg-m3/10"
                : "border-border bg-surface hover:bg-muted/60",
            )}
          >
            <span className="text-sm font-semibold">{L(METHODS[method].label)}</span>
            <span className="mt-1 block text-[11px] leading-relaxed text-ink-dim">
              {L(METHODS[method].short)}
            </span>
          </button>
        ))}
      </div>

      {choice ? (
        <div
          className={cn(
            "mt-4 flex items-start gap-2 rounded-xl border p-3 text-xs leading-relaxed",
            correct
              ? "border-success/40 bg-success/10"
              : "border-danger/40 bg-danger/10",
          )}
        >
          {correct ? (
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" />
          ) : (
            <CircleAlert size={16} className="mt-0.5 shrink-0 text-danger" />
          )}
          <div>
            <strong>
              {correct
                ? pick("Верно. ", "Correct. ")
                : pick(`Это ${L(METHODS[item.answer].label).toLowerCase()} выборка. `, `This is ${L(METHODS[item.answer].label).toLowerCase()} sampling. `)}
            </strong>
            {L(item.why)}
            <span className="mt-1 block text-ink-dim">
              {METHODS[item.answer].probability
                ? pick("Вероятностный метод: вывод можно обобщать при корректном выполнении.", "Probability method: results can be generalized when implemented correctly.")
                : pick("Невероятностный метод: вывод описывает респондентов, но не всю клиентскую базу.", "Non-probability method: results describe respondents, not the entire customer base.")}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
