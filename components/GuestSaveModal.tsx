"use client";

import { Save } from "lucide-react";
import { Modal } from "./Modal";

type Props = {
  open: boolean;
  goalsCount: number;
  onSignUp: () => void;
  onContinue: () => void;
};

export function GuestSaveModal({ open, goalsCount, onSignUp, onContinue }: Props) {
  return (
    <Modal open={open} onClose={onContinue} width={400}>
      <div className="p-8 flex flex-col gap-5 items-center text-center">
        <Save size={28} className="text-black" />
        <div className="flex flex-col gap-1">
          <h3 className="font-serif text-2xl text-black">Guarda tu progreso</h3>
          <p className="text-sm text-muted">
            Has agregado {goalsCount} {goalsCount === 1 ? "meta" : "metas"} para hoy. Crea una cuenta para guardar todo tu progreso.
          </p>
        </div>
        <button
          type="button"
          onClick={onSignUp}
          className="w-full bg-black text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800"
        >
          Crear cuenta con Google
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="w-full border border-line bg-white rounded-lg py-2.5 text-sm font-medium text-black hover:bg-surface"
        >
          Seguir sin guardar
        </button>
      </div>
    </Modal>
  );
}
