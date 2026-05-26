import ContactSection from "@/components/sections/ContactSection";
import { getContactSection, getSiteSettings } from "@/lib/strapi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt – Trainer Hamburg",
  description: "Kontaktiere mich für Kursanfragen, Vereinsbeitritt oder allgemeine Fragen.",
};

export default async function KontaktPage() {
  const [content, settings] = await Promise.all([
    getContactSection(),
    getSiteSettings(),
  ]);
  return (
    <div className="pt-16">
      <ContactSection content={content} settings={settings} />
    </div>
  );
}
