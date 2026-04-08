import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import { getSchedule, getOffers } from "@/lib/strapi";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termine & Buchung – Trainer Hamburg",
  description: "Alle aktuellen Kurstermine im Überblick. Jetzt Platz sichern.",
};

export default async function TerminePage() {
  const [schedule, offers] = await Promise.all([getSchedule(), getOffers()]);

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <RevealOnScroll className="text-center max-w-[640px] mx-auto mb-16">
          <div className="label-tag justify-center pl-8">Termine & Buchung</div>
          <h1 className="h-xl mb-4">
            Aktuelle <span className="text-primary">Kurstermine</span>
          </h1>
          <p className="text-muted text-lg">
            Alle Kurse finden in Hamburg statt. Genaue Orte nach Buchungsbestätigung. Plätze sind begrenzt!
          </p>
        </RevealOnScroll>

        {/* Schedule Table */}
        <RevealOnScroll className="mb-16">
          <div className="bg-surface border border-border rounded-[20px] overflow-hidden">
            <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-surface2">
              <span className="font-semibold text-lg">📅 Wöchentliche Kurse</span>
              <Badge color="primary">Laufend</Badge>
            </div>

            {/* Header */}
            <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b border-border text-sm text-muted font-semibold">
              <div>Tag</div>
              <div>Uhrzeit</div>
              <div>Kurs</div>
              <div>Preis</div>
              <div>Aktion</div>
            </div>

            {schedule.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2 md:gap-4 items-center px-6 py-5 border-b border-border last:border-b-0 hover:bg-surface2 transition-colors"
              >
                <div className="font-semibold">{item.day}</div>
                <div className="text-muted text-sm">{item.time}</div>
                <div className="flex items-center gap-2">
                  <Badge color={item.badgeColor}>{item.type}</Badge>
                  {item.spotsLeft !== undefined && (
                    <span className="text-xs text-muted">
                      {item.spotsLeft} Plätze frei
                    </span>
                  )}
                </div>
                <div className="text-sm">
                  {item.price !== undefined ? (
                    <span className="text-primary font-semibold">{formatPrice(item.price)}</span>
                  ) : (
                    <span className="text-muted">Auf Anfrage</span>
                  )}
                </div>
                <div>
                  <Button size="sm" asChild>
                    <Link href={`/kontakt?interesse=${item.offerSlug}`}>
                      Buchen
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[0.82rem] text-muted mt-3">
            ⏱ Zeiten sind Richtwerte – werden individuell abgestimmt. Preise pro Person bei Gruppenangeboten.
          </p>
        </RevealOnScroll>

        {/* Quick Links */}
        <RevealOnScroll className="mb-16">
          <h2 className="h-lg mb-8">Kurse im Detail</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offers.map((offer) => (
              <Link
                key={offer.id}
                href={`/angebote/${offer.slug}`}
                className="bg-surface border border-border rounded-[20px] p-6 transition-all duration-300 hover:border-primary hover:-translate-y-1 flex flex-col items-center text-center"
              >
                <span className="text-4xl mb-3">{offer.icon}</span>
                <h3 className="font-display font-bold mb-1">{offer.shortTitle}</h3>
                <p className="text-sm text-muted mb-3">{offer.description.slice(0, 80)}...</p>
                {offer.prices[0] && (
                  <span className="text-primary font-semibold text-sm">
                    ab {formatPrice(offer.prices[0].price)}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </RevealOnScroll>

        {/* Calendar placeholder & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RevealOnScroll>
            <div className="bg-primary-dim border border-[rgba(91,141,239,0.25)] rounded-[20px] p-10 h-full">
              <div className="text-3xl mb-4">📅</div>
              <h3 className="h-md mb-3">Kalender-Integration</h3>
              <p className="text-muted leading-relaxed mb-6">
                Termine werden zentral über das Verwaltungssystem gepflegt. Hier wird zukünftig ein
                interaktiver Kalender eingebunden, über den du Termine direkt einsehen und buchen kannst.
              </p>
              <p className="text-sm text-muted italic">
                [Platzhalter – Strapi-Kalender-Integration folgt]
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={2}>
            <div className="bg-surface border border-border rounded-[20px] p-10 h-full flex flex-col">
              <div className="text-3xl mb-4">📬</div>
              <h3 className="h-md mb-3">Individuelle Anfrage</h3>
              <p className="text-muted leading-relaxed mb-6 flex-1">
                Kein passender Termin? Kein Problem – ich finde gemeinsam mit dir eine Lösung.
                Einzelunterricht und flexible Terminvereinbarung auf Anfrage.
              </p>
              <Button className="w-full" asChild>
                <Link href="/kontakt?buchen=true">Termin anfragen</Link>
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}
