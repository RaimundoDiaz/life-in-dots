"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Download, Share, X } from "lucide-react";
import { Modal } from "@/components/Modal";
import { YEAR, formatDayMonth } from "@/lib/dates";
import { useLocale, useT } from "@/lib/i18n";
import { ACTIVITY_PALETTES, storyPalette } from "@/lib/prototype/palettes";
import { Activity, SampleDay, activityName, formatDays, summarize, totalAmount } from "@/lib/prototype/habits";
import { STORY_HEIGHT, STORY_WIDTH, StoryContent, renderStory } from "@/lib/prototype/storyImage";

type Props = {
  // "all" for the year summary, or an activity id; null when closed.
  storyId: string | null;
  activities: Activity[];
  days: SampleDay[];
  levelsById: Record<string, number[]>;
  todayIndex: number;
  now: Date;
  onClose: () => void;
};

const SITE = "yourlifeindots.com";
const FILE_NAME = "life-in-dots-story.png";

export function StoryModal({ storyId, activities, days, levelsById, todayIndex, now, onClose }: Props) {
  const t = useT();
  const locale = useLocale();
  const [image, setImage] = useState<{ url: string; file: File } | null>(null);

  const content = useMemo<StoryContent | null>(() => {
    if (!storyId) return null;
    const activity = activities.find((a) => a.id === storyId);
    if (!activity) {
      const summary = summarize(levelsById.all ?? [], todayIndex);
      return {
        dark: false,
        steps: ACTIVITY_PALETTES.ink,
        shape: "circle",
        eyebrow: t("proto.story.until", { date: formatDayMonth(now, locale) }),
        title: t("proto.story.headline", { year: YEAR }),
        bigNumber: String(summary.active),
        caption: t("proto.story.activeDays"),
        levels: levelsById.all ?? [],
        items: activities.map((a) => ({
          value: formatDays(summarize(levelsById[a.id] ?? [], todayIndex).active, t),
          label: activityName(a, t),
          colour: ACTIVITY_PALETTES[a.palette][3],
          shape: a.shape,
        })),
        itemsLayout: "list",
        footerLeft: t("proto.story.best", { n: summary.best }),
        footerRight: SITE,
      };
    }
    const levels = levelsById[activity.id] ?? [];
    const summary = summarize(levels, todayIndex);
    return {
      dark: true,
      steps: storyPalette(activity.palette, true),
      shape: activity.shape,
      eyebrow: t("proto.story.until", { date: formatDayMonth(now, locale) }),
      title: t("proto.story.activityHeadline", { name: activityName(activity, t), year: YEAR }),
      bigNumber: String(summary.active),
      caption: t("proto.story.activityDays"),
      levels,
      items: [
        { value: String(summary.best), label: t("proto.story.bestLabel") },
        { value: String(summary.current), label: t("proto.story.currentLabel") },
        { value: totalAmount(activity, days).toLocaleString(locale), label: t(`proto.unit.${activity.source}`) },
      ],
      itemsLayout: "stats",
      footerLeft: t(`proto.source.${activity.source}`),
      footerRight: SITE,
    };
    // `t` is a new function every render; `locale` is what actually changes its output,
    // and depending on `t` would re-render the image on every render.
  }, [storyId, activities, days, levelsById, todayIndex, now, locale]);

  useEffect(() => {
    if (!content) return;
    let cancelled = false;
    let url: string | null = null;
    renderStory(content).then((blob) => {
      if (!blob || cancelled) return;
      url = URL.createObjectURL(blob);
      setImage({ url, file: new File([blob], FILE_NAME, { type: "image/png" }) });
    });
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
      setImage(null);
    };
  }, [content]);

  const canShare =
    !!image && typeof navigator !== "undefined" && !!navigator.canShare && navigator.canShare({ files: [image.file] });

  function share() {
    if (!image) return;
    navigator.share({ files: [image.file] }).catch(() => undefined);
  }

  return (
    <Modal open={storyId !== null} onClose={onClose} width={460}>
      <div className="max-h-[90vh] overflow-y-auto p-6 flex flex-col gap-5">
        <header className="flex items-center justify-between gap-4">
          <h2 className="font-serif text-2xl text-black">{t("proto.story.title")}</h2>
          <button type="button" onClick={onClose} aria-label={t("common.close")} className="p-2 -m-2 text-muted hover:text-black">
            <X size={20} />
          </button>
        </header>

        {image ? (
          <Image
            src={image.url}
            alt={t("proto.story.alt")}
            width={STORY_WIDTH}
            height={STORY_HEIGHT}
            unoptimized
            className="mx-auto h-[60vh] w-auto rounded-xl border border-line"
          />
        ) : (
          <div className="mx-auto h-[60vh] aspect-[9/16] rounded-xl border border-line bg-surface flex items-center justify-center text-sm text-muted">
            {t("proto.story.loading")}
          </div>
        )}

        <div className="flex gap-2">
          <a
            href={image?.url}
            download={FILE_NAME}
            aria-disabled={!image}
            className="flex-1 flex items-center justify-center gap-2 min-h-11 rounded-lg border border-line text-sm font-medium text-black hover:bg-surface"
          >
            <Download size={16} aria-hidden />
            {t("proto.story.download")}
          </a>
          {canShare && (
            <button
              type="button"
              onClick={share}
              className="flex-1 flex items-center justify-center gap-2 min-h-11 rounded-lg bg-ink text-paper text-sm font-medium hover:bg-intensity-3"
            >
              <Share size={16} aria-hidden />
              {t("proto.story.share")}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
