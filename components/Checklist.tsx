"use client";

import { Check } from "lucide-react";

type Props = {
  checked: boolean;
  onChange: () => void;
  size?: number;
};

export function Checklist({ checked, onChange, size = 16 }: Props) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`shrink-0 rounded border flex items-center justify-center transition-colors active:scale-90 transition-transform ${
        checked
          ? "bg-black border-black text-white"
          : "bg-white border-black text-transparent"
      }`}
      style={{ width: size, height: size, borderRadius: 4 }}
      aria-pressed={checked}
    >
      {checked && (
        <Check
          size={size - 4}
          strokeWidth={3}
          className="animate-check-pop"
        />
      )}
    </button>
  );
}
