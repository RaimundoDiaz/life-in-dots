"use client";

import { ReactNode, useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  width?: number;
  closeOnBackdrop?: boolean;
};

const EXIT_DURATION = 180;

export function Modal({ open, onClose, children, width = 360, closeOnBackdrop = true }: Props) {
  const [render, setRender] = useState(open);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setRender(true);
      setClosing(false);
      return;
    }
    if (!render) return;
    setClosing(true);
    const t = setTimeout(() => {
      setRender(false);
      setClosing(false);
    }, EXIT_DURATION);
    return () => clearTimeout(t);
  }, [open, render]);

  useEffect(() => {
    if (!render) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && onClose) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [render, onClose]);

  useEffect(() => {
    if (!render) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [render]);

  if (!render) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6 ${
        closing ? "animate-backdrop-fade-out" : "animate-backdrop-fade-in"
      }`}
      onClick={() => closeOnBackdrop && onClose?.()}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full ${
          closing ? "animate-modal-pop-out" : "animate-modal-pop-in"
        }`}
        style={{ maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
