/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: ["Cal Sans", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        // Semantic palette controlled by CSS variables (theme.css)
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        elevated: "rgb(var(--elevated) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-dim": "rgb(var(--ink-dim) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-soft": "rgb(var(--accent-soft) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        // Per-module accent rails
        m1: "rgb(var(--m1) / <alpha-value>)",
        m2: "rgb(var(--m2) / <alpha-value>)",
        m3: "rgb(var(--m3) / <alpha-value>)",
        m4: "rgb(var(--m4) / <alpha-value>)",
        m5: "rgb(var(--m5) / <alpha-value>)",
        m6: "rgb(var(--m6) / <alpha-value>)",
        m7: "rgb(var(--m7) / <alpha-value>)",
        m8: "rgb(var(--m8) / <alpha-value>)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--border) / 0.6), 0 10px 40px -10px rgb(var(--accent) / 0.35)",
        soft: "0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px -12px rgb(0 0 0 / 0.12)",
      },
      backgroundImage: {
        "grid-dots":
          "radial-gradient(circle at 1px 1px, rgb(var(--ink) / 0.08) 1px, transparent 0)",
        "aurora":
          "conic-gradient(from 180deg at 50% 50%, rgb(var(--accent) / 0.25), rgb(var(--m3) / 0.25), rgb(var(--m6) / 0.25), rgb(var(--accent) / 0.25))",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
