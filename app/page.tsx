import { AppRoot } from "@/components/AppRoot";

const YEAR = new Date().getFullYear();

export default function Page() {
  return (
    <>
      <h1 className="sr-only">
        Life in Dots — Visualiza tu {YEAR} en puntos y cumple tus metas diarias
      </h1>
      <p className="sr-only">
        Life in Dots es una app gratuita que muestra cada día del año como un
        punto. Pon hasta 3 metas diarias, marca lo cumplido y observa el
        progreso de tu año de un vistazo. Disponible en español, inglés,
        portugués, francés e italiano.
      </p>
      <AppRoot />
    </>
  );
}
