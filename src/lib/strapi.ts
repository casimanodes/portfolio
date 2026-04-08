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
      portraitImage: strapiImage(raw.portraitImage?.url),
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
      image: strapiImage(item.image?.url),
      ctaText: item.ctaText,
      ctaLink: item.ctaLink,
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

// ── Themenbereiche (Hero-Grid) ──
export async function getThemenbereiche(): Promise<ThemenbereichItem[]> {
  if (USE_MOCK) return mockThemenbereiche;
  try {
    const raw = await fetchStrapi<Array<Record<string, any>>>(
      "/themenbereiche?populate=*&sort=reihenfolge:asc"
    );

    return raw.map((item) => ({
      id: item.id,
      titel: item.titel,
      beschreibung: item.beschreibung,
      bild: strapiImage(item.bild?.url) || "",
      slug: item.slug || item.titel.toLowerCase().replace(/\s+/g, "-"),
      reihenfolge: item.reihenfolge,
    }));
  } catch {
    return mockThemenbereiche;
  }
}
