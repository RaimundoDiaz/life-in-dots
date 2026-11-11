import { DayData } from "./store";

type PartialLevel = 1 | 2 | 3;

export type DayState =
  | "future"
  | "today"
  | "completed"
  | `partial-${PartialLevel}`
  | "empty";

export function computeDayState(
  date: Date,
  today: Date,
  data: DayData | undefined
): DayState {
  const isSame = date.toDateString() === today.toDateString();
  if (isSame) return "today";
  if (date > today) return "future";

  // Like GitHub, a past day with nothing done is simply left blank.
  if (!data || data.goals.length === 0) return "empty";
  const total = data.goals.length;
  const done = data.goals.filter((g) => g.done).length;
  if (done === 0) return "empty";
  if (done === total) return "completed";
  return `partial-${partialLevel(done, total)}`;
}

// Splits partial progress into thirds, like GitHub's contribution shades.
// Integer math so 1/3 and 2/3 land on the boundaries exactly.
function partialLevel(done: number, total: number): PartialLevel {
  if (done * 3 <= total) return 1;
  if (done * 3 <= total * 2) return 2;
  return 3;
}
