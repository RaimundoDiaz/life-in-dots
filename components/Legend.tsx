"use client";

import { DayDot } from "./DayDot";
import { useT } from "@/lib/i18n";

export function Legend() {
  const t = useT();
  return (
    <div className="flex items-center gap-6 flex-wrap">
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
    <div className="flex items-center gap-1">
      <DayDot state={state} />
      <span className="text-[10px] text-black">{label}</span>
    </div>
  );
}
