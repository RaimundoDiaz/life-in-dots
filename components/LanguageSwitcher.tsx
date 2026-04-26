"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { LOCALES, type Locale, useLocale, useT } from "@/lib/i18n";

export function LanguageSwitcher() {
  const locale = useLocale();
  const setLocale = useAppStore((s) => s.setLocale);
  const t = useT();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const labelKey: Record<Locale, string> = {
    es: "lang.spanish",
    en: "lang.english",
    pt: "lang.portuguese",
    fr: "lang.french",
    it: "lang.italian",
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t("lang.switch")}
        className="flex items-center gap-1.5 border border-line rounded-lg px-2.5 py-2 text-xs md:text-sm font-medium text-black hover:bg-surface"
      >
        <Globe size={14} />
        <span className="uppercase">{locale}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-11 z-40 w-40 bg-white border border-line rounded-xl shadow-xl py-1">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-black hover:bg-surface transition-colors"
            >
              <span>{t(labelKey[l])}</span>
              {locale === l && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
