"use client";

import { useAppStore } from "./store";

export const LOCALES = ["es", "en", "pt", "fr", "it"] as const;
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
    "lang.portuguese": "Português",
    "lang.french": "Français",
    "lang.italian": "Italiano",
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
    "lang.portuguese": "Português",
    "lang.french": "Français",
    "lang.italian": "Italiano",
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

  pt: {
    "common.cancel": "Cancelar",
    "common.add": "Adicionar",
    "common.save": "Guardar",
    "common.next": "Próximo",
    "common.back": "Voltar",
    "common.start": "Começar",
    "common.close": "Fechar",

    "lang.spanish": "Español",
    "lang.english": "English",
    "lang.portuguese": "Português",
    "lang.french": "Français",
    "lang.italian": "Italiano",
    "lang.switch": "Idioma",

    "header.title": "Seu {year} em pontos",
    "header.subtitle": "{completed} de {total} dias concluídos · {percent}% do ano",
    "header.signIn": "Entrar",
    "header.signUp": "Criar conta",

    "tabs.month": "Seu progresso",
    "tabs.year": "Ano completo",

    "legend.completed": "Dia concluído",
    "legend.partial": "Parcialmente concluído",
    "legend.missed": "Não concluído",
    "legend.today": "Hoje",
    "legend.future": "Futuro",

    "goals.todayPrefix": "Hoje",
    "goals.dayOfYear": "Dia {n} de {total}",
    "goals.heading": "Metas do dia",
    "goals.placeholderToday": "Adicione uma meta para hoje",
    "goals.placeholderPast": "Adicione uma meta para este dia",
    "goals.deleteAria": "Excluir meta",

    "guestBanner.message": "Suas metas e progresso não serão guardados.",
    "guestBanner.suffix": "Crie uma conta gratuita para começar.",
    "guestBanner.cta": "Criar conta",

    "auth.subtitleSignup":
      "Transforme seus dias em conquistas. Defina suas metas diárias e acompanhe seu progresso ao longo de um ano.",
    "auth.subtitleLogin": "Transforme seus dias em conquistas",
    "auth.googleSignup": "Criar conta com Google",
    "auth.googleLogin": "Entrar com Google",
    "auth.redirecting": "Redirecionando para o Google...",
    "auth.terms":
      "Ao continuar, você aceita nossos [Termos de uso] e [Política de privacidade]",
    "auth.haveAccount": "Já tem uma conta?",
    "auth.noAccount": "Não tem conta?",
    "auth.signIn": "Entre",
    "auth.signUp": "Cadastre-se",

    "guestSave.title": "Guarde seu progresso",
    "guestSave.body":
      "Você adicionou {n} {goalLabel} para hoje. Crie uma conta para guardar todo o seu progresso.",
    "guestSave.goal_one": "meta",
    "guestSave.goal_other": "metas",
    "guestSave.signupCta": "Criar conta com Google",
    "guestSave.continueCta": "Continuar sem guardar",

    "onboarding.welcome.title": "Bem-vindo(a){name}!",
    "onboarding.welcome.body":
      "Vamos fazer um tour rápido para você conhecer como usar seu calendário de {year}.",
    "onboarding.welcome.skip": "Pular tutorial",
    "onboarding.calendar.title": "Este é o seu calendário anual",
    "onboarding.calendar.body":
      "Cada ponto representa um dia de {year}. No fim do ano, você verá todas as suas conquistas em uma única vista.",
    "onboarding.goals.title": "Aqui você define suas metas diárias",
    "onboarding.goals.body":
      "Adicione metas para cada dia e marque-as quando concluir.",
    "onboarding.goals.example": "Exemplo: “Fazer exercício 30 minutos”",
    "onboarding.dayStates.title": "Entenda seus dias",
    "onboarding.states.completed": "Dia concluído",
    "onboarding.states.completedSub": "Você cumpriu todas as suas metas",
    "onboarding.states.partial": "Dia parcialmente concluído",
    "onboarding.states.partialSub": "Você cumpriu algumas metas",
    "onboarding.states.missed": "Dia perdido",
    "onboarding.states.missedSub": "Você não cumpriu nenhuma meta",
    "onboarding.states.today": "Hoje",
    "onboarding.states.todaySub": "Ainda dá tempo!",
    "onboarding.profile.title": "Seu perfil",
    "onboarding.profile.body":
      "Aqui você pode editar suas informações e escolher pessoas que te inspiram para receber frases motivacionais.",
    "onboarding.profile.cta": "Começar!",

    "inspire.title": "Pessoas que me inspiram",
    "inspire.subtitle":
      "Escolha de quem você gostaria de receber frases motivacionais",
    "inspire.selectedCount": "{n} selecionados",
    "inspire.ofTotal": "de {total}",
    "inspire.save": "Guardar seleção",

    "categories.all": "Todos",
    "categories.entrepreneurs": "Empreendedores",
    "categories.leaders": "Líderes",
    "categories.writers": "Escritores",
    "categories.athletes": "Atletas",
    "categories.visionaries": "Visionários",
    "categories.communicators": "Comunicadores",
    "categories.musicProducers": "Produtores musicais",
    "categories.designers": "Designers",
    "categories.artists": "Artistas",
    "categories.investors": "Investidores",

    "profile.title": "Meu perfil",
    "profile.guest": "Convidado",
    "profile.connectedAccount": "Conta conectada",
    "profile.memberSince": "Membro desde",
    "profile.signOut": "Sair",

    "menu.profile": "Meu perfil",
    "menu.inspire": "Pessoas que me inspiram",
    "menu.signOut": "Sair",

    "quote.pickInspirations":
      "Escolha de quem você gostaria de receber motivação →",
  },

  fr: {
    "common.cancel": "Annuler",
    "common.add": "Ajouter",
    "common.save": "Enregistrer",
    "common.next": "Suivant",
    "common.back": "Retour",
    "common.start": "Commencer",
    "common.close": "Fermer",

    "lang.spanish": "Español",
    "lang.english": "English",
    "lang.portuguese": "Português",
    "lang.french": "Français",
    "lang.italian": "Italiano",
    "lang.switch": "Langue",

    "header.title": "Votre {year} en points",
    "header.subtitle": "{completed} sur {total} jours accomplis · {percent}% de l’année",
    "header.signIn": "Se connecter",
    "header.signUp": "Créer un compte",

    "tabs.month": "Votre progression",
    "tabs.year": "Année complète",

    "legend.completed": "Jour accompli",
    "legend.partial": "Partiellement accompli",
    "legend.missed": "Non accompli",
    "legend.today": "Aujourd’hui",
    "legend.future": "À venir",

    "goals.todayPrefix": "Aujourd’hui",
    "goals.dayOfYear": "Jour {n} sur {total}",
    "goals.heading": "Objectifs du jour",
    "goals.placeholderToday": "Ajoutez un objectif pour aujourd’hui",
    "goals.placeholderPast": "Ajoutez un objectif pour ce jour",
    "goals.deleteAria": "Supprimer l’objectif",

    "guestBanner.message": "Vos objectifs et progrès ne seront pas enregistrés.",
    "guestBanner.suffix": "Créez un compte gratuit pour commencer.",
    "guestBanner.cta": "Créer un compte",

    "auth.subtitleSignup":
      "Transformez vos journées en réussites. Fixez vos objectifs quotidiens et suivez votre progression sur une année.",
    "auth.subtitleLogin": "Transformez vos journées en réussites",
    "auth.googleSignup": "Créer un compte avec Google",
    "auth.googleLogin": "Se connecter avec Google",
    "auth.redirecting": "Redirection vers Google...",
    "auth.terms":
      "En continuant, vous acceptez nos [Conditions d’utilisation] et notre [Politique de confidentialité]",
    "auth.haveAccount": "Déjà un compte ?",
    "auth.noAccount": "Pas de compte ?",
    "auth.signIn": "Se connecter",
    "auth.signUp": "S’inscrire",

    "guestSave.title": "Enregistrez votre progression",
    "guestSave.body":
      "Vous avez ajouté {n} {goalLabel} aujourd’hui. Créez un compte pour enregistrer toute votre progression.",
    "guestSave.goal_one": "objectif",
    "guestSave.goal_other": "objectifs",
    "guestSave.signupCta": "Créer un compte avec Google",
    "guestSave.continueCta": "Continuer sans enregistrer",

    "onboarding.welcome.title": "Bienvenue{name} !",
    "onboarding.welcome.body":
      "Faisons un tour rapide pour vous montrer comment utiliser votre calendrier {year}.",
    "onboarding.welcome.skip": "Passer le tutoriel",
    "onboarding.calendar.title": "Voici votre calendrier annuel",
    "onboarding.calendar.body":
      "Chaque point représente un jour de {year}. À la fin de l’année, vous verrez toutes vos réussites d’un seul coup d’œil.",
    "onboarding.goals.title": "Définissez ici vos objectifs quotidiens",
    "onboarding.goals.body":
      "Ajoutez des objectifs pour chaque jour et cochez-les quand vous les accomplissez.",
    "onboarding.goals.example": "Exemple : « Faire 30 minutes de sport »",
    "onboarding.dayStates.title": "Comprenez vos jours",
    "onboarding.states.completed": "Jour accompli",
    "onboarding.states.completedSub": "Vous avez accompli tous vos objectifs",
    "onboarding.states.partial": "Jour partiellement accompli",
    "onboarding.states.partialSub": "Vous avez accompli certains objectifs",
    "onboarding.states.missed": "Jour manqué",
    "onboarding.states.missedSub": "Vous n’avez accompli aucun objectif",
    "onboarding.states.today": "Aujourd’hui",
    "onboarding.states.todaySub": "Vous pouvez encore y arriver !",
    "onboarding.profile.title": "Votre profil",
    "onboarding.profile.body":
      "Modifiez vos informations et choisissez les personnes qui vous inspirent pour recevoir des citations motivantes.",
    "onboarding.profile.cta": "Commencer !",

    "inspire.title": "Personnes qui m’inspirent",
    "inspire.subtitle":
      "Choisissez de qui vous aimeriez recevoir des citations motivantes",
    "inspire.selectedCount": "{n} sélectionnés",
    "inspire.ofTotal": "sur {total}",
    "inspire.save": "Enregistrer la sélection",

    "categories.all": "Tous",
    "categories.entrepreneurs": "Entrepreneurs",
    "categories.leaders": "Leaders",
    "categories.writers": "Écrivains",
    "categories.athletes": "Athlètes",
    "categories.visionaries": "Visionnaires",
    "categories.communicators": "Communicants",
    "categories.musicProducers": "Producteurs de musique",
    "categories.designers": "Designers",
    "categories.artists": "Artistes",
    "categories.investors": "Investisseurs",

    "profile.title": "Mon profil",
    "profile.guest": "Invité",
    "profile.connectedAccount": "Compte connecté",
    "profile.memberSince": "Membre depuis",
    "profile.signOut": "Se déconnecter",

    "menu.profile": "Mon profil",
    "menu.inspire": "Personnes qui m’inspirent",
    "menu.signOut": "Se déconnecter",

    "quote.pickInspirations":
      "Choisissez par qui vous aimeriez être inspiré →",
  },

  it: {
    "common.cancel": "Annulla",
    "common.add": "Aggiungi",
    "common.save": "Salva",
    "common.next": "Avanti",
    "common.back": "Indietro",
    "common.start": "Inizia",
    "common.close": "Chiudi",

    "lang.spanish": "Español",
    "lang.english": "English",
    "lang.portuguese": "Português",
    "lang.french": "Français",
    "lang.italian": "Italiano",
    "lang.switch": "Lingua",

    "header.title": "Il tuo {year} in punti",
    "header.subtitle": "{completed} di {total} giorni completati · {percent}% dell’anno",
    "header.signIn": "Accedi",
    "header.signUp": "Crea account",

    "tabs.month": "I tuoi progressi",
    "tabs.year": "Anno intero",

    "legend.completed": "Giorno completato",
    "legend.partial": "Parzialmente completato",
    "legend.missed": "Non completato",
    "legend.today": "Oggi",
    "legend.future": "Futuro",

    "goals.todayPrefix": "Oggi",
    "goals.dayOfYear": "Giorno {n} di {total}",
    "goals.heading": "Obiettivi del giorno",
    "goals.placeholderToday": "Aggiungi un obiettivo per oggi",
    "goals.placeholderPast": "Aggiungi un obiettivo per questo giorno",
    "goals.deleteAria": "Elimina obiettivo",

    "guestBanner.message": "I tuoi obiettivi e progressi non verranno salvati.",
    "guestBanner.suffix": "Crea un account gratuito per iniziare.",
    "guestBanner.cta": "Crea account",

    "auth.subtitleSignup":
      "Trasforma le tue giornate in traguardi. Definisci i tuoi obiettivi quotidiani e visualizza i tuoi progressi nell’anno.",
    "auth.subtitleLogin": "Trasforma le tue giornate in traguardi",
    "auth.googleSignup": "Crea account con Google",
    "auth.googleLogin": "Accedi con Google",
    "auth.redirecting": "Reindirizzamento a Google...",
    "auth.terms":
      "Continuando, accetti i nostri [Termini di servizio] e l’[Informativa sulla privacy]",
    "auth.haveAccount": "Hai già un account?",
    "auth.noAccount": "Non hai un account?",
    "auth.signIn": "Accedi",
    "auth.signUp": "Registrati",

    "guestSave.title": "Salva i tuoi progressi",
    "guestSave.body":
      "Hai aggiunto {n} {goalLabel} per oggi. Crea un account per salvare tutti i tuoi progressi.",
    "guestSave.goal_one": "obiettivo",
    "guestSave.goal_other": "obiettivi",
    "guestSave.signupCta": "Crea account con Google",
    "guestSave.continueCta": "Continua senza salvare",

    "onboarding.welcome.title": "Benvenuto/a{name}!",
    "onboarding.welcome.body":
      "Facciamo un breve tour per mostrarti come usare il tuo calendario {year}.",
    "onboarding.welcome.skip": "Salta il tutorial",
    "onboarding.calendar.title": "Questo è il tuo calendario annuale",
    "onboarding.calendar.body":
      "Ogni punto rappresenta un giorno del {year}. A fine anno, vedrai tutti i tuoi traguardi in un colpo d’occhio.",
    "onboarding.goals.title": "Qui imposti i tuoi obiettivi quotidiani",
    "onboarding.goals.body":
      "Aggiungi obiettivi per ogni giorno e segnali quando li completi.",
    "onboarding.goals.example": "Esempio: «Fare 30 minuti di esercizio»",
    "onboarding.dayStates.title": "Comprendi i tuoi giorni",
    "onboarding.states.completed": "Giorno completato",
    "onboarding.states.completedSub": "Hai completato tutti i tuoi obiettivi",
    "onboarding.states.partial": "Giorno parzialmente completato",
    "onboarding.states.partialSub": "Hai completato alcuni obiettivi",
    "onboarding.states.missed": "Giorno mancato",
    "onboarding.states.missedSub": "Non hai completato nessun obiettivo",
    "onboarding.states.today": "Oggi",
    "onboarding.states.todaySub": "Puoi ancora farcela!",
    "onboarding.profile.title": "Il tuo profilo",
    "onboarding.profile.body":
      "Modifica le tue informazioni e scegli persone che ti ispirano per ricevere frasi motivazionali.",
    "onboarding.profile.cta": "Iniziamo!",

    "inspire.title": "Persone che mi ispirano",
    "inspire.subtitle":
      "Scegli da chi vorresti ricevere frasi motivazionali",
    "inspire.selectedCount": "{n} selezionati",
    "inspire.ofTotal": "su {total}",
    "inspire.save": "Salva selezione",

    "categories.all": "Tutti",
    "categories.entrepreneurs": "Imprenditori",
    "categories.leaders": "Leader",
    "categories.writers": "Scrittori",
    "categories.athletes": "Atleti",
    "categories.visionaries": "Visionari",
    "categories.communicators": "Comunicatori",
    "categories.musicProducers": "Produttori musicali",
    "categories.designers": "Designer",
    "categories.artists": "Artisti",
    "categories.investors": "Investitori",

    "profile.title": "Il mio profilo",
    "profile.guest": "Ospite",
    "profile.connectedAccount": "Account collegato",
    "profile.memberSince": "Membro da",
    "profile.signOut": "Esci",

    "menu.profile": "Il mio profilo",
    "menu.inspire": "Persone che mi ispirano",
    "menu.signOut": "Esci",

    "quote.pickInspirations":
      "Scegli da chi vorresti ricevere ispirazione →",
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
