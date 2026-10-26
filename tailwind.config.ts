import type { Config } from "tailwindcss";

/**
 * Maps the CSS-variable design tokens declared in src/app/globals.css
 * to Tailwind utilities. Change values in globals.css, not here.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "900px",
      lg: "1200px",
      xl: "1600px",
    },
    extend: {
      colors: {
        paper: { DEFAULT: "var(--paper)", 2: "var(--paper-2)" },
        surface: "var(--surface)",
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          mute: "var(--ink-mute)",
        },
        line: { DEFAULT: "var(--line)", strong: "var(--line-strong)" },
        accent: {
          50: "var(--accent-50)",
          100: "var(--accent-100)",
          300: "var(--accent-300)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          700: "var(--accent-700)",
        },
        warm: { 400: "var(--warm-400)" },
        danger: "var(--danger)",
        success: "var(--success)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        soft: "var(--ease-soft)",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-instrument-serif)", "ui-serif", "Georgia", "serif"],
      },
      maxWidth: {
        container: "var(--container)",
      },
      spacing: {
        gutter: "var(--gutter)",
        "section-y": "var(--section-y)",
      },
    },
  },
};

export default config;
