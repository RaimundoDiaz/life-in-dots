"use client";

import { createClient } from "./supabase/client";
import type { DayData } from "./store";

export type RemoteProfile = {
  id: string;
  display_name: string | null;
  member_since: string;
  onboarding_done: boolean;
  inspirations_onboarded: boolean;
  selected_people: string[];
};

export type ProfilePatch = Partial<
  Pick<
    RemoteProfile,
    "display_name" | "onboarding_done" | "inspirations_onboarded" | "selected_people"
  >
>;

const sb = () => createClient();

export async function loadProfile(userId: string): Promise<RemoteProfile> {
  const { data, error } = await sb()
    .from("profiles")
    .select("id, display_name, member_since, onboarding_done, inspirations_onboarded, selected_people")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data as RemoteProfile;
}

export async function loadGoals(userId: string): Promise<Record<string, DayData>> {
  const { data, error } = await sb()
    .from("goals")
    .select("id, day, text, done, position")
    .eq("user_id", userId)
    .order("day", { ascending: true })
    .order("position", { ascending: true });
  if (error) throw error;
  const days: Record<string, DayData> = {};
  for (const g of data ?? []) {
    if (!days[g.day]) days[g.day] = { goals: [] };
    days[g.day].goals.push({ id: g.id, text: g.text, done: g.done });
  }
  return days;
}

export async function upsertProfile(userId: string, patch: ProfilePatch) {
  const { error } = await sb().from("profiles").update(patch).eq("id", userId);
  if (error) console.error("upsertProfile failed", error);
}

export async function insertGoal(args: {
  id: string;
  userId: string;
  day: string;
  text: string;
  position: number;
}) {
  const { error } = await sb().from("goals").insert({
    id: args.id,
    user_id: args.userId,
    day: args.day,
    text: args.text,
    position: args.position,
    done: false,
  });
  if (error) console.error("insertGoal failed", error);
}

export async function updateGoalDone(id: string, done: boolean) {
  const { error } = await sb().from("goals").update({ done }).eq("id", id);
  if (error) console.error("updateGoalDone failed", error);
}

export async function deleteGoal(id: string) {
  const { error } = await sb().from("goals").delete().eq("id", id);
  if (error) console.error("deleteGoal failed", error);
}

export async function bulkInsertGoals(
  userId: string,
  days: Record<string, DayData>
) {
  const rows: Array<{
    id: string;
    user_id: string;
    day: string;
    text: string;
    done: boolean;
    position: number;
  }> = [];
  for (const [day, data] of Object.entries(days)) {
    data.goals.forEach((g, idx) => {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(g.id);
      rows.push({
        id: isUuid ? g.id : crypto.randomUUID(),
        user_id: userId,
        day,
        text: g.text,
        done: g.done,
        position: idx,
      });
    });
  }
  if (rows.length === 0) return;
  const { error } = await sb().from("goals").insert(rows);
  if (error) console.error("bulkInsertGoals failed", error);
}
