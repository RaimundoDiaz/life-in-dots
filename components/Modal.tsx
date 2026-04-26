"use client";

import { ReactNode, useEffect } from "react";

type Props = {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  width?: number;
  closeOnBackdrop?: boolean;
};

export function Modal({ open, onClose, children, width = 360, closeOnBackdrop = true }: Props) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && onClose) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6"
      onClick={() => closeOnBackdrop && onClose?.()}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl"
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
