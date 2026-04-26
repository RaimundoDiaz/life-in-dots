"use client";

import { useState } from "react";
import { Modal } from "./Modal";
import { createClient } from "@/lib/supabase/client";
import { useT } from "@/lib/i18n";
import { YEAR } from "@/lib/dates";

type Props = {
  open: boolean;
  mode: "login" | "signup";
  onClose?: () => void;
  onSwitch: (next: "login" | "signup") => void;
};

export function AuthModal({ open, mode, onClose, onSwitch }: Props) {
  const t = useT();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const termsText = t("auth.terms");
  const termsParts = termsText.split(/\[([^\]]+)\]/g);

  async function handleGoogle() {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // On success the browser is being redirected to Google; nothing else to do.
  }

  return (
    <Modal open={open} onClose={onClose} width={360} closeOnBackdrop={!!onClose}>
      <div className="p-8 flex flex-col gap-5 items-center text-center">
        <DotIcon />
        <div className="flex flex-col gap-1">
          <h2 className="font-serif text-2xl text-black">
            {t("header.title", { year: YEAR })}
          </h2>
          <p className="text-sm text-muted">
            {mode === "signup" ? t("auth.subtitleSignup") : t("auth.subtitleLogin")}
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className={`w-full rounded-lg py-2.5 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            mode === "signup"
              ? "bg-black text-white hover:bg-gray-800"
              : "border border-line bg-white text-black hover:bg-surface"
          }`}
        >
          <GoogleG color={mode === "signup" ? "white" : undefined} />
          {loading
            ? t("auth.redirecting")
            : mode === "signup"
            ? t("auth.googleSignup")
            : t("auth.googleLogin")}
        </button>

        {error && <p className="text-[11px] text-red-600">{error}</p>}

        {mode === "signup" && (
          <p className="text-[11px] text-muted">
            {termsParts.map((part, i) =>
              i % 2 === 1 ? (
                <span key={i} className="underline">
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
        )}

        <p className="text-sm text-black">
          {mode === "signup" ? `${t("auth.haveAccount")} ` : `${t("auth.noAccount")} `}
          <button
            type="button"
            onClick={() => onSwitch(mode === "signup" ? "login" : "signup")}
            className="underline font-medium"
          >
            {mode === "signup" ? t("auth.signIn") : t("auth.signUp")}
          </button>
        </p>
      </div>
    </Modal>
  );
}

function DotIcon() {
  return (
    <div className="w-9 h-9 flex items-center justify-center">
      <span className="block w-3 h-3 rounded-full bg-black" />
    </div>
  );
}

function GoogleG({ color }: { color?: string }) {
  if (color === "white") {
    return (
      <svg width="16" height="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#fff"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#fff" opacity="0.9"/>
        <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#fff" opacity="0.8"/>
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#fff" opacity="0.7"/>
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}
