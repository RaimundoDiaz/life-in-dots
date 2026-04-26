import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  style: ["normal", "italic"],
});

const SITE_URL = "https://yourlifeindots.com";
const SITE_NAME = "Life in Dots";
const TITLE = "Tu 2026 en puntos — Life in Dots";
const DESCRIPTION =
  "Visualiza el año como puntos y transforma tus días en logros. Pon 3 metas diarias, marca lo cumplido y mira tu progreso anual de un vistazo.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: TITLE,
    template: "%s · Life in Dots",
  },
  description: DESCRIPTION,
  keywords: [
    "metas diarias",
    "visualización del año",
    "productividad",
    "hábitos",
    "year in pixels",
    "year in dots",
    "objetivos",
    "habit tracker",
    "goal tracker",
    "calendario de metas",
    "365 días",
  ],
  authors: [{ name: "Raimundo Díaz" }],
  creator: "Raimundo Díaz",
  publisher: "Raimundo Díaz",
  category: "productivity",
  alternates: {
    canonical: "/",
    languages: {
      es: "/",
      en: "/",
      pt: "/",
      fr: "/",
      it: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_ES",
    alternateLocale: ["en_US", "pt_BR", "fr_FR", "it_IT"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@raimundodiaz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
  // verification: {
  //   // Pega aquí el código de Google Search Console (solo el contenido del meta name="google-site-verification")
  //   google: "TODO_PEGAR_CODIGO_SEARCH_CONSOLE",
  // },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  alternateName: "Tu año en puntos",
  url: SITE_URL,
  description: DESCRIPTION,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web",
  inLanguage: ["es", "en", "pt", "fr", "it"],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Raimundo Díaz",
    url: "https://github.com/RaimundoDiaz",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
