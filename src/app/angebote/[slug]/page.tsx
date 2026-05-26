import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import { getOfferBySlug, getOffers, getSchedule } from "@/lib/strapi";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const offers = await getOffers();
  return offers.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offer = await getOfferBySlug(slug);
  if (!offer) return { title: "Nicht gefunden" };
  return {
    title: `${offer.title} – Trainer Hamburg`,
    description: offer.description,
  };
}

export default async function OfferDetailPage({ params }: Props) {
  const { slug } = await params;
  const [offer, schedule] = await Promise.all([
    getOfferBySlug(slug),
    getSchedule(),
  ]);

  if (!offer) notFound();

  const relatedSchedule = schedule.filter((s) => s.offerSlug === slug);

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Back link */}
        <Link
          href="/angebote"
          className="inline-flex items-center gap-2 text-primary font-semibold mb-12 hover:underline"
        >
          ← Zurück zu allen Angeboten
        </Link>

        {/* Hero section */}
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div
              className={`p-16 flex items-center justify-center min-h-[350px] bg-gradient-to-br ${offer.gradient} rounded-[20px] relative overflow-hidden`}
            >
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg,currentColor 0,currentColor 1px,transparent 0,transparent 50%)",
                  backgroundSize: "20px 20px",
                }}
              />
              <span className="text-[8rem] z-10">{offer.icon}</span>
            </div>

            <div>
              <Badge color={offer.badgeColor} className="mb-4">
                {offer.badge}
              </Badge>
              <h1 className="h-xl mb-6">{offer.title}</h1>
              <p className="text-muted text-lg leading-relaxed mb-8">
                {offer.longDescription}
              </p>
              <div className="flex gap-3 flex-wrap">
                {offer.externalLink ? (
                  <Button size="lg" asChild>
                    <a
                      href={offer.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {offer.ctaText}
                    </a>
                  </Button>
                ) : (
                  <Button size="lg" asChild>
                    <Link href={offer.ctaLink}>{offer.ctaText}</Link>
                  </Button>
                )}
                <Button variant="outline" size="lg" asChild>
                  <Link href="/termine">Termine ansehen</Link>
                </Button>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Features */}
        <RevealOnScroll>
          <div className="mb-20">
            <h2 className="h-lg mb-8">Das erwartet dich</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offer.features.map((f) => (
                <div
                  key={f}
                  className="bg-surface border border-border rounded-xl p-6 flex items-start gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                  <span className="text-text">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Pricing */}
        <RevealOnScroll>
          <div className="mb-20">
            <h2 className="h-lg mb-8">
              Preise & <span className="text-primary">Pakete</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {offer.prices.map((p) => (
                <div
                  key={p.id}
                  className={`bg-surface border rounded-[20px] p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                    p.highlighted
                      ? "border-primary shadow-[0_0_40px_rgba(91,141,239,0.12)]"
                      : "border-border"
                  }`}
                >
                  {p.highlighted && (
                    <Badge color="primary" className="self-start mb-4">
                      Beliebt
                    </Badge>
                  )}
                  <h3 className="font-display text-xl font-bold mb-2">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-display text-4xl font-bold text-primary">
                      {formatPrice(p.price)}
                    </span>
                  </div>
                  <div className="text-sm text-muted mb-4">{p.unit}</div>
                  <p className="text-muted text-sm flex-1 mb-6">
                    {p.description}
                  </p>
                  <Button
                    variant={p.highlighted ? "primary" : "outline"}
                    className="w-full"
                    asChild
                  >
                    <Link href={offer.ctaLink}>{offer.ctaText}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Schedule for this offer */}
        {relatedSchedule.length > 0 && (
          <RevealOnScroll>
            <div className="mb-20">
              <h2 className="h-lg mb-8">Termine</h2>
              <div className="bg-surface border border-border rounded-[20px] overflow-hidden">
                {relatedSchedule.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-center px-6 py-5 border-b border-border last:border-b-0 hover:bg-surface2 transition-colors"
                  >
                    <div className="font-semibold">{item.day}</div>
                    <div className="text-muted text-sm">{item.time}</div>
                    <div className="text-muted text-sm">{item.location}</div>
                    <Button size="sm" asChild>
                      <Link href={offer.ctaLink}>Buchen</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* CTA */}
        <RevealOnScroll>
          <div className="bg-gradient-to-br from-surface to-surface2 border border-border rounded-[20px] p-12 md:p-16 text-center">
            <h2 className="h-lg mb-4">
              Interesse an <span className="text-primary">{offer.title}</span>?
            </h2>
            <p className="text-muted text-lg mb-8 max-w-lg mx-auto">
              Schreib mir eine Nachricht und wir finden gemeinsam den perfekten
              Einstieg für dich.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              {offer.externalLink ? (
                <Button size="lg" asChild>
                  <a
                    href={offer.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {offer.ctaText}
                  </a>
                </Button>
              ) : (
                <Button size="lg" asChild>
                  <Link href={offer.ctaLink}>{offer.ctaText}</Link>
                </Button>
              )}
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
