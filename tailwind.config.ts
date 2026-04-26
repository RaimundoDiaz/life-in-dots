import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#000000",
        paper: "#ffffff",
        muted: "#757575",
        "muted-soft": "#a0a0a0",
        "muted-faint": "#bebebe",
        line: "#e5e5e5",
        "line-soft": "#d5d5d5",
        "line-strong": "#a4a4a4",
        surface: "#f9f9f9",
        warning: "#fef3c7",
        danger: "#dc2626",
        "danger-soft": "#b91c1c",
        success: "#16a34a",
        tooltip: "#22221e",
      },
    },
  },
  plugins: [],
};

export default config;
