import RevealOnScroll from "@/components/shared/RevealOnScroll";
import type { Testimonial } from "@/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="section">
      <div className="container-custom">
        <RevealOnScroll className="text-center max-w-[560px] mx-auto">
          <div className="label-tag justify-center pl-8">Stimmen</div>
          <h2 className="h-lg">Was Teilnehmer sagen</h2>
          <p className="text-muted mt-4">
            Echtes Feedback aus Kursen und dem Vereinsleben
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {testimonials.map((t, i) => (
            <RevealOnScroll key={t.id} delay={i as 0 | 1 | 2}>
              <div className="bg-surface border border-border rounded-[20px] p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-4 text-primary">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j}>★</span>
                  ))}
                </div>
                <p className="text-[0.95rem] leading-relaxed text-muted mb-6 italic flex-1">
                  &bdquo;{t.quote}&ldquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-[42px] h-[42px] rounded-full bg-primary-dim flex items-center justify-center font-bold text-[0.95rem] text-primary">
                    {t.authorInitials}
                  </div>
                  <div>
                    <div className="font-semibold text-[0.9rem]">
                      {t.authorName}
                    </div>
                    <div className="text-[0.78rem] text-muted">
                      {t.authorRole}
                    </div>
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
