"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import type { ContactSectionContent, SiteSettings } from "@/types";

const socialLinks = [
  { href: "https://instagram.com", icon: "📷", label: "Instagram" },
  { href: "#", icon: "👥", label: "Facebook" },
  { href: "#", icon: "▶️", label: "YouTube" },
  { href: "#", icon: "🎵", label: "TikTok" },
];

interface ContactSectionProps {
  content: ContactSectionContent;
  settings: SiteSettings;
}

export default function ContactSection({ content, settings }: ContactSectionProps) {
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
            <div className="label-tag">{content.label}</div>
            <h2 className="h-lg mb-6">{content.heading}</h2>
            <p className="text-muted text-[1.05rem] mb-10 leading-relaxed">
              {content.intro}
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-primary-dim rounded-[10px] flex items-center justify-center text-lg shrink-0">
                  📧
                </div>
                <div>
                  <div className="text-[0.78rem] text-muted tracking-widest uppercase font-semibold">
                    {content.emailLabel}
                  </div>
                  <div className="font-medium mt-0.5">{settings.email}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-primary-dim rounded-[10px] flex items-center justify-center text-lg shrink-0">
                  📍
                </div>
                <div>
                  <div className="text-[0.78rem] text-muted tracking-widest uppercase font-semibold">
                    {content.locationLabel}
                  </div>
                  <div className="font-medium mt-0.5">{settings.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-primary-dim rounded-[10px] flex items-center justify-center text-lg shrink-0">
                  ⏱
                </div>
                <div>
                  <div className="text-[0.78rem] text-muted tracking-widest uppercase font-semibold">
                    {content.responseLabel}
                  </div>
                  <div className="font-medium mt-0.5">{settings.responseTime}</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="text-[0.82rem] text-muted mb-3 tracking-widest uppercase font-semibold">
                {content.socialLabel}
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
              <h3 className="h-sm mb-1.5">{content.formHeading}</h3>
              <p className="text-[0.85rem] text-muted mb-7">{content.formIntro}</p>
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
                    {content.interests.map((opt) => (
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
                    {content.successMessage}
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full">
                  {content.submitLabel}
                </Button>

                <p className="text-[0.78rem] text-muted text-center">
                  {content.consentText.includes("Datenschutzerklärung") ? (
                    <>
                      {content.consentText.split("Datenschutzerklärung")[0]}
                      <Link href="/datenschutz" className="text-primary hover:underline">
                        Datenschutzerklärung
                      </Link>
                      {content.consentText.split("Datenschutzerklärung")[1]}
                    </>
                  ) : (
                    content.consentText
                  )}
                </p>
              </form>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
