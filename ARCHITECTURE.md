# ARCHITECTURE.md - Trainer Hamburg Portfolio

## Three-Layer Architecture

```
+----------------------------------+
|           GitHub                  |
|   casimanodes/portfolio           |
|   (1 Monorepo, 2 Projekte)       |
|                                   |
|   /          = Next.js Frontend   |
|   /cms/      = Strapi CMS        |
+-------+----------------+---------+
        |                |
        v                v
+----------------+  +-------------------+
|    Vercel      |  |   Strapi Cloud    |
|  (Frontend)    |  |   (CMS + API)     |
|                |  |                   |
|  Root: /       |  |  Base Dir: /cms/  |
|  SSG + ISR     |  |  Admin Panel      |
|  revalidate:60 |  |  REST API         |
|  Mock-Fallback |  |  PostgreSQL       |
+----------------+  +-------------------+
```

### Monorepo-Struktur

| Pfad | Zweck | Deployment |
|------|-------|------------|
| `/` (Root) | Next.js 16 Frontend (TypeScript, Tailwind v4) | Vercel (Root Directory: `/`) |
| `/cms/` | Strapi v5 CMS Backend (10 Content Types) | Strapi Cloud (Base Directory: `/cms/`) |

---

## Vollstaendiger Datenfluss

```
Admin-Panel (Strapi Cloud)
    |
    | 1. Inhalt erstellen/bearbeiten + "Publish" klicken
    v
Strapi Cloud PostgreSQL
    |
    | 2. REST API unter https://dein-projekt.strapiapp.com/api/*
    v
Next.js Server (Vercel)
    |
    | 3. src/lib/strapi.ts fetcht Daten mit ISR (revalidate: 60)
    | 4. Fallback auf src/lib/mock-data.ts bei Fehler
    v
React Server Components
    |
    | 5. Daten als Props an Section-Komponenten
    v
Gerendertes HTML an Browser
```

### Datenfluss im Detail

```
Strapi Admin                     strapi.ts                        Komponente
+-----------+     GET /api/*     +------------+     Props         +----------+
| Publish   | -----------------> | fetchStrapi| ----------------> | Hero     |
| Eintrag   |     JSON Response  | getOffers  |     offers[]     | Stats    |
+-----------+                    | getStats   |     stats[]      | FAQ      |
                                 | etc.       |                  | etc.     |
                                 +-----+------+                  +----------+
                                       |
                                 Fehler? -> mockData
```

---

## Content Types (10 Stueck)

### Collection Types (7)

| API-UID | Endpunkt | Felder | draftAndPublish |
|---------|----------|--------|-----------------|
| `api::offer.offer` | `/api/offers` | slug, title, shortTitle, description, longDescription, icon, badge, badgeColor, gradient, features, ctaText, ctaLink, image (Media) | true |
| `api::price.price` | `/api/prices` | name, price, unit, description, highlighted, offer (Relation) | false |
| `api::schedule.schedule` | `/api/schedules` | day, time, type, offerSlug, badgeColor, location, spotsLeft, price | true |
| `api::testimonial.testimonial` | `/api/testimonials` | quote, authorName, authorRole, authorInitials, rating | true |
| `api::faq.faq` | `/api/faqs` | question, answer | true |
| `api::themenbereich.themenbereich` | `/api/themenbereiche` | titel, beschreibung, slug, reihenfolge, bild (Media) | true |
| `api::stat.stat` | `/api/stats` | value, label, reihenfolge | false |

### Single Types (3)

| API-UID | Endpunkt | Felder | draftAndPublish |
|---------|----------|--------|-----------------|
| `api::hero-content.hero-content` | `/api/hero-content` | tagline, titleLine1, titleLine2, description, ctaPrimaryText, ctaPrimaryLink, ctaSecondaryText, ctaSecondaryLink | true |
| `api::about-content.about-content` | `/api/about-content` | headline, highlightedWord, text1, text2, portraitImage (Media), portraitBadgeText | true |
| `api::site-setting.site-setting` | `/api/site-setting` | siteName, siteSubtitle, logoText, email, location, responseTime, socialInstagram, socialFacebook, socialYoutube, socialTiktok | false |

### Relationen

```
Offer 1 ---< N Price    (Ein Angebot hat mehrere Preise)
```

### BadgeColor Enumeration

Verwendet in: offer, schedule, themenbereich

```
"primary" | "blue" | "green" | "pink" | "amber"
```

---

## Kritische Dateien

### Frontend (Root /)

| Datei | Zweck |
|-------|-------|
| `src/lib/strapi.ts` | API-Client. Fetcht von Strapi, Fallback auf Mock. |
| `src/lib/mock-data.ts` | Vollstaendige Mock-Daten fuer Offline/Dev. |
| `src/types/index.ts` | TypeScript Interfaces fuer alle Content Types. |
| `src/app/page.tsx` | Homepage: fetcht alles parallel via Promise.all. |
| `src/app/angebote/[slug]/page.tsx` | Dynamische Angebotsseiten mit generateStaticParams. |
| `src/components/sections/*.tsx` | UI-Komponenten (Hero, Stats, FAQ, etc.) |
| `src/components/shared/DynamicFrameLayout.tsx` | 2x2 CSS-Grid Hero-Kacheln mit Hover. |
| `.env.local` | Lokale Strapi URL + Token. |

### CMS (/cms/)

| Datei | Zweck |
|-------|-------|
| `cms/src/index.ts` | Bootstrap Seed: erstellt + publiziert Daten + setzt Permissions. |
| `cms/src/api/*/content-types/*/schema.json` | Content-Type Definitionen. |
| `cms/config/middlewares.ts` | CORS + CSP fuer Vercel-Zugriff. |
| `cms/config/database.ts` | SQLite lokal, PostgreSQL in Strapi Cloud. |
| `cms/config/plugins.ts` | Cloudinary (nur Self-Hosting, nicht Strapi Cloud). |
| `cms/package.json` | Strapi-Dependencies (getrennt vom Frontend). |

---

## Kritische Integration Points

### 1. Environment Variables

**Vercel (Frontend):**
```
NEXT_PUBLIC_STRAPI_URL=https://dein-projekt.strapiapp.com
STRAPI_API_TOKEN=                  # leer lassen wenn Public Permissions gesetzt
```

**Strapi Cloud (CMS):**
```
FRONTEND_URL=https://deine-seite.vercel.app   # CORS
# Rest wird von Strapi Cloud automatisch konfiguriert
```

### 2. Image URLs

Strapi Cloud speichert Bilder intern. Die URL-Aufloesung:

```typescript
// src/lib/strapi.ts
export function strapiImage(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;       // Strapi Cloud: absolute URL
  return `${STRAPI_URL}${url}`;                  // Lokal: relative URL
}
```

Strapi v5 Response-Struktur fuer Media:
```json
{
  "image": {
    "url": "https://strapi-cloud-media.../bild.jpg",
    "formats": { "thumbnail": { "url": "..." } }
  }
}
```

**Wichtig:** In Strapi v5 ist `.url` direkt auf dem Media-Objekt (NICHT `.data.attributes.url` wie in v4).

### 3. API Query Patterns

```typescript
// Collection Types: Array zurueck
const raw = await fetchStrapi<Array<Record<string, any>>>("/offers?populate=*&sort=id:asc");

// Single Types: Einzelnes Objekt zurueck
const raw = await fetchStrapi<Record<string, any>>("/hero-content?populate=*");

// Relationen einschliessen
"/offers?populate=*"         // Alle Relations (prices, image)
"/offers?populate=prices"    // Nur prices
```

Strapi v5: Felder liegen DIREKT auf dem Objekt:
```json
{ "id": 1, "title": "DenkSport", "slug": "denksport", "prices": [...] }
```
NICHT wie v4: `{ "id": 1, "attributes": { "title": "DenkSport" } }`

### 4. Error Handling Pattern

```typescript
export async function getOffers(): Promise<Offer[]> {
  if (USE_MOCK) return mockOffers;          // Kein Strapi konfiguriert
  try {
    const raw = await fetchStrapi<...>(...);
    return raw.map(transform);               // Strapi-Daten transformieren
  } catch {
    return mockOffers;                       // Strapi-Fehler -> Mock-Fallback
  }
}
```

Jede Fetch-Funktion hat 3 Pfade:
1. `USE_MOCK = true` -> Mock-Daten (keine STRAPI_URL gesetzt)
2. Strapi erreichbar -> Echte Daten
3. Strapi-Fehler -> Mock-Fallback (catch)

---

## Mock Data Fallback Logik

```
NEXT_PUBLIC_STRAPI_URL gesetzt?
    |
    +-- NEIN --> USE_MOCK = true --> Mock-Daten (sofort, kein Fetch)
    |
    +-- JA  --> Fetch von Strapi
                    |
                    +-- Erfolg --> Echte Daten rendern
                    |
                    +-- Fehler --> catch --> Mock-Daten als Fallback
```

### Wann welcher Modus:

| Situation | USE_MOCK | Verhalten |
|-----------|----------|-----------|
| Lokal ohne Strapi | true | Mock-Daten, kein Netzwerk-Call |
| Lokal mit Strapi (`localhost:1337`) | false | Echte Daten, Mock bei Fehler |
| Vercel ohne STRAPI_URL | true | Mock-Daten (Erstes Deployment) |
| Vercel mit STRAPI_URL | false | Strapi Cloud Daten, Mock bei Fehler |
| Strapi Cloud down | false | Timeout -> Mock-Fallback |

### Mock-Daten Dateien:

```
src/lib/mock-data.ts
  -> mockSiteSettings    (SiteSettings)
  -> mockHero            (HeroContent)
  -> mockStats           (StatItem[])
  -> mockAbout           (AboutContent)
  -> mockOffers          (Offer[])
  -> mockSchedule        (ScheduleItem[])
  -> mockTestimonials    (Testimonial[])
  -> mockFAQ             (FAQItem[])
  -> mockThemenbereiche  (ThemenbereichItem[])
```

---

## Deployment Checklist

### Erstmalig: Strapi Cloud

- [ ] https://cloud.strapi.io -> Anmelden mit GitHub
- [ ] "Create Project" -> GitHub Repo `casimanodes/portfolio` verbinden
- [ ] **Base Directory: `cms/`** einstellen
- [ ] Branch: `main`, Region: EU (Frankfurt)
- [ ] Warten bis Deploy gruen
- [ ] Environment Variable in Strapi Cloud setzen:
  - `FRONTEND_URL` = `https://deine-seite.vercel.app`
- [ ] Strapi Cloud URL notieren: `https://dein-projekt.strapiapp.com`
- [ ] Admin Panel oeffnen -> Admin Account erstellen
- [ ] Seed-Daten pruefen (sollten automatisch da sein)
- [ ] Falls Seed nicht lief: Inhalte manuell im Admin erstellen

### Erstmalig: Vercel

- [ ] https://vercel.com -> Repo `casimanodes/portfolio` importieren
- [ ] Root Directory: `/` (Standard, NICHT aendern)
- [ ] Environment Variable setzen:
  - `NEXT_PUBLIC_STRAPI_URL` = `https://dein-projekt.strapiapp.com`
- [ ] Deploy
- [ ] Seite pruefen: Werden Strapi-Daten angezeigt?

### Nach jedem Push:

- [ ] Vercel deployt automatisch (Root /)
- [ ] Strapi Cloud deployt automatisch (Base Dir /cms/)
- [ ] Preview Deployments auf Vercel pruefen
- [ ] Neue Content Types? -> Im Strapi Admin Panel Permissions pruefen
- [ ] CORS-Aenderungen? -> FRONTEND_URL in Strapi Cloud Env pruefen

### Neue Section / Content Type hinzufuegen:

1. **CMS:** `cms/src/api/{name}/content-types/{name}/schema.json` erstellen
2. **CMS:** Seed in `cms/src/index.ts` erweitern (create + publish + permissions)
3. **Frontend:** Interface in `src/types/index.ts` hinzufuegen
4. **Frontend:** Fetch-Funktion in `src/lib/strapi.ts` hinzufuegen
5. **Frontend:** Mock-Daten in `src/lib/mock-data.ts` hinzufuegen
6. **Frontend:** Komponente in `src/components/sections/` erstellen
7. **Frontend:** In `src/app/page.tsx` oder Route einbinden
8. **Push:** Ein Push deployt beide Systeme

---

## Troubleshooting Matrix

| Problem | Ursache | Loesung |
|---------|---------|---------|
| Seite zeigt Mock-Daten statt echte | `NEXT_PUBLIC_STRAPI_URL` nicht gesetzt | In Vercel Env Vars setzen + Redeploy |
| 401 Unauthorized von Strapi | Token falsch oder nicht gesetzt | Public Permissions pruefen (Seed setzt sie automatisch) |
| 403 Forbidden | CORS blockiert | `FRONTEND_URL` in Strapi Cloud setzen, Vercel-URL eintragen |
| 404 auf API-Endpunkt | Content Type Name falsch | Endpunkt pruefen: `/api/offers` nicht `/api/offer` (Plural!) |
| Bilder werden nicht angezeigt | URL-Aufloesung falsch | `strapiImage()` pruefen, Strapi v5: `.url` direkt auf Media |
| Daten da aber leer (0 Eintraege) | Eintraege nicht publiziert | Im Admin Panel: "Publish" klicken, oder Seed pruefen |
| Offers da aber keine Prices | `populate` fehlt | Query muss `?populate=*` enthalten |
| Lokal: "fetch failed" | Strapi nicht gestartet | `cd cms && npm run develop` |
| Build Error: "export not found" | Mock-Data Export fehlt | Neuen Export in mock-data.ts hinzufuegen |
| Neue Felder fehlen im Frontend | TypeScript Interface nicht aktualisiert | types/index.ts updaten |
| Strapi Cloud Deploy failed | Build Error | Logs in Strapi Cloud Dashboard pruefen |
| ISR zeigt alte Daten | 60s Revalidation Cache | Warten oder Vercel Dashboard -> Redeploy |

### Haeufige Strapi v5 Stolperfallen

```
FALSCH (v4):  item.attributes.title
RICHTIG (v5): item.title

FALSCH (v4):  image.data.attributes.url
RICHTIG (v5): image.url

FALSCH:       /api/offer          (Singular)
RICHTIG:      /api/offers         (Plural fuer Collection Types)
RICHTIG:      /api/hero-content   (Singular fuer Single Types)
```

---

## Dateistruktur (Monorepo)

```
casimanodes/portfolio/
|
+-- src/                                    # Next.js Frontend
|   +-- app/
|   |   +-- page.tsx                        # Homepage (Promise.all Fetch)
|   |   +-- layout.tsx                      # Root Layout (Fonts, Header, Footer)
|   |   +-- angebote/
|   |   |   +-- page.tsx                    # Angebotsuebersicht
|   |   |   +-- [slug]/page.tsx             # Angebotsdetail (generateStaticParams)
|   |   +-- faq/page.tsx
|   |   +-- termine/page.tsx
|   |   +-- ueber-mich/page.tsx
|   |   +-- kontakt/page.tsx
|   |   +-- impressum/page.tsx
|   |   +-- datenschutz/page.tsx
|   +-- components/
|   |   +-- sections/
|   |   |   +-- Hero.tsx                    # Hero mit DynamicFrameLayout
|   |   |   +-- Stats.tsx                   # Zahlenleiste
|   |   |   +-- AboutPreview.tsx            # Ueber mich
|   |   |   +-- OffersGrid.tsx              # Angebotskarten
|   |   |   +-- Schedule.tsx                # Terminkalender
|   |   |   +-- Testimonials.tsx            # Bewertungen
|   |   |   +-- FAQ.tsx                     # Haeufige Fragen
|   |   |   +-- CTAStrip.tsx                # Call-to-Action Banner
|   |   |   +-- ContactSection.tsx          # Kontaktformular
|   |   +-- shared/
|   |   |   +-- DynamicFrameLayout.tsx      # 2x2 Hover-Grid
|   |   |   +-- RevealOnScroll.tsx          # Scroll-Animation
|   |   +-- layout/
|   |       +-- Header.tsx                  # Navigation + Offers Dropdown
|   |       +-- Footer.tsx
|   +-- lib/
|   |   +-- strapi.ts                       # API Client (Strapi v5)
|   |   +-- mock-data.ts                    # Fallback-Daten
|   +-- types/
|       +-- index.ts                        # TypeScript Interfaces
|
+-- cms/                                    # Strapi v5 CMS
|   +-- src/
|   |   +-- index.ts                        # Seed + Public Permissions
|   |   +-- api/
|   |   |   +-- offer/
|   |   |   |   +-- content-types/offer/schema.json
|   |   |   |   +-- controllers/offer.ts
|   |   |   |   +-- routes/offer.ts
|   |   |   |   +-- services/offer.ts
|   |   |   +-- price/                      # (gleiche Struktur)
|   |   |   +-- schedule/
|   |   |   +-- testimonial/
|   |   |   +-- faq/
|   |   |   +-- themenbereich/
|   |   |   +-- stat/
|   |   |   +-- hero-content/
|   |   |   +-- about-content/
|   |   |   +-- site-setting/
|   +-- config/
|   |   +-- database.ts                     # SQLite lokal / PostgreSQL Cloud
|   |   +-- middlewares.ts                  # CORS fuer Vercel
|   |   +-- plugins.ts                      # Cloudinary (optional)
|   |   +-- server.ts
|   |   +-- admin.ts
|   |   +-- api.ts
|   +-- package.json                        # Strapi-Dependencies
|   +-- tsconfig.json
|   +-- .env.example
|   +-- .gitignore                          # Strapi-spezifisch
|
+-- .env.local                              # Lokale Env Vars
+-- .env.example                            # Env Template
+-- .gitignore                              # Root + cms/ Ignores
+-- package.json                            # Next.js Dependencies
+-- ARCHITECTURE.md                         # Diese Datei
+-- CLAUDE.md                               # AI-Instruktionen
```

---

## Lokale Entwicklung

```bash
# Terminal 1: Strapi CMS starten
cd cms
npm install          # Nur beim ersten Mal
npm run develop      # http://localhost:1337/admin

# Terminal 2: Next.js Frontend starten
npm run dev          # http://localhost:3000
```

Beim ersten Start von Strapi:
1. Seed laeuft automatisch (erstellt + publiziert alle Daten)
2. Admin Panel oeffnen -> Account erstellen
3. Alle Inhalte sind bereits da und publiziert

---

## AI-Prompt Template

```
Du arbeitest an einem Portfolio-Projekt mit dieser Architektur:

STACK:
- Frontend: Next.js 16 (App Router, TypeScript, Tailwind CSS v4, shadcn/ui Pattern)
- CMS: Strapi v5 (REST API, PostgreSQL in Produktion, SQLite lokal)
- Deployment: Vercel (Frontend, Root /) + Strapi Cloud (CMS, Base Dir /cms/)
- Monorepo: casimanodes/portfolio (Frontend: / + CMS: /cms/)

WICHTIGE REGELN:
- Strapi v5 gibt Felder DIREKT zurueck (item.title), NICHT unter .attributes
- Media in v5: image.url (NICHT image.data.attributes.url)
- Collection Type Endpunkte sind PLURAL: /api/offers, /api/faqs
- Single Type Endpunkte sind SINGULAR: /api/hero-content, /api/site-setting
- Jede Fetch-Funktion hat 3 Pfade: USE_MOCK -> try Strapi -> catch Mock-Fallback
- populate=* fuer Relationen und Media
- draftAndPublish: Eintraege muessen nach create() explizit publish() werden
- Mock-Daten: Vollstaendiger Datensatz in src/lib/mock-data.ts
- TypeScript Interfaces: Alle in src/types/index.ts definiert

DATENFLUSS:
Strapi Admin Panel -> REST API -> src/lib/strapi.ts -> Server Components -> Props -> Section Components

BEI AENDERUNGEN AN CONTENT TYPES:
1. Schema in cms/src/api/{name}/content-types/{name}/schema.json
2. Seed in cms/src/index.ts (createAndPublish + Permissions)
3. Interface in src/types/index.ts
4. Fetch in src/lib/strapi.ts
5. Mock in src/lib/mock-data.ts
6. Komponente in src/components/sections/

BEI FEHLERN:
- Daten nicht sichtbar? -> draftAndPublish: Eintraege publiziert?
- 0 Ergebnisse? -> populate=* in der Query?
- Bilder kaputt? -> strapiImage() nutzt .url direkt (v5)
- CORS? -> FRONTEND_URL in Strapi Cloud Env setzen
- Mock statt echte Daten? -> NEXT_PUBLIC_STRAPI_URL in Vercel gesetzt?

DATEIEN DIE DU KENNEN MUSST:
- src/lib/strapi.ts             -> API Client (alle Fetch-Funktionen)
- src/lib/mock-data.ts          -> Fallback-Daten
- src/types/index.ts            -> TypeScript Interfaces
- cms/src/index.ts              -> Seed + Permissions
- cms/config/middlewares.ts     -> CORS Config
- cms/src/api/*/content-types/*/schema.json -> Content Types

Aufgabe: [HIER DEINE AUFGABE EINFUEGEN]
```

---

## Schnelle Referenz: Strapi Cloud Setup

```
1. cloud.strapi.io -> Anmelden mit GitHub
2. "Create Project" -> GitHub: casimanodes/portfolio
3. Base Directory: cms/
4. Branch: main, Region: EU -> Deploy
5. URL notieren (z.B. https://trainer-xyz.strapiapp.com)
6. Strapi Cloud Settings -> Env Var: FRONTEND_URL = https://deine-vercel-url
7. Admin Panel oeffnen -> Account erstellen
8. Vercel -> portfolio Projekt -> Settings -> Env Vars:
   NEXT_PUBLIC_STRAPI_URL = https://trainer-xyz.strapiapp.com
9. Vercel Redeploy -> Fertig!
```
