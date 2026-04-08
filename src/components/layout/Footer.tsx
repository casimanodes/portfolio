import Link from "next/link";

const offerLinks = [
  { href: "/angebote/denksport", label: "DenkSport" },
  { href: "/angebote/schlagball", label: "Schlagball Hamburg" },
  { href: "/angebote/schwimmen", label: "Schwimmunterricht" },
  { href: "/angebote/badminton", label: "Badminton-Training" },
];

const navLinks = [
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/termine", label: "Termine" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/faq", label: "FAQ" },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram", icon: "📷" },
  { href: "#", label: "Facebook", icon: "👥" },
  { href: "#", label: "YouTube", icon: "▶️" },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-[10px] flex items-center justify-center font-display font-black text-xl text-white">
                T
              </div>
              <div>
                <div className="font-display font-bold text-[1.1rem]">
                  Trainer Hamburg
                </div>
                <div className="text-[0.7rem] text-muted tracking-widest uppercase">
                  Sport & Denken
                </div>
              </div>
            </Link>
            <p className="text-muted text-[0.9rem] leading-relaxed mb-6">
              Lizenzierter Trainer, Lehrer und Vereinsfunktionär aus Hamburg.
              Leidenschaft für Sport, Denken und Entwicklung – für jedes Alter.
            </p>
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

          {/* Angebote */}
          <div>
            <div className="font-bold text-[0.85rem] tracking-widest uppercase text-muted mb-5">
              Angebote
            </div>
            <ul className="flex flex-col gap-2.5">
              {offerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9rem] text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-bold text-[0.85rem] tracking-widest uppercase text-muted mb-5">
              Navigation
            </div>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9rem] text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <div className="font-bold text-[0.85rem] tracking-widest uppercase text-muted mb-5">
              Rechtliches
            </div>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/impressum"
                  className="text-[0.9rem] text-muted hover:text-text transition-colors"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-[0.9rem] text-muted hover:text-text transition-colors"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[0.82rem] text-muted">
            © {new Date().getFullYear()} Trainer Hamburg · Alle Rechte
            vorbehalten
          </div>
          <div className="flex gap-5">
            <Link
              href="/impressum"
              className="text-[0.82rem] text-muted hover:text-text transition-colors"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="text-[0.82rem] text-muted hover:text-text transition-colors"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
