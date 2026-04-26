"use client";

import { Save } from "lucide-react";
import { Modal } from "./Modal";
import { useT } from "@/lib/i18n";

type Props = {
  open: boolean;
  goalsCount: number;
  onSignUp: () => void;
  onContinue: () => void;
};

export function GuestSaveModal({ open, goalsCount, onSignUp, onContinue }: Props) {
  const t = useT();
  const goalLabel = goalsCount === 1 ? t("guestSave.goal_one") : t("guestSave.goal_other");
  return (
    <Modal open={open} onClose={onContinue} width={400}>
      <div className="p-8 flex flex-col gap-5 items-center text-center">
        <Save size={28} className="text-black" />
        <div className="flex flex-col gap-1">
          <h3 className="font-serif text-2xl text-black">{t("guestSave.title")}</h3>
          <p className="text-sm text-muted">
            {t("guestSave.body", { n: goalsCount, goalLabel })}
          </p>
        </div>
        <button
          type="button"
          onClick={onSignUp}
          className="w-full bg-black text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800"
        >
          {t("guestSave.signupCta")}
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="w-full border border-line bg-white rounded-lg py-2.5 text-sm font-medium text-black hover:bg-surface"
        >
          {t("guestSave.continueCta")}
        </button>
      </div>
    </Modal>
  );
}
