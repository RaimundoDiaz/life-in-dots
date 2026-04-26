import { DayDot } from "./DayDot";

export function Legend() {
  return (
    <div className="flex items-center gap-6 flex-wrap">
      <Item state="completed" label="Día cumplido" />
      <Item state="partial" label="Parcialmente cumplido" />
      <Item state="missed" label="No cumplido" />
      <Item state="today" label="Hoy" />
      <Item state="future" label="Futuro" />
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
