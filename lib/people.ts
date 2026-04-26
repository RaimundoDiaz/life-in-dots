import type { Locale } from "./i18n";

export type PersonCategory =
  | "entrepreneurs"
  | "leaders"
  | "writers"
  | "athletes"
  | "visionaries"
  | "communicators"
  | "musicProducers"
  | "designers"
  | "artists"
  | "investors";

export type LocalizedText = Record<Locale, string>;

export type Person = {
  id: string;
  name: string;
  role: PersonCategory;
  initials: string;
  image: string;
  quotes: { text: LocalizedText }[];
};

export const PEOPLE: Person[] = [
  {
    id: "michael-jordan",
    name: "Michael Jordan",
    role: "athletes",
    initials: "MJ",
    image: "/people/michael-jordan.png",
    quotes: [
      {
        text: {
          es: "Si te rindes una vez, se convierte en un hábito. Nunca te rindas.",
          en: "Once you give up once, it becomes a habit. Never give up.",
        },
      },
      {
        text: {
          es: "He fallado una y otra vez en mi vida, y por eso he tenido éxito.",
          en: "I've failed over and over again in my life, and that's why I succeed.",
        },
      },
    ],
  },
  {
    id: "steve-jobs",
    name: "Steve Jobs",
    role: "visionaries",
    initials: "SJ",
    image: "/people/steve-jobs.png",
    quotes: [
      {
        text: {
          es: "Tu trabajo va a llenar gran parte de tu vida, así que la única forma de estar verdaderamente satisfecho es hacer lo que crees que es un gran trabajo.",
          en: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
        },
      },
      {
        text: {
          es: "La innovación es lo que distingue a un líder de los demás.",
          en: "Innovation distinguishes between a leader and a follower.",
        },
      },
    ],
  },
  {
    id: "rick-rubin",
    name: "Rick Rubin",
    role: "musicProducers",
    initials: "RR",
    image: "/people/rick-rubin.png",
    quotes: [
      {
        text: {
          es: "El mejor arte divide a la audiencia. Si todo el mundo lo ama, no estás empujando lo suficiente.",
          en: "The best art divides the audience. If everyone loves it, you're not pushing hard enough.",
        },
      },
    ],
  },
  {
    id: "oprah-winfrey",
    name: "Oprah Winfrey",
    role: "communicators",
    initials: "OW",
    image: "/people/oprah-winfrey.png",
    quotes: [
      {
        text: {
          es: "La mayor aventura que puedes emprender es vivir la vida de tus sueños.",
          en: "The biggest adventure you can take is to live the life of your dreams.",
        },
      },
    ],
  },
  {
    id: "elon-musk",
    name: "Elon Musk",
    role: "entrepreneurs",
    initials: "EM",
    image: "/people/elon-musk.png",
    quotes: [
      {
        text: {
          es: "Cuando algo es lo suficientemente importante, lo haces incluso si las probabilidades no están a tu favor.",
          en: "When something is important enough, you do it even if the odds are not in your favor.",
        },
      },
    ],
  },
  {
    id: "peter-thiel",
    name: "Peter Thiel",
    role: "investors",
    initials: "PT",
    image: "/people/peter-thiel.png",
    quotes: [
      {
        text: {
          es: "La competencia es para los perdedores. Si quieres crear y capturar valor duradero, busca construir un monopolio.",
          en: "Competition is for losers. If you want to create and capture lasting value, build a monopoly.",
        },
      },
    ],
  },
  {
    id: "virgil-abloh",
    name: "Virgil Abloh",
    role: "designers",
    initials: "VA",
    image: "/people/virgil-abloh.png",
    quotes: [
      {
        text: {
          es: "Todo lo que estoy haciendo está pensado para una versión de mí de 17 años.",
          en: "Everything I do is for the 17-year-old version of myself.",
        },
      },
    ],
  },
  {
    id: "jk-rowling",
    name: "J.K. Rowling",
    role: "writers",
    initials: "JR",
    image: "/people/jk-rowling.png",
    quotes: [
      {
        text: {
          es: "Son nuestras decisiones las que muestran lo que verdaderamente somos, mucho más que nuestras habilidades.",
          en: "It is our choices that show what we truly are, far more than our abilities.",
        },
      },
    ],
  },
  {
    id: "mark-zuckerberg",
    name: "Mark Zuckerberg",
    role: "entrepreneurs",
    initials: "MZ",
    image: "/people/mark-zuckerberg.png",
    quotes: [
      {
        text: {
          es: "El mayor riesgo es no asumir ningún riesgo. En un mundo que cambia rápido, la única estrategia garantizada para fallar es no asumir riesgos.",
          en: "The biggest risk is not taking any risk. In a world changing quickly, the only strategy guaranteed to fail is not taking risks.",
        },
      },
    ],
  },
  {
    id: "serena-williams",
    name: "Serena Williams",
    role: "athletes",
    initials: "SW",
    image: "/people/serena-williams.png",
    quotes: [
      {
        text: {
          es: "Cada vez que entro a la cancha, voy a por todo. Nunca me echo atrás.",
          en: "Every time I step on the court, I go for everything. I never back down.",
        },
      },
    ],
  },
  {
    id: "nelson-mandela",
    name: "Nelson Mandela",
    role: "leaders",
    initials: "NM",
    image: "/people/nelson-mandela.png",
    quotes: [
      {
        text: {
          es: "Siempre parece imposible hasta que se hace.",
          en: "It always seems impossible until it's done.",
        },
      },
    ],
  },
  {
    id: "beyonce",
    name: "Beyoncé",
    role: "artists",
    initials: "B",
    image: "/people/beyonce.png",
    quotes: [
      {
        text: {
          es: "El poder no se te entrega. Tienes que tomarlo.",
          en: "Power is not given to you. You have to take it.",
        },
      },
    ],
  },
];

export const PEOPLE_CATEGORIES: { i18nKey: string; value: PersonCategory | "all" }[] = [
  { i18nKey: "categories.all", value: "all" },
  { i18nKey: "categories.entrepreneurs", value: "entrepreneurs" },
  { i18nKey: "categories.leaders", value: "leaders" },
  { i18nKey: "categories.writers", value: "writers" },
  { i18nKey: "categories.athletes", value: "athletes" },
];

export const ROLE_KEY: Record<PersonCategory, string> = {
  entrepreneurs: "categories.entrepreneurs",
  leaders: "categories.leaders",
  writers: "categories.writers",
  athletes: "categories.athletes",
  visionaries: "categories.visionaries",
  communicators: "categories.communicators",
  musicProducers: "categories.musicProducers",
  designers: "categories.designers",
  artists: "categories.artists",
  investors: "categories.investors",
};

export function getPersonById(id: string): Person | undefined {
  return PEOPLE.find((p) => p.id === id);
}

export function getRandomQuote(
  personIds: string[]
): { person: Person; quote: { text: LocalizedText } } | null {
  if (personIds.length === 0) return null;
  const eligible = personIds
    .map((id) => getPersonById(id))
    .filter((p): p is Person => !!p);
  if (eligible.length === 0) return null;
  const person = eligible[Math.floor(Math.random() * eligible.length)];
  const quote = person.quotes[Math.floor(Math.random() * person.quotes.length)];
  return { person, quote };
}
