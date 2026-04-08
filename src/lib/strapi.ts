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
export function strapiImage(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

// ── Generischer Strapi Fetch ──
async function fetchStrapi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
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
    const raw = await fetchStrapi<{ attributes: Record<string, string> }>(
      "/site-setting?populate=*"
    );
    const a = raw.attributes;
    return {
      siteName: a.siteName || mockSiteSettings.siteName,
      siteSubtitle: a.siteSubtitle || mockSiteSettings.siteSubtitle,
      logoText: a.logoText || mockSiteSettings.logoText,
      email: a.email || mockSiteSettings.email,
      location: a.location || mockSiteSettings.location,
      responseTime: a.responseTime || mockSiteSettings.responseTime,
      socialInstagram: a.socialInstagram || "",
      socialFacebook: a.socialFacebook || "",
      socialYoutube: a.socialYoutube || "",
      socialTiktok: a.socialTiktok || "",
    };
  } catch {
    return mockSiteSettings;
  }
}

// ── Hero Content (Single Type) ──
export async function getHeroContent(): Promise<HeroContent> {
  if (USE_MOCK) return mockHero;
  try {
    const raw = await fetchStrapi<{ attributes: Record<string, string> }>(
      "/hero-content?populate=*"
    );
    const a = raw.attributes;
    return {
      tagline: a.tagline || mockHero.tagline,
      titleLine1: a.titleLine1 || mockHero.titleLine1,
      titleLine2: a.titleLine2 || mockHero.titleLine2,
      description: a.description || mockHero.description,
      ctaPrimaryText: a.ctaPrimaryText || mockHero.ctaPrimaryText,
      ctaPrimaryLink: a.ctaPrimaryLink || mockHero.ctaPrimaryLink,
      ctaSecondaryText: a.ctaSecondaryText || mockHero.ctaSecondaryText,
      ctaSecondaryLink: a.ctaSecondaryLink || mockHero.ctaSecondaryLink,
    };
  } catch {
    return mockHero;
  }
}

// ── Stats ──
export async function getStats(): Promise<StatItem[]> {
  if (USE_MOCK) return mockStats;
  try {
    const raw = await fetchStrapi<Array<{
      id: number;
      attributes: { value: string; label: string; reihenfolge: number };
    }>>("/stats?sort=reihenfolge:asc");
    return raw.map((item) => ({
      id: item.id,
      value: item.attributes.value,
      label: item.attributes.label,
      reihenfolge: item.attributes.reihenfolge,
    }));
  } catch {
    return mockStats;
  }
}

// ── About Content (Single Type) ──
export async function getAboutContent(): Promise<AboutContent> {
  if (USE_MOCK) return mockAbout;
  try {
    const raw = await fetchStrapi<{
      attributes: {
        headline: string;
        highlightedWord: string;
        text1: string;
        text2: string;
        portraitBadgeText: string;
        portraitImage?: { data?: { attributes: { url: string } } };
        qualifications: Array<{ id: number; icon: string; title: string; description: string }>;
        tags: Array<{ id: number; label: string; color: BadgeColor }>;
      };
    }>("/about-content?populate=*");
    const a = raw.attributes;
    return {
      headline: a.headline || mockAbout.headline,
      highlightedWord: a.highlightedWord || mockAbout.highlightedWord,
      text1: a.text1 || mockAbout.text1,
      text2: a.text2 || mockAbout.text2,
      portraitImage: strapiImage(a.portraitImage?.data?.attributes?.url),
      portraitBadgeText: a.portraitBadgeText || mockAbout.portraitBadgeText,
      qualifications: a.qualifications || mockAbout.qualifications,
      tags: a.tags || mockAbout.tags,
    };
  } catch {
    return mockAbout;
  }
}

// ── Angebote ──
export async function getOffers(): Promise<Offer[]> {
  if (USE_MOCK) return mockOffers;
  try {
    const raw = await fetchStrapi<Array<{
      id: number;
      attributes: {
        slug: string;
        title: string;
        shortTitle: string;
        description: string;
        longDescription: string;
        icon: string;
        badge: string;
        badgeColor: BadgeColor;
        gradient: string;
        features: string;
        ctaText: string;
        ctaLink: string;
        image?: { data?: { attributes: { url: string } } };
        prices: Array<{
          id: number;
          name: string;
          price: number;
          unit: string;
          description: string;
          highlighted?: boolean;
        }>;
      };
    }>>("/offers?populate=*&sort=id:asc");

    return raw.map((item) => {
      const a = item.attributes;
      return {
        id: item.id,
        slug: a.slug,
        title: a.title,
        shortTitle: a.shortTitle,
        description: a.description,
        longDescription: a.longDescription,
        icon: a.icon,
        badge: a.badge,
        badgeColor: a.badgeColor,
        gradient: a.gradient,
        features: typeof a.features === "string" ? a.features.split("\n").filter(Boolean) : a.features,
        prices: a.prices || [],
        image: strapiImage(a.image?.data?.attributes?.url),
        ctaText: a.ctaText,
        ctaLink: a.ctaLink,
      };
    });
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
    const raw = await fetchStrapi<Array<{
      id: number;
      attributes: {
        day: string;
        time: string;
        type: string;
        offerSlug: string;
        badgeColor: BadgeColor;
        location: string;
        spotsLeft?: number;
        price?: number;
      };
    }>>("/schedules?sort=id:asc");
    return raw.map((item) => ({
      id: item.id,
      ...item.attributes,
    }));
  } catch {
    return mockSchedule;
  }
}

// ── Testimonials ──
export async function getTestimonials(): Promise<Testimonial[]> {
  if (USE_MOCK) return mockTestimonials;
  try {
    const raw = await fetchStrapi<Array<{
      id: number;
      attributes: {
        quote: string;
        authorName: string;
        authorRole: string;
        authorInitials: string;
        rating: number;
      };
    }>>("/testimonials?populate=*");
    return raw.map((item) => ({
      id: item.id,
      ...item.attributes,
    }));
  } catch {
    return mockTestimonials;
  }
}

// ── FAQ ──
export async function getFAQ(): Promise<FAQItem[]> {
  if (USE_MOCK) return mockFAQ;
  try {
    const raw = await fetchStrapi<Array<{
      id: number;
      attributes: { question: string; answer: string };
    }>>("/faqs?sort=id:asc");
    return raw.map((item) => ({
      id: item.id,
      ...item.attributes,
    }));
  } catch {
    return mockFAQ;
  }
}

// ── Themenbereiche (Hero-Grid) ──
export async function getThemenbereiche(): Promise<ThemenbereichItem[]> {
  if (USE_MOCK) return mockThemenbereiche;
  try {
    const raw = await fetchStrapi<Array<{
      id: number;
      attributes: {
        titel: string;
        beschreibung: string;
        reihenfolge: number;
        slug: string;
        bild: { data: { attributes: { url: string } } };
      };
    }>>("/themenbereiche?populate=*&sort=reihenfolge:asc");

    return raw.map((item) => ({
      id: item.id,
      titel: item.attributes.titel,
      beschreibung: item.attributes.beschreibung,
      bild: strapiImage(item.attributes.bild.data.attributes.url) || "",
      slug: item.attributes.slug || item.attributes.titel.toLowerCase().replace(/\s+/g, "-"),
      reihenfolge: item.attributes.reihenfolge,
    }));
  } catch {
    return mockThemenbereiche;
  }
}
