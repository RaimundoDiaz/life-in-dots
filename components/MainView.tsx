"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { dateKey, daysInYear, dayOfYear, YEAR } from "@/lib/dates";
import { ProfileAvatar } from "./ProfileAvatar";
import { MonthProgress } from "./MonthProgress";
import { YearProgress } from "./YearProgress";
import { Legend } from "./Legend";
import { GoalsPanel } from "./GoalsPanel";
import { QuoteSection } from "./QuoteSection";
import { ProfileMenu } from "./ProfileMenu";
import { MyProfileModal } from "./MyProfileModal";
import { PeopleInspireModal } from "./PeopleInspireModal";
import { OnboardingModal } from "./OnboardingModal";
import { AuthModal } from "./AuthModal";
import { GuestSaveModal } from "./GuestSaveModal";

type Tab = "month" | "year";

export function MainView() {
  const hydrated = useAppStore((s) => s.hydrated);
  const authMode = useAppStore((s) => s.authMode);
  const onboardingDone = useAppStore((s) => s.onboardingDone);
  const userName = useAppStore((s) => s.userName);
  const days = useAppStore((s) => s.days);
  const signOut = useAppStore((s) => s.signOut);
  const todayKey = useAppStore((s) => s.getTodayKey());

  const [tab, setTab] = useState<Tab>("month");
  const [selectedKey, setSelectedKey] = useState<string>(todayKey);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [inspireModal, setInspireModal] = useState(false);
  const [authModal, setAuthModal] = useState<null | "login" | "signup">(null);
  const [guestSaveOpen, setGuestSaveOpen] = useState(false);
  const [mobileGoalsOpen, setMobileGoalsOpen] = useState(false);

  const today = new Date();
  const completedDayCount = (() => {
    let c = 0;
    for (const k of Object.keys(days)) {
      const d = days[k];
      if (d.goals.length > 0 && d.goals.every((g) => g.done)) c++;
    }
    return c;
  })();
  const totalDays = daysInYear(YEAR);
  const yearProgress = Math.round((dayOfYear(today) / totalDays) * 100);

  const isGuest = authMode === "guest";
  const todayGoalsCount = (days[todayKey]?.goals.length ?? 0);

  useEffect(() => {
    if (!isGuest) return;
    if (todayGoalsCount >= 3) {
      const dismissed = sessionStorage.getItem("guest-save-dismissed");
      if (!dismissed) setGuestSaveOpen(true);
    }
  }, [isGuest, todayGoalsCount]);

  function handleSelectDay(key: string) {
    setSelectedKey(key);
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches
    ) {
      setMobileGoalsOpen(true);
    }
  }

  if (!hydrated) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className="min-h-screen bg-white relative">
      <div className="flex flex-col md:flex-row md:h-screen">
        <main className="flex-1 md:overflow-y-auto px-5 pt-8 pb-12 md:pl-[60px] md:pr-[40px] md:py-[60px]">
          <div className="flex flex-col gap-10 md:gap-[60px] max-w-[820px]">
            <header className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <h1 className="font-serif text-2xl md:text-[36px] text-black leading-tight">
                  Tu {YEAR} en puntos
                </h1>
                {isGuest ? (
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={() => setAuthModal("login")}
                      className="flex items-center gap-1.5 border border-line rounded-lg px-2.5 py-2 text-xs md:text-sm font-medium text-black hover:bg-surface"
                    >
                      <GoogleG />
                      <span className="hidden sm:inline">Iniciar sesión</span>
                    </button>
                    <button
                      onClick={() => setAuthModal("signup")}
                      className="bg-black text-white rounded-lg px-2.5 md:px-3 py-2 text-xs md:text-sm font-medium hover:bg-gray-800 whitespace-nowrap"
                    >
                      Crear cuenta
                    </button>
                  </div>
                ) : (
                  <div className="relative ml-auto">
                    <ProfileAvatar
                      name={userName}
                      onClick={() => setMenuOpen((o) => !o)}
                    />
                    <ProfileMenu
                      open={menuOpen}
                      onClose={() => setMenuOpen(false)}
                      onProfile={() => {
                        setMenuOpen(false);
                        setProfileModal(true);
                      }}
                      onInspire={() => {
                        setMenuOpen(false);
                        setInspireModal(true);
                      }}
                      onSignOut={() => {
                        setMenuOpen(false);
                        signOut();
                      }}
                    />
                  </div>
                )}
              </div>
              <p className="text-sm md:text-base text-black">
                {completedDayCount} de {totalDays} días completados · {yearProgress}% del año
              </p>
            </header>

            <section className="flex flex-col gap-6">
              <div className="flex gap-3 border-b border-line-soft">
                <Tab
                  active={tab === "month"}
                  onClick={() => setTab("month")}
                  label="Tu progreso"
                />
                <Tab
                  active={tab === "year"}
                  onClick={() => setTab("year")}
                  label="Año completo"
                />
              </div>

              {tab === "month" ? (
                <MonthProgress selectedKey={selectedKey} onSelect={handleSelectDay} />
              ) : (
                <YearProgress selectedKey={selectedKey} onSelect={handleSelectDay} />
              )}

              <Legend />
            </section>

            <QuoteSection onPickInspirations={() => setInspireModal(true)} />

            {isGuest && (
              <div className="bg-warning border border-yellow-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-sm text-black">
                  <span className="font-medium">Tus metas y progreso no se guardarán.</span>{" "}
                  Crea una cuenta gratis para empezar.
                </p>
                <button
                  onClick={() => setAuthModal("signup")}
                  className="bg-black text-white rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-800 shrink-0 self-start sm:self-auto"
                >
                  Crear cuenta
                </button>
              </div>
            )}
          </div>
        </main>

        <aside className="hidden md:block w-[400px] shrink-0 border-l border-line-strong/40 bg-white pl-8 pr-10 py-[60px] overflow-y-auto">
          <GoalsPanel selectedKey={selectedKey} />
        </aside>
      </div>

      <div
        className={`md:hidden fixed inset-0 z-40 ${
          mobileGoalsOpen ? "" : "pointer-events-none"
        }`}
        aria-hidden={!mobileGoalsOpen}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
            mobileGoalsOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileGoalsOpen(false)}
        />
        <div
          className={`absolute inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto px-6 pt-8 pb-10 transition-transform duration-300 ease-out ${
            mobileGoalsOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button
            type="button"
            onClick={() => setMobileGoalsOpen(false)}
            className="absolute top-3 right-3 text-muted hover:text-black p-1"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
          <GoalsPanel selectedKey={selectedKey} />
        </div>
      </div>

      <MyProfileModal
        open={profileModal}
        onClose={() => setProfileModal(false)}
        onSignOut={() => {
          setProfileModal(false);
          signOut();
        }}
      />
      <PeopleInspireModal
        open={inspireModal}
        onClose={() => setInspireModal(false)}
      />
      {authMode === "google" && !onboardingDone && (
        <OnboardingModal open />
      )}
      {authModal && (
        <AuthModal
          open
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSwitch={(next) => setAuthModal(next)}
        />
      )}
      <GuestSaveModal
        open={guestSaveOpen}
        goalsCount={todayGoalsCount}
        onSignUp={() => {
          setGuestSaveOpen(false);
          sessionStorage.setItem("guest-save-dismissed", "1");
          setAuthModal("signup");
        }}
        onContinue={() => {
          setGuestSaveOpen(false);
          sessionStorage.setItem("guest-save-dismissed", "1");
        }}
      />
    </div>
  );
}

function Tab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pb-1.5 px-1.5 text-[13px] font-medium transition-colors relative ${
        active ? "text-black" : "text-muted hover:text-black"
      }`}
    >
      {label}
      {active && (
        <span className="absolute -bottom-px left-0 right-0 h-[1.5px] bg-black" />
      )}
    </button>
  );
}

function GoogleG() {
  return (
    <svg width="14" height="14" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}
