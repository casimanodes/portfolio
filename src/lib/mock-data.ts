import type {
  Offer,
  ScheduleItem,
  Testimonial,
  FAQItem,
  HeroContent,
  StatItem,
  AboutContent,
  SiteSettings,
} from "@/types";
import type { ThemenbereichItem } from "@/components/shared/DynamicFrameLayout";

// ── Site Settings ──
export const mockSiteSettings: SiteSettings = {
  siteName: "Trainer Hamburg",
  siteSubtitle: "Sport & Denken",
  logoText: "T",
  email: "trainer@example.com",
  location: "Hamburg, Deutschland",
  responseTime: "Innerhalb von 48 Stunden",
  socialInstagram: "https://instagram.com",
  socialFacebook: "",
  socialYoutube: "",
  socialTiktok: "",
};

// ── Hero Content ──
export const mockHero: HeroContent = {
  tagline: "Lizenzierter Trainer & Berater \u00b7 Hamburg",
  titleLine1: "Sport. Denken.",
  titleLine2: "Entwicklung.",
  description:
    "Knapp ein Jahrzehnt Erfahrung als Trainer, Lehrer und Vereinsfunktion\u00e4r. Zauberw\u00fcrfel, Schach, Schlagball und Badminton \u2013 professionell, individuell, leidenschaftlich.",
  ctaPrimaryText: "Kurs anfragen",
  ctaPrimaryLink: "/kontakt?buchen=true",
  ctaSecondaryText: "Alle Angebote",
  ctaSecondaryLink: "/angebote",
};

// ── Stats ──
export const mockStats: StatItem[] = [
  { id: 1, value: "9+", label: "Jahre Trainererfahrung", reihenfolge: 1 },
  { id: 2, value: "4", label: "Sportarten & Kurse", reihenfolge: 2 },
  { id: 3, value: "100+", label: "Unterrichtete Stunden", reihenfolge: 3 },
  { id: 4, value: "\u221e", label: "Motivation f\u00fcr Neues", reihenfolge: 4 },
];

// ── About ──
export const mockAbout: AboutContent = {
  headline: "Trainer aus",
  highlightedWord: "Leidenschaft.",
  text1: "Seit knapp einem Jahrzehnt begleite ich Menschen auf ihrem Weg \u2013 egal ob es darum geht, den Zauberw\u00fcrfel zu l\u00f6sen, die ersten Z\u00fcge im Schach zu meistern, auf dem Badminton-Court zu gl\u00e4nzen oder im Schlagball-Verein Teil eines Teams zu werden.",
  text2: "Als lizenzierter Trainer und 1. Vorstand des Schlagball Hamburg e.V. bringe ich nicht nur sportliches Know-how mit, sondern auch echtes Organisationstalent und Leidenschaft f\u00fcr Gemeinschaft und faire Entwicklung.",
  portraitBadgeText: "Lizenzierter\nTrainer",
  qualifications: [
    { id: 1, icon: "\ud83c\udf96\ufe0f", title: "Lizenzierter Trainer", description: "Offizielle Trainer- & Beraterlizenz" },
    { id: 2, icon: "\ud83c\udfdb\ufe0f", title: "Vereinsvorstand", description: "1. Vorstand Schlagball Hamburg" },
    { id: 3, icon: "\ud83d\udcda", title: "Erfahrener Lehrer", description: "Unterricht auf allen Levels" },
    { id: 4, icon: "\ud83e\udd1d", title: "Berater", description: "Vereins- & Organisationsberatung" },
  ],
  tags: [
    { id: 1, label: "\ud83c\udf93 Trainerlizenz", color: "primary" },
    { id: 2, label: "\ud83e\udde9 Zauberw\u00fcrfel", color: "blue" },
    { id: 3, label: "\u265e Schach", color: "amber" },
    { id: 4, label: "\ud83c\udff8 Badminton", color: "green" },
    { id: 5, label: "\ud83c\udfd3 Schlagball", color: "pink" },
  ],
};

// ── Angebote ──
export const mockOffers: Offer[] = [
  {
    id: 1,
    slug: "zauberwuerfel",
    title: "Zauberw\u00fcrfel",
    shortTitle: "Zauberw\u00fcrfel",
    description:
      "Lerne den Zauberw\u00fcrfel systematisch zu l\u00f6sen \u2013 von den ersten Schritten bis zum Speed-Cubing. F\u00fcr alle Altersgruppen geeignet.",
    longDescription:
      "Im Zauberw\u00fcrfel-Kurs lernst du Schritt f\u00fcr Schritt, den Cube zu l\u00f6sen \u2013 von den Grundlagen bis hin zu Speed-Cubing-Techniken. Wir starten mit einer einfachen Anf\u00e4nger-Methode und arbeiten uns je nach Tempo zu fortgeschrittenen Algorithmen vor. Geeignet f\u00fcr Kinder, Jugendliche und Erwachsene \u2013 alleine oder in der Gruppe. Mein Ziel: Dass du nicht nur die Technik beherrschst, sondern echtes Verst\u00e4ndnis f\u00fcr Muster, Logik und Geduld entwickelst.",
    icon: "\ud83e\udde9",
    badge: "DenkSport",
    badgeColor: "primary",
    gradient: "from-[#1a1a2e] to-[#16213e]",
    features: [
      "Anf\u00e4nger-Methode in wenigen Stunden",
      "Speed-Cubing-Techniken f\u00fcr Fortgeschrittene",
      "Gruppen- und Einzelkurse verf\u00fcgbar",
      "Fester Termin montags",
    ],
    prices: [
      { id: 1, name: "Einzelstunde", price: 35, unit: "pro Stunde", description: "60 Min. individuelles Training" },
      { id: 2, name: "Gruppenkurs (4er)", price: 20, unit: "pro Person / Stunde", description: "60 Min. in Kleingruppe (max. 4 Pers.)", highlighted: true },
      { id: 3, name: "10er-Karte", price: 170, unit: "einmalig", description: "10 Gruppenstunden, 6 Monate g\u00fcltig" },
    ],
    ctaText: "Termin anfragen",
    ctaLink: "/kontakt?interesse=zauberwuerfel",
  },
  {
    id: 2,
    slug: "schach",
    title: "Schachunterricht",
    shortTitle: "Schach",
    description:
      "Vom ersten Zug bis zur Er\u00f6ffnungstheorie: Strukturierter Schachunterricht f\u00fcr Anf\u00e4nger und Vereinsspieler \u2013 individuell und mit echtem Spielverst\u00e4ndnis.",
    longDescription:
      "Im Schachkurs arbeiten wir an deiner Er\u00f6ffnung, Mittelspielstrategie und Endspieltheorie. F\u00fcr Anf\u00e4nger beginnt es mit den Grundregeln, Taktik-Mustern und ersten Er\u00f6ffnungen. Fortgeschrittene vertiefen Stellungsspiel, Positions\u00fcberlegungen und Turniervorbereitung. Geeignet f\u00fcr Kinder, Jugendliche und Erwachsene \u2013 vom Hobbyspieler bis zum ambitionierten Vereinsspieler. Einzel- und Gruppenunterricht m\u00f6glich.",
    icon: "\u265e",
    badge: "DenkSport",
    badgeColor: "primary",
    gradient: "from-[#1f1a2e] to-[#1a1630]",
    features: [
      "Grundlagen, Taktik & Strategie",
      "Er\u00f6ffnungsrepertoire & Endspieltheorie",
      "Einzel- und Gruppenunterricht",
      "Fester Termin mittwochs",
    ],
    prices: [
      { id: 1, name: "Einzelstunde", price: 35, unit: "pro Stunde", description: "60 Min. individuelles Training" },
      { id: 2, name: "Gruppenkurs (4er)", price: 20, unit: "pro Person / Stunde", description: "60 Min. in Kleingruppe (max. 4 Pers.)", highlighted: true },
      { id: 3, name: "10er-Karte", price: 170, unit: "einmalig", description: "10 Gruppenstunden, 6 Monate g\u00fcltig" },
    ],
    ctaText: "Termin anfragen",
    ctaLink: "/kontakt?interesse=schach",
  },
  {
    id: 3,
    slug: "schlagball",
    title: "Schlagball Hamburg",
    shortTitle: "Schlagball",
    description:
      "Als 1. Vorstand des Schlagball Hamburg e.V. organisiere ich Vereinstraining, Turniere und Gemeinschaftsaktivit\u00e4ten. Komm in unser Team!",
    longDescription:
      "Schlagball Hamburg e.V. ist ein aktiver Sportverein mit einer gro\u00dfartigen Gemeinschaft. Als 1. Vorstand k\u00fcmmere ich mich pers\u00f6nlich um Organisation, Training und Wettk\u00e4mpfe. Unser Vereinstraining findet regelm\u00e4\u00dfig statt und ist offen f\u00fcr alle \u2013 vom Einsteiger bis zum erfahrenen Spieler. Wir nehmen an Turnieren teil und organisieren eigene Events. Werde Teil unseres Teams und erlebe Mannschaftssport, der verbindet!",
    icon: "\ud83c\udfd3",
    badge: "Verein",
    badgeColor: "green",
    gradient: "from-[#1a2e1a] to-[#162e16]",
    features: [
      "Regelm\u00e4\u00dfiges Vereinstraining",
      "Turniere & Wettk\u00e4mpfe",
      "Offen f\u00fcr Einsteiger & Erfahrene",
      "Starke Gemeinschaft & Teamgeist",
    ],
    prices: [
      { id: 1, name: "Mitgliedsbeitrag", price: 10, unit: "pro Monat", description: "Voller Zugang zu Training & Vereinsleben", highlighted: true },
      { id: 2, name: "Schnuppertraining", price: 0, unit: "kostenlos", description: "Erstes Training zum Kennenlernen" },
    ],
    ctaText: "Zum Verein \u2192",
    ctaLink: "/kontakt?interesse=schlagball",
    externalLink: "https://schlagball-hamburg.de",
  },
  {
    id: 4,
    slug: "badminton",
    title: "Badminton-Training",
    shortTitle: "Badminton",
    description:
      "Als Leiter meiner eigenen Trainingsgruppe biete ich strukturiertes Badminton-Training mit Fokus auf Technik, Spielverst\u00e4ndnis und Freude am Spiel.",
    longDescription:
      "Meine Badminton-Trainingsgruppe bietet strukturiertes Training f\u00fcr alle Niveaus. Wir arbeiten an Schlagtechnik, Laufarbeit, Spieltaktik und Kondition. Ob du gerade erst anf\u00e4ngst oder schon Turniererfahrung hast \u2013 das Training wird individuell angepasst. In freundlicher Atmosph\u00e4re verbessern wir gemeinsam dein Spiel. Regelm\u00e4\u00dfiges Training sorgt f\u00fcr sichtbare Fortschritte und jede Menge Spa\u00df auf dem Court.",
    icon: "\ud83c\udff8",
    badge: "Training",
    badgeColor: "pink",
    gradient: "from-[#2b1a1a] to-[#2e1616]",
    features: [
      "Eigene Trainingsgruppe",
      "Technik & Taktik",
      "F\u00fcr alle Niveaus",
      "Regelm\u00e4\u00dfiges Training",
    ],
    prices: [
      { id: 1, name: "Gruppentraining", price: 15, unit: "pro Person / Training", description: "90 Min. Gruppentraining", highlighted: true },
      { id: 2, name: "Einzeltraining", price: 40, unit: "pro Stunde", description: "60 Min. individuelles Techniktraining" },
      { id: 3, name: "Monatskarte", price: 50, unit: "pro Monat", description: "Unbegrenzt Gruppentraining (4x/Monat)" },
    ],
    ctaText: "Gruppe beitreten",
    ctaLink: "/kontakt?interesse=badminton",
  },
];

// ── Termine ──
export const mockSchedule: ScheduleItem[] = [
  { id: 1, day: "Montag", time: "18:00 \u2013 19:30 Uhr", type: "Zauberw\u00fcrfel", offerSlug: "zauberwuerfel", badgeColor: "primary", location: "Hamburg [Ort auf Anfrage]", spotsLeft: 3, price: 20 },
  { id: 2, day: "Mittwoch", time: "17:00 \u2013 18:30 Uhr", type: "Schach", offerSlug: "schach", badgeColor: "primary", location: "Hamburg [Ort auf Anfrage]", spotsLeft: 5, price: 20 },
  { id: 3, day: "Donnerstag", time: "19:00 \u2013 20:30 Uhr", type: "Badminton", offerSlug: "badminton", badgeColor: "pink", location: "Sporthalle Hamburg [Platzhalter]", spotsLeft: 6, price: 15 },
  { id: 4, day: "Wochenende", time: "Variabel", type: "Schlagball", offerSlug: "schlagball", badgeColor: "green", location: "Sportplatz Hamburg [Platzhalter]" },
];

// ── Testimonials ──
export const mockTestimonials: Testimonial[] = [
  { id: 1, quote: "Der Zauberw\u00fcrfel-Kurs hat mein Denken ver\u00e4ndert. Nach nur drei Stunden konnte ich den W\u00fcrfel selbstst\u00e4ndig l\u00f6sen. Absolut empfehlenswert!", authorName: "Max L.", authorRole: "Zauberw\u00fcrfel-Teilnehmer [Platzhalter]", authorInitials: "ML", rating: 5 },
  { id: 2, quote: "Mein Sohn war im Schach komplett blockiert. Nach wenigen Stunden hatte er nicht nur einen klaren Plan im Kopf, sondern auch wieder Spa\u00df am Spiel.", authorName: "Sarah K.", authorRole: "Elternteil, Schachkurs [Platzhalter]", authorInitials: "SK", rating: 5 },
  { id: 3, quote: "Als 1. Vorstand hat er den Verein wirklich vorangebracht \u2013 tolle Organisation, klare Kommunikation und echter Teamgeist.", authorName: "Thomas H.", authorRole: "Vereinsmitglied Schlagball HH [Platzhalter]", authorInitials: "TH", rating: 5 },
];

// ── FAQ ──
export const mockFAQ: FAQItem[] = [
  { id: 1, question: "F\u00fcr wen sind die Kurse geeignet?", answer: "Alle Kurse sind f\u00fcr Anf\u00e4nger und Fortgeschrittene geeignet. Ich passe den Unterricht individuell an deinen Kenntnisstand an \u2013 egal ob du gerade erst anf\u00e4ngst oder bereits Grundkenntnisse mitbringst." },
  { id: 2, question: "Wie gro\u00df sind die Kursgruppen?", answer: "Die Gruppen sind bewusst klein gehalten (max. 6\u20138 Personen), damit jeder genug individuelle Aufmerksamkeit bekommt. Einzelunterricht ist ebenfalls auf Anfrage m\u00f6glich." },
  { id: 3, question: "Wo finden die Kurse statt?", answer: "Die Kurse finden in Hamburg statt. Nach deiner Anmeldung bekommst du alle Details per E-Mail. Zauberw\u00fcrfel- und Schachkurse finden in zentralen R\u00e4umlichkeiten in Hamburg statt [Platzhalter \u2013 konkreter Ort folgt]." },
  { id: 4, question: "Was kostet ein Kurs?", answer: "Die Preise variieren je nach Kursart und Format (Einzel/Gruppe). Genaue Preise findest du auf den jeweiligen Angebotsseiten. Erm\u00e4\u00dfigungen f\u00fcr Vereinsmitglieder und Familien sind m\u00f6glich." },
  { id: 5, question: "Wie melde ich mich an?", answer: 'Klick auf \u201EKurs buchen\u201C oder nutze das Kontaktformular. Ich antworte innerhalb von 48 Stunden.' },
  { id: 6, question: "Wie trete ich dem Schlagball-Verein bei?", answer: "Schreib mir \u00fcber das Kontaktformular. Ich erkl\u00e4re dir alles \u00fcber Mitgliedschaft, Training und Vereinsleben. Schnuppertraining jederzeit m\u00f6glich!" },
];

// ── Themenbereiche (Hero-Grid) ──
export const mockThemenbereiche: ThemenbereichItem[] = [
  { id: 1, titel: "Zauberw\u00fcrfel", beschreibung: "Vom ersten W\u00fcrfel bis zum Speed-Cubing \u2013 Schritt f\u00fcr Schritt, mit Geduld und System. F\u00fcr alle Altersgruppen, Einzel- und Gruppenunterricht.", bild: "/images/denksport.svg", slug: "zauberwuerfel", reihenfolge: 1 },
  { id: 2, titel: "Schach", beschreibung: "Strukturierter Schachunterricht: Grundlagen, Taktik, Er\u00f6ffnung und Endspiel. F\u00fcr Anf\u00e4nger, Hobbyspieler und ambitionierte Vereinsspieler.", bild: "/images/denksport.svg", slug: "schach", reihenfolge: 2 },
  { id: 3, titel: "Schlagball", beschreibung: "Vereinstraining, Turniere und Gemeinschaft. Als 1. Vorstand des Schlagball Hamburg e.V. leite ich ein engagiertes Team.", bild: "/images/schlagball.svg", slug: "schlagball", reihenfolge: 3 },
  { id: 4, titel: "Badminton", beschreibung: "Strukturiertes Training mit Fokus auf Technik, Spielverst\u00e4ndnis und Freude am Spiel. Eigene Trainingsgruppe f\u00fcr alle Niveaus.", bild: "/images/badminton.svg", slug: "badminton", reihenfolge: 4 },
];
