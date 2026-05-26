import type { Core } from '@strapi/strapi';

// Versions-Tag: erhöhen, wenn die Seed-Daten neu eingespielt werden sollen
const SEED_VERSION = '2026-05-26-zauberwuerfel-schach';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Helper: create and publish a document (for content types with draftAndPublish: true)
    async function createAndPublish(uid: any, data: any) {
      const entry = await strapi.documents(uid).create({ data });
      try {
        await strapi.documents(uid).publish({ documentId: entry.documentId });
      } catch (e: any) {
        strapi.log.warn(`Seed: Konnte ${uid} (${entry.documentId}) nicht publishen: ${e.message}`);
      }
      return entry;
    }

    async function upsertSingle(uid: any, data: any) {
      const existing = await strapi.documents(uid).findFirst({ status: 'published' as any });
      if (existing) {
        await strapi.documents(uid).update({
          documentId: existing.documentId,
          data,
        });
        try {
          await strapi.documents(uid).publish({ documentId: existing.documentId });
        } catch (e: any) {
          strapi.log.warn(`Seed: Konnte ${uid} nicht re-publishen: ${e.message}`);
        }
      } else {
        await createAndPublish(uid, data);
      }
    }

    // ── Public API Permissions (always ensure they are set, idempotent) ──
    async function ensurePublicPermissions() {
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });
      if (!publicRole) return;

      const contentTypes = [
        'api::offer.offer',
        'api::price.price',
        'api::schedule.schedule',
        'api::testimonial.testimonial',
        'api::faq.faq',
        'api::themenbereich.themenbereich',
        'api::stat.stat',
        'api::hero-content.hero-content',
        'api::about-content.about-content',
        'api::site-setting.site-setting',
        'api::header-content.header-content',
        'api::offers-section.offers-section',
        'api::contact-section.contact-section',
      ];

      for (const ct of contentTypes) {
        const actions = [`${ct}.find`, `${ct}.findOne`];
        for (const action of actions) {
          const existing = await strapi.query('plugin::users-permissions.permission').findOne({
            where: { action, role: publicRole.id },
          });
          if (!existing) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: { action, role: publicRole.id },
            });
          }
        }
      }
    }

    // ── Inhalte für die neuen Single-Types (Header/Offers-Section/Contact-Section) ──
    // Diese werden bei jedem Boot upsertet, damit Updates beim Deploy ankommen.
    async function upsertSiteSingletons() {
      await upsertSingle('api::header-content.header-content', {
        brandName: 'Trainer Hamburg',
        brandSubtitle: 'Sport & Denken',
        logoText: 'T',
        moreLabel: 'Mehr',
        ctaLabel: 'Kurs buchen',
        ctaLink: '/kontakt?buchen=true',
      });

      await upsertSingle('api::offers-section.offers-section', {
        label: 'Meine Angebote',
        heading: 'Was ich dir bieten kann',
        intro:
          'Von Zauberwürfel über Schach bis Vereinstraining – vier Bereiche, eine Philosophie: individuelle Förderung, echte Entwicklung.',
      });

      await upsertSingle('api::contact-section.contact-section', {
        label: 'Kontakt',
        heading: 'Lass uns sprechen',
        intro: 'Fragen zu einem Kurs, Vereinsbeitritt oder einfach Hallo? Ich antworte innerhalb von 48 Stunden.',
        emailLabel: 'E-Mail',
        locationLabel: 'Standort',
        responseLabel: 'Antwortzeit',
        socialLabel: 'Social Media',
        formHeading: 'Nachricht senden',
        formIntro: '* Pflichtfelder',
        interests:
          'Bitte wählen...\nZauberwürfel\nSchach\nSchlagball Hamburg (Verein)\nBadminton-Training\nBeratung / Sonstiges',
        submitLabel: 'Nachricht senden →',
        successMessage: '✅ Deine Nachricht wurde gesendet! Ich melde mich bald.',
        consentText: 'Mit dem Absenden stimmst du der Datenschutzerklärung zu.',
      });
    }

    // ── Plugin-Store für Seed-Version ──
    const pluginStore = strapi.store({ type: 'core', name: 'seed' });
    const currentVersion = await pluginStore.get({ key: 'version' });

    // Erst Permissions + neue Singletons bei jedem Boot
    await ensurePublicPermissions();
    await upsertSiteSingletons();

    // Wenn die Seed-Version aktuell ist → fertig
    if (currentVersion === SEED_VERSION) {
      strapi.log.info(`Seed: Version ${SEED_VERSION} bereits eingespielt, überspringe Collection-Seed.`);
      return;
    }

    strapi.log.info(`Seed: Spiele Version ${SEED_VERSION} ein...`);

    // ── Bestehende Collections leeren (Migration zu neuen Slugs) ──
    async function clearCollection(uid: any) {
      const docs = await strapi.documents(uid).findMany({ limit: 1000, status: 'published' as any });
      for (const d of docs) {
        try {
          await strapi.documents(uid).delete({ documentId: d.documentId });
        } catch (e: any) {
          strapi.log.warn(`Seed: Konnte ${uid} (${d.documentId}) nicht löschen: ${e.message}`);
        }
      }
      // Auch Drafts entfernen
      const drafts = await strapi.documents(uid).findMany({ limit: 1000, status: 'draft' as any });
      for (const d of drafts) {
        try {
          await strapi.documents(uid).delete({ documentId: d.documentId });
        } catch (e: any) {
          // ignore
        }
      }
    }

    // Reihenfolge: prices vor offers (FK), schedules unabhängig
    await clearCollection('api::price.price');
    await clearCollection('api::schedule.schedule');
    await clearCollection('api::offer.offer');
    await clearCollection('api::themenbereich.themenbereich');
    await clearCollection('api::testimonial.testimonial');
    await clearCollection('api::faq.faq');
    await clearCollection('api::stat.stat');

    // ── Stats ──
    const statsData = [
      { value: '9+', label: 'Jahre Trainererfahrung', reihenfolge: 1 },
      { value: '4', label: 'Sportarten & Kurse', reihenfolge: 2 },
      { value: '100+', label: 'Unterrichtete Stunden', reihenfolge: 3 },
      { value: '∞', label: 'Motivation für Neues', reihenfolge: 4 },
    ];
    for (const s of statsData) {
      await strapi.documents('api::stat.stat').create({ data: s });
    }

    // ── Hero (Single-Type) ──
    await upsertSingle('api::hero-content.hero-content', {
      tagline: 'Lizenzierter Trainer & Berater · Hamburg',
      titleLine1: 'Sport. Denken.',
      titleLine2: 'Entwicklung.',
      description:
        'Knapp ein Jahrzehnt Erfahrung als Trainer, Lehrer und Vereinsfunktionär. Zauberwürfel, Schach, Schlagball und Badminton – professionell, individuell, leidenschaftlich.',
      ctaPrimaryText: 'Kurs anfragen',
      ctaPrimaryLink: '/kontakt?buchen=true',
      ctaSecondaryText: 'Alle Angebote',
      ctaSecondaryLink: '/angebote',
    });

    // ── About (Single-Type) ──
    await upsertSingle('api::about-content.about-content', {
      headline: 'Trainer aus',
      highlightedWord: 'Leidenschaft.',
      text1:
        'Seit knapp einem Jahrzehnt begleite ich Menschen auf ihrem Weg – egal ob es darum geht, den Zauberwürfel zu lösen, die ersten Züge im Schach zu meistern, auf dem Badminton-Court zu glänzen oder im Schlagball-Verein Teil eines Teams zu werden.',
      text2:
        'Als lizenzierter Trainer und 1. Vorstand des Schlagball Hamburg e.V. bringe ich nicht nur sportliches Know-how mit, sondern auch echtes Organisationstalent und Leidenschaft für Gemeinschaft und faire Entwicklung.',
      portraitBadgeText: 'Lizenzierter\nTrainer',
    });

    // ── Site Settings (kein draft/publish) ──
    const existingSettings = await strapi
      .documents('api::site-setting.site-setting')
      .findFirst({});
    if (!existingSettings) {
      await strapi.documents('api::site-setting.site-setting').create({
        data: {
          siteName: 'Trainer Hamburg',
          siteSubtitle: 'Sport & Denken',
          logoText: 'T',
          email: 'trainer@example.com',
          location: 'Hamburg, Deutschland',
          responseTime: 'Innerhalb von 48 Stunden',
          socialInstagram: 'https://instagram.com',
          socialFacebook: '',
          socialYoutube: '',
          socialTiktok: '',
        },
      });
    }

    // ── Themenbereiche (Hero-Grid) ──
    const themen = [
      { titel: 'Zauberwürfel', beschreibung: 'Vom ersten Würfel bis zum Speed-Cubing – Schritt für Schritt, mit Geduld und System.', slug: 'zauberwuerfel', reihenfolge: 1 },
      { titel: 'Schach', beschreibung: 'Strukturierter Schachunterricht: Grundlagen, Taktik, Eröffnung und Endspiel.', slug: 'schach', reihenfolge: 2 },
      { titel: 'Schlagball', beschreibung: 'Vereinstraining, Turniere und Gemeinschaft. Als 1. Vorstand des Schlagball Hamburg e.V.', slug: 'schlagball', reihenfolge: 3 },
      { titel: 'Badminton', beschreibung: 'Strukturiertes Training mit Fokus auf Technik und Spielverständnis.', slug: 'badminton', reihenfolge: 4 },
    ];
    for (const t of themen) {
      await createAndPublish('api::themenbereich.themenbereich', t);
    }

    // ── Offers ──
    const offersData = [
      {
        slug: 'zauberwuerfel',
        title: 'Zauberwürfel',
        shortTitle: 'Zauberwürfel',
        description: 'Lerne den Zauberwürfel systematisch zu lösen – von den ersten Schritten bis zum Speed-Cubing.',
        longDescription:
          'Im Zauberwürfel-Kurs lernst du Schritt für Schritt, den Cube zu lösen – von den Grundlagen bis hin zu Speed-Cubing-Techniken. Wir starten mit einer einfachen Anfänger-Methode und arbeiten uns je nach Tempo zu fortgeschrittenen Algorithmen vor.',
        icon: '🧩',
        badge: 'DenkSport',
        badgeColor: 'primary' as const,
        gradient: 'from-[#1a1a2e] to-[#16213e]',
        features: 'Anfänger-Methode in wenigen Stunden\nSpeed-Cubing-Techniken für Fortgeschrittene\nGruppen- und Einzelkurse verfügbar\nFester Termin montags',
        ctaText: 'Termin anfragen',
        ctaLink: '/kontakt?interesse=zauberwuerfel',
      },
      {
        slug: 'schach',
        title: 'Schachunterricht',
        shortTitle: 'Schach',
        description: 'Vom ersten Zug bis zur Eröffnungstheorie: Strukturierter Schachunterricht für Anfänger und Vereinsspieler.',
        longDescription:
          'Im Schachkurs arbeiten wir an deiner Eröffnung, Mittelspielstrategie und Endspieltheorie. Für Anfänger beginnt es mit den Grundregeln, Taktik-Mustern und ersten Eröffnungen. Fortgeschrittene vertiefen Stellungsspiel und Turniervorbereitung.',
        icon: '♞',
        badge: 'DenkSport',
        badgeColor: 'primary' as const,
        gradient: 'from-[#1f1a2e] to-[#1a1630]',
        features: 'Grundlagen, Taktik & Strategie\nEröffnungsrepertoire & Endspieltheorie\nEinzel- und Gruppenunterricht\nFester Termin mittwochs',
        ctaText: 'Termin anfragen',
        ctaLink: '/kontakt?interesse=schach',
      },
      {
        slug: 'schlagball',
        title: 'Schlagball Hamburg',
        shortTitle: 'Schlagball',
        description: 'Als 1. Vorstand des Schlagball Hamburg e.V. organisiere ich Vereinstraining, Turniere und Gemeinschaftsaktivitäten.',
        longDescription:
          'Schlagball Hamburg e.V. ist ein aktiver Sportverein mit einer großartigen Gemeinschaft. Als 1. Vorstand kümmere ich mich persönlich um Organisation, Training und Wettkämpfe.',
        icon: '🏓',
        badge: 'Verein',
        badgeColor: 'green' as const,
        gradient: 'from-[#1a2e1a] to-[#162e16]',
        features: 'Regelmäßiges Vereinstraining\nTurniere & Wettkämpfe\nOffen für Einsteiger & Erfahrene\nStarke Gemeinschaft & Teamgeist',
        ctaText: 'Zum Verein →',
        ctaLink: '/kontakt?interesse=schlagball',
        externalLink: 'https://schlagball-hamburg.de',
      },
      {
        slug: 'badminton',
        title: 'Badminton-Training',
        shortTitle: 'Badminton',
        description: 'Strukturiertes Badminton-Training mit Fokus auf Technik, Spielverständnis und Freude am Spiel.',
        longDescription:
          'Meine Badminton-Trainingsgruppe bietet strukturiertes Training für alle Niveaus. Wir arbeiten an Schlagtechnik, Laufarbeit, Spieltaktik und Kondition.',
        icon: '🏸',
        badge: 'Training',
        badgeColor: 'pink' as const,
        gradient: 'from-[#2b1a1a] to-[#2e1616]',
        features: 'Eigene Trainingsgruppe\nTechnik & Taktik\nFür alle Niveaus\nRegelmäßiges Training',
        ctaText: 'Gruppe beitreten',
        ctaLink: '/kontakt?interesse=badminton',
      },
    ];
    for (const o of offersData) {
      await createAndPublish('api::offer.offer', o);
    }

    // ── Prices ──
    const offers = await strapi.documents('api::offer.offer').findMany({ status: 'published' as any });
    const offerMap = Object.fromEntries(offers.map((o: any) => [o.slug, o.documentId]));

    const pricesData = [
      // Zauberwürfel
      { name: 'Einzelstunde', price: 35, unit: 'pro Stunde', description: '60 Min. individuelles Training', highlighted: false, offer: offerMap['zauberwuerfel'] },
      { name: 'Gruppenkurs (4er)', price: 20, unit: 'pro Person / Stunde', description: '60 Min. in Kleingruppe', highlighted: true, offer: offerMap['zauberwuerfel'] },
      { name: '10er-Karte', price: 170, unit: 'einmalig', description: '10 Gruppenstunden, 6 Monate gültig', highlighted: false, offer: offerMap['zauberwuerfel'] },
      // Schach
      { name: 'Einzelstunde', price: 35, unit: 'pro Stunde', description: '60 Min. individuelles Training', highlighted: false, offer: offerMap['schach'] },
      { name: 'Gruppenkurs (4er)', price: 20, unit: 'pro Person / Stunde', description: '60 Min. in Kleingruppe', highlighted: true, offer: offerMap['schach'] },
      { name: '10er-Karte', price: 170, unit: 'einmalig', description: '10 Gruppenstunden, 6 Monate gültig', highlighted: false, offer: offerMap['schach'] },
      // Schlagball
      { name: 'Mitgliedsbeitrag', price: 10, unit: 'pro Monat', description: 'Voller Zugang zu Training & Vereinsleben', highlighted: true, offer: offerMap['schlagball'] },
      { name: 'Schnuppertraining', price: 0, unit: 'kostenlos', description: 'Erstes Training zum Kennenlernen', highlighted: false, offer: offerMap['schlagball'] },
      // Badminton
      { name: 'Gruppentraining', price: 15, unit: 'pro Person / Training', description: '90 Min. Gruppentraining', highlighted: true, offer: offerMap['badminton'] },
      { name: 'Einzeltraining', price: 40, unit: 'pro Stunde', description: '60 Min. individuelles Techniktraining', highlighted: false, offer: offerMap['badminton'] },
      { name: 'Monatskarte', price: 50, unit: 'pro Monat', description: 'Unbegrenzt Gruppentraining (4x/Monat)', highlighted: false, offer: offerMap['badminton'] },
    ];
    for (const p of pricesData) {
      if (!p.offer) continue;
      await strapi.documents('api::price.price').create({ data: p });
    }

    // ── Schedule ──
    const schedData = [
      { day: 'Montag', time: '18:00 – 19:30 Uhr', type: 'Zauberwürfel', offerSlug: 'zauberwuerfel', badgeColor: 'primary' as const, location: 'Hamburg', spotsLeft: 3, price: 20 },
      { day: 'Mittwoch', time: '17:00 – 18:30 Uhr', type: 'Schach', offerSlug: 'schach', badgeColor: 'primary' as const, location: 'Hamburg', spotsLeft: 5, price: 20 },
      { day: 'Donnerstag', time: '19:00 – 20:30 Uhr', type: 'Badminton', offerSlug: 'badminton', badgeColor: 'pink' as const, location: 'Sporthalle Hamburg', spotsLeft: 6, price: 15 },
      { day: 'Wochenende', time: 'Variabel', type: 'Schlagball', offerSlug: 'schlagball', badgeColor: 'green' as const, location: 'Sportplatz Hamburg' },
    ];
    for (const s of schedData) {
      await createAndPublish('api::schedule.schedule', s);
    }

    // ── Testimonials ──
    const testiData = [
      { quote: 'Der Zauberwürfel-Kurs hat mein Denken verändert. Nach nur drei Stunden konnte ich den Würfel selbstständig lösen.', authorName: 'Max L.', authorRole: 'Zauberwürfel-Teilnehmer', authorInitials: 'ML', rating: 5 },
      { quote: 'Mein Sohn war im Schach komplett blockiert. Nach wenigen Stunden hatte er nicht nur einen klaren Plan, sondern auch wieder Spaß am Spiel.', authorName: 'Sarah K.', authorRole: 'Elternteil, Schachkurs', authorInitials: 'SK', rating: 5 },
      { quote: 'Tolle Organisation, klare Kommunikation und echter Teamgeist.', authorName: 'Thomas H.', authorRole: 'Vereinsmitglied Schlagball HH', authorInitials: 'TH', rating: 5 },
    ];
    for (const t of testiData) {
      await createAndPublish('api::testimonial.testimonial', t);
    }

    // ── FAQ ──
    const faqData = [
      { question: 'Für wen sind die Kurse geeignet?', answer: 'Alle Kurse sind für Anfänger und Fortgeschrittene geeignet. Ich passe den Unterricht individuell an.' },
      { question: 'Wie groß sind die Kursgruppen?', answer: 'Max. 6–8 Personen. Einzelunterricht auf Anfrage.' },
      { question: 'Wo finden die Kurse statt?', answer: 'In Hamburg. Zauberwürfel- und Schachkurse in zentralen Räumlichkeiten. Details nach Anmeldung per E-Mail.' },
      { question: 'Was kostet ein Kurs?', answer: 'Preise auf den jeweiligen Angebotsseiten.' },
      { question: 'Wie melde ich mich an?', answer: 'Kontaktformular oder Kurs buchen Button.' },
      { question: 'Wie trete ich dem Schlagball-Verein bei?', answer: 'Kontaktformular nutzen oder direkt auf schlagball-hamburg.de.' },
    ];
    for (const f of faqData) {
      await createAndPublish('api::faq.faq', f);
    }

    // Version setzen
    await pluginStore.set({ key: 'version', value: SEED_VERSION });

    strapi.log.info(`Seed: Version ${SEED_VERSION} erfolgreich eingespielt!`);
  },
};
