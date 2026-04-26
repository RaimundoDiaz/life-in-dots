import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Life in Dots — Tu año en puntos",
    short_name: "Life in Dots",
    description:
      "Visualiza el año como puntos y transforma tus días en logros con metas diarias.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    lang: "es",
    categories: ["productivity", "lifestyle", "utilities"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
