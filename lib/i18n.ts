"use client";

import { useAppStore } from "./store";

export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

const dictionaries: Record<Locale, Record<string, string>> = {
  es: {
    "common.cancel": "Cancelar",
    "common.add": "Agregar",
    "common.save": "Guardar",
    "common.next": "Siguiente",
    "common.back": "Atrás",
    "common.start": "Comenzar",
    "common.close": "Cerrar",

    "lang.spanish": "Español",
    "lang.english": "English",
    "lang.switch": "Idioma",

    "header.title": "Tu {year} en puntos",
    "header.subtitle": "{completed} de {total} días completados · {percent}% del año",
    "header.signIn": "Iniciar sesión",
    "header.signUp": "Crear cuenta",

    "tabs.month": "Tu progreso",
    "tabs.year": "Año completo",

    "legend.completed": "Día cumplido",
    "legend.partial": "Parcialmente cumplido",
    "legend.missed": "No cumplido",
    "legend.today": "Hoy",
    "legend.future": "Futuro",

    "goals.todayPrefix": "Hoy",
    "goals.dayOfYear": "Día {n} de {total}",
    "goals.heading": "Metas del día",
    "goals.placeholderToday": "Agrega una meta para hoy",
    "goals.placeholderPast": "Agrega una meta para este día",
    "goals.deleteAria": "Eliminar meta",

    "guestBanner.message": "Tus metas y progreso no se guardarán.",
    "guestBanner.suffix": "Crea una cuenta gratis para empezar.",
    "guestBanner.cta": "Crear cuenta",

    "auth.subtitleSignup":
      "Transforma tus días en logros. Define tus metas diarias y visualiza tu progreso en un año.",
    "auth.subtitleLogin": "Transforma tus días en logros",
    "auth.googleSignup": "Crear cuenta con Google",
    "auth.googleLogin": "Inicia sesión con Google",
    "auth.redirecting": "Redirigiendo a Google...",
    "auth.terms":
      "Al continuar, aceptas nuestros [Términos de uso] y [Política de privacidad]",
    "auth.haveAccount": "¿Ya tienes cuenta?",
    "auth.noAccount": "¿No tienes cuenta?",
    "auth.signIn": "Inicia sesión",
    "auth.signUp": "Regístrate",

    "guestSave.title": "Guarda tu progreso",
    "guestSave.body":
      "Has agregado {n} {goalLabel} para hoy. Crea una cuenta para guardar todo tu progreso.",
    "guestSave.goal_one": "meta",
    "guestSave.goal_other": "metas",
    "guestSave.signupCta": "Crear cuenta con Google",
    "guestSave.continueCta": "Seguir sin guardar",

    "onboarding.welcome.title": "¡Bienvenido/a{name}!",
    "onboarding.welcome.body":
      "Vamos a hacer un recorrido rápido para que conozcas cómo usar tu calendario de {year}.",
    "onboarding.welcome.skip": "Saltar tutorial",
    "onboarding.calendar.title": "Este es tu calendario anual",
    "onboarding.calendar.body":
      "Cada punto representa un día de {year}. Al final del año, verás todos tus logros en un solo vistazo.",
    "onboarding.goals.title": "Aquí defines tus metas diarias",
    "onboarding.goals.body":
      "Agrega las metas para cada día y márcalas cuando las completes.",
    "onboarding.goals.example": "Ejemplo: “Hacer ejercicio 30 minutos”",
    "onboarding.dayStates.title": "Entiende tus días",
    "onboarding.states.completed": "Día cumplido",
    "onboarding.states.completedSub": "Completaste todas tus metas",
    "onboarding.states.partial": "Día parcialmente cumplido",
    "onboarding.states.partialSub": "Completaste algunas metas",
    "onboarding.states.missed": "Día perdido",
    "onboarding.states.missedSub": "No cumpliste ninguna meta",
    "onboarding.states.today": "Hoy",
    "onboarding.states.todaySub": "¡Aún puedes lograrlo!",
    "onboarding.profile.title": "Tu perfil",
    "onboarding.profile.body":
      "Aquí puedes editar tu información y elegir personas que te inspiran para recibir frases motivacionales.",
    "onboarding.profile.cta": "¡Comenzar!",

    "inspire.title": "Personas que me inspiran",
    "inspire.subtitle":
      "Selecciona de quiénes te gustaría recibir frases motivacionales",
    "inspire.selectedCount": "{n} seleccionados",
    "inspire.ofTotal": "de {total}",
    "inspire.save": "Guardar selección",

    "categories.all": "Todos",
    "categories.entrepreneurs": "Emprendedores",
    "categories.leaders": "Líderes",
    "categories.writers": "Escritores",
    "categories.athletes": "Deportistas",
    "categories.visionaries": "Visionarios",
    "categories.communicators": "Comunicadores",
    "categories.musicProducers": "Productores musicales",
    "categories.designers": "Diseñadores",
    "categories.artists": "Artistas",
    "categories.investors": "Inversionistas",

    "profile.title": "Mi perfil",
    "profile.guest": "Invitado",
    "profile.connectedAccount": "Cuenta conectada",
    "profile.memberSince": "Miembro desde",
    "profile.signOut": "Cerrar sesión",

    "menu.profile": "Mi perfil",
    "menu.inspire": "Personas que me inspiran",
    "menu.signOut": "Cerrar sesión",

    "quote.pickInspirations":
      "Elige de quien te gustaría recibir motivación →",
  },

  en: {
    "common.cancel": "Cancel",
    "common.add": "Add",
    "common.save": "Save",
    "common.next": "Next",
    "common.back": "Back",
    "common.start": "Start",
    "common.close": "Close",

    "lang.spanish": "Español",
    "lang.english": "English",
    "lang.switch": "Language",

    "header.title": "Your {year} in dots",
    "header.subtitle": "{completed} of {total} days completed · {percent}% of the year",
    "header.signIn": "Sign in",
    "header.signUp": "Sign up",

    "tabs.month": "Your progress",
    "tabs.year": "Full year",

    "legend.completed": "Day completed",
    "legend.partial": "Partially completed",
    "legend.missed": "Not completed",
    "legend.today": "Today",
    "legend.future": "Future",

    "goals.todayPrefix": "Today",
    "goals.dayOfYear": "Day {n} of {total}",
    "goals.heading": "Goals for the day",
    "goals.placeholderToday": "Add a goal for today",
    "goals.placeholderPast": "Add a goal for this day",
    "goals.deleteAria": "Delete goal",

    "guestBanner.message": "Your goals and progress won't be saved.",
    "guestBanner.suffix": "Create a free account to get started.",
    "guestBanner.cta": "Sign up",

    "auth.subtitleSignup":
      "Turn your days into achievements. Set your daily goals and track your progress over a year.",
    "auth.subtitleLogin": "Turn your days into achievements",
    "auth.googleSignup": "Sign up with Google",
    "auth.googleLogin": "Sign in with Google",
    "auth.redirecting": "Redirecting to Google...",
    "auth.terms": "By continuing, you agree to our [Terms of Service] and [Privacy Policy]",
    "auth.haveAccount": "Already have an account?",
    "auth.noAccount": "Don’t have an account?",
    "auth.signIn": "Sign in",
    "auth.signUp": "Sign up",

    "guestSave.title": "Save your progress",
    "guestSave.body":
      "You’ve added {n} {goalLabel} for today. Create an account to save all your progress.",
    "guestSave.goal_one": "goal",
    "guestSave.goal_other": "goals",
    "guestSave.signupCta": "Sign up with Google",
    "guestSave.continueCta": "Continue without saving",

    "onboarding.welcome.title": "Welcome{name}!",
    "onboarding.welcome.body":
      "Let’s take a quick tour so you know how to use your {year} calendar.",
    "onboarding.welcome.skip": "Skip tutorial",
    "onboarding.calendar.title": "This is your year calendar",
    "onboarding.calendar.body":
      "Each dot represents a day of {year}. By year-end, you’ll see all your achievements at a glance.",
    "onboarding.goals.title": "Set your daily goals here",
    "onboarding.goals.body":
      "Add goals for each day and check them off as you complete them.",
    "onboarding.goals.example": "Example: “Exercise for 30 minutes”",
    "onboarding.dayStates.title": "Understand your days",
    "onboarding.states.completed": "Day completed",
    "onboarding.states.completedSub": "You completed all your goals",
    "onboarding.states.partial": "Day partially completed",
    "onboarding.states.partialSub": "You completed some goals",
    "onboarding.states.missed": "Day missed",
    "onboarding.states.missedSub": "You didn’t complete any goals",
    "onboarding.states.today": "Today",
    "onboarding.states.todaySub": "You can still make it!",
    "onboarding.profile.title": "Your profile",
    "onboarding.profile.body":
      "Edit your info and pick people who inspire you to receive motivational quotes.",
    "onboarding.profile.cta": "Get started!",

    "inspire.title": "People who inspire me",
    "inspire.subtitle": "Pick who you’d like to get motivational quotes from",
    "inspire.selectedCount": "{n} selected",
    "inspire.ofTotal": "of {total}",
    "inspire.save": "Save selection",

    "categories.all": "All",
    "categories.entrepreneurs": "Entrepreneurs",
    "categories.leaders": "Leaders",
    "categories.writers": "Writers",
    "categories.athletes": "Athletes",
    "categories.visionaries": "Visionaries",
    "categories.communicators": "Communicators",
    "categories.musicProducers": "Music producers",
    "categories.designers": "Designers",
    "categories.artists": "Artists",
    "categories.investors": "Investors",

    "profile.title": "My profile",
    "profile.guest": "Guest",
    "profile.connectedAccount": "Connected account",
    "profile.memberSince": "Member since",
    "profile.signOut": "Sign out",

    "menu.profile": "My profile",
    "menu.inspire": "People who inspire me",
    "menu.signOut": "Sign out",

    "quote.pickInspirations": "Pick who you’d like to be inspired by →",
  },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const lang = navigator.language?.slice(0, 2).toLowerCase();
  return isLocale(lang) ? lang : DEFAULT_LOCALE;
}

export function translate(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>
): string {
  const template =
    dictionaries[locale]?.[key] ??
    dictionaries[DEFAULT_LOCALE][key] ??
    key;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    k in vars ? String(vars[k]) : `{${k}}`
  );
}

export function useLocale(): Locale {
  return useAppStore((s) => s.locale ?? DEFAULT_LOCALE);
}

export function useT() {
  const locale = useLocale();
  return (key: string, vars?: Record<string, string | number>) =>
    translate(locale, key, vars);
}
