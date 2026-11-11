"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Plug } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { YEAR, daysInYear } from "@/lib/dates";
import { useT } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import {
  Activity,
  DEFAULT_ACTIVITIES,
  activityName,
  buildSampleYear,
  combinedLevel,
  formatDays,
  getTodayIndex,
  levelFor,
  summarize,
} from "@/lib/prototype/habits";
import { ActivityChips } from "./ActivityChips";
import { ActivityDashboard } from "./ActivityDashboard";
import { ActivityLegend } from "./ActivityLegend";
import { ActivityYearGrid } from "./ActivityYearGrid";
import { ConnectionsModal } from "./ConnectionsModal";
import { NewActivityModal } from "./NewActivityModal";
import { StatCards } from "./StatCards";
import { StoryModal } from "./StoryModal";
import { TodayActivities } from "./TodayActivities";

// Prototype of Life in Dots as a habit tracker. Runs entirely on sample data and
// local component state: nothing here touches the store's days or Supabase.
export function HabitPrototype() {
  const t = useT();
  const hydrated = useAppStore((s) => s.hydrated);
  const [now] = useState(() => new Date());
  const todayIndex = getTodayIndex(now);
  const [activities, setActivities] = useState<Activity[]>(DEFAULT_ACTIVITIES);
  const [selectedId, setSelectedId] = useState("all");
  const [dashboardId, setDashboardId] = useState<string | null>(null);
  const [manualToday, setManualToday] = useState<Record<string, boolean>>({});
  const [modal, setModal] = useState<"new" | "connections" | null>(null);
  const [storyId, setStoryId] = useState<string | null>(null);

  const days = useMemo(
    () => buildSampleYear(activities, todayIndex, manualToday),
    [activities, todayIndex, manualToday]
  );
  const levelsById = useMemo(() => {
    const byId: Record<string, number[]> = { all: days.map((day) => combinedLevel(activities, day)) };
    for (const activity of activities) byId[activity.id] = days.map((day) => levelFor(activity, day));
    return byId;
  }, [activities, days]);

  if (!hydrated) return <div className="min-h-screen bg-paper" />;

  const selected = activities.find((a) => a.id === selectedId);
  const dashboardActivity = activities.find((a) => a.id === dashboardId);
  const levels = levelsById[selectedId] ?? levelsById.all;
  const summary = summarize(levels, todayIndex);
  const totalDays = daysInYear(YEAR);
  const subtitle = selected
    ? t("proto.subtitle.one", { active: summary.active, name: activityName(selected, t), streak: summary.current })
    : t("proto.subtitle.all", {
        active: summary.active,
        total: totalDays,
        percent: Math.round(((todayIndex + 1) / totalDays) * 100),
      });

  return (
    <div className="min-h-screen bg-paper">
      <div className="flex flex-col md:flex-row md:items-start md:min-h-screen">
        <main className="flex-1 min-w-0 px-5 pt-8 pb-12 md:pl-[60px] md:pr-[40px] md:py-[60px] 2xl:pl-[80px] 2xl:pr-[56px] 2xl:py-[80px] 3xl:pl-[120px] 3xl:pr-[80px] 3xl:py-[100px]">
          <div className="flex flex-col gap-8 md:gap-10 2xl:gap-12 max-w-[820px] 2xl:max-w-[880px] 3xl:max-w-[1020px]">
            <header className="flex flex-col gap-3">
              <span className="self-start rounded-full bg-warning px-3 py-1 text-xs font-medium text-black">
                {t("proto.badge")}
              </span>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <h1 className="font-serif text-2xl md:text-[36px] 2xl:text-[44px] 3xl:text-[52px] text-black leading-tight">
                  {t("header.title", { year: YEAR })}
                </h1>
                <div className="flex items-center gap-2 ml-auto">
                  <LanguageSwitcher />
                  <button
                    type="button"
                    onClick={() => setModal("connections")}
                    className="flex items-center gap-1.5 border border-line rounded-lg px-2.5 py-2 text-xs md:text-sm font-medium text-black hover:bg-surface"
                  >
                    <Plug size={16} aria-hidden />
                    {t("proto.connections")}
                  </button>
                </div>
              </div>
              {!dashboardActivity && (
                <p className="text-sm md:text-base 2xl:text-lg 3xl:text-xl text-black">{subtitle}</p>
              )}
            </header>

            {dashboardActivity ? (
              <ActivityDashboard
                activities={activities}
                activity={dashboardActivity}
                levels={levelsById[dashboardActivity.id] ?? []}
                days={days}
                todayIndex={todayIndex}
                onSelect={setDashboardId}
                onBack={() => setDashboardId(null)}
                onShare={setStoryId}
              />
            ) : (
              <section className="flex flex-col gap-6">
                <ActivityChips
                  activities={activities}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  includeAll
                  onNew={() => setModal("new")}
                />
                <ActivityYearGrid
                  levels={levels}
                  palette={selected?.palette ?? "ink"}
                  shape={selected?.shape ?? "circle"}
                  todayIndex={todayIndex}
                />
                <ActivityLegend
                  palette={selected?.palette ?? "ink"}
                  shape={selected?.shape ?? "circle"}
                  note={selected ? t(`proto.note.${selected.source}`) : t("proto.note.all")}
                />
                <StatCards
                  stats={[
                    {
                      label: selected ? t("proto.stats.activeDays") : t("proto.stats.daysWithActivity"),
                      value: String(summary.active),
                    },
                    { label: t("proto.stats.current"), value: formatDays(summary.current, t) },
                    { label: t("proto.stats.best"), value: formatDays(summary.best, t) },
                  ]}
                />
                <button
                  type="button"
                  onClick={() => setDashboardId(selected?.id ?? activities[0].id)}
                  className="self-start flex items-center gap-1.5 min-h-11 text-sm font-medium text-black underline-offset-4 hover:underline"
                >
                  {selected
                    ? t("proto.dashboard.open", { name: activityName(selected, t) })
                    : t("proto.dashboard.openAll")}
                  <ArrowRight size={16} aria-hidden />
                </button>
              </section>
            )}
          </div>
        </main>

        <aside className="md:sticky md:top-0 md:h-screen md:overflow-y-auto md:w-[400px] 2xl:w-[480px] 3xl:w-[560px] shrink-0 border-t md:border-t-0 md:border-l border-line-strong/40 bg-paper px-5 py-8 md:pl-8 md:pr-10 md:py-[60px] 2xl:pl-10 2xl:pr-12 2xl:py-[80px]">
          <TodayActivities
            now={now}
            todayIndex={todayIndex}
            today={days[todayIndex]}
            activities={activities}
            manualToday={manualToday}
            onToggleManual={(id) => setManualToday((prev) => ({ ...prev, [id]: !prev[id] }))}
            onShare={() => setStoryId("all")}
          />
        </aside>
      </div>

      <NewActivityModal
        open={modal === "new"}
        onClose={() => setModal(null)}
        onCreate={(activity) => {
          setActivities((prev) => [...prev, activity]);
          setSelectedId(activity.id);
          setModal(null);
        }}
      />
      <ConnectionsModal open={modal === "connections"} onClose={() => setModal(null)} />
      <StoryModal
        storyId={storyId}
        activities={activities}
        days={days}
        levelsById={levelsById}
        todayIndex={todayIndex}
        now={now}
        onClose={() => setStoryId(null)}
      />
    </div>
  );
}
