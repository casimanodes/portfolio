"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const offerLinks = [
  { href: "/angebote/zauberwuerfel", label: "Zauberwürfel", icon: "🧩" },
  { href: "/angebote/schach", label: "Schach", icon: "♞" },
  { href: "/angebote/schlagball", label: "Schlagball", icon: "🏓" },
  { href: "/angebote/badminton", label: "Badminton", icon: "🏸" },
];

const navLinks = [
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/termine", label: "Termine" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] py-5 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(10,10,18,0.93)] backdrop-blur-[20px] py-3.5 border-b border-border"
            : ""
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 bg-primary rounded-[10px] flex items-center justify-center font-display font-black text-xl text-white">
                T
              </div>
              <div>
                <div className="font-display font-bold text-[1.1rem]">
                  Trainer Hamburg
                </div>
                <div className="text-[0.7rem] text-muted tracking-widest uppercase -mt-0.5">
                  Sport & Denken
                </div>
              </div>
            </Link>

            {/* Angebote direkt sichtbar */}
            <ul className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {offerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-[0.9rem] font-medium text-text/90 hover:text-text hover:bg-surface transition-all duration-300"
                  >
                    <span className="text-base leading-none">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mx-2 h-6 w-px bg-border" aria-hidden />
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="px-3 py-2 rounded-lg text-[0.9rem] font-medium text-muted hover:text-text hover:bg-surface transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Button size="sm" asChild>
                <Link href="/kontakt?buchen=true">Kurs buchen</Link>
              </Button>
            </div>

            <button
              className="flex lg:hidden flex-col gap-[5px] p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-bg z-[999] pt-24 px-6 pb-10 flex flex-col gap-2 overflow-y-auto lg:hidden">
          <div className="text-[0.7rem] text-muted tracking-widest uppercase font-semibold mb-2 px-5">
            Angebote
          </div>
          {offerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 text-[1.1rem] px-5 py-3 rounded-lg hover:bg-surface transition-all"
              onClick={() => setMobileOpen(false)}
            >
              <span>{link.icon}</span> {link.label}
            </Link>
          ))}
          <div className="border-t border-border my-2" />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[1.1rem] px-5 py-3 rounded-lg hover:bg-surface transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Button size="lg" asChild>
              <Link href="/kontakt?buchen=true" onClick={() => setMobileOpen(false)}>
                Kurs buchen
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/kontakt" onClick={() => setMobileOpen(false)}>
                Kontakt
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
