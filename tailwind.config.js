/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        "ink-900": "var(--ink-900)",
        "ink-700": "var(--ink-700)",
        "ink-500": "var(--ink-500)",
        "ink-300": "var(--ink-300)",
        line: "var(--line)",
        "accent-700": "var(--accent-700)",
        "accent-600": "var(--accent-600)",
        "accent-100": "var(--accent-100)",
        "gold-600": "var(--gold-600)",
        "gold-500": "var(--gold-500)",
        whatsapp: "var(--whatsapp)",
      },
      fontFamily: {
        display: ["Fraunces Variable", "Georgia", "serif"],
        sans: ["Inter Variable", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "1.05" }],
        "display-l": ["clamp(2rem, 4.5vw, 3.25rem)", { lineHeight: "1.1" }],
        h2: ["clamp(1.5rem, 2.5vw, 2.25rem)", { lineHeight: "1.2" }],
        h3: ["1.25rem", { lineHeight: "1.3" }],
        "body-l": ["1.125rem", { lineHeight: "1.7" }],
        body: ["1rem", { lineHeight: "1.65" }],
        caption: ["0.875rem", { lineHeight: "1.5" }],
        overline: ["0.75rem", { lineHeight: "1.4" }],
      },
      borderRadius: {
        sm: "4px",
        md: "12px",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgb(28 26 23 / .05), 0 1px 3px rgb(28 26 23 / .06)",
        md: "0 4px 12px rgb(28 26 23 / .08), 0 2px 4px rgb(28 26 23 / .04)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
      },
      maxWidth: {
        content: "1280px",
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
