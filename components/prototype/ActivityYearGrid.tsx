"use client";

import { YEAR, daysInMonth, getMonthName } from "@/lib/dates";
import { useLocale } from "@/lib/i18n";
import type { PaletteId } from "@/lib/prototype/palettes";
import type { Shape } from "@/lib/prototype/habits";
import { ActivityDot } from "./ActivityDot";

type Props = {
  // One level per day of the year (-1 future, 0 empty, 1–4 intensity).
  levels: number[];
  palette: PaletteId;
  shape: Shape;
  todayIndex: number;
};

const MONTHS = Array.from({ length: 12 }, (_, month) => month);

export function ActivityYearGrid({ levels, palette, shape, todayIndex }: Props) {
  const locale = useLocale();
  const starts = MONTHS.map((month) =>
    MONTHS.slice(0, month).reduce((sum, m) => sum + daysInMonth(YEAR, m), 0)
  );

  return (
    <div className="flex flex-col gap-2">
      {MONTHS.map((month) => {
        const start = starts[month];
        const monthName = getMonthName(month, locale);
        return (
          <div key={month} className="flex items-center gap-1.5 md:gap-2 2xl:gap-3 3xl:gap-3.5">
            <span className="shrink-0 tabular-nums font-serif text-[10px] 2xl:text-[12px] 3xl:text-[14px] text-muted">
              {String(month + 1).padStart(2, "0")}
            </span>
            <div className="grid grid-cols-31 items-center gap-y-1 flex-1 min-w-0">
              {Array.from({ length: daysInMonth(YEAR, month) }, (_, i) => (
                <ActivityDot
                  key={i}
                  palette={palette}
                  shape={shape}
                  level={levels[start + i] ?? -1}
                  size="grid"
                  today={start + i === todayIndex}
                  title={`${i + 1} ${monthName}`}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
