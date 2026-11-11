// Prototype-only model for multiple tracked activities. Everything here runs on
// generated sample data: nothing is read from or written to the store or Supabase.
import { YEAR, dayOfYear, daysInMonth, daysInYear } from "@/lib/dates";
import type { PaletteId } from "./palettes";

export type Shape = "circle" | "square" | "ring" | "diamond";
export type SourceId = "goals" | "github" | "claude" | "strava" | "manual";
type MeasuredSource = "github" | "claude" | "strava";

export type Activity = {
  id: string;
  // Built-in activities are translated; user-created ones keep the name they typed.
  nameKey?: string;
  name?: string;
  palette: PaletteId;
  shape: Shape;
  source: SourceId;
};

export type SampleDay = {
  index: number;
  month: number;
  day: number;
  weekday: number;
  future: boolean;
  amounts: Record<string, number>;
  goalsTotal: number;
};

export type Summary = { active: number; current: number; best: number };

type Translate = (key: string, vars?: Record<string, string | number>) => string;

export const SHAPES: Shape[] = ["circle", "square", "ring", "diamond"];
export const PICKABLE_SOURCES: SourceId[] = ["manual", "github", "claude", "strava"];

export const DEFAULT_ACTIVITIES: Activity[] = [
  { id: "goals", nameKey: "proto.act.goals", palette: "ink", shape: "circle", source: "goals" },
  { id: "github", nameKey: "proto.act.github", palette: "green", shape: "square", source: "github" },
  { id: "claude", nameKey: "proto.act.claude", palette: "orange", shape: "diamond", source: "claude" },
  { id: "exercise", nameKey: "proto.act.exercise", palette: "blue", shape: "circle", source: "strava" },
  { id: "reading", nameKey: "proto.act.reading", palette: "purple", shape: "ring", source: "manual" },
];

// Upper bounds for levels 1–3; anything above the last bound is level 4.
export const THRESHOLDS: Record<MeasuredSource, [number, number, number]> = {
  github: [2, 5, 9],
  claude: [1, 2, 3],
  strava: [29, 44, 59],
};

const TODAY_SAMPLE: Record<MeasuredSource | "goals", number> = { goals: 2, github: 6, claude: 3, strava: 32 };
const TODAY_GOALS_TOTAL = 3;

export function activityName(activity: Activity, t: Translate): string {
  return activity.name ?? (activity.nameKey ? t(activity.nameKey) : "");
}

export function getTodayIndex(now: Date): number {
  if (now.getFullYear() < YEAR) return -1;
  if (now.getFullYear() > YEAR) return daysInYear(YEAR) - 1;
  return dayOfYear(now) - 1;
}

function seeded(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

function hash(text: string): number {
  let h = 7;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) % 2147483647;
  return h;
}

function sampleAmount(source: Exclude<SourceId, "goals">, rand: () => number, index: number, weekday: number): number {
  const weekend = weekday === 0 || weekday === 6;
  switch (source) {
    case "github":
      return rand() < (weekend ? 0.3 : 0.78) ? 1 + Math.floor(Math.pow(rand(), 1.6) * 14) : 0;
    case "claude":
      return rand() < (index > 150 ? 0.6 : 0.12) ? 1 + Math.floor(rand() * 5) : 0;
    case "strava": {
      const trainingDay = weekday === 1 || weekday === 3 || weekday === 5 || weekday === 6;
      return rand() < (trainingDay ? 0.72 : 0.25) ? 15 + Math.floor(rand() * 16) * 5 : 0;
    }
    case "manual":
      return rand() < 0.45 ? 1 : 0;
  }
}

function sampleGoals(rand: () => number): { done: number; total: number } {
  if (rand() < 0.12) return { done: 0, total: 0 };
  const total = 1 + Math.floor(rand() * 5);
  const pick = rand();
  const done = pick < 0.32 ? total : pick < 0.42 ? 0 : Math.floor(rand() * total);
  return { done, total };
}

export function buildSampleYear(
  activities: Activity[],
  todayIndex: number,
  manualToday: Record<string, boolean>
): SampleDay[] {
  const rands = new Map(activities.map((a) => [a.id, seeded(hash(a.id))]));
  const days: SampleDay[] = [];
  let index = 0;
  for (let month = 0; month < 12; month++) {
    for (let day = 1; day <= daysInMonth(YEAR, month); day++) {
      const weekday = new Date(YEAR, month, day).getDay();
      const future = index > todayIndex;
      const amounts: Record<string, number> = {};
      let goalsTotal = 0;
      if (!future) {
        for (const activity of activities) {
          const rand = rands.get(activity.id);
          if (!rand) continue;
          if (index === todayIndex) {
            amounts[activity.id] =
              activity.source === "manual" ? (manualToday[activity.id] ? 1 : 0) : TODAY_SAMPLE[activity.source];
            if (activity.source === "goals") goalsTotal = TODAY_GOALS_TOTAL;
          } else if (activity.source === "goals") {
            const goals = sampleGoals(rand);
            amounts[activity.id] = goals.done;
            goalsTotal = goals.total;
          } else {
            amounts[activity.id] = sampleAmount(activity.source, rand, index, weekday);
          }
        }
      }
      days.push({ index, month, day, weekday, future, amounts, goalsTotal });
      index++;
    }
  }
  return days;
}

// -1 = future, 0 = nothing done, 1–4 = intensity.
export function levelFor(activity: Activity, day: SampleDay): number {
  if (day.future) return -1;
  const amount = day.amounts[activity.id] ?? 0;
  if (amount === 0) return 0;
  switch (activity.source) {
    case "goals": {
      const total = day.goalsTotal;
      if (amount >= total) return 4;
      if (amount * 3 <= total) return 1;
      return amount * 3 <= total * 2 ? 2 : 3;
    }
    case "manual":
      return 4;
    default: {
      const [first, second, third] = THRESHOLDS[activity.source];
      if (amount <= first) return 1;
      if (amount <= second) return 2;
      return amount <= third ? 3 : 4;
    }
  }
}

// "All activities" view: darker the more activities had something that day.
export function combinedLevel(activities: Activity[], day: SampleDay): number {
  if (day.future) return -1;
  const active = activities.filter((a) => levelFor(a, day) > 0).length;
  return Math.min(4, active);
}

export function summarize(levels: number[], todayIndex: number): Summary {
  let active = 0;
  let best = 0;
  let run = 0;
  for (let i = 0; i <= todayIndex && i < levels.length; i++) {
    if (levels[i] > 0) {
      active++;
      run++;
      best = Math.max(best, run);
    } else {
      run = 0;
    }
  }
  let current = 0;
  let i = todayIndex;
  // Today still counts as "in progress": an empty today doesn't break the streak.
  if (i >= 0 && levels[i] <= 0) i--;
  while (i >= 0 && levels[i] > 0) {
    current++;
    i--;
  }
  return { active, current, best };
}

export function totalAmount(activity: Activity, days: SampleDay[]): number {
  return days.reduce((sum, day) => sum + (day.amounts[activity.id] ?? 0), 0);
}

export function formatDays(n: number, t: Translate): string {
  return t(n === 1 ? "proto.stats.day" : "proto.stats.days", { n });
}

export function describeDay(activity: Activity, day: SampleDay, t: Translate): string {
  const amount = day.amounts[activity.id] ?? 0;
  if (activity.source === "goals" && day.goalsTotal > 0) {
    return t("proto.detail.goals", { done: amount, total: day.goalsTotal });
  }
  if (amount === 0) return t("proto.detail.none");
  if (activity.source === "manual") return t("proto.detail.manualDone");
  const singular = amount === 1 && (activity.source === "github" || activity.source === "claude");
  return t(`proto.detail.${activity.source}${singular ? "One" : ""}`, { n: amount });
}

// Labels for the four intensity steps, e.g. "1–2", "3–5", "6–9", "10+".
export function levelLabels(source: SourceId, t: Translate): string[] {
  if (source === "goals") return ["⅓", "⅔", "<100%", "100%"];
  if (source === "manual") return [t("proto.detail.manualDone")];
  const [a, b, c] = THRESHOLDS[source];
  const range = (from: number, to: number) => (from === to ? String(from) : `${from}–${to}`);
  return [range(1, a), range(a + 1, b), range(b + 1, c), `${c + 1}+`];
}
