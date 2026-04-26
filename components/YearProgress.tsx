"use client";

import { dateKey, daysInMonth, MONTH_NAMES_ES, YEAR } from "@/lib/dates";
import { computeDayState } from "@/lib/dayState";
import { useAppStore } from "@/lib/store";
import { DayDot } from "./DayDot";

type Props = {
  selectedKey: string;
  onSelect: (key: string) => void;
};

export function YearProgress({ selectedKey, onSelect }: Props) {
  const days = useAppStore((s) => s.days);
  const today = new Date();

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 12 }, (_, monthIdx) => {
        const total = daysInMonth(YEAR, monthIdx);
        return (
          <div key={monthIdx} className="flex items-center gap-1.5 md:gap-2">
            <span className="font-serif text-[10px] text-muted-soft">
              {String(monthIdx + 1).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-[3px] md:gap-2">
              {Array.from({ length: total }, (_, i) => {
                const day = i + 1;
                const date = new Date(YEAR, monthIdx, day);
                const key = dateKey(YEAR, monthIdx, day);
                const state = computeDayState(date, today, days[key]);
                return (
                  <DayDot
                    key={key}
                    state={state}
                    onClick={() => onSelect(key)}
                    active={selectedKey === key}
                    title={`${day} de ${MONTH_NAMES_ES[monthIdx]}`}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
