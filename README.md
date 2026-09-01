# BADM 572 · Statistics for Management Decision Making — Visual Learner

Двуязычный (RU/EN) визуальный компаньон курса UIUC iMBA **BADM 572 — Statistics for
Management Decision Making** (MOOC: *Exploring and Producing Data for Business Decision
Making*, проф. Fataneh Taghaboni-Dutta) с дополнительным чтением по
[OnlineStatBook](https://onlinestatbook.com/).

## Что внутри

| Раздел | Что даёт |
|--------|----------|
| **Модули** | 3 полных модуля: определения (RU + EN), формулы, кейсы, ловушки и выводы |
| **Интерактивы** | 20 тренажёров: от типов переменных и гистограмм до симуляции ЦПТ и точности выборочной доли |
| **Excel** | 14 пошаговых практикумов, включая Sampling, sampling distributions и standard error |
| **Песочница** | Загрузить свои числа или датасет из лекции → частотная таблица, гистограмма, bar, pie, экспорт в CSV |
| **Глоссарий** | 103 термина с определениями на двух языках и формулами |
| **Тесты** | 60 вопросов: по 20 на модуль (4 easy · 12 medium · 4 hard), режим на время, разбор ответов |

## Язык интерфейса

Определяется автоматически: сначала по локали браузера (`navigator.languages`), затем —
если она неинформативна — по часовому поясу (`Intl.DateTimeFormat().resolvedOptions().timeZone`).
Выбор можно переопределить тумблером **RU / EN** в правом верхнем углу; он сохраняется
в `localStorage`.

## Запуск

```bash
npm install
npm run dev          # http://localhost:5173
```

## Сборка и проверки

```bash
npm run typecheck    # tsc --noEmit
npm run build        # tsc -b && vite build → dist/
npm run preview      # локальный просмотр production-сборки
```

## Деплой

```bash
npx vercel           # preview
npx vercel --prod    # production
```

`vercel.json` уже настроен на SPA-роутинг (все пути → `index.html`) и кеширование ассетов.

Для GitHub Pages: `VITE_BASE=/BADM-572-Stat-4-Mgmt-Decision-Making/ npm run build`.

## Как добавить следующий модуль

1. `src/data/modules.ts` — заполнить `title`, `subtitle`, `topics`, поставить `status: 'ready'`.
2. `src/components/modules/ModuleNContent.tsx` — текст модуля (примитивы из `LessonBlock.tsx`).
3. `src/components/viz/` — интерактивы под концепции модуля.
4. `src/data/glossary.ts` — термины с `moduleId: N`.
5. `src/data/questions/moduleN.ts` — 20 вопросов, подключить в `questions/index.ts`.
6. `src/data/excelGuides.ts` — Excel-практикумы, если они есть в модуле.
7. `src/pages/ModulePage.tsx` — зарегистрировать компонент в `MODULE_CONTENT`.

## Источники данных

Наборы, помеченные в коде как **RECONSTRUCTED**, собраны так, чтобы точно воспроизводить
опубликованные в источнике частотные таблицы (MOOC не публикует исходные строки).
Наборы **ILLUSTRATIVE** — синтетические: повторяют форму зависимости со слайда, но не
конкретные значения. Полный список источников — на странице «О проекте».

## Стек

React 18 · TypeScript · Vite 5 · Tailwind CSS 3 · Framer Motion · Recharts · Lucide
