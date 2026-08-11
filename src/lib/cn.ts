/** Lightweight classnames joiner — no external dependency. */
export function cn(
  ...inputs: Array<string | number | false | null | undefined | Record<string, unknown>>
): string {
  const parts: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === "string" || typeof input === "number") {
      parts.push(String(input));
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) parts.push(key);
      }
    }
  }
  return parts.join(" ");
}
