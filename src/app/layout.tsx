import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getHeaderContent } from "@/lib/strapi";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trainer Hamburg – Kurse, Training & Beratung",
  description:
    "Trainer, Lehrer und Berater in Hamburg – Zauberwürfel, Schach, Schlagball und Badminton. Jetzt Kurs buchen.",
  keywords: [
    "Trainer Hamburg",
    "Zauberwürfel Kurs",
    "Schachkurs Hamburg",
    "Schach Unterricht Hamburg",
    "Badminton Training",
    "Schlagball Hamburg",
  ],
  openGraph: {
    title: "Trainer Hamburg – Kurse, Training & Beratung",
    description:
      "Lizenzierter Trainer und Berater in Hamburg. Zauberwürfel, Schach, Schlagball und Badminton.",
    type: "website",
    locale: "de_DE",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerContent = await getHeaderContent();

  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,300..600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body">
        <Header content={headerContent} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
