import Link from "next/link";
import { Button } from "@/components/ui/button";
import RevealOnScroll from "@/components/shared/RevealOnScroll";

const qualifications = [
  { icon: "🎖️", title: "Lizenzierter Trainer", desc: "Offizielle Trainer- & Beraterlizenz" },
  { icon: "🏛️", title: "Vereinsvorstand", desc: "1. Vorstand Schlagball Hamburg" },
  { icon: "📚", title: "Erfahrener Lehrer", desc: "Unterricht auf allen Levels" },
  { icon: "🤝", title: "Berater", desc: "Vereins- & Organisationsberatung" },
];

const tags = [
  { label: "🎓 Trainerlizenz", color: "badge-primary" },
  { label: "🏊 Schwimmlehrer", color: "badge-blue" },
  { label: "🏸 Badminton", color: "badge-green" },
  { label: "🏏 Schlagball", color: "badge-pink" },
];

export default function AboutPreview() {
  return (
    <section className="section" id="ueber-mich">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Portrait */}
          <RevealOnScroll>
            <div className="w-full aspect-[3/4] bg-surface2 rounded-[20px] border border-border flex flex-col items-center justify-center gap-3 text-muted text-[0.9rem] relative overflow-hidden">
              <div className="text-[4rem]">👤</div>
              <div className="text-[0.85rem] text-muted">[Foto Platzhalter]</div>
              <div className="absolute bottom-0 right-0 w-[120px] h-[120px] bg-primary rounded-tl-[20px] flex items-center justify-center font-display text-[0.8rem] font-bold text-white text-center leading-tight p-4">
                Lizenzierter
                <br />
                Trainer
              </div>
              <div className="absolute top-6 -right-0 bg-surface border border-border rounded-xl p-3 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                <div className="text-[0.75rem] text-muted mb-1">⭐ Bewertung</div>
                <div className="flex gap-0.5 text-primary mb-1">★★★★★</div>
                <div className="text-[0.78rem] text-muted">von Teilnehmern</div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Text */}
          <RevealOnScroll delay={2}>
            <div className="label-tag">Über mich</div>
            <h2 className="h-lg mb-6">
              Trainer aus
              <br />
              <span className="text-primary">Leidenschaft.</span>
            </h2>
            <p className="text-muted text-[1.05rem] leading-relaxed mb-4">
              Seit knapp einem Jahrzehnt begleite ich Menschen auf ihrem Weg –
              egal ob es darum geht, den Zauberwürfel zu lösen, die ersten Züge
              im Schach zu meistern, sicher im Wasser zu werden oder auf dem
              Badminton-Court zu glänzen.
            </p>
            <p className="text-muted text-[1.05rem] leading-relaxed mb-7">
              Als lizenzierter Trainer und{" "}
              <strong className="text-text">
                1. Vorstand des Schlagball Hamburg e.V.
              </strong>{" "}
              bringe ich nicht nur sportliches Know-how mit, sondern auch echtes
              Organisationstalent und Leidenschaft für Gemeinschaft und faire
              Entwicklung.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {qualifications.map((q) => (
                <div key={q.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary-dim rounded-lg flex items-center justify-center text-base shrink-0 mt-0.5">
                    {q.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-[0.9rem]">{q.title}</div>
                    <div className="text-[0.82rem] text-muted mt-0.5">{q.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2.5 mb-8">
              {tags.map((t) => (
                <span
                  key={t.label}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-[0.8rem] font-semibold ${t.color === "badge-primary" ? "bg-primary-dim text-primary" : t.color === "badge-blue" ? "bg-[rgba(76,169,201,0.15)] text-accent-blue" : t.color === "badge-green" ? "bg-[rgba(76,201,122,0.15)] text-accent-green" : "bg-[rgba(201,76,122,0.15)] text-accent-pink"}`}
                >
                  {t.label}
                </span>
              ))}
            </div>

            <Button asChild>
              <Link href="/ueber-mich">Mehr über mich →</Link>
            </Button>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
