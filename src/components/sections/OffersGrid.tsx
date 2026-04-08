import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import type { Offer } from "@/types";
import { formatPrice } from "@/lib/utils";

interface OffersGridProps {
  offers: Offer[];
}

export default function OffersGrid({ offers }: OffersGridProps) {
  const featured = offers[0];
  const rest = offers.slice(1);

  return (
    <section className="section" id="angebote">
      <div className="container-custom">
        <RevealOnScroll className="text-center max-w-[640px] mx-auto">
          <div className="label-tag justify-center pl-8">Meine Angebote</div>
          <h2 className="h-lg">Was ich dir bieten kann</h2>
          <p className="text-muted mt-4 text-[1.05rem]">
            Von DenkSport bis Vereinstraining – vier Bereiche, eine Philosophie:
            individuelle Förderung, echte Entwicklung.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {/* Featured card */}
          {featured && (
            <RevealOnScroll className="md:col-span-2">
              <div className="bg-surface border border-border rounded-[20px] overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-[0_0_40px_rgba(91,141,239,0.12)] hover:-translate-y-1.5 grid grid-cols-1 md:grid-cols-2">
                <div
                  className={`p-10 flex items-center justify-center min-h-[200px] relative overflow-hidden bg-gradient-to-br ${featured.gradient}`}
                >
                  <div className="absolute inset-0 opacity-5" style={{backgroundImage:"repeating-linear-gradient(45deg,currentColor 0,currentColor 1px,transparent 0,transparent 50%)",backgroundSize:"20px 20px"}} />
                  <span className="text-[5rem] z-10 transition-transform duration-400 hover:scale-110 hover:-rotate-[5deg]">
                    {featured.icon}
                  </span>
                </div>
                <div className="p-8 flex flex-col">
                  <Badge color={featured.badgeColor}>{featured.badge}</Badge>
                  <h3 className="font-display text-[1.6rem] font-bold my-3">
                    {featured.title}
                  </h3>
                  <p className="text-muted text-[0.95rem] leading-relaxed flex-1 mb-6">
                    {featured.description}
                  </p>
                  <div className="flex flex-col gap-2 mb-6">
                    {featured.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-[0.88rem] text-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  {featured.prices[0] && (
                    <div className="text-sm text-muted mb-4">
                      ab <span className="text-primary font-semibold">{formatPrice(featured.prices[0].price)}</span> {featured.prices[0].unit}
                    </div>
                  )}
                  <div className="flex gap-3 flex-wrap">
                    <Button asChild>
                      <Link href={`/angebote/${featured.slug}`}>
                        {featured.ctaText}
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/angebote/${featured.slug}`}>
                        Details & Preise
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          )}

          {/* Other cards */}
          {rest.map((offer, i) => (
            <RevealOnScroll key={offer.id} delay={(i + 1) as 1 | 2 | 3}>
              <div className="bg-surface border border-border rounded-[20px] overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-[0_0_40px_rgba(91,141,239,0.12)] hover:-translate-y-1.5 flex flex-col h-full">
                <div
                  className={`p-10 flex items-center justify-center min-h-[200px] relative overflow-hidden bg-gradient-to-br ${offer.gradient}`}
                >
                  <div className="absolute inset-0 opacity-5" style={{backgroundImage:"repeating-linear-gradient(45deg,currentColor 0,currentColor 1px,transparent 0,transparent 50%)",backgroundSize:"20px 20px"}} />
                  <span className="text-[5rem] z-10">
                    {offer.icon}
                  </span>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <Badge color={offer.badgeColor}>{offer.badge}</Badge>
                  <h3 className="font-display text-[1.6rem] font-bold my-3">
                    {offer.title}
                  </h3>
                  <p className="text-muted text-[0.95rem] leading-relaxed flex-1 mb-6">
                    {offer.description}
                  </p>
                  <div className="flex flex-col gap-2 mb-6">
                    {offer.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-[0.88rem] text-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  {offer.prices[0] && (
                    <div className="text-sm text-muted mb-4">
                      ab <span className="text-primary font-semibold">{formatPrice(offer.prices[0].price)}</span> {offer.prices[0].unit}
                    </div>
                  )}
                  <div className="flex gap-3 flex-wrap">
                    <Button asChild>
                      <Link href={`/angebote/${offer.slug}`}>
                        {offer.ctaText}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
