"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { formatLongDate, dayOfYear, daysInYear, YEAR, parseDateKey } from "@/lib/dates";
import { Checklist } from "./Checklist";

type Props = {
  selectedKey: string;
};

export function GoalsPanel({ selectedKey }: Props) {
  const days = useAppStore((s) => s.days);
  const addGoal = useAppStore((s) => s.addGoal);
  const toggleGoal = useAppStore((s) => s.toggleGoal);
  const removeGoal = useAppStore((s) => s.removeGoal);

  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const [hoveredGoal, setHoveredGoal] = useState<string | null>(null);

  const todayKey = useAppStore((s) => s.getTodayKey());
  const isToday = selectedKey === todayKey;

  const { year, month, day } = parseDateKey(selectedKey);
  const date = new Date(year, month, day);
  const today = new Date();
  const isFuture = date > today;
  const isPast = !isToday && !isFuture;

  const dayData = days[selectedKey];
  const goals = dayData?.goals ?? [];

  const dateLabel = isToday ? `Hoy · ${formatLongDate(date)}` : formatLongDate(date);
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
            Día {doy} de {totalDays}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <h3 className="font-medium text-base text-black">Metas del día</h3>

        {goals.length > 0 && (
          <div className="flex flex-col gap-3 w-full">
            {goals.map((g) => (
              <div
                key={g.id}
                className={`flex items-center justify-between p-1 rounded transition-colors ${
                  hoveredGoal === g.id ? "bg-surface" : ""
                }`}
                onMouseEnter={() => setHoveredGoal(g.id)}
                onMouseLeave={() => setHoveredGoal(null)}
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
                {hoveredGoal === g.id && (
                  <button
                    type="button"
                    onClick={() => removeGoal(selectedKey, g.id)}
                    className="text-muted hover:text-black transition-colors p-1"
                    aria-label="Eliminar meta"
                  >
                    <X size={14} />
                  </button>
                )}
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
              placeholder={isPast ? "Agrega una meta para este día" : "Agrega una meta para hoy"}
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
                  Cancelar
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
                  Agregar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
