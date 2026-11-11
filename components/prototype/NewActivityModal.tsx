"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Modal } from "@/components/Modal";
import { useT } from "@/lib/i18n";
import { PALETTE_IDS, PaletteId } from "@/lib/prototype/palettes";
import { Activity, PICKABLE_SOURCES, SHAPES, Shape, SourceId, levelLabels } from "@/lib/prototype/habits";
import { ActivityDot } from "./ActivityDot";
import { SWATCH_CLASSES } from "./paletteClasses";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (activity: Activity) => void;
};

// Five sample weeks for the live preview.
const PREVIEW = [0, 2, 3, 0, 1, 4, 0, 2, 0, 3, 4, 0, 1, 0, 3, 2, 0, 4, 1, 0, 2, 0, 3, 4, 2, 0, 0, 1, 4, 0, 2, 3, 1, 0, 2];

const OPTION = "rounded-xl border text-black transition-colors";
const OPTION_ON = "border-ink bg-surface";
const OPTION_OFF = "border-line hover:bg-surface";

export function NewActivityModal({ open, onClose, onCreate }: Props) {
  const t = useT();
  const [name, setName] = useState("");
  const [palette, setPalette] = useState<PaletteId>("teal");
  const [shape, setShape] = useState<Shape>("circle");
  const [source, setSource] = useState<SourceId>("manual");
  const manual = source === "manual";
  const trimmed = name.trim();

  function create() {
    if (!trimmed) return;
    onCreate({ id: `custom-${Date.now()}`, name: trimmed, palette, shape, source });
    setName("");
  }

  return (
    <Modal open={open} onClose={onClose} width={800}>
      <div className="max-h-[85vh] overflow-y-auto p-6 md:p-8 flex flex-col gap-6">
        <header className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-serif text-2xl md:text-[28px] text-black leading-tight">{t("proto.new.title")}</h2>
            <p className="text-sm text-muted">{t("proto.new.subtitle")}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("common.close")}
            className="p-2 -m-2 text-muted hover:text-black"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <label className="flex flex-col gap-2 text-sm font-semibold text-black">
              {t("proto.new.name")}
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("proto.new.namePlaceholder")}
                maxLength={40}
                className="min-h-11 px-3 border border-line-soft rounded-lg text-base font-normal focus:outline-none focus:border-ink"
              />
            </label>

            <fieldset className="flex flex-col">
              <legend className="text-sm font-semibold text-black mb-2">{t("proto.new.color")}</legend>
              <div className="flex flex-wrap gap-1">
                {PALETTE_IDS.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPalette(id)}
                    aria-pressed={palette === id}
                    aria-label={t(`proto.palette.${id}`)}
                    className={`w-11 h-11 rounded-full border-2 flex items-center justify-center ${
                      palette === id ? "border-ink" : "border-transparent hover:border-line"
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-full ${SWATCH_CLASSES[id]}`} />
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="flex flex-col">
              <legend className="text-sm font-semibold text-black mb-2">{t("proto.new.shape")}</legend>
              <div className="grid grid-cols-4 gap-2">
                {SHAPES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setShape(s)}
                    aria-pressed={shape === s}
                    className={`min-h-20 flex flex-col items-center justify-center gap-2 text-xs font-medium ${OPTION} ${
                      shape === s ? OPTION_ON : OPTION_OFF
                    }`}
                  >
                    <ActivityDot palette={palette} shape={s} level={3} size="lg" />
                    {t(`proto.shape.${s}`)}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="flex flex-col">
              <legend className="text-sm font-semibold text-black mb-2">{t("proto.new.source")}</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PICKABLE_SOURCES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSource(s)}
                    aria-pressed={source === s}
                    className={`min-h-16 flex items-start gap-2.5 p-3 text-left ${OPTION} ${source === s ? OPTION_ON : OPTION_OFF}`}
                  >
                    <span
                      className={`mt-0.5 w-4 h-4 shrink-0 rounded-full ${
                        source === s ? "border-4 border-ink" : "border border-line-strong"
                      }`}
                    />
                    <span className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium">{t(`proto.source.${s}`)}</span>
                      <span className="text-xs text-muted">{t(`proto.sourceDesc.${s}`)}</span>
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <aside className="md:w-72 shrink-0 rounded-2xl bg-surface p-5 flex flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">{t("proto.new.preview")}</span>
            <span className="self-start flex items-center gap-2 min-h-10 px-4 rounded-full border border-line bg-paper text-sm font-medium text-black">
              <ActivityDot palette={palette} shape={shape} level={4} size="xs" />
              {trimmed || t("proto.new.namePreview")}
            </span>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-muted">{t("proto.new.lastWeeks")}</span>
              <div className="grid grid-cols-7 gap-2.5 justify-items-center">
                {PREVIEW.map((level, i) => (
                  <ActivityDot key={i} palette={palette} shape={shape} level={manual && level > 0 ? 4 : level} size="lg" />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-4 border-t border-line">
              <span className="text-xs text-muted">{t("proto.new.levels")}</span>
              <div className="flex justify-around gap-2">
                {levelLabels(source, t).map((label, i) => (
                  <div key={label} className="flex flex-col items-center gap-1.5">
                    <ActivityDot palette={palette} shape={shape} level={manual ? 4 : i + 1} size="md" />
                    <span className="text-[11px] text-black">{label}</span>
                  </div>
                ))}
              </div>
              <span className="text-xs text-muted text-center">{t(`proto.unit.${source}`)}</span>
            </div>
          </aside>
        </div>

        <footer className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 border-t border-line">
          <span className="text-xs text-muted">{t("proto.new.hint")}</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 px-4 rounded-lg border border-line text-sm font-medium text-black hover:bg-surface"
            >
              {t("common.cancel")}
            </button>
            <button
              type="button"
              onClick={create}
              disabled={!trimmed}
              className="min-h-11 px-4 rounded-lg bg-ink text-paper text-sm font-medium hover:bg-intensity-3 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t("proto.new.create")}
            </button>
          </div>
        </footer>
      </div>
    </Modal>
  );
}
