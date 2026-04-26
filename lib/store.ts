"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { dateKey } from "./dates";
import type { Locale } from "./i18n";
import {
  insertGoal,
  updateGoalDone,
  deleteGoal,
  upsertProfile,
} from "./sync";

export type Goal = {
  id: string;
  text: string;
  done: boolean;
};

export type DayData = {
  goals: Goal[];
};

export type AuthMode = "guest" | "google";

export type Screen =
  | "login"
  | "signup"
  | "welcome"
  | "guest"
  | "main";

export type ServerSnapshot = {
  days: Record<string, DayData>;
  selectedPeople: string[];
  inspirationsOnboarded: boolean;
  onboardingDone: boolean;
  locale: Locale | null;
};

type AppState = {
  hydrated: boolean;
  setHydrated: (v: boolean) => void;

  authMode: AuthMode | null;
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  memberSince: string | null;

  onboardingDone: boolean;
  onboardingStep: number;

  selectedPeople: string[];
  inspirationsOnboarded: boolean;

  locale: Locale | null;

  days: Record<string, DayData>;

  setGoogleSession: (
    userId: string,
    name: string,
    email: string | null,
    memberSince: string
  ) => void;
  applyServerSnapshot: (snapshot: ServerSnapshot) => void;
  continueAsGuest: () => void;
  signOut: () => void;

  setOnboardingStep: (step: number) => void;
  finishOnboarding: () => void;
  resetOnboarding: () => void;

  setSelectedPeople: (ids: string[]) => void;
  setLocale: (locale: Locale) => void;

  addGoal: (key: string, text: string) => void;
  toggleGoal: (key: string, goalId: string) => void;
  removeGoal: (key: string, goalId: string) => void;

  getCompletedDayCount: () => number;
  getTodayKey: () => string;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),

      authMode: null,
      userId: null,
      userName: null,
      userEmail: null,
      memberSince: null,

      onboardingDone: false,
      onboardingStep: 0,

      selectedPeople: ["michael-jordan"],
      inspirationsOnboarded: false,

      locale: null,

      days: {},

      setGoogleSession: (userId, name, email, memberSince) =>
        set((state) => ({
          authMode: "google",
          userId,
          userName: name,
          userEmail: email,
          memberSince: state.memberSince ?? memberSince,
        })),

      applyServerSnapshot: (snapshot) =>
        set((state) => ({
          days: snapshot.days,
          selectedPeople: snapshot.selectedPeople,
          inspirationsOnboarded: snapshot.inspirationsOnboarded,
          onboardingDone: snapshot.onboardingDone,
          locale: snapshot.locale ?? state.locale,
        })),

      continueAsGuest: () =>
        set({
          authMode: "guest",
          userId: null,
          userName: "Invitado",
          userEmail: null,
          memberSince: new Date().toISOString(),
          onboardingDone: true,
          onboardingStep: 0,
          selectedPeople: ["michael-jordan"],
          inspirationsOnboarded: false,
          days: {},
        }),

      signOut: () => {
        // Optimistically transition to guest UI; supabase signOut runs async.
        get().continueAsGuest();
        if (typeof window !== "undefined") {
          import("./supabase/client")
            .then(({ createClient }) => createClient().auth.signOut())
            .catch(() => {});
        }
      },

      setOnboardingStep: (step) => set({ onboardingStep: step }),
      finishOnboarding: () => {
        set({ onboardingDone: true, onboardingStep: 0 });
        const { authMode, userId } = get();
        if (authMode === "google" && userId) {
          upsertProfile(userId, { onboarding_done: true });
        }
      },
      resetOnboarding: () => set({ onboardingDone: false, onboardingStep: 0 }),

      setSelectedPeople: (ids) => {
        set({ selectedPeople: ids, inspirationsOnboarded: true });
        const { authMode, userId } = get();
        if (authMode === "google" && userId) {
          upsertProfile(userId, {
            selected_people: ids,
            inspirations_onboarded: true,
          });
        }
      },

      setLocale: (locale) => {
        set({ locale });
        const { authMode, userId } = get();
        if (authMode === "google" && userId) {
          upsertProfile(userId, { locale });
        }
      },

      addGoal: (key, text) => {
        const state = get();
        const day = state.days[key] ?? { goals: [] };
        const id =
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `g_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        const newGoal: Goal = { id, text, done: false };
        const position = day.goals.length;
        set({
          days: {
            ...state.days,
            [key]: { ...day, goals: [...day.goals, newGoal] },
          },
        });
        if (state.authMode === "google" && state.userId) {
          insertGoal({
            id,
            userId: state.userId,
            day: key,
            text,
            position,
          });
        }
      },

      toggleGoal: (key, goalId) => {
        const state = get();
        const day = state.days[key];
        if (!day) return;
        const target = day.goals.find((g) => g.id === goalId);
        if (!target) return;
        const nextDone = !target.done;
        set({
          days: {
            ...state.days,
            [key]: {
              ...day,
              goals: day.goals.map((g) =>
                g.id === goalId ? { ...g, done: nextDone } : g
              ),
            },
          },
        });
        if (state.authMode === "google" && state.userId) {
          updateGoalDone(goalId, nextDone);
        }
      },

      removeGoal: (key, goalId) => {
        const state = get();
        const day = state.days[key];
        if (!day) return;
        const newGoals = day.goals.filter((g) => g.id !== goalId);
        const newDays = { ...state.days };
        if (newGoals.length === 0) {
          delete newDays[key];
        } else {
          newDays[key] = { ...day, goals: newGoals };
        }
        set({ days: newDays });
        if (state.authMode === "google" && state.userId) {
          deleteGoal(goalId);
        }
      },

      getCompletedDayCount: () => {
        const days = get().days;
        let count = 0;
        for (const k of Object.keys(days)) {
          const d = days[k];
          if (d.goals.length > 0 && d.goals.every((g) => g.done)) count++;
        }
        return count;
      },

      getTodayKey: () => {
        const now = new Date();
        return dateKey(now.getFullYear(), now.getMonth(), now.getDate());
      },
    }),
    {
      name: "life-in-dots-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
