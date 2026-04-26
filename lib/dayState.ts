import { DayData } from "./store";

export type DayState = "future" | "today" | "completed" | "partial" | "missed" | "empty";

export function computeDayState(
  date: Date,
  today: Date,
  data: DayData | undefined
): DayState {
  const isSame = date.toDateString() === today.toDateString();
  if (isSame) return "today";
  if (date > today) return "future";

  if (!data || data.goals.length === 0) return "missed";
  const total = data.goals.length;
  const done = data.goals.filter((g) => g.done).length;
  if (done === 0) return "missed";
  if (done === total) return "completed";
  return "partial";
}
