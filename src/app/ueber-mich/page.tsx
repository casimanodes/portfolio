import Link from "next/link";
import { Button } from "@/components/ui/button";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über mich – Trainer Hamburg",
  description: "Lizenzierter Trainer, Lehrer und Vereinsfunktionär aus Hamburg mit knapp einem Jahrzehnt Erfahrung.",
};

const timeline = [
  { year: "2016+", title: "Start als Trainer", desc: "Beginn der Trainertätigkeit in verschiedenen Sportarten" },
  { year: "2020", title: "Schwimmlehrer", desc: "Start des Schwimmunterrichts für Kinder und Erwachsene" },
  { year: "2022", title: "DenkSport-Kurse", desc: "Einführung der Zauberwürfel- und Schachkurse" },
  { year: "2023", title: "1. Vorstand Schlagball HH", desc: "Wahl zum 1. Vorstand des Schlagball Hamburg e.V." },
  { year: "Heute", title: "4 Disziplinen, 1 Mission", desc: "Aktiver Trainer, Lehrer und Berater in Hamburg" },
];

const qualifications = [
  { icon: "🎖️", title: "Lizenzierter Trainer", desc: "Offizielle Trainer- und Beraterlizenz" },
  { icon: "🏛️", title: "1. Vorstand", desc: "Schlagball Hamburg e.V." },
  { icon: "📚", title: "Erfahrener Lehrer", desc: "Unterricht auf allen Levels" },
  { icon: "🤝", title: "Berater", desc: "Vereins- und Organisationsberatung" },
  { icon: "🏊", title: "Schwimmlehrer", desc: "4 Jahre Unterrichtserfahrung" },
  { icon: "🏸", title: "Badminton-Trainer", desc: "Leiter eigener Trainingsgruppe" },
];

export default function UeberMichPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Intro */}
        <RevealOnScroll className="max-w-3xl mx-auto text-center mb-20">
          <div className="label-tag justify-center pl-8">Über mich</div>
          <h1 className="h-xl mb-6">
            Trainer aus <span className="text-primary">Leidenschaft</span>
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            Seit knapp einem Jahrzehnt begleite ich Menschen auf ihrem Weg – egal ob es darum geht,
            den Zauberwürfel zu lösen, die ersten Züge im Schach zu meistern, sicher im Wasser zu
            werden oder auf dem Badminton-Court zu glänzen.
          </p>
        </RevealOnScroll>

        {/* Portrait + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <RevealOnScroll>
            <div className="w-full aspect-[3/4] bg-surface2 rounded-[20px] border border-border flex flex-col items-center justify-center gap-3 text-muted relative overflow-hidden">
              <div className="text-[6rem]">👤</div>
              <div className="text-sm">[Foto Platzhalter]</div>
              <div className="absolute bottom-0 right-0 w-[140px] h-[140px] bg-primary rounded-tl-[20px] flex items-center justify-center font-display text-sm font-bold text-white text-center leading-tight p-5">
                Lizenzierter
                <br />
                Trainer &<br />
                Berater
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={2}>
            <h2 className="h-lg mb-6">Meine Geschichte</h2>
            <div className="space-y-4 text-muted text-[1.05rem] leading-relaxed">
              <p>
                Was als Leidenschaft für Sport und Wissensvermittlung begann, ist heute mein Beruf und
                meine Berufung. Als lizenzierter Trainer und <strong className="text-text">1. Vorstand des Schlagball Hamburg e.V.</strong> bringe
                ich nicht nur sportliches Know-how mit, sondern auch echtes Organisationstalent.
              </p>
              <p>
                Mein Ziel ist es, jeden meiner Teilnehmer individuell zu fördern – sei es im
                DenkSport, im Schwimmunterricht, auf dem Badminton-Court oder auf dem Schlagball-Feld.
                Dabei stehen Freude, Sicherheit und echte Entwicklung immer im Mittelpunkt.
              </p>
              <p>
                Was mich antreibt? Die Begeisterung in den Augen meiner Schüler, wenn sie einen
                neuen Meilenstein erreichen. Ob das der erste gelöste Zauberwürfel ist, die erste
                Bahn im Schwimmbecken oder der erste gewonnene Satz im Badminton.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* Qualifications */}
        <RevealOnScroll className="mb-24">
          <h2 className="h-lg text-center mb-12">
            Qualifikationen & <span className="text-primary">Erfahrung</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualifications.map((q) => (
              <div
                key={q.title}
                className="bg-surface border border-border rounded-[20px] p-8 transition-all duration-300 hover:border-primary hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">{q.icon}</div>
                <h3 className="font-display text-lg font-bold mb-2">{q.title}</h3>
                <p className="text-muted text-sm">{q.desc}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Timeline */}
        <RevealOnScroll className="mb-24">
          <h2 className="h-lg text-center mb-12">
            Mein <span className="text-primary">Weg</span>
          </h2>
          <div className="max-w-2xl mx-auto">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary-dim rounded-full flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {item.year}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="pt-2 pb-8">
                  <h3 className="font-display font-bold text-lg">{item.title}</h3>
                  <p className="text-muted text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* CTA */}
        <RevealOnScroll>
          <div className="bg-gradient-to-br from-surface to-surface2 border border-border rounded-[20px] p-12 md:p-16 text-center">
            <h2 className="h-lg mb-4">Bereit loszulegen?</h2>
            <p className="text-muted text-lg mb-8 max-w-lg mx-auto">
              Finde den passenden Kurs oder schreib mir direkt.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button size="lg" asChild>
                <Link href="/angebote">Alle Angebote</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/kontakt">Kontakt aufnehmen</Link>
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
