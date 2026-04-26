"use client";

import { useAppStore } from "@/lib/store";
import { MainView } from "@/components/MainView";
import { SupabaseSessionSync } from "@/components/SupabaseSessionSync";

export function AppRoot() {
  const hydrated = useAppStore((s) => s.hydrated);

  if (!hydrated) {
    return (
      <>
        <SupabaseSessionSync />
        <div className="min-h-screen bg-white" />
      </>
    );
  }

  return (
    <>
      <SupabaseSessionSync />
      <MainView />
    </>
  );
}
