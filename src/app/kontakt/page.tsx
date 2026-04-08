import ContactSection from "@/components/sections/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt – Trainer Hamburg",
  description: "Kontaktiere mich für Kursanfragen, Vereinsbeitritt oder allgemeine Fragen.",
};

export default function KontaktPage() {
  return (
    <div className="pt-16">
      <ContactSection />
    </div>
  );
}
