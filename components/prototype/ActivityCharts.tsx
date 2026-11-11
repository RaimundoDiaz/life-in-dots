"use client";

import { YEAR, formatWeekdayShort, getMonthName } from "@/lib/dates";
import { useLocale, useT } from "@/lib/i18n";
import type { PaletteId } from "@/lib/prototype/palettes";
import type { SampleDay } from "@/lib/prototype/habits";
import { BAR_CLASSES } from "./paletteClasses";

type Props = {
  levels: number[];
  days: SampleDay[];
  todayIndex: number;
  palette: PaletteId;
};

// Monday first; 5 January 2026 is a Monday, used only to get localized weekday names.
const WEEK = [1, 2, 3, 4, 5, 6, 0];

export function ActivityCharts({ levels, days, todayIndex, palette }: Props) {
  const t = useT();
  const locale = useLocale();
  const perMonth = Array.from({ length: 12 }, () => 0);
  const perWeekday = Array.from({ length: 7 }, () => 0);
  for (const day of days) {
    if (day.index > todayIndex || (levels[day.index] ?? 0) <= 0) continue;
    perMonth[day.month]++;
    perWeekday[day.weekday]++;
  }
  const maxMonth = Math.max(1, ...perMonth);
  const maxWeekday = Math.max(1, ...perWeekday);
  const currentMonth = days[todayIndex]?.month ?? 11;

  return (
    <div className="flex flex-wrap gap-4">
      <section className="grow basis-80 border border-line rounded-xl p-4 md:p-6 flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-black">{t("proto.dash.byMonth")}</h3>
        <div className="h-44 grid grid-cols-12 gap-1.5">
          {perMonth.map((count, month) => (
            <div key={month} className="flex flex-col items-center gap-1.5 min-w-0">
              <span className="text-[10px] text-muted tabular-nums h-3">{month <= currentMonth ? count : ""}</span>
              <div className="flex-1 w-full flex items-end justify-center">
                {/* Dynamic height: proportional to the busiest month. */}
                <span
                  className={`block w-full max-w-8 rounded-t-md ${BAR_CLASSES[palette]}`}
                  style={{ height: `${(count / maxMonth) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-muted">{getMonthName(month, locale).charAt(0).toUpperCase()}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grow basis-64 border border-line rounded-xl p-4 md:p-6 flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-black">{t("proto.dash.byWeekday")}</h3>
        <ul className="flex flex-col gap-2.5">
          {WEEK.map((weekday, i) => (
            <li key={weekday} className="flex items-center gap-3 text-xs">
              <span className="w-10 shrink-0 text-muted">{formatWeekdayShort(new Date(YEAR, 0, 5 + i), locale)}</span>
              <span className="flex-1 h-3 rounded-full bg-line overflow-hidden">
                <span
                  className={`block h-full rounded-full ${BAR_CLASSES[palette]}`}
                  style={{ width: `${(perWeekday[weekday] / maxWeekday) * 100}%` }}
                />
              </span>
              <span className="w-6 shrink-0 text-right tabular-nums text-black">{perWeekday[weekday]}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
