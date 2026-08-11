import type { QuizConfig, QuizQuestion, QuizResult } from "@/lib/types";

const SESSION_KEY = "badm572-quiz-session";
const RESULT_KEY = "badm572-quiz-result";

export interface ActiveQuizSession {
  config: QuizConfig;
  questions: QuizQuestion[];
  startedAt: number;
}

export function saveSession(session: ActiveQuizSession): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* ignore */
  }
}

export function loadSession(): ActiveQuizSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ActiveQuizSession;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export function saveResult(result: QuizResult): void {
  try {
    sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
  } catch {
    /* ignore */
  }
}

export function loadResult(): QuizResult | null {
  try {
    const raw = sessionStorage.getItem(RESULT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as QuizResult;
  } catch {
    return null;
  }
}
