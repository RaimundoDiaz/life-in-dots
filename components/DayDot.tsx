"use client";

import { DayState } from "@/lib/dayState";

type Props = {
  state: DayState;
  onClick?: () => void;
  active?: boolean;
  title?: string;
};

const STATE_CLASS: Record<DayState, string> = {
  completed: "bg-black border-black",
  partial: "bg-[#dc2626] border-[#dc2626]",
  missed: "bg-transparent border-[#dc2626]",
  today: "bg-[#16a34a] border-[#16a34a]",
  future: "bg-transparent border-[#d5d5d5]",
  empty: "bg-transparent border-[#d5d5d5]",
};

export function DayDot({ state, onClick, active, title }: Props) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`shrink-0 rounded-full border w-1.5 h-1.5 md:w-2 md:h-2 ${STATE_CLASS[state]} transition-all ${
        onClick ? "hover:scale-125 cursor-pointer" : "cursor-default"
      } ${active ? "ring-2 ring-black ring-offset-1" : ""}`}
    />
  );
}
