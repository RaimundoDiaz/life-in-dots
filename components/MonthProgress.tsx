"use client";

import { dateKey, daysInMonth, getMonthName, YEAR } from "@/lib/dates";
import { computeDayState } from "@/lib/dayState";
import { useAppStore } from "@/lib/store";
import { useLocale } from "@/lib/i18n";
import { DayDot } from "./DayDot";

type Props = {
  selectedKey: string;
  onSelect: (key: string) => void;
};

export function MonthProgress({ selectedKey, onSelect }: Props) {
  const days = useAppStore((s) => s.days);
  const locale = useLocale();
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  const monthsToShow = [Math.max(0, todayMonth)];
  for (let m = todayMonth + 1; m < 12; m++) monthsToShow.push(m);

  return (
    <div className="flex flex-col gap-2">
      {monthsToShow.map((monthIdx) => {
        const total = daysInMonth(YEAR, monthIdx);
        const isCurrentMonth = monthIdx === todayMonth;
        const startDay = isCurrentMonth ? todayDay - 1 : 1;

        return (
          <div key={monthIdx} className="flex items-center gap-1.5 md:gap-2">
            <span
              className={`font-serif text-[10px] ${
                isCurrentMonth ? "text-black" : "text-muted-soft"
              }`}
            >
              {String(monthIdx + 1).padStart(2, "0")}
            </span>
            {isCurrentMonth && startDay > 1 && (
              <span className="text-[10px] text-muted-faint">...</span>
            )}
            <div className="flex items-center gap-[3px] md:gap-2">
              {Array.from({ length: total - startDay + 1 }, (_, i) => {
                const day = startDay + i;
                const date = new Date(YEAR, monthIdx, day);
                const key = dateKey(YEAR, monthIdx, day);
                const state = computeDayState(date, today, days[key]);
                return (
                  <DayDot
                    key={key}
                    state={state}
                    onClick={() => onSelect(key)}
                    active={selectedKey === key}
                    title={`${day} ${getMonthName(monthIdx, locale)}`}
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
