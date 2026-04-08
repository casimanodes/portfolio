import RevealOnScroll from "@/components/shared/RevealOnScroll";

const stats = [
  { value: "9+", label: "Jahre Trainererfahrung" },
  { value: "4", label: "Sportarten & Kurse" },
  { value: "100+", label: "Unterrichtete Stunden" },
  { value: "∞", label: "Motivation für Neues" },
];

export default function Stats() {
  return (
    <section className="section--sm">
      <div className="container-custom">
        <RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-border rounded-[20px] overflow-hidden">
            {stats.map((stat) => (
              <div
                key={stat.label}
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
        <p className="text-center text-muted text-[0.78rem] mt-3">
          Platzhalter – bitte mit echtem Wert ersetzen
        </p>
      </div>
    </section>
  );
}
