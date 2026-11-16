import type { PaletteId } from "@/lib/prototype/palettes";
import type { Shape } from "@/lib/prototype/habits";
import { FILL_CLASSES, RING_CLASSES } from "./paletteClasses";

type Size = "grid" | "xs" | "sm" | "md" | "lg" | "xl";

const SIZE_CLASS: Record<Size, string> = {
  grid: "w-3/4 max-w-3.5 2xl:max-w-4 3xl:max-w-5 aspect-square justify-self-center",
  xs: "w-2.5 h-2.5",
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
  lg: "w-5 h-5",
  xl: "w-7 h-7",
};

const SHAPE_CLASS: Record<Shape, string> = {
  circle: "rounded-full",
  square: "rounded-sm",
  ring: "rounded-full",
  diamond: "rounded-sm rotate-45 scale-75",
};

type Props = {
  palette: PaletteId;
  shape: Shape;
  // -1 future, 0 nothing done, 1–4 intensity.
  level: number;
  size?: Size;
  today?: boolean;
  title?: string;
};

export function ActivityDot({ palette, shape, level, size = "md", today = false, title }: Props) {
  const step = Math.min(4, Math.max(1, level)) - 1;
  const colour =
    level <= 0
      ? "bg-transparent border border-line-soft"
      : shape === "ring"
        ? `bg-transparent border-2 ${RING_CLASSES[palette][step]}`
        : `border ${FILL_CLASSES[palette][step]}`;
  return (
    <span
      title={title}
      aria-hidden={title ? undefined : true}
      className={`block shrink-0 box-border ${SIZE_CLASS[size]} ${SHAPE_CLASS[shape]} ${colour} ${
        today ? "outline outline-2 outline-offset-2 outline-ink" : ""
      }`}
    />
  );
}
