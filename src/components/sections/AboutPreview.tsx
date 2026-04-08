import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import type { AboutContent, BadgeColor } from "@/types";

const badgeColorMap: Record<BadgeColor, string> = {
  primary: "bg-primary-dim text-primary",
  blue: "bg-[rgba(76,169,201,0.15)] text-accent-blue",
  green: "bg-[rgba(76,201,122,0.15)] text-accent-green",
  pink: "bg-[rgba(201,76,122,0.15)] text-accent-pink",
  amber: "bg-[rgba(201,168,76,0.15)] text-accent-amber",
};

interface AboutPreviewProps {
  about: AboutContent;
}

export default function AboutPreview({ about }: AboutPreviewProps) {
  return (
    <section className="section" id="ueber-mich">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Portrait */}
          <RevealOnScroll>
            <div className="w-full aspect-[3/4] bg-surface2 rounded-[20px] border border-border flex flex-col items-center justify-center gap-3 text-muted text-[0.9rem] relative overflow-hidden">
              {about.portraitImage ? (
                <Image
                  src={about.portraitImage}
                  alt="Portrait"
                  fill
                  className="object-cover"
                />
              ) : (
                <>
                  <div className="text-[4rem]">👤</div>
                  <div className="text-[0.85rem] text-muted">[Foto Platzhalter]</div>
                </>
              )}
              <div className="absolute bottom-0 right-0 w-[120px] h-[120px] bg-primary rounded-tl-[20px] flex items-center justify-center font-display text-[0.8rem] font-bold text-white text-center leading-tight p-4 z-10 whitespace-pre-line">
                {about.portraitBadgeText}
              </div>
              <div className="absolute top-6 right-0 bg-surface border border-border rounded-xl p-3 shadow-[0_4px_24px_rgba(0,0,0,0.4)] z-10">
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
              {about.headline}
              <br />
              <span className="text-primary">{about.highlightedWord}</span>
            </h2>
            <p className="text-muted text-[1.05rem] leading-relaxed mb-4">
              {about.text1}
            </p>
            <p className="text-muted text-[1.05rem] leading-relaxed mb-7">
              {about.text2}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {about.qualifications.map((q) => (
                <div key={q.id} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary-dim rounded-lg flex items-center justify-center text-base shrink-0 mt-0.5">
                    {q.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-[0.9rem]">{q.title}</div>
                    <div className="text-[0.82rem] text-muted mt-0.5">{q.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2.5 mb-8">
              {about.tags.map((t) => (
                <span
                  key={t.id}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-[0.8rem] font-semibold ${badgeColorMap[t.color]}`}
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
