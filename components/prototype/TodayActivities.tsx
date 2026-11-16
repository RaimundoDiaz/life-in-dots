"use client";

import { Share } from "lucide-react";
import { YEAR, daysInYear, formatLongDate } from "@/lib/dates";
import { useLocale, useT } from "@/lib/i18n";
import { Activity, SampleDay, activityName, describeDay, levelFor } from "@/lib/prototype/habits";
import { ActivityDot } from "./ActivityDot";

type Props = {
  now: Date;
  todayIndex: number;
  today: SampleDay | undefined;
  activities: Activity[];
  manualToday: Record<string, boolean>;
  onToggleManual: (id: string) => void;
  onShare: () => void;
};

export function TodayActivities({ now, todayIndex, today, activities, manualToday, onToggleManual, onShare }: Props) {
  const t = useT();
  const locale = useLocale();
  const rows = activities.map((activity) => ({
    activity,
    level: today ? levelFor(activity, today) : -1,
    detail: today ? describeDay(activity, today, t) : "",
  }));
  const activeCount = rows.filter((row) => row.level > 0).length;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h2 className="font-serif text-2xl 2xl:text-[28px] 3xl:text-[32px] text-black leading-tight">
          {t("goals.todayPrefix")} · {formatLongDate(now, locale)}
        </h2>
        <p className="flex items-center gap-2 text-xs 2xl:text-sm text-black">
          <span className="w-8 h-px bg-black" />
          {t("goals.dayOfYear", { n: todayIndex + 1, total: daysInYear(YEAR) })}
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-sm 2xl:text-base font-semibold text-black">{t("proto.today.heading")}</h3>
          <span className="text-xs text-muted">
            {t("proto.today.count", { n: activeCount, total: activities.length })}
          </span>
        </div>
        <ul className="flex flex-col gap-2">
          {rows.map(({ activity, level, detail }) => {
            const done = !!manualToday[activity.id];
            return (
              <li key={activity.id} className="flex items-center gap-3 min-h-11 px-3 py-2.5 border border-line rounded-xl">
                <ActivityDot palette={activity.palette} shape={activity.shape} level={level} size="md" />
                <div className="flex-1 min-w-0 flex flex-col">
                  <span className="text-sm font-medium text-black truncate">{activityName(activity, t)}</span>
                  <span className="text-xs text-muted truncate">{detail}</span>
                </div>
                {activity.source === "manual" ? (
                  <button
                    type="button"
                    onClick={() => onToggleManual(activity.id)}
                    aria-pressed={done}
                    className={`shrink-0 min-h-11 px-3.5 rounded-lg border border-ink text-xs font-medium transition-colors ${
                      done ? "bg-ink text-paper" : "bg-paper text-black hover:bg-surface"
                    }`}
                  >
                    {done ? t("proto.today.done") : t("proto.today.mark")}
                  </button>
                ) : (
                  <span className="shrink-0 text-[11px] text-muted border border-line rounded-full px-2 py-1">
                    {t(`proto.source.${activity.source}`)}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <button
        type="button"
        onClick={onShare}
        className="flex items-center justify-center gap-2 min-h-12 rounded-lg bg-ink text-paper text-sm font-medium hover:bg-intensity-3 transition-colors"
      >
        <Share size={16} aria-hidden />
        {t("proto.share")}
      </button>
    </div>
  );
}
