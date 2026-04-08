"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RevealOnScroll from "@/components/shared/RevealOnScroll";

const interests = [
  "Bitte wählen...",
  "DenkSport – Zauberwürfel",
  "DenkSport – Schach",
  "Schwimmunterricht",
  "Badminton-Training",
  "Schlagball Hamburg (Verein)",
  "Beratung / Sonstiges",
];

const socialLinks = [
  { href: "https://instagram.com", icon: "📷", label: "Instagram" },
  { href: "#", icon: "👥", label: "Facebook" },
  { href: "#", icon: "▶️", label: "YouTube" },
  { href: "#", icon: "🎵", label: "TikTok" },
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="section" id="kontakt">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <RevealOnScroll>
            <div className="label-tag">Kontakt</div>
            <h2 className="h-lg mb-6">Lass uns sprechen</h2>
            <p className="text-muted text-[1.05rem] mb-10 leading-relaxed">
              Fragen zu einem Kurs, Vereinsbeitritt oder einfach Hallo? Ich
              antworte innerhalb von 48 Stunden.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-primary-dim rounded-[10px] flex items-center justify-center text-lg shrink-0">
                  📧
                </div>
                <div>
                  <div className="text-[0.78rem] text-muted tracking-widest uppercase font-semibold">
                    E-Mail
                  </div>
                  <div className="font-medium mt-0.5">
                    trainer@example.com{" "}
                    <em className="text-muted not-italic text-[0.8rem]">
                      [Platzhalter]
                    </em>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-primary-dim rounded-[10px] flex items-center justify-center text-lg shrink-0">
                  📍
                </div>
                <div>
                  <div className="text-[0.78rem] text-muted tracking-widest uppercase font-semibold">
                    Standort
                  </div>
                  <div className="font-medium mt-0.5">
                    Hamburg, Deutschland
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-primary-dim rounded-[10px] flex items-center justify-center text-lg shrink-0">
                  ⏱
                </div>
                <div>
                  <div className="text-[0.78rem] text-muted tracking-widest uppercase font-semibold">
                    Antwortzeit
                  </div>
                  <div className="font-medium mt-0.5">
                    Innerhalb von 48 Stunden
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="text-[0.82rem] text-muted mb-3 tracking-widest uppercase font-semibold">
                Social Media
              </div>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-surface border border-border rounded-[10px] flex items-center justify-center text-lg hover:bg-primary hover:border-primary hover:text-bg hover:-translate-y-0.5 transition-all duration-300"
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={2}>
            <div className="bg-surface border border-border rounded-[20px] p-9">
              <h3 className="h-sm mb-1.5">Nachricht senden</h3>
              <p className="text-[0.85rem] text-muted mb-7">
                * Pflichtfelder
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.85rem] font-semibold text-muted tracking-wide">
                      Vorname *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dein Vorname"
                      className="bg-surface border-[1.5px] border-border rounded-xl px-4 py-3.5 text-text font-body text-[0.95rem] focus:outline-none focus:border-primary transition-colors placeholder:text-muted"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.85rem] font-semibold text-muted tracking-wide">
                      Nachname *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dein Nachname"
                      className="bg-surface border-[1.5px] border-border rounded-xl px-4 py-3.5 text-text font-body text-[0.95rem] focus:outline-none focus:border-primary transition-colors placeholder:text-muted"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.85rem] font-semibold text-muted tracking-wide">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="deine@email.de"
                    className="bg-surface border-[1.5px] border-border rounded-xl px-4 py-3.5 text-text font-body text-[0.95rem] focus:outline-none focus:border-primary transition-colors placeholder:text-muted"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.85rem] font-semibold text-muted tracking-wide">
                    Interesse *
                  </label>
                  <select
                    required
                    className="bg-surface border-[1.5px] border-border rounded-xl px-4 py-3.5 text-text font-body text-[0.95rem] focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                  >
                    {interests.map((opt) => (
                      <option key={opt} value={opt} className="bg-surface">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.85rem] font-semibold text-muted tracking-wide">
                    Nachricht
                  </label>
                  <textarea
                    placeholder="Schreib mir, was du vorhast, auf welchem Level du bist und welche Termine dir passen..."
                    rows={5}
                    className="bg-surface border-[1.5px] border-border rounded-xl px-4 py-3.5 text-text font-body text-[0.95rem] focus:outline-none focus:border-primary transition-colors placeholder:text-muted resize-y min-h-[140px]"
                  />
                </div>

                {submitted && (
                  <div className="bg-[rgba(76,201,122,0.1)] border border-accent-green rounded-xl px-5 py-4 text-accent-green font-medium flex items-center gap-3">
                    ✅ Deine Nachricht wurde gesendet! Ich melde mich bald.
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full">
                  Nachricht senden →
                </Button>

                <p className="text-[0.78rem] text-muted text-center">
                  Mit dem Absenden stimmst du der{" "}
                  <Link href="/datenschutz" className="text-primary hover:underline">
                    Datenschutzerklärung
                  </Link>{" "}
                  zu.
                </p>
              </form>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
