import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Corporación Escuchar — Abre un asiento",
  description:
    "Tu aporte mensual permite que más personas encuentren un espacio gratuito de escucha, contención y comunidad. Círculos de Escucha gratuitos desde 2014.",
  openGraph: {
    title: "Corporación Escuchar — Abre un asiento",
    description:
      "Hay conversaciones que pueden cambiar una vida. Nosotros creamos el espacio para que ocurran.",
    siteName: "Corporación Escuchar",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-verde antialiased">
        {children}
      </body>
    </html>
  );
}
