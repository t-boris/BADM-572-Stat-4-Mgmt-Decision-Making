import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { L10n, Lang } from "@/lib/types";
import { UI, type UiKey } from "./strings";

const STORAGE_KEY = "badm572-lang";

/**
 * Timezones that strongly suggest a Russian-speaking user. Used only as a
 * fallback signal when `navigator.language` is inconclusive (e.g. an English
 * browser used from Moscow).
 */
const RU_TIMEZONES = new Set([
  "Europe/Moscow",
  "Europe/Kaliningrad",
  "Europe/Samara",
  "Europe/Saratov",
  "Europe/Volgograd",
  "Europe/Astrakhan",
  "Europe/Ulyanovsk",
  "Europe/Kirov",
  "Europe/Minsk",
  "Europe/Kyiv",
  "Europe/Kiev",
  "Europe/Riga",
  "Europe/Tallinn",
  "Europe/Vilnius",
  "Asia/Yekaterinburg",
  "Asia/Omsk",
  "Asia/Novosibirsk",
  "Asia/Krasnoyarsk",
  "Asia/Irkutsk",
  "Asia/Yakutsk",
  "Asia/Vladivostok",
  "Asia/Magadan",
  "Asia/Kamchatka",
  "Asia/Almaty",
  "Asia/Tashkent",
  "Asia/Bishkek",
  "Asia/Yerevan",
  "Asia/Baku",
  "Asia/Tbilisi",
]);

const RU_LOCALE = /^(ru|be|uk|kk|ky|hy|az|uz|tg|mo)\b/i;

/** Autodetect: browser locale first, then IANA timezone (a location proxy). */
export function detectLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored === "ru" || stored === "en") return stored;

  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language ?? "en"];
  if (candidates.some((c) => RU_LOCALE.test(c))) return "ru";

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && RU_TIMEZONES.has(tz)) return "ru";
  } catch {
    /* Intl unavailable — fall through */
  }
  return "en";
}

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Look up a UI string by key. */
  t: (key: UiKey) => string;
  /** Pick the active language out of an inline bilingual pair. */
  pick: (ru: string, en: string) => string;
  /** Pick the active language out of an L10n object. */
  L: (value: L10n) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* private mode / quota — ignore */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((prev) => (prev === "ru" ? "en" : "ru")),
    [],
  );

  const value = useMemo<I18nContextValue>(() => {
    const t = (key: UiKey) => UI[key][lang];
    const pick = (ru: string, en: string) => (lang === "ru" ? ru : en);
    const L = (v: L10n) => v[lang];
    return { lang, setLang, toggle, t, pick, L };
  }, [lang, setLang, toggle]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
