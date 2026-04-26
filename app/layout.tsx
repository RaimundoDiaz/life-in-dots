import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Tu 2026 en puntos",
  description: "Transforma tus días en logros. Visualiza tu año en puntos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
