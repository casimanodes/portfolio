import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import { getOffers } from "@/lib/strapi";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alle Angebote – Trainer Hamburg",
  description: "DenkSport, Schlagball, Schwimmen, Badminton – alle Kursangebote im Überblick.",
};

export default async function AngebotePage() {
  const offers = await getOffers();

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <RevealOnScroll className="text-center max-w-[640px] mx-auto mb-16">
          <div className="label-tag justify-center pl-8">Angebote</div>
          <h1 className="h-xl mb-4">
            Meine <span className="text-primary">Angebote</span>
          </h1>
          <p className="text-muted text-lg">
            Vier Bereiche, eine Philosophie: individuelle Förderung und echte Entwicklung.
          </p>
        </RevealOnScroll>

        <div className="flex flex-col gap-8">
          {offers.map((offer, i) => (
            <RevealOnScroll key={offer.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="bg-surface border border-border rounded-[20px] overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-[0_0_40px_rgba(91,141,239,0.12)] grid grid-cols-1 md:grid-cols-[1fr_2fr]">
                <div
                  className={`p-10 flex items-center justify-center min-h-[240px] bg-gradient-to-br ${offer.gradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-5" style={{backgroundImage:"repeating-linear-gradient(45deg,currentColor 0,currentColor 1px,transparent 0,transparent 50%)",backgroundSize:"20px 20px"}} />
                  <span className="text-[5rem] z-10">{offer.icon}</span>
                </div>
                <div className="p-8 md:p-10 flex flex-col">
                  <Badge color={offer.badgeColor} className="self-start">{offer.badge}</Badge>
                  <h2 className="font-display text-2xl font-bold my-3">{offer.title}</h2>
                  <p className="text-muted leading-relaxed mb-6">{offer.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {offer.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-sm text-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {offer.prices.map((p) => (
                      <div key={p.id} className={`px-4 py-2 rounded-xl border text-sm ${p.highlighted ? "border-primary bg-primary-dim" : "border-border"}`}>
                        <span className="font-semibold text-primary">{formatPrice(p.price)}</span>
                        <span className="text-muted ml-1">{p.unit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <Button asChild>
                      <Link href={`/angebote/${offer.slug}`}>Details & Preise</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={offer.ctaLink}>{offer.ctaText}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
