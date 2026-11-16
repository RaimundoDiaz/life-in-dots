"use client";

import { ArrowLeft, Share } from "lucide-react";
import { YEAR, formatWeekdayDayMonth } from "@/lib/dates";
import { useLocale, useT } from "@/lib/i18n";
import {
  Activity,
  SampleDay,
  activityName,
  describeDay,
  formatDays,
  summarize,
  totalAmount,
} from "@/lib/prototype/habits";
import { ActivityCharts } from "./ActivityCharts";
import { ActivityChips } from "./ActivityChips";
import { ActivityDot } from "./ActivityDot";
import { ActivityLegend } from "./ActivityLegend";
import { ActivityYearGrid } from "./ActivityYearGrid";
import { StatCards } from "./StatCards";

type Props = {
  activities: Activity[];
  activity: Activity;
  levels: number[];
  days: SampleDay[];
  todayIndex: number;
  onSelect: (id: string) => void;
  onBack: () => void;
  onShare: (id: string) => void;
};

export function ActivityDashboard({ activities, activity, levels, days, todayIndex, onSelect, onBack, onShare }: Props) {
  const t = useT();
  const locale = useLocale();
  const summary = summarize(levels, todayIndex);
  const total = totalAmount(activity, days);

  const recent = [];
  for (let i = todayIndex; i >= 0 && i > todayIndex - 7; i--) {
    const day = days[i];
    recent.push({
      index: i,
      label: i === todayIndex ? t("legend.today") : formatWeekdayDayMonth(new Date(YEAR, day.month, day.day), locale),
      detail: describeDay(activity, day, t),
      level: levels[i] ?? -1,
    });
  }

  return (
    <section className="flex flex-col gap-8">
      <button
        type="button"
        onClick={onBack}
        className="self-start flex items-center gap-1.5 min-h-11 text-sm font-medium text-black hover:underline underline-offset-4"
      >
        <ArrowLeft size={16} aria-hidden />
        {t("proto.dash.back")}
      </button>

      <ActivityChips activities={activities} selectedId={activity.id} onSelect={onSelect} />

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <ActivityDot palette={activity.palette} shape={activity.shape} level={4} size="xl" />
          <div className="flex flex-col gap-1">
            <h2 className="font-serif text-3xl md:text-[40px] 2xl:text-[44px] text-black leading-tight">
              {activityName(activity, t)}
            </h2>
            <span className="text-sm text-muted">{t(`proto.source.${activity.source}`)}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onShare(activity.id)}
          className="flex items-center gap-2 min-h-11 px-4 rounded-lg bg-ink text-paper text-sm font-medium hover:bg-intensity-3 transition-colors"
        >
          <Share size={16} aria-hidden />
          {t("proto.dash.share")}
        </button>
      </header>

      <StatCards
        stats={[
          { label: t("proto.stats.current"), value: formatDays(summary.current, t) },
          { label: t("proto.stats.best"), value: formatDays(summary.best, t) },
          {
            label: t("proto.stats.activeDays"),
            value: String(summary.active),
            hint: t("proto.stats.ofDays", { n: todayIndex + 1 }),
          },
          {
            label: t("proto.stats.total"),
            value: total.toLocaleString(locale),
            hint: t(`proto.unit.${activity.source}`),
          },
        ]}
      />

      <div className="border border-line rounded-xl p-4 md:p-6 flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-black">{t("proto.dash.year")}</h3>
        <ActivityYearGrid levels={levels} palette={activity.palette} shape={activity.shape} todayIndex={todayIndex} />
        <ActivityLegend palette={activity.palette} shape={activity.shape} note={t(`proto.note.${activity.source}`)} />
      </div>

      <ActivityCharts levels={levels} days={days} todayIndex={todayIndex} palette={activity.palette} />

      <div className="border border-line rounded-xl p-4 md:p-6 flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-black mb-1">{t("proto.dash.recent")}</h3>
        <ul className="flex flex-col">
          {recent.map((row) => (
            <li key={row.index} className="flex items-center gap-4 min-h-11 border-t border-line first:border-t-0">
              <ActivityDot palette={activity.palette} shape={activity.shape} level={row.level} size="md" />
              <span className="w-28 shrink-0 text-xs text-muted">{row.label}</span>
              <span className="text-sm text-black">{row.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
