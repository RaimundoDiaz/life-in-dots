import type { Locale } from "./i18n";

export const YEAR = 2026;

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function daysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365;
}

export function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function dateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function parseDateKey(key: string): { year: number; month: number; day: number } {
  const [y, m, d] = key.split("-").map(Number);
  return { year: y, month: m - 1, day: d };
}

function intlLocale(locale: Locale): string {
  return locale === "es" ? "es-ES" : "en-US";
}

export function getMonthName(monthIdx: number, locale: Locale): string {
  const sample = new Date(2026, monthIdx, 1);
  return new Intl.DateTimeFormat(intlLocale(locale), { month: "long" }).format(sample);
}

export function formatLongDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

export function formatShortMonthDay(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
