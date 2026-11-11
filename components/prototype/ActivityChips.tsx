"use client";

import { ReactNode } from "react";
import { Plus } from "lucide-react";
import { useT } from "@/lib/i18n";
import { Activity, activityName } from "@/lib/prototype/habits";
import { ActivityDot } from "./ActivityDot";

type Props = {
  activities: Activity[];
  selectedId: string;
  onSelect: (id: string) => void;
  includeAll?: boolean;
  onNew?: () => void;
};

export function ActivityChips({ activities, selectedId, onSelect, includeAll = false, onNew }: Props) {
  const t = useT();
  return (
    <nav aria-label={t("proto.chips.aria")} className="flex flex-wrap gap-2">
      {includeAll && (
        <Chip selected={selectedId === "all"} onClick={() => onSelect("all")} label={t("proto.chips.all")}>
          <ActivityDot palette="ink" shape="circle" level={4} size="xs" />
        </Chip>
      )}
      {activities.map((activity) => (
        <Chip
          key={activity.id}
          selected={selectedId === activity.id}
          onClick={() => onSelect(activity.id)}
          label={activityName(activity, t)}
        >
          <ActivityDot palette={activity.palette} shape={activity.shape} level={4} size="xs" />
        </Chip>
      ))}
      {onNew && (
        <button
          type="button"
          onClick={onNew}
          className="flex items-center gap-1.5 min-h-11 px-4 rounded-full border border-dashed border-line-strong text-sm font-medium text-black hover:bg-surface"
        >
          <Plus size={14} aria-hidden />
          {t("proto.chips.new")}
        </button>
      )}
    </nav>
  );
}

function Chip({
  selected,
  onClick,
  label,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex items-center gap-2 min-h-11 px-4 rounded-full border text-sm font-medium text-black transition-colors ${
        selected ? "border-ink ring-1 ring-ink bg-paper" : "border-line bg-paper hover:bg-surface"
      }`}
    >
      {children}
      <span>{label}</span>
    </button>
  );
}
