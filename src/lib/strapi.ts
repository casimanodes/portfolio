import type {
  Offer,
  ScheduleItem,
  Testimonial,
  FAQItem,
  HeroContent,
  StatItem,
  AboutContent,
  SiteSettings,
  BadgeColor,
  HeaderContent,
  OffersSectionContent,
  ContactSectionContent,
} from "@/types";
import type { ThemenbereichItem } from "@/components/shared/DynamicFrameLayout";
import {
  mockOffers,
  mockSchedule,
  mockTestimonials,
  mockFAQ,
  mockThemenbereiche,
  mockHero,
  mockStats,
  mockAbout,
  mockSiteSettings,
  mockHeader,
  mockOffersSection,
  mockContactSection,
} from "./mock-data";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

const USE_MOCK = !process.env.NEXT_PUBLIC_STRAPI_URL;

// ── Helper: Strapi-Bild-URL aufloesen ──
export function strapiImage(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

// Strapi v5 kann Media-Felder in mehreren Formen zurückgeben:
// - Strapi 5 default (mit populate=*): { id, url, mime, formats: { ... } }
// - Strapi 4 legacy:                  { data: { id, attributes: { url, ... } } }
// - Strapi 4 plain:                   { url, mime, ... }
// Wir versuchen alle drei und fallen am Ende auf `undefined` zurück.
export function strapiMediaUrl(media: any): string | undefined {
  if (!media) return undefined;

  // Falls schon ein String (selten, aber möglich):
  if (typeof media === "string") return strapiImage(media);

  // Strapi v5 flach:
  if (typeof media.url === "string") return strapiImage(media.url);

  // Strapi v4 nested:
  const v4Url = media?.data?.attributes?.url ?? media?.data?.url;
  if (typeof v4Url === "string") return strapiImage(v4Url);

  // Manche Felder enthalten formats statt url:
  const fmt = media.formats || media?.data?.attributes?.formats;
  if (fmt) {
    const candidate =
      fmt.large?.url || fmt.medium?.url || fmt.small?.url || fmt.thumbnail?.url;
    if (typeof candidate === "string") return strapiImage(candidate);
  }

  return undefined;
}

// ── Generischer Strapi v5 Fetch ──
async function fetchStrapi<T>(endpoint: string): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  // Only add auth header if token exists
  if (STRAPI_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return json.data;
}

// ── Header Content (Single Type) ──
export async function getHeaderContent(): Promise<HeaderContent> {
  if (USE_MOCK) return mockHeader;
  try {
    const raw = await fetchStrapi<Record<string, any>>("/header-content?populate=*");
    return {
      brandName: raw.brandName || mockHeader.brandName,
      brandSubtitle: raw.brandSubtitle || mockHeader.brandSubtitle,
      logoText: raw.logoText || mockHeader.logoText,
      moreLabel: raw.moreLabel || mockHeader.moreLabel,
      ctaLabel: raw.ctaLabel || mockHeader.ctaLabel,
      ctaLink: raw.ctaLink || mockHeader.ctaLink,
    };
  } catch {
    return mockHeader;
  }
}

// ── Offers Section (Single Type) ──
export async function getOffersSection(): Promise<OffersSectionContent> {
  if (USE_MOCK) return mockOffersSection;
  try {
    const raw = await fetchStrapi<Record<string, any>>("/offers-section?populate=*");
    return {
      label: raw.label || mockOffersSection.label,
      heading: raw.heading || mockOffersSection.heading,
      intro: raw.intro || mockOffersSection.intro,
    };
  } catch {
    return mockOffersSection;
  }
}

// ── Contact Section (Single Type) ──
export async function getContactSection(): Promise<ContactSectionContent> {
  if (USE_MOCK) return mockContactSection;
  try {
    const raw = await fetchStrapi<Record<string, any>>("/contact-section?populate=*");
    const interestsRaw = raw.interests;
    let interests: string[];
    if (Array.isArray(interestsRaw)) {
      interests = interestsRaw;
    } else if (typeof interestsRaw === "string") {
      interests = interestsRaw.split("\n").map((s) => s.trim()).filter(Boolean);
    } else {
      interests = mockContactSection.interests;
    }
    return {
      label: raw.label || mockContactSection.label,
      heading: raw.heading || mockContactSection.heading,
      intro: raw.intro || mockContactSection.intro,
      emailLabel: raw.emailLabel || mockContactSection.emailLabel,
      locationLabel: raw.locationLabel || mockContactSection.locationLabel,
      responseLabel: raw.responseLabel || mockContactSection.responseLabel,
      socialLabel: raw.socialLabel || mockContactSection.socialLabel,
      formHeading: raw.formHeading || mockContactSection.formHeading,
      formIntro: raw.formIntro || mockContactSection.formIntro,
      interests,
      submitLabel: raw.submitLabel || mockContactSection.submitLabel,
      successMessage: raw.successMessage || mockContactSection.successMessage,
      consentText: raw.consentText || mockContactSection.consentText,
    };
  } catch {
    return mockContactSection;
  }
}

// ── Site Settings (Single Type) ──
export async function getSiteSettings(): Promise<SiteSettings> {
  if (USE_MOCK) return mockSiteSettings;
  try {
    // Strapi v5: fields are directly on the data object (no .attributes)
    const raw = await fetchStrapi<Record<string, any>>("/site-setting?populate=*");
    return {
      siteName: raw.siteName || mockSiteSettings.siteName,
      siteSubtitle: raw.siteSubtitle || mockSiteSettings.siteSubtitle,
      logoText: raw.logoText || mockSiteSettings.logoText,
      email: raw.email || mockSiteSettings.email,
      location: raw.location || mockSiteSettings.location,
      responseTime: raw.responseTime || mockSiteSettings.responseTime,
      socialInstagram: raw.socialInstagram || "",
      socialFacebook: raw.socialFacebook || "",
      socialYoutube: raw.socialYoutube || "",
      socialTiktok: raw.socialTiktok || "",
    };
  } catch {
    return mockSiteSettings;
  }
}

// ── Hero Content (Single Type) ──
export async function getHeroContent(): Promise<HeroContent> {
  if (USE_MOCK) return mockHero;
  try {
    const raw = await fetchStrapi<Record<string, any>>("/hero-content?populate=*");
    return {
      tagline: raw.tagline || mockHero.tagline,
      titleLine1: raw.titleLine1 || mockHero.titleLine1,
      titleLine2: raw.titleLine2 || mockHero.titleLine2,
      description: raw.description || mockHero.description,
      ctaPrimaryText: raw.ctaPrimaryText || mockHero.ctaPrimaryText,
      ctaPrimaryLink: raw.ctaPrimaryLink || mockHero.ctaPrimaryLink,
      ctaSecondaryText: raw.ctaSecondaryText || mockHero.ctaSecondaryText,
      ctaSecondaryLink: raw.ctaSecondaryLink || mockHero.ctaSecondaryLink,
    };
  } catch {
    return mockHero;
  }
}

// ── Stats ──
export async function getStats(): Promise<StatItem[]> {
  if (USE_MOCK) return mockStats;
  try {
    const raw = await fetchStrapi<Array<Record<string, any>>>(
      "/stats?sort=reihenfolge:asc"
    );
    return raw.map((item) => ({
      id: item.id,
      value: item.value,
      label: item.label,
      reihenfolge: item.reihenfolge,
    }));
  } catch {
    return mockStats;
  }
}

// ── About Content (Single Type) ──
export async function getAboutContent(): Promise<AboutContent> {
  if (USE_MOCK) return mockAbout;
  try {
    const raw = await fetchStrapi<Record<string, any>>(
      "/about-content?populate=*"
    );
    return {
      headline: raw.headline || mockAbout.headline,
      highlightedWord: raw.highlightedWord || mockAbout.highlightedWord,
      text1: raw.text1 || mockAbout.text1,
      text2: raw.text2 || mockAbout.text2,
      portraitImage: strapiMediaUrl(raw.portraitImage),
      portraitBadgeText: raw.portraitBadgeText || mockAbout.portraitBadgeText,
      qualifications: raw.qualifications || mockAbout.qualifications,
      tags: raw.tags || mockAbout.tags,
    };
  } catch {
    return mockAbout;
  }
}

// ── Angebote ──
export async function getOffers(): Promise<Offer[]> {
  if (USE_MOCK) return mockOffers;
  try {
    const raw = await fetchStrapi<Array<Record<string, any>>>(
      "/offers?populate=*&sort=id:asc"
    );

    return raw.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      shortTitle: item.shortTitle,
      description: item.description,
      longDescription: item.longDescription,
      icon: item.icon,
      badge: item.badge,
      badgeColor: item.badgeColor as BadgeColor,
      gradient: item.gradient,
      features:
        typeof item.features === "string"
          ? item.features.split("\n").filter(Boolean)
          : item.features || [],
      prices: (item.prices || []).map((p: Record<string, any>) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        unit: p.unit,
        description: p.description,
        highlighted: p.highlighted || false,
      })),
      image: strapiMediaUrl(item.image),
      ctaText: item.ctaText,
      ctaLink: item.ctaLink,
      externalLink: item.externalLink || undefined,
    }));
  } catch {
    console.warn("Strapi nicht erreichbar, verwende Mock-Daten.");
    return mockOffers;
  }
}

export async function getOfferBySlug(slug: string): Promise<Offer | null> {
  if (USE_MOCK) return mockOffers.find((o) => o.slug === slug) || null;
  try {
    const offers = await getOffers();
    return offers.find((o) => o.slug === slug) || null;
  } catch {
    return mockOffers.find((o) => o.slug === slug) || null;
  }
}

// ── Termine ──
export async function getSchedule(): Promise<ScheduleItem[]> {
  if (USE_MOCK) return mockSchedule;
  try {
    const raw = await fetchStrapi<Array<Record<string, any>>>(
      "/schedules?sort=id:asc"
    );
    return raw.map((item) => ({
      id: item.id,
      day: item.day,
      time: item.time,
      type: item.type,
      offerSlug: item.offerSlug,
      badgeColor: item.badgeColor as BadgeColor,
      location: item.location,
      spotsLeft: item.spotsLeft,
      price: item.price,
    }));
  } catch {
    return mockSchedule;
  }
}

// ── Testimonials ──
export async function getTestimonials(): Promise<Testimonial[]> {
  if (USE_MOCK) return mockTestimonials;
  try {
    const raw = await fetchStrapi<Array<Record<string, any>>>(
      "/testimonials?populate=*"
    );
    return raw.map((item) => ({
      id: item.id,
      quote: item.quote,
      authorName: item.authorName,
      authorRole: item.authorRole,
      authorInitials: item.authorInitials,
      rating: item.rating,
    }));
  } catch {
    return mockTestimonials;
  }
}

// ── FAQ ──
export async function getFAQ(): Promise<FAQItem[]> {
  if (USE_MOCK) return mockFAQ;
  try {
    const raw = await fetchStrapi<Array<Record<string, any>>>(
      "/faqs?sort=id:asc"
    );
    return raw.map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
    }));
  } catch {
    return mockFAQ;
  }
}

// Slug → lokales Fallback-Bild (wenn Strapi kein bild-Asset hochgeladen hat)
const SLUG_FALLBACK_IMAGE: Record<string, string> = {
  zauberwuerfel: "/images/zauberwuerfel.svg",
  schach: "/images/schach.svg",
  schlagball: "/images/schlagball.svg",
  badminton: "/images/badminton.svg",
  denksport: "/images/denksport.svg",
  schwimmen: "/images/schwimmen.svg",
};

function resolveThemenbereichBild(strapiUrl: string | undefined, slug: string): string {
  // 1) Strapi-Bild wenn vorhanden
  if (strapiUrl && strapiUrl.trim().length > 0) return strapiUrl;
  // 2) Lokales Fallback für bekannten Slug
  if (slug && SLUG_FALLBACK_IMAGE[slug]) return SLUG_FALLBACK_IMAGE[slug];
  // 3) Generisches Fallback
  return "/images/denksport.svg";
}

// ── Themenbereiche (Hero-Grid) ──
export async function getThemenbereiche(): Promise<ThemenbereichItem[]> {
  if (USE_MOCK) return mockThemenbereiche;
  try {
    const raw = await fetchStrapi<Array<Record<string, any>>>(
      "/themenbereiche?populate=*&sort=reihenfolge:asc"
    );

    return raw.map((item) => {
      const slug = item.slug || item.titel.toLowerCase().replace(/\s+/g, "-");
      return {
        id: item.id,
        titel: item.titel,
        beschreibung: item.beschreibung,
        bild: resolveThemenbereichBild(strapiMediaUrl(item.bild), slug),
        slug,
        reihenfolge: item.reihenfolge,
      };
    });
  } catch {
    return mockThemenbereiche;
  }
}
