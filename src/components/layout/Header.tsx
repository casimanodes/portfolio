"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const offerLinks = [
  { href: "/angebote/denksport", label: "DenkSport", icon: "🧩" },
  { href: "/angebote/schlagball", label: "Schlagball", icon: "🏏" },
  { href: "/angebote/schwimmen", label: "Schwimmen", icon: "🏊" },
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
  const [offersOpen, setOffersOpen] = useState(false);

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
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
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

            <ul className="hidden lg:flex items-center gap-1">
              {/* Angebote Dropdown */}
              <li className="relative">
                <button
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-[0.9rem] font-medium text-muted hover:text-text hover:bg-surface transition-all duration-300"
                  onClick={() => setOffersOpen(!offersOpen)}
                  onBlur={() => setTimeout(() => setOffersOpen(false), 200)}
                >
                  Angebote <ChevronDown className={`w-4 h-4 transition-transform ${offersOpen ? "rotate-180" : ""}`} />
                </button>
                {offersOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-surface border border-border rounded-xl p-2 shadow-[0_4px_24px_rgba(0,0,0,0.4)] z-50">
                    {offerLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-[0.9rem] text-muted hover:text-text hover:bg-surface2 transition-all"
                        onClick={() => setOffersOpen(false)}
                      >
                        <span className="text-lg">{link.icon}</span>
                        {link.label}
                      </Link>
                    ))}
                    <div className="border-t border-border mt-1 pt-1">
                      <Link
                        href="/angebote"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-[0.9rem] text-primary hover:bg-primary-dim transition-all"
                        onClick={() => setOffersOpen(false)}
                      >
                        Alle Angebote →
                      </Link>
                    </div>
                  </div>
                )}
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="px-4 py-2 rounded-lg text-[0.9rem] font-medium text-muted hover:text-text hover:bg-surface transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/kontakt">Kontakt</Link>
              </Button>
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
