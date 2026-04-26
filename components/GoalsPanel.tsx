"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { formatLongDate, dayOfYear, daysInYear, YEAR, parseDateKey } from "@/lib/dates";
import { useLocale, useT } from "@/lib/i18n";
import { Checklist } from "./Checklist";

type Props = {
  selectedKey: string;
};

export function GoalsPanel({ selectedKey }: Props) {
  const t = useT();
  const locale = useLocale();
  const days = useAppStore((s) => s.days);
  const addGoal = useAppStore((s) => s.addGoal);
  const toggleGoal = useAppStore((s) => s.toggleGoal);
  const removeGoal = useAppStore((s) => s.removeGoal);

  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const todayKey = useAppStore((s) => s.getTodayKey());
  const isToday = selectedKey === todayKey;

  const { year, month, day } = parseDateKey(selectedKey);
  const date = new Date(year, month, day);
  const today = new Date();
  const isFuture = date > today;
  const isPast = !isToday && !isFuture;

  const dayData = days[selectedKey];
  const goals = dayData?.goals ?? [];

  const longDate = formatLongDate(date, locale);
  const dateLabel = isToday ? `${t("goals.todayPrefix")} · ${longDate}` : longDate;
  const doy = dayOfYear(date);
  const totalDays = daysInYear(YEAR);

  const canAdd = !isFuture;

  function handleAdd() {
    const text = draft.trim();
    if (!text) return;
    addGoal(selectedKey, text);
    setDraft("");
    setAdding(false);
  }

  return (
    <div className="flex flex-col gap-10 h-full">
      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-2xl text-black">{dateLabel}</h2>
        <div className="flex items-center gap-1">
          <span className="block w-[30px] h-px bg-black" />
          <span className="text-sm text-black">
            {t("goals.dayOfYear", { n: doy, total: totalDays })}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <h3 className="font-medium text-base text-black">{t("goals.heading")}</h3>

        {goals.length > 0 && (
          <div className="flex flex-col gap-3 w-full">
            {goals.map((g) => (
              <div
                key={g.id}
                className="group flex items-center justify-between p-1 rounded transition-colors hover:bg-surface"
              >
                <div className="flex items-center gap-2.5">
                  <Checklist
                    checked={g.done}
                    onChange={() => !isFuture && toggleGoal(selectedKey, g.id)}
                  />
                  <span
                    className={`font-medium text-sm text-black ${
                      g.done ? "line-through" : ""
                    }`}
                  >
                    {g.text}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeGoal(selectedKey, g.id)}
                  className="text-muted hover:text-black transition-opacity p-1 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100"
                  aria-label={t("goals.deleteAria")}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {canAdd && goals.length < 10 && (
          <div className="flex flex-col gap-3 w-full items-end">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onFocus={() => setAdding(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd();
                if (e.key === "Escape") {
                  setDraft("");
                  setAdding(false);
                }
              }}
              placeholder={isPast ? t("goals.placeholderPast") : t("goals.placeholderToday")}
              className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-sm text-black placeholder:text-muted focus:outline-none focus:border-black transition-colors"
            />
            {(adding || draft) && (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDraft("");
                    setAdding(false);
                  }}
                  className="bg-white border border-line rounded-lg px-6 py-2 text-sm font-medium text-muted hover:bg-surface transition-colors"
                >
                  {t("common.cancel")}
                </button>
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!draft.trim()}
                  className={`rounded-lg px-6 py-2 text-sm font-medium text-white transition-colors ${
                    draft.trim()
                      ? "bg-black hover:bg-gray-800"
                      : "bg-black/30 cursor-not-allowed"
                  }`}
                >
                  {t("common.add")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
