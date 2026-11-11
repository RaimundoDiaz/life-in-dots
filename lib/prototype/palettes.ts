// Colour steps for prototype activities, from level 1 (lightest) to level 4 (darkest).
// Single source of truth: tailwind.config.ts turns these into `activity-<palette>-<1..4>`
// tokens, and the story image renderer draws with the same values.
export const ACTIVITY_PALETTES = {
  ink: ["#c2c2c2", "#8a8a8a", "#4d4d4d", "#000000"],
  green: ["#b7e4c0", "#6cc58a", "#2f9e5b", "#1b6b3a"],
  orange: ["#f4d3c4", "#e9a083", "#d4693f", "#9c4220"],
  blue: ["#c9dcf6", "#86b3ea", "#3f7fd6", "#1d4c96"],
  purple: ["#ddd1f3", "#b39ae4", "#7d5cc8", "#4e3394"],
  pink: ["#f6cfe0", "#ec93b9", "#d6538e", "#9a2a5f"],
  amber: ["#f7e3a8", "#efc65a", "#d49b16", "#946a06"],
  teal: ["#c3ebe7", "#7fd3ca", "#2fa89b", "#17706a"],
} as const;

export type PaletteId = keyof typeof ACTIVITY_PALETTES;

export const PALETTE_IDS: PaletteId[] = ["ink", "green", "orange", "blue", "purple", "pink", "amber", "teal"];

// On a dark story background the scale flips: more activity should glow brighter.
const INK_ON_DARK = ["#4d4d4d", "#8a8a8a", "#c2c2c2", "#ffffff"] as const;

export function storyPalette(id: PaletteId, dark: boolean): readonly string[] {
  if (!dark) return ACTIVITY_PALETTES[id];
  if (id === "ink") return INK_ON_DARK;
  return [...ACTIVITY_PALETTES[id]].reverse();
}
