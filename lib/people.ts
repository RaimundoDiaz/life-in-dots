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
          pt: "Se você desistir uma vez, vira um hábito. Nunca desista.",
          fr: "Si tu abandonnes une fois, ça devient une habitude. N’abandonne jamais.",
          it: "Se ti arrendi una volta, diventa un’abitudine. Non arrenderti mai.",
        },
      },
      {
        text: {
          es: "He fallado una y otra vez en mi vida, y por eso he tenido éxito.",
          en: "I've failed over and over again in my life, and that's why I succeed.",
          pt: "Eu falhei várias e várias vezes na minha vida, e é por isso que tenho sucesso.",
          fr: "J’ai échoué encore et encore dans ma vie, et c’est pour cela que je réussis.",
          it: "Ho fallito ancora e ancora nella mia vita, ed è per questo che ho successo.",
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
          pt: "O seu trabalho vai ocupar uma grande parte da sua vida, e a única maneira de estar verdadeiramente satisfeito é fazer o que você acredita ser um grande trabalho.",
          fr: "Votre travail va remplir une grande partie de votre vie, et la seule façon d’être vraiment satisfait est de faire ce que vous croyez être un grand travail.",
          it: "Il tuo lavoro occuperà gran parte della tua vita, e l’unico modo per essere davvero soddisfatto è fare ciò che credi sia un grande lavoro.",
        },
      },
      {
        text: {
          es: "La innovación es lo que distingue a un líder de los demás.",
          en: "Innovation distinguishes between a leader and a follower.",
          pt: "A inovação é o que distingue um líder dos demais.",
          fr: "L’innovation est ce qui distingue un leader d’un suiveur.",
          it: "L’innovazione distingue un leader da un seguace.",
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
          pt: "A melhor arte divide o público. Se todos amam, você não está se arriscando o suficiente.",
          fr: "Le meilleur art divise le public. Si tout le monde l’aime, c’est que tu ne pousses pas assez loin.",
          it: "L’arte migliore divide il pubblico. Se piace a tutti, non ti stai spingendo abbastanza.",
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
          pt: "A maior aventura que você pode viver é viver a vida dos seus sonhos.",
          fr: "La plus grande aventure que vous puissiez vivre est de vivre la vie de vos rêves.",
          it: "La più grande avventura che puoi vivere è vivere la vita dei tuoi sogni.",
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
          pt: "Quando algo é importante o suficiente, você faz mesmo que as probabilidades não estejam a seu favor.",
          fr: "Quand quelque chose est suffisamment important, on le fait même si les chances ne sont pas en notre faveur.",
          it: "Quando qualcosa è abbastanza importante, lo fai anche se le probabilità non sono a tuo favore.",
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
          pt: "A competição é para perdedores. Se você quer criar e capturar valor duradouro, construa um monopólio.",
          fr: "La compétition est pour les perdants. Si vous voulez créer et capter de la valeur durable, construisez un monopole.",
          it: "La competizione è per i perdenti. Se vuoi creare e catturare valore duraturo, costruisci un monopolio.",
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
          pt: "Tudo o que faço é pensado para a minha versão de 17 anos.",
          fr: "Tout ce que je fais est pensé pour la version de moi à 17 ans.",
          it: "Tutto ciò che faccio è pensato per la versione di me stesso a 17 anni.",
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
          pt: "São as nossas escolhas que mostram quem realmente somos, muito mais do que as nossas capacidades.",
          fr: "Ce sont nos choix qui révèlent ce que nous sommes vraiment, bien plus que nos capacités.",
          it: "Sono le nostre scelte a mostrare ciò che siamo davvero, molto più delle nostre capacità.",
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
          pt: "O maior risco é não correr nenhum risco. Em um mundo que muda rápido, a única estratégia garantida de falhar é não assumir riscos.",
          fr: "Le plus grand risque est de ne prendre aucun risque. Dans un monde qui change vite, la seule stratégie garantie d’échouer est de ne pas en prendre.",
          it: "Il rischio più grande è non correre alcun rischio. In un mondo che cambia in fretta, l’unica strategia destinata a fallire è non rischiare.",
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
          pt: "Toda vez que entro em quadra, vou com tudo. Nunca recuo.",
          fr: "Chaque fois que j’entre sur le court, je donne tout. Je ne recule jamais.",
          it: "Ogni volta che entro in campo, do tutto. Non mi tiro mai indietro.",
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
          pt: "Sempre parece impossível até que seja feito.",
          fr: "Cela semble toujours impossible, jusqu’à ce que ce soit fait.",
          it: "Sembra sempre impossibile finché non viene fatto.",
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
          pt: "O poder não te é entregue. Você precisa tomá-lo.",
          fr: "Le pouvoir ne vous est pas donné. Il faut le prendre.",
          it: "Il potere non ti viene dato. Devi prendertelo.",
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
