import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – Trainer Hamburg",
};

export default function ImpressumPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-[760px] mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary font-semibold mb-12"
        >
          ← Zurück zur Startseite
        </Link>

        <h1 className="font-display text-5xl font-bold mb-10">Impressum</h1>

        <h2 className="text-xl font-bold mt-8 mb-3">
          Angaben gemäß § 5 TMG
        </h2>
        <p className="text-muted leading-relaxed mb-4">
          <strong className="text-text">[Vorname Nachname]</strong>{" "}
          <em className="text-muted">[Platzhalter]</em>
          <br />
          [Straße und Hausnummer] [Platzhalter]
          <br />
          [PLZ] Hamburg
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Kontakt</h2>
        <p className="text-muted leading-relaxed mb-4">
          Telefon: [Telefonnummer] [Platzhalter]
          <br />
          E-Mail: trainer@example.com [Platzhalter]
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">
          Vereinsangaben – Schlagball Hamburg e.V.
        </h2>
        <p className="text-muted leading-relaxed mb-4">
          Registergericht: Amtsgericht Hamburg [Platzhalter]
          <br />
          Registernummer: VR XXXXX [Platzhalter]
          <br />
          1. Vorstand: [Vorname Nachname]
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">
          Haftung für Inhalte
        </h2>
        <p className="text-muted leading-relaxed mb-4">
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
          diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
          bis 10 TMG sind wir nicht verpflichtet, übermittelte oder gespeicherte
          fremde Informationen zu überwachen oder nach Umständen zu forschen, die
          auf eine rechtswidrige Tätigkeit hinweisen.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Urheberrecht</h2>
        <p className="text-muted leading-relaxed mb-4">
          Die durch die Seitenbetreiber erstellten Inhalte und Werke unterliegen
          dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
          Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
          Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors.
        </p>
      </div>
    </div>
  );
}
