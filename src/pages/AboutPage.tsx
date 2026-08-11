import { Info, Github, ExternalLink } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import { useI18n } from "@/i18n/I18nContext";

export default function AboutPage() {
  const { t, pick } = useI18n();

  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl">
        <header>
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
            <Info size={26} className="text-accent" /> {t("aboutTitle")}
          </h1>
        </header>

        <section className="card mt-6 space-y-3 p-6 text-sm leading-relaxed">
          <p>
            {pick(
              "Это визуальный компаньон курса UIUC iMBA BADM 572 «Statistics for Management Decision Making». Приложение не заменяет лекции и учебник — оно даёт второй, наглядный проход по тому же материалу: полный текст модуля, интерактивные графики, пошаговые Excel-практикумы, песочницу с данными, глоссарий и тесты.",
              "This is a visual companion to UIUC iMBA BADM 572, 'Statistics for Management Decision Making'. It does not replace the lectures or the textbook — it gives a second, visual pass over the same material: the full module text, interactive charts, step-by-step Excel walkthroughs, a data sandbox, a glossary and quizzes.",
            )}
          </p>
          <p>
            {pick(
              "Язык интерфейса определяется автоматически по локали браузера, а если она не даёт ответа — по часовому поясу. Выбор можно поменять в правом верхнем углу, и он запоминается.",
              "The interface language is detected from the browser locale and, failing that, from the timezone. You can override it in the top-right corner and the choice is remembered.",
            )}
          </p>
        </section>

        <section className="card mt-4 space-y-3 p-6 text-sm">
          <h2 className="font-semibold">{pick("Источники", "Sources")}</h2>
          <ul className="ml-4 list-disc space-y-2 text-ink-dim">
            <li>
              Taghaboni-Dutta, F. (2019). <i>Exploring and Producing Data for Business
              Decision Making</i>, Module 1. Gies College of Business, University of
              Illinois at Urbana-Champaign.
            </li>
            <li>
              Lane, D. M. et al.{" "}
              <i>Online Statistics Education: An Interactive Multimedia Course of Study</i>.{" "}
              <a
                className="inline-flex items-center gap-1 text-accent hover:underline"
                href="https://onlinestatbook.com/"
                target="_blank"
                rel="noreferrer"
              >
                onlinestatbook.com <ExternalLink size={11} />
              </a>
            </li>
            <li>
              Cain, T. (2015). Top 13 best-selling pickup trucks in America, August 2015 YTD.
            </li>
            <li>
              U.S. Department of Transportation, NHTSA / NCSA (2013).{" "}
              <i>Distracted Driving 2011</i>.
            </li>
            <li>American Pie Council / Crisco (2008). Pie fun facts.</li>
          </ul>
          <p className="text-[11px] text-ink-dim">
            {pick(
              "Наборы данных, помеченные как «реконструированные», собраны так, чтобы точно воспроизводить опубликованные в источнике частотные таблицы: исходные строки MOOC не публикует. Наборы, помеченные как «иллюстративные», синтетические — они повторяют форму зависимости, показанную на слайде, но не её конкретные значения.",
              "Datasets marked 'reconstructed' are built to reproduce exactly the frequency tables published in the source: the MOOC does not publish the raw rows. Datasets marked 'illustrative' are synthetic — they follow the shape shown on the slide, not its specific values.",
            )}
          </p>
        </section>

        <section className="card mt-4 p-6 text-sm">
          <h2 className="font-semibold">{pick("Технологии", "Built with")}</h2>
          <p className="mt-2 text-ink-dim">
            React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · Recharts ·
            Lucide
          </p>
          <a
            href="https://github.com/t-boris/BADM-572-Stat-4-Mgmt-Decision-Making"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary mt-4"
          >
            <Github size={16} /> GitHub
          </a>
        </section>
      </div>
    </PageTransition>
  );
}
