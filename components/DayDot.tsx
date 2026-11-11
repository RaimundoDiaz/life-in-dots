"use client";

import { DayState } from "@/lib/dayState";

type Props = {
  state: DayState;
  onClick?: () => void;
  active?: boolean;
  title?: string;
  // Fill its grid cell (calendar rows) instead of using a fixed size (legend).
  fluid?: boolean;
};

const FLUID_SIZE =
  "w-3/4 max-w-3.5 2xl:max-w-4 3xl:max-w-5 aspect-square justify-self-center";
const FIXED_SIZE = "w-2 h-2 2xl:w-2.5 2xl:h-2.5 3xl:w-3 3xl:h-3";

const STATE_CLASS: Record<DayState, string> = {
  completed: "bg-ink border-ink",
  "partial-1": "bg-intensity-1 border-intensity-1",
  "partial-2": "bg-intensity-2 border-intensity-2",
  "partial-3": "bg-intensity-3 border-intensity-3",
  today: "bg-success border-success",
  future: "bg-transparent border-line-soft",
  empty: "bg-transparent border-line-soft",
};

export function DayDot({ state, onClick, active, title, fluid }: Props) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`shrink-0 rounded-full border ${fluid ? FLUID_SIZE : FIXED_SIZE} ${STATE_CLASS[state]} transition-all ${
        onClick ? "hover:scale-125 active:scale-90 cursor-pointer" : "cursor-default"
      } ${active ? "ring-2 ring-ink ring-offset-1" : ""}`}
    />
  );
}
