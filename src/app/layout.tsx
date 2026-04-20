import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "pepe by Sempertex — Planea tu evento en Colombia",
  description:
    "La plataforma colombiana para planear fiestas y eventos familiares. Obtén 3 cotizaciones personalizadas en minutos.",
  keywords: ["eventos Colombia", "fiestas infantiles", "cotización eventos", "proveedores eventos", "Sempertex"],
  openGraph: {
    title: "pepe by Sempertex — Planea tu evento en Colombia",
    description: "Obtén 3 cotizaciones personalizadas para tu evento en minutos.",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${nunito.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
