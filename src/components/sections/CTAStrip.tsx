import Link from "next/link";
import { Button } from "@/components/ui/button";
import RevealOnScroll from "@/components/shared/RevealOnScroll";

export default function CTAStrip() {
  return (
    <section className="section--sm">
      <div className="container-custom">
        <RevealOnScroll>
          <div className="bg-gradient-to-br from-surface to-surface2 border border-border rounded-[20px] px-10 md:px-20 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute -right-24 top-1/2 -translate-y-1/2 text-[20rem] opacity-[0.03] pointer-events-none leading-none">
              🏆
            </div>
            <div className="flex-1">
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-[1.1]">
                Bereit loszulegen?
                <br />
                <span className="text-primary">Melde dich jetzt an.</span>
              </h2>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button size="lg" asChild>
                <Link href="/kontakt?buchen=true">Kurs buchen</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/kontakt">Kontakt aufnehmen</Link>
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
