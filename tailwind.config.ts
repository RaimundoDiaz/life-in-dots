import type { Config } from "tailwindcss";
import { ACTIVITY_PALETTES } from "./lib/prototype/palettes";

// Prototype activity colours as `activity-<palette>-<1..4>`.
const activityColors = Object.fromEntries(
  Object.entries(ACTIVITY_PALETTES).map(([id, steps]) => [
    id,
    { 1: steps[0], 2: steps[1], 3: steps[2], 4: steps[3] },
  ])
);

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": "1400px",
        "3xl": "1920px",
      },
      gridTemplateColumns: {
        // One column per day of the longest month, used by the dot calendar rows.
        "31": "repeat(31, minmax(0, 1fr))",
      },
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
        // Partially completed days: lighter = fewer goals done, darker = closer to done.
        intensity: {
          1: "#c2c2c2",
          2: "#8a8a8a",
          3: "#4d4d4d",
        },
        activity: activityColors,
      },
    },
  },
  plugins: [],
};

export default config;
