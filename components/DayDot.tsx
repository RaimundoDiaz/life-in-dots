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
  completed: "bg-black border-black",
  partial: "bg-[#dc2626] border-[#dc2626]",
  missed: "bg-transparent border-[#dc2626]",
  today: "bg-[#16a34a] border-[#16a34a]",
  future: "bg-transparent border-[#d5d5d5]",
  empty: "bg-transparent border-[#d5d5d5]",
};

export function DayDot({ state, onClick, active, title, fluid }: Props) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`shrink-0 rounded-full border ${fluid ? FLUID_SIZE : FIXED_SIZE} ${STATE_CLASS[state]} transition-all ${
        onClick ? "hover:scale-125 active:scale-90 cursor-pointer" : "cursor-default"
      } ${active ? "ring-2 ring-black ring-offset-1" : ""}`}
    />
  );
}
