"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { Modal } from "./Modal";
import { useAppStore } from "@/lib/store";
import { PEOPLE, PEOPLE_CATEGORIES, ROLE_KEY, type PersonCategory } from "@/lib/people";
import { useT } from "@/lib/i18n";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function PeopleInspireModal({ open, onClose }: Props) {
  const t = useT();
  const initial = useAppStore((s) => s.selectedPeople);
  const setSelected = useAppStore((s) => s.setSelectedPeople);

  const [selected, setLocalSelected] = useState<string[]>(initial);
  const [activeCat, setActiveCat] = useState<PersonCategory | "all">("all");

  const filtered = useMemo(() => {
    if (activeCat === "all") return PEOPLE;
    return PEOPLE.filter((p) => p.role === activeCat);
  }, [activeCat]);

  function toggle(id: string) {
    setLocalSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  }

  function save() {
    setSelected(selected);
    onClose();
  }

  const counts: Record<string, number> = {
    all: PEOPLE.length,
  };
  for (const p of PEOPLE) {
    counts[p.role] = (counts[p.role] ?? 0) + 1;
  }

  return (
    <Modal open={open} onClose={onClose} width={520}>
      <div className="p-6 flex flex-col gap-4 max-h-[80vh]">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-serif text-2xl text-black">{t("inspire.title")}</h3>
            <p className="text-sm text-muted">{t("inspire.subtitle")}</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-black mt-1" aria-label={t("common.close")}>
            <X size={20} />
          </button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {PEOPLE_CATEGORIES.map((c) => {
            const isActive = activeCat === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setActiveCat(c.value)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  isActive
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-line hover:border-black"
                }`}
              >
                {t(c.i18nKey)}{" "}
                <span className={isActive ? "opacity-70" : "text-muted"}>{counts[c.value] ?? 0}</span>
              </button>
            );
          })}
        </div>

        <p className="text-sm text-muted">
          <span className="text-black font-medium">{t("inspire.selectedCount", { n: selected.length })}</span>{" "}
          {t("inspire.ofTotal", { total: PEOPLE.length })}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto pr-1">
          {filtered.map((p) => {
            const active = selected.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => toggle(p.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                  active
                    ? "border-black bg-surface"
                    : "border-line hover:border-muted"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-xs font-medium text-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-sm font-medium text-black text-center leading-tight">
                    {p.name}
                  </span>
                  <span className="text-xs text-muted">{t(ROLE_KEY[p.role])}</span>
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={save}
          className="w-full bg-black text-white rounded-lg py-3 font-medium text-sm hover:bg-gray-800 transition-colors"
        >
          {t("inspire.save")}
        </button>
      </div>
    </Modal>
  );
}
