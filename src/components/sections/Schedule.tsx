import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import type { ScheduleItem } from "@/types";
import { formatPrice } from "@/lib/utils";

interface ScheduleProps {
  schedule: ScheduleItem[];
}

export default function Schedule({ schedule }: ScheduleProps) {
  return (
    <section
      className="section bg-surface border-t border-b border-border"
      id="termine"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 items-start">
          <RevealOnScroll>
            <div className="label-tag">Termine & Buchung</div>
            <h2 className="h-lg mb-6">
              Aktuelle Kurs&shy;<span className="text-primary">termine</span>
            </h2>
            <p className="text-muted mb-10 text-[1.05rem]">
              Alle Kurse finden in Hamburg statt. Genaue Orte nach
              Buchungsbestätigung. Plätze sind begrenzt!
            </p>

            <div className="bg-surface border border-border rounded-[20px] overflow-hidden">
              <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                <span className="font-semibold">📅 Wöchentliche Kurse</span>
                <Badge color="primary">Laufend</Badge>
              </div>

              {schedule.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center px-6 py-4 border-b border-border last:border-b-0 hover:bg-surface2 transition-colors"
                >
                  <div className="font-semibold text-[0.9rem]">{item.day}</div>
                  <div className="text-muted text-[0.85rem]">{item.time}</div>
                  <div className="hidden md:flex items-center gap-2">
                    <Badge color={item.badgeColor}>{item.type}</Badge>
                    {item.price !== undefined && (
                      <span className="text-xs text-muted">
                        {formatPrice(item.price)}
                      </span>
                    )}
                  </div>
                  <div className="hidden md:block">
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
              ⏱ Zeiten sind Richtwerte – werden individuell abgestimmt
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={2}>
            <div className="flex flex-col gap-5">
              <div className="bg-surface border border-border rounded-[20px] p-8">
                <div className="text-[2rem] mb-3">📬</div>
                <h3 className="h-sm mb-2.5">Individuelle Anfrage</h3>
                <p className="text-muted text-[0.9rem] mb-5">
                  Kein passender Termin? Kein Problem – ich finde gemeinsam mit
                  dir eine Lösung.
                </p>
                <Button className="w-full" asChild>
                  <Link href="/kontakt?buchen=true">Termin anfragen</Link>
                </Button>
              </div>

              <div className="bg-surface border border-border rounded-[20px] p-8">
                <div className="text-[2rem] mb-3">🏏</div>
                <h3 className="h-sm mb-2.5">Schlagball Hamburg</h3>
                <p className="text-muted text-[0.9rem] mb-4">
                  Trainingszeiten und Turniertermine des Vereins auf Anfrage.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/kontakt?interesse=schlagball">
                    Vereinsinfos anfragen
                  </Link>
                </Button>
              </div>

              <div className="bg-primary-dim border border-[rgba(91,141,239,0.25)] rounded-[20px] p-6">
                <div className="text-lg font-semibold mb-2">📅 Kalender</div>
                <p className="text-muted text-[0.85rem] mb-3">
                  Termine werden zentral über das Buchungssystem verwaltet.
                  Aktuelle Verfügbarkeiten findest du hier oder auf Anfrage.
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/termine">Zur Terminübersicht →</Link>
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
