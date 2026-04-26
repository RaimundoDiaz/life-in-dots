"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { getRandomQuote, getPersonById } from "@/lib/people";

type Props = {
  onPickInspirations: () => void;
};

export function QuoteSection({ onPickInspirations }: Props) {
  const selectedPeople = useAppStore((s) => s.selectedPeople);
  const hydrated = useAppStore((s) => s.hydrated);
  const [quote, setQuote] = useState<{ text: string; person: string } | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    const today = new Date().toDateString();
    const seed = today + selectedPeople.join("|");
    const ids = selectedPeople.length > 0 ? selectedPeople : ["michael-jordan"];
    const persons = ids.map((id) => getPersonById(id)).filter((p): p is NonNullable<typeof p> => !!p);
    if (persons.length === 0) {
      setQuote(null);
      return;
    }
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    const person = persons[hash % persons.length];
    const q = person.quotes[hash % person.quotes.length];
    setQuote({ text: q.text, person: person.name });
  }, [selectedPeople, hydrated]);

  if (!quote) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="font-serif italic text-xl text-black">&ldquo;{quote.text}&rdquo;</p>
        <p className="font-serif text-sm text-black">— {quote.person}</p>
      </div>
      <button
        type="button"
        onClick={onPickInspirations}
        className="text-xs text-black hover:underline self-start"
      >
        Elige de quien te gustaría recibir motivación →
      </button>
    </div>
  );
}
