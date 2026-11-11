"use client";

import { DayDot } from "./DayDot";
import { DayState } from "@/lib/dayState";
import { useT } from "@/lib/i18n";

export function Legend() {
  const t = useT();
  return (
    <div className="flex items-center gap-6 2xl:gap-8 3xl:gap-10 flex-wrap">
      <Item states={["completed"]} label={t("legend.completed")} />
      <Item states={["partial-1", "partial-2", "partial-3"]} label={t("legend.partial")} />
      <Item states={["missed"]} label={t("legend.missed")} />
      <Item states={["today"]} label={t("legend.today")} />
      <Item states={["future"]} label={t("legend.future")} />
    </div>
  );
}

function Item({ states, label }: { states: DayState[]; label: string }) {
  return (
    <div className="flex items-center gap-1 2xl:gap-1.5">
      <div className="flex items-center gap-0.5 2xl:gap-1">
        {states.map((state) => (
          <DayDot key={state} state={state} />
        ))}
      </div>
      <span className="text-[10px] 2xl:text-xs 3xl:text-sm text-black">{label}</span>
    </div>
  );
}
