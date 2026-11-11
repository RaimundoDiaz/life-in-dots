import type { Metadata } from "next";
import { HabitPrototype } from "@/components/prototype/HabitPrototype";

// Design prototype for discussion; kept out of search results.
export const metadata: Metadata = {
  title: "Prototype",
  robots: { index: false, follow: false },
};

export default function PrototypePage() {
  return <HabitPrototype />;
}
