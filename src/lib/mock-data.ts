import type { Offer, ScheduleItem, Testimonial, FAQItem } from "@/types";
import type { ThemenbereichItem } from "@/components/shared/DynamicFrameLayout";

export const mockOffers: Offer[] = [
  {
    id: 1,
    slug: "denksport",
    title: "DenkSport",
    shortTitle: "DenkSport",
    description:
      "Geistige Fitness trifft sportliche Ambition. Lerne den Zauberwürfel systematisch zu lösen oder vertiefe dein Schachspiel – von der Grundstrategie bis zur Eröffnungstheorie.",
    longDescription:
      "DenkSport vereint geistige Herausforderung mit spielerischem Lernen. Im Zauberwürfel-Kurs lernst du Schritt für Schritt, den Cube zu lösen – von den Grundlagen bis hin zu Speed-Cubing-Techniken. Im Schachkurs arbeiten wir an deiner Eröffnung, Mittelspielstrategie und Endspieltheorie. Beide Kurse sind für alle Altersgruppen geeignet und bieten sowohl Einzel- als auch Gruppenunterricht. Mein Ziel: Dass du nicht nur die Technik beherrschst, sondern echtes Verständnis und Freude am Denksport entwickelst.",
    icon: "🧩",
    badge: "DenkSport",
    badgeColor: "primary",
    gradient: "from-[#1a1a2e] to-[#16213e]",
    features: [
      "Zauberwürfel lösen (Anfänger bis Speed-Cubing)",
      "Schachkurse: Grundlagen, Strategie & Taktik",
      "Gruppen- und Einzelkurse verfügbar",
      "Feste Termine montags und mittwochs",
    ],
    prices: [
      {
        id: 1,
        name: "Einzelstunde",
        price: 35,
        unit: "pro Stunde",
        description: "60 Min. individuelles Training",
      },
      {
        id: 2,
        name: "Gruppenkurs (4er)",
        price: 20,
        unit: "pro Person / Stunde",
        description: "60 Min. in Kleingruppe (max. 4 Pers.)",
        highlighted: true,
      },
      {
        id: 3,
        name: "10er-Karte",
        price: 170,
        unit: "einmalig",
        description: "10 Gruppenstunden, 6 Monate gültig",
      },
    ],
    ctaText: "Termin anfragen",
    ctaLink: "/kontakt?interesse=denksport",
  },
  {
    id: 2,
    slug: "schlagball",
    title: "Schlagball Hamburg",
    shortTitle: "Schlagball",
    description:
      "Als 1. Vorstand des Schlagball Hamburg e.V. organisiere ich Vereinstraining, Turniere und Gemeinschaftsaktivitäten. Komm in unser Team!",
    longDescription:
      "Schlagball Hamburg e.V. ist ein aktiver Sportverein mit einer großartigen Gemeinschaft. Als 1. Vorstand kümmere ich mich persönlich um Organisation, Training und Wettkämpfe. Unser Vereinstraining findet regelmäßig statt und ist offen für alle – vom Einsteiger bis zum erfahrenen Spieler. Wir nehmen an Turnieren teil und organisieren eigene Events. Werde Teil unseres Teams und erlebe Mannschaftssport, der verbindet!",
    icon: "🏏",
    badge: "Verein",
    badgeColor: "green",
    gradient: "from-[#1a2e1a] to-[#162e16]",
    features: [
      "Regelmäßiges Vereinstraining",
      "Turniere & Wettkämpfe",
      "Offen für Einsteiger & Erfahrene",
      "Starke Gemeinschaft & Teamgeist",
    ],
    prices: [
      {
        id: 1,
        name: "Mitgliedsbeitrag",
        price: 10,
        unit: "pro Monat",
        description: "Voller Zugang zu Training & Vereinsleben",
        highlighted: true,
      },
      {
        id: 2,
        name: "Schnuppertraining",
        price: 0,
        unit: "kostenlos",
        description: "Erstes Training zum Kennenlernen",
      },
    ],
    ctaText: "Mitmachen",
    ctaLink: "/kontakt?interesse=schlagball",
  },
  {
    id: 3,
    slug: "schwimmen",
    title: "Schwimmunterricht",
    shortTitle: "Schwimmen",
    description:
      "Vier Jahre Erfahrung als Schwimmlehrer. Ob Anfänger mit Berührungsangst oder Fortgeschrittene – ich begleite dich sicher ans Ziel.",
    longDescription:
      "In meinem Schwimmunterricht steht Sicherheit an erster Stelle. Mit vier Jahren Erfahrung als Schwimmlehrer arbeite ich mit Kindern und Erwachsenen auf jedem Level. Für Anfänger geht es darum, Vertrauen im Wasser aufzubauen und die Grundtechniken zu erlernen. Fortgeschrittene verbessern ihre Technik in Kraul, Brust, Rücken und Schmetterling. Kleine Gruppen garantieren individuelle Betreuung. Mein Ansatz: Geduld, Sicherheit und Freude am Wasser.",
    icon: "🏊",
    badge: "Schwimmlehrer",
    badgeColor: "blue",
    gradient: "from-[#0d1e2b] to-[#0d2233]",
    features: [
      "Anfängerkurse (Kinder & Erwachsene)",
      "Technik-Training für Fortgeschrittene",
      "Kleine Gruppen, individuelle Betreuung",
      "4 Jahre Unterrichtserfahrung",
    ],
    prices: [
      {
        id: 1,
        name: "Einzelstunde",
        price: 40,
        unit: "pro Stunde",
        description: "45 Min. individueller Schwimmunterricht",
      },
      {
        id: 2,
        name: "Gruppenkurs (4er)",
        price: 25,
        unit: "pro Person / Stunde",
        description: "45 Min. in Kleingruppe (max. 4 Pers.)",
        highlighted: true,
      },
      {
        id: 3,
        name: "5er-Karte Einzel",
        price: 180,
        unit: "einmalig",
        description: "5 Einzelstunden, 3 Monate gültig",
      },
    ],
    ctaText: "Anfrage senden",
    ctaLink: "/kontakt?interesse=schwimmen",
  },
  {
    id: 4,
    slug: "badminton",
    title: "Badminton-Training",
    shortTitle: "Badminton",
    description:
      "Als Leiter meiner eigenen Trainingsgruppe biete ich strukturiertes Badminton-Training mit Fokus auf Technik, Spielverständnis und Freude am Spiel.",
    longDescription:
      "Meine Badminton-Trainingsgruppe bietet strukturiertes Training für alle Niveaus. Wir arbeiten an Schlagtechnik, Laufarbeit, Spieltaktik und Kondition. Ob du gerade erst anfängst oder schon Turniererfahrung hast – das Training wird individuell angepasst. In freundlicher Atmosphäre verbessern wir gemeinsam dein Spiel. Regelmäßiges Training sorgt für sichtbare Fortschritte und jede Menge Spaß auf dem Court.",
    icon: "🏸",
    badge: "Training",
    badgeColor: "pink",
    gradient: "from-[#2b1a1a] to-[#2e1616]",
    features: [
      "Eigene Trainingsgruppe",
      "Technik & Taktik",
      "Für alle Niveaus",
      "Regelmäßiges Training",
    ],
    prices: [
      {
        id: 1,
        name: "Gruppentraining",
        price: 15,
        unit: "pro Person / Training",
        description: "90 Min. Gruppentraining",
        highlighted: true,
      },
      {
        id: 2,
        name: "Einzeltraining",
        price: 40,
        unit: "pro Stunde",
        description: "60 Min. individuelles Techniktraining",
      },
      {
        id: 3,
        name: "Monatskarte",
        price: 50,
        unit: "pro Monat",
        description: "Unbegrenzt Gruppentraining (4x/Monat)",
      },
    ],
    ctaText: "Gruppe beitreten",
    ctaLink: "/kontakt?interesse=badminton",
  },
];

export const mockSchedule: ScheduleItem[] = [
  {
    id: 1,
    day: "Montag",
    time: "18:00 – 19:30 Uhr",
    type: "Zauberwürfel",
    offerSlug: "denksport",
    badgeColor: "primary",
    location: "Hamburg [Ort auf Anfrage]",
    spotsLeft: 3,
    price: 20,
  },
  {
    id: 2,
    day: "Mittwoch",
    time: "17:00 – 18:30 Uhr",
    type: "Schach",
    offerSlug: "denksport",
    badgeColor: "primary",
    location: "Hamburg [Ort auf Anfrage]",
    spotsLeft: 5,
    price: 20,
  },
  {
    id: 3,
    day: "Donnerstag",
    time: "19:00 – 20:30 Uhr",
    type: "Badminton",
    offerSlug: "badminton",
    badgeColor: "pink",
    location: "Sporthalle Hamburg [Platzhalter]",
    spotsLeft: 6,
    price: 15,
  },
  {
    id: 4,
    day: "Samstag",
    time: "10:00 – 12:00 Uhr",
    type: "Schwimmen",
    offerSlug: "schwimmen",
    badgeColor: "blue",
    location: "Schwimmhalle Hamburg [Platzhalter]",
    spotsLeft: 2,
    price: 25,
  },
  {
    id: 5,
    day: "Wochenende",
    time: "Variabel",
    type: "Schlagball",
    offerSlug: "schlagball",
    badgeColor: "green",
    location: "Sportplatz Hamburg [Platzhalter]",
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Der Zauberwürfel-Kurs hat mein Denken verändert. Nach nur drei Stunden konnte ich den Würfel selbstständig lösen. Absolut empfehlenswert!",
    authorName: "Max L.",
    authorRole: "DenkSport-Teilnehmer [Platzhalter]",
    authorInitials: "ML",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Meine Tochter hatte immer Angst vor dem Wasser. Dank des geduldigen Unterrichts schwimmt sie jetzt selbstständig und mit Spaß.",
    authorName: "Sarah K.",
    authorRole: "Elternteil, Schwimmkurs [Platzhalter]",
    authorInitials: "SK",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Als 1. Vorstand hat er den Verein wirklich vorangebracht – tolle Organisation, klare Kommunikation und echter Teamgeist.",
    authorName: "Thomas H.",
    authorRole: "Vereinsmitglied Schlagball HH [Platzhalter]",
    authorInitials: "TH",
    rating: 5,
  },
];

export const mockFAQ: FAQItem[] = [
  {
    id: 1,
    question: "Für wen sind die Kurse geeignet?",
    answer:
      "Alle Kurse sind für Anfänger und Fortgeschrittene geeignet. Ich passe den Unterricht individuell an deinen Kenntnisstand an – egal ob du gerade erst anfängst oder bereits Grundkenntnisse mitbringst.",
  },
  {
    id: 2,
    question: "Wie groß sind die Kursgruppen?",
    answer:
      "Die Gruppen sind bewusst klein gehalten (max. 6–8 Personen), damit jeder genug individuelle Aufmerksamkeit bekommt. Einzelunterricht ist ebenfalls auf Anfrage möglich.",
  },
  {
    id: 3,
    question: "Wo finden die Kurse statt?",
    answer:
      "Die Kurse finden in Hamburg statt. Nach deiner Anmeldung bekommst du alle Details per E-Mail. Schwimmkurse in einer Hamburger Schwimmhalle [Platzhalter – konkreter Ort folgt].",
  },
  {
    id: 4,
    question: "Was kostet ein Kurs?",
    answer:
      "Die Preise variieren je nach Kursart und Format (Einzel/Gruppe). Genaue Preise findest du auf den jeweiligen Angebotsseiten. Ermäßigungen für Vereinsmitglieder und Familien sind möglich.",
  },
  {
    id: 5,
    question: "Wie melde ich mich an?",
    answer:
      'Klick auf \u201EKurs buchen\u201C oder nutze das Kontaktformular. Ich antworte innerhalb von 48 Stunden.',
  },
  {
    id: 6,
    question: "Wie trete ich dem Schlagball-Verein bei?",
    answer:
      "Schreib mir über das Kontaktformular. Ich erkläre dir alles über Mitgliedschaft, Training und Vereinsleben. Schnuppertraining jederzeit möglich!",
  },
];

export const mockThemenbereiche: ThemenbereichItem[] = [
  {
    id: 1,
    titel: "DenkSport",
    beschreibung:
      "Zauberwürfel und Schach – geistige Fitness trifft spielerisches Lernen. Für alle Altersgruppen, Einzel- und Gruppenunterricht.",
    bild: "/images/denksport.svg",
    slug: "denksport",
    reihenfolge: 1,
  },
  {
    id: 2,
    titel: "Schlagball",
    beschreibung:
      "Vereinstraining, Turniere und Gemeinschaft. Als 1. Vorstand des Schlagball Hamburg e.V. leite ich ein engagiertes Team.",
    bild: "/images/schlagball.svg",
    slug: "schlagball",
    reihenfolge: 2,
  },
  {
    id: 3,
    titel: "Schwimmen",
    beschreibung:
      "Sicher im Wasser werden – für Anfänger und Fortgeschrittene. Kleine Gruppen, individuelle Betreuung, 4 Jahre Erfahrung.",
    bild: "/images/schwimmen.svg",
    slug: "schwimmen",
    reihenfolge: 3,
  },
  {
    id: 4,
    titel: "Badminton",
    beschreibung:
      "Strukturiertes Training mit Fokus auf Technik, Spielverständnis und Freude am Spiel. Eigene Trainingsgruppe für alle Niveaus.",
    bild: "/images/badminton.svg",
    slug: "badminton",
    reihenfolge: 4,
  },
];
