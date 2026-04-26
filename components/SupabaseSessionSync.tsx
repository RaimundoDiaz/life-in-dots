"use client";

import { useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import { useAppStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";
import {
  loadProfile,
  loadGoals,
  bulkInsertGoals,
  upsertProfile,
} from "@/lib/sync";

function deriveName(u: Session["user"]): string {
  const meta = u.user_metadata as Record<string, unknown> | undefined;
  if (typeof meta?.full_name === "string" && meta.full_name) return meta.full_name;
  if (typeof meta?.name === "string" && meta.name) return meta.name;
  if (u.email) return u.email.split("@")[0];
  return "Usuario";
}

export function SupabaseSessionSync() {
  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;
    let lastSyncedUserId: string | null = null;

    async function applyAuthed(session: Session) {
      const u = session.user;
      const prev = useAppStore.getState();

      // Capture local guest-only data before we flip to google.
      const wasGuest = prev.authMode === "guest" || prev.authMode === null;
      const guestDays = wasGuest ? prev.days : null;
      const guestPeople =
        wasGuest && prev.inspirationsOnboarded ? prev.selectedPeople : null;

      // Apply session to UI immediately (so authed chrome shows up).
      const name = deriveName(u);
      const email = u.email ?? null;
      const memberSince = u.created_at ?? new Date().toISOString();
      useAppStore.getState().setGoogleSession(u.id, name, email, memberSince);

      // Avoid re-loading on token refresh for the same user.
      if (lastSyncedUserId === u.id) return;
      lastSyncedUserId = u.id;

      try {
        const [profile, remoteDays] = await Promise.all([
          loadProfile(u.id),
          loadGoals(u.id),
        ]);
        if (cancelled) return;

        const dbHasGoals = Object.keys(remoteDays).length > 0;
        const guestHasGoals = guestDays && Object.keys(guestDays).length > 0;

        if (!dbHasGoals && (guestHasGoals || guestPeople)) {
          // First sign-in for this user — push their guest data up.
          if (guestHasGoals) {
            await bulkInsertGoals(u.id, guestDays!);
          }
          await upsertProfile(u.id, {
            selected_people: guestPeople ?? profile.selected_people,
            inspirations_onboarded: guestPeople != null,
            // Migrated guests have already learned the app.
            onboarding_done: true,
          });
          if (cancelled) return;
          const [freshProfile, freshDays] = await Promise.all([
            loadProfile(u.id),
            loadGoals(u.id),
          ]);
          if (cancelled) return;
          useAppStore.getState().applyServerSnapshot({
            days: freshDays,
            selectedPeople: freshProfile.selected_people,
            inspirationsOnboarded: freshProfile.inspirations_onboarded,
            onboardingDone: freshProfile.onboarding_done,
          });
        } else {
          useAppStore.getState().applyServerSnapshot({
            days: remoteDays,
            selectedPeople: profile.selected_people,
            inspirationsOnboarded: profile.inspirations_onboarded,
            onboardingDone: profile.onboarding_done,
          });
        }
      } catch (e) {
        console.error("Failed to load remote profile/goals", e);
      }
    }

    function applyUnauthed() {
      const state = useAppStore.getState();
      lastSyncedUserId = null;
      if (state.authMode !== "guest") state.continueAsGuest();
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      if (session) applyAuthed(session);
      else applyUnauthed();
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        lastSyncedUserId = null;
        useAppStore.getState().continueAsGuest();
      } else if (
        event === "SIGNED_IN" ||
        event === "TOKEN_REFRESHED" ||
        event === "INITIAL_SESSION" ||
        event === "USER_UPDATED"
      ) {
        if (session) applyAuthed(session);
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return null;
}
