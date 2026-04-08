import Link from "next/link";
import { Button } from "@/components/ui/button";
import DynamicFrameLayout, { type ThemenbereichItem } from "@/components/shared/DynamicFrameLayout";
import type { ScheduleItem } from "@/types";
import { formatPrice } from "@/lib/utils";

interface HeroProps {
  nextSchedule?: ScheduleItem[];
  themenbereiche?: ThemenbereichItem[];
}

export default function Hero({ nextSchedule, themenbereiche = [] }: HeroProps) {
  const next = nextSchedule?.[0];

  return (
    <section className="min-h-screen grid place-items-center relative overflow-hidden pt-[120px] pb-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute w-[800px] h-[800px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(91,141,239,0.08)_0%,transparent_70%)]" />
        <div className="absolute w-[500px] h-[500px] rounded-full top-[20%] right-[10%] bg-[radial-gradient(circle,rgba(76,169,201,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[rgba(91,141,239,0.25)] rounded-full text-[0.8rem] font-medium text-primary bg-primary-dim mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-[pulse-dot_2s_infinite]" />
              Lizenzierter Trainer & Berater · Hamburg
            </div>

            <h1 className="font-display text-[clamp(3rem,6vw,5.5rem)] font-black leading-[1.05] tracking-tight mb-6">
              Sport. Denken.
              <br />
              <em className="italic text-primary">Entwicklung.</em>
            </h1>

            <p className="text-[1.15rem] text-muted leading-relaxed mb-10 max-w-[480px]">
              Knapp ein Jahrzehnt Erfahrung als Trainer, Lehrer und
              Vereinsfunktionär. DenkSport, Schwimmen, Badminton und Schlagball
              – professionell, individuell, leidenschaftlich.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <Button size="lg" asChild>
                <Link href="/kontakt?buchen=true">Kurs anfragen</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/angebote">Alle Angebote</Link>
              </Button>
            </div>

            <div className="flex gap-8 mt-14 pt-10 border-t border-border">
              <div>
                <div className="font-display text-4xl font-bold text-primary leading-none">
                  9+
                </div>
                <div className="text-[0.82rem] text-muted mt-1">
                  Jahre Erfahrung
                </div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold text-primary leading-none">
                  4
                </div>
                <div className="text-[0.82rem] text-muted mt-1">
                  Disziplinen
                </div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold text-primary leading-none">
                  1.
                </div>
                <div className="text-[0.82rem] text-muted mt-1">
                  Vorstand Schlagball HH
                </div>
              </div>
            </div>
          </div>

          {/* Right: Dynamic Frame Grid */}
          <div className="hidden lg:flex flex-col gap-4">
            {themenbereiche.length > 0 && (
              <DynamicFrameLayout items={themenbereiche} />
            )}

            {next && (
              <div className="bg-primary-dim border border-[rgba(91,141,239,0.25)] rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">📅</span>
                <div className="flex-1">
                  <div className="font-semibold text-[0.9rem]">
                    Nächste freie Termine
                  </div>
                  <div className="text-[0.8rem] text-muted">
                    {next.type} · {next.day} {next.time}
                    {next.price ? ` · ab ${formatPrice(next.price)}` : ""}
                  </div>
                </div>
                <Button size="sm" asChild>
                  <Link href="/termine">Buchen</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
