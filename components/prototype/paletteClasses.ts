import type { PaletteId } from "@/lib/prototype/palettes";

// Full class names (not built from strings) so Tailwind can find them when scanning.
type Steps = readonly [string, string, string, string];

export const FILL_CLASSES: Record<PaletteId, Steps> = {
  ink: ["bg-activity-ink-1 border-activity-ink-1", "bg-activity-ink-2 border-activity-ink-2", "bg-activity-ink-3 border-activity-ink-3", "bg-activity-ink-4 border-activity-ink-4"],
  green: ["bg-activity-green-1 border-activity-green-1", "bg-activity-green-2 border-activity-green-2", "bg-activity-green-3 border-activity-green-3", "bg-activity-green-4 border-activity-green-4"],
  orange: ["bg-activity-orange-1 border-activity-orange-1", "bg-activity-orange-2 border-activity-orange-2", "bg-activity-orange-3 border-activity-orange-3", "bg-activity-orange-4 border-activity-orange-4"],
  blue: ["bg-activity-blue-1 border-activity-blue-1", "bg-activity-blue-2 border-activity-blue-2", "bg-activity-blue-3 border-activity-blue-3", "bg-activity-blue-4 border-activity-blue-4"],
  purple: ["bg-activity-purple-1 border-activity-purple-1", "bg-activity-purple-2 border-activity-purple-2", "bg-activity-purple-3 border-activity-purple-3", "bg-activity-purple-4 border-activity-purple-4"],
  pink: ["bg-activity-pink-1 border-activity-pink-1", "bg-activity-pink-2 border-activity-pink-2", "bg-activity-pink-3 border-activity-pink-3", "bg-activity-pink-4 border-activity-pink-4"],
  amber: ["bg-activity-amber-1 border-activity-amber-1", "bg-activity-amber-2 border-activity-amber-2", "bg-activity-amber-3 border-activity-amber-3", "bg-activity-amber-4 border-activity-amber-4"],
  teal: ["bg-activity-teal-1 border-activity-teal-1", "bg-activity-teal-2 border-activity-teal-2", "bg-activity-teal-3 border-activity-teal-3", "bg-activity-teal-4 border-activity-teal-4"],
};

export const RING_CLASSES: Record<PaletteId, Steps> = {
  ink: ["border-activity-ink-1", "border-activity-ink-2", "border-activity-ink-3", "border-activity-ink-4"],
  green: ["border-activity-green-1", "border-activity-green-2", "border-activity-green-3", "border-activity-green-4"],
  orange: ["border-activity-orange-1", "border-activity-orange-2", "border-activity-orange-3", "border-activity-orange-4"],
  blue: ["border-activity-blue-1", "border-activity-blue-2", "border-activity-blue-3", "border-activity-blue-4"],
  purple: ["border-activity-purple-1", "border-activity-purple-2", "border-activity-purple-3", "border-activity-purple-4"],
  pink: ["border-activity-pink-1", "border-activity-pink-2", "border-activity-pink-3", "border-activity-pink-4"],
  amber: ["border-activity-amber-1", "border-activity-amber-2", "border-activity-amber-3", "border-activity-amber-4"],
  teal: ["border-activity-teal-1", "border-activity-teal-2", "border-activity-teal-3", "border-activity-teal-4"],
};

// Chart bars use the third step: strong enough to read, lighter than "complete".
export const BAR_CLASSES: Record<PaletteId, string> = {
  ink: "bg-activity-ink-3",
  green: "bg-activity-green-3",
  orange: "bg-activity-orange-3",
  blue: "bg-activity-blue-3",
  purple: "bg-activity-purple-3",
  pink: "bg-activity-pink-3",
  amber: "bg-activity-amber-3",
  teal: "bg-activity-teal-3",
};

export const SWATCH_CLASSES: Record<PaletteId, string> = {
  ink: "bg-activity-ink-4",
  green: "bg-activity-green-4",
  orange: "bg-activity-orange-4",
  blue: "bg-activity-blue-4",
  purple: "bg-activity-purple-4",
  pink: "bg-activity-pink-4",
  amber: "bg-activity-amber-4",
  teal: "bg-activity-teal-4",
};
