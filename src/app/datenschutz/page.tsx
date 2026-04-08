import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz – Trainer Hamburg",
};

export default function DatenschutzPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-[760px] mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary font-semibold mb-12"
        >
          ← Zurück zur Startseite
        </Link>

        <h1 className="font-display text-5xl font-bold mb-10">
          Datenschutzerklärung
        </h1>

        <h2 className="text-xl font-bold mt-8 mb-3">
          1. Datenschutz auf einen Blick
        </h2>
        <p className="text-muted leading-relaxed mb-4">
          Diese Website wird von einem privaten Trainer und Vereinsfunktionär
          betrieben. Die Erhebung personenbezogener Daten erfolgt nur im
          technisch notwendigen Umfang gemäß DSGVO.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">2. Verantwortlicher</h2>
        <p className="text-muted leading-relaxed mb-4">
          [Vorname Nachname], [Adresse], Hamburg [Platzhalter]
          <br />
          E-Mail: trainer@example.com
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">3. Kontaktformular</h2>
        <p className="text-muted leading-relaxed mb-4">
          Wenn du uns per Kontaktformular kontaktierst, werden deine Angaben
          zwecks Bearbeitung der Anfrage gespeichert. Diese Daten geben wir
          nicht ohne deine Einwilligung weiter.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">4. Deine Rechte</h2>
        <p className="text-muted leading-relaxed mb-4">
          Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung und
          Einschränkung der Verarbeitung deiner personenbezogenen Daten. Wende
          dich dazu an die im Impressum genannte Adresse.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">
          5. Keine Weitergabe an Dritte
        </h2>
        <p className="text-muted leading-relaxed mb-4">
          Deine Daten werden nicht an Dritte weitergegeben, verkauft oder für
          Werbezwecke genutzt.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">6. Cookies</h2>
        <p className="text-muted leading-relaxed mb-4">
          Diese Website verwendet keine Tracking-Cookies. Nur technisch
          notwendige Funktionen werden genutzt.
        </p>

        <p className="text-muted text-sm italic mt-8">
          Diese Datenschutzerklärung ist ein Platzhalter. Bitte durch einen
          Rechtsanwalt prüfen lassen.
        </p>
      </div>
    </div>
  );
}
