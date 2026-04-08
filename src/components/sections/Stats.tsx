import RevealOnScroll from "@/components/shared/RevealOnScroll";
import type { StatItem } from "@/types";

interface StatsProps {
  stats: StatItem[];
}

export default function Stats({ stats }: StatsProps) {
  return (
    <section className="section--sm">
      <div className="container-custom">
        <RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-border rounded-[20px] overflow-hidden">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-surface py-12 px-8 text-center transition-colors hover:bg-surface2"
              >
                <div className="font-display text-[3.5rem] font-black text-primary leading-none mb-2">
                  {stat.value}
                </div>
                <div className="text-[0.9rem] text-muted font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
