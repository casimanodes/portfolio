"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import type { FAQItem } from "@/types";

interface FAQSectionProps {
  items: FAQItem[];
}

export default function FAQSection({ items }: FAQSectionProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section
      className="section bg-surface border-t border-b border-border"
      id="faq"
    >
      <div className="container-custom">
        <RevealOnScroll className="text-center max-w-[560px] mx-auto">
          <div className="label-tag justify-center pl-8">FAQ</div>
          <h2 className="h-lg">Häufige Fragen</h2>
        </RevealOnScroll>

        <div className="flex flex-col gap-2 max-w-[800px] mx-auto mt-16">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`bg-surface border rounded-xl overflow-hidden transition-colors ${
                  isOpen ? "border-primary" : "border-border"
                }`}
              >
                <button
                  className={`flex items-center justify-between gap-4 w-full px-6 py-5 font-semibold text-[0.95rem] text-left transition-colors ${
                    isOpen ? "text-primary" : "hover:text-primary"
                  }`}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  {item.question}
                  <span
                    className={`w-6 h-6 border-[1.5px] border-current rounded-full flex items-center justify-center shrink-0 text-base leading-none transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ${
                    isOpen ? "max-h-[300px]" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-5 text-muted text-[0.92rem] leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
