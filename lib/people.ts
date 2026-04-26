export type PersonCategory =
  | "Emprendedores"
  | "Líderes"
  | "Escritores"
  | "Deportistas"
  | "Visionarios"
  | "Comunicadores"
  | "Productores musicales"
  | "Diseñadores"
  | "Artistas"
  | "Inversionistas";

export type Person = {
  id: string;
  name: string;
  role: PersonCategory;
  initials: string;
  image: string;
  quotes: { text: string }[];
};

export const PEOPLE: Person[] = [
  {
    id: "michael-jordan",
    name: "Michael Jordan",
    role: "Deportistas",
    initials: "MJ",
    image: "/people/michael-jordan.png",
    quotes: [
      { text: "Si te rindes una vez, se convierte en un hábito. Nunca te rindas." },
      { text: "He fallado una y otra vez en mi vida, y por eso he tenido éxito." },
    ],
  },
  {
    id: "steve-jobs",
    name: "Steve Jobs",
    role: "Visionarios",
    initials: "SJ",
    image: "/people/steve-jobs.png",
    quotes: [
      { text: "Tu trabajo va a llenar gran parte de tu vida, así que la única forma de estar verdaderamente satisfecho es hacer lo que crees que es un gran trabajo." },
      { text: "La innovación es lo que distingue a un líder de los demás." },
    ],
  },
  {
    id: "rick-rubin",
    name: "Rick Rubin",
    role: "Productores musicales",
    initials: "RR",
    image: "/people/rick-rubin.png",
    quotes: [
      { text: "El mejor arte divide a la audiencia. Si todo el mundo lo ama, no estás empujando lo suficiente." },
    ],
  },
  {
    id: "oprah-winfrey",
    name: "Oprah Winfrey",
    role: "Comunicadores",
    initials: "OW",
    image: "/people/oprah-winfrey.png",
    quotes: [
      { text: "La mayor aventura que puedes emprender es vivir la vida de tus sueños." },
    ],
  },
  {
    id: "elon-musk",
    name: "Elon Musk",
    role: "Emprendedores",
    initials: "EM",
    image: "/people/elon-musk.png",
    quotes: [
      { text: "Cuando algo es lo suficientemente importante, lo haces incluso si las probabilidades no están a tu favor." },
    ],
  },
  {
    id: "peter-thiel",
    name: "Peter Thiel",
    role: "Inversionistas",
    initials: "PT",
    image: "/people/peter-thiel.png",
    quotes: [
      { text: "La competencia es para los perdedores. Si quieres crear y capturar valor duradero, busca construir un monopolio." },
    ],
  },
  {
    id: "virgil-abloh",
    name: "Virgil Abloh",
    role: "Diseñadores",
    initials: "VA",
    image: "/people/virgil-abloh.png",
    quotes: [
      { text: "Todo lo que estoy haciendo está pensado para una versión de mí de 17 años." },
    ],
  },
  {
    id: "jk-rowling",
    name: "J.K. Rowling",
    role: "Escritores",
    initials: "JR",
    image: "/people/jk-rowling.png",
    quotes: [
      { text: "Es nuestras decisiones las que muestran lo que verdaderamente somos, mucho más que nuestras habilidades." },
    ],
  },
  {
    id: "mark-zuckerberg",
    name: "Mark Zuckerberg",
    role: "Emprendedores",
    initials: "MZ",
    image: "/people/mark-zuckerberg.png",
    quotes: [
      { text: "El mayor riesgo es no asumir ningún riesgo. En un mundo que cambia rápido, la única estrategia garantizada para fallar es no asumir riesgos." },
    ],
  },
  {
    id: "serena-williams",
    name: "Serena Williams",
    role: "Deportistas",
    initials: "SW",
    image: "/people/serena-williams.png",
    quotes: [
      { text: "Cada vez que entro a la cancha, voy a por todo. Nunca me echo atrás." },
    ],
  },
  {
    id: "nelson-mandela",
    name: "Nelson Mandela",
    role: "Líderes",
    initials: "NM",
    image: "/people/nelson-mandela.png",
    quotes: [
      { text: "Siempre parece imposible hasta que se hace." },
    ],
  },
  {
    id: "beyonce",
    name: "Beyoncé",
    role: "Artistas",
    initials: "B",
    image: "/people/beyonce.png",
    quotes: [
      { text: "El poder no es dado a ti. Tienes que tomarlo." },
    ],
  },
];

export const PEOPLE_CATEGORIES: { label: string; value: PersonCategory | "Todos" }[] = [
  { label: "Todos", value: "Todos" },
  { label: "Emprendedores", value: "Emprendedores" },
  { label: "Líderes", value: "Líderes" },
  { label: "Escritores", value: "Escritores" },
  { label: "Deportistas", value: "Deportistas" },
];

export function getPersonById(id: string): Person | undefined {
  return PEOPLE.find((p) => p.id === id);
}

export function getRandomQuote(personIds: string[]): { person: Person; quote: { text: string } } | null {
  if (personIds.length === 0) return null;
  const eligible = personIds
    .map((id) => getPersonById(id))
    .filter((p): p is Person => !!p);
  if (eligible.length === 0) return null;
  const person = eligible[Math.floor(Math.random() * eligible.length)];
  const quote = person.quotes[Math.floor(Math.random() * person.quotes.length)];
  return { person, quote };
}
