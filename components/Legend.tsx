"use client";

import { DayDot } from "./DayDot";
import { useT } from "@/lib/i18n";

export function Legend() {
  const t = useT();
  return (
    <div className="flex items-center gap-6 2xl:gap-8 3xl:gap-10 flex-wrap">
      <Item state="completed" label={t("legend.completed")} />
      <Item state="partial" label={t("legend.partial")} />
      <Item state="missed" label={t("legend.missed")} />
      <Item state="today" label={t("legend.today")} />
      <Item state="future" label={t("legend.future")} />
    </div>
  );
}

function Item({ state, label }: { state: "completed" | "partial" | "missed" | "today" | "future"; label: string }) {
  return (
    <div className="flex items-center gap-1 2xl:gap-1.5">
      <DayDot state={state} />
      <span className="text-[10px] 2xl:text-xs 3xl:text-sm text-black">{label}</span>
    </div>
  );
}
