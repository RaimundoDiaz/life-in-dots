"use client";

import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onProfile: () => void;
  onInspire: () => void;
  onSignOut: () => void;
  showSignOut?: boolean;
};

export function ProfileMenu({ open, onClose, onProfile, onInspire, onSignOut, showSignOut = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-12 z-40 w-56 bg-white border border-line rounded-xl shadow-xl py-2"
    >
      <button
        type="button"
        onClick={onProfile}
        className="w-full text-left px-4 py-2 text-sm text-black hover:bg-surface transition-colors"
      >
        Mi perfil
      </button>
      <button
        type="button"
        onClick={onInspire}
        className="w-full text-left px-4 py-2 text-sm text-black hover:bg-surface transition-colors"
      >
        Personas que me inspiran
      </button>
      {showSignOut && (
        <>
          <div className="my-1 border-t border-line" />
          <button
            type="button"
            onClick={onSignOut}
            className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-surface transition-colors"
          >
            Cerrar sesión
          </button>
        </>
      )}
    </div>
  );
}
