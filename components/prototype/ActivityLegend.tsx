"use client";

import { useT } from "@/lib/i18n";
import type { PaletteId } from "@/lib/prototype/palettes";
import type { Shape } from "@/lib/prototype/habits";
import { ActivityDot } from "./ActivityDot";

type Props = {
  palette: PaletteId;
  shape: Shape;
  note: string;
};

const LEVELS = [0, 1, 2, 3, 4];

export function ActivityLegend({ palette, shape, note }: Props) {
  const t = useT();
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] 2xl:text-xs 3xl:text-sm text-black">
      <div className="flex items-center gap-1.5">
        <span>{t("proto.legend.less")}</span>
        {LEVELS.map((level) => (
          <ActivityDot key={level} palette={palette} shape={shape} level={level} size="sm" />
        ))}
        <span>{t("proto.legend.more")}</span>
      </div>
      <div className="flex items-center gap-2">
        <ActivityDot palette="ink" shape="circle" level={0} size="sm" today />
        <span>{t("legend.today")}</span>
      </div>
      <span className="text-muted">{note}</span>
    </div>
  );
}
