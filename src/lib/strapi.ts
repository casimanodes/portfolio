import type { Offer, ScheduleItem, Testimonial, FAQItem } from "@/types";
import type { ThemenbereichItem } from "@/components/shared/DynamicFrameLayout";
import { mockOffers, mockSchedule, mockTestimonials, mockFAQ, mockThemenbereiche } from "./mock-data";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

const USE_MOCK = !process.env.NEXT_PUBLIC_STRAPI_URL;

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

export async function getOffers(): Promise<Offer[]> {
  if (USE_MOCK) return mockOffers;
  try {
    return await fetchStrapi<Offer[]>("/offers?populate=*&sort=id:asc");
  } catch {
    console.warn("Strapi nicht erreichbar, verwende Mock-Daten.");
    return mockOffers;
  }
}

export async function getOfferBySlug(slug: string): Promise<Offer | null> {
  if (USE_MOCK) return mockOffers.find((o) => o.slug === slug) || null;
  try {
    const data = await fetchStrapi<Offer[]>(
      `/offers?filters[slug][$eq]=${slug}&populate=*`
    );
    return data[0] || null;
  } catch {
    return mockOffers.find((o) => o.slug === slug) || null;
  }
}

export async function getSchedule(): Promise<ScheduleItem[]> {
  if (USE_MOCK) return mockSchedule;
  try {
    return await fetchStrapi<ScheduleItem[]>("/schedules?populate=*&sort=id:asc");
  } catch {
    return mockSchedule;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (USE_MOCK) return mockTestimonials;
  try {
    return await fetchStrapi<Testimonial[]>("/testimonials?populate=*");
  } catch {
    return mockTestimonials;
  }
}

export async function getFAQ(): Promise<FAQItem[]> {
  if (USE_MOCK) return mockFAQ;
  try {
    return await fetchStrapi<FAQItem[]>("/faqs?populate=*&sort=id:asc");
  } catch {
    return mockFAQ;
  }
}

export async function getThemenbereiche(): Promise<ThemenbereichItem[]> {
  if (USE_MOCK) return mockThemenbereiche;
  try {
    const data = await fetchStrapi<Array<{
      id: number;
      attributes: {
        titel: string;
        beschreibung: string;
        reihenfolge: number;
        bild: { data: { attributes: { url: string } } };
      };
    }>>("/themenbereiche?populate=*&sort=reihenfolge:asc");

    return data.map((item) => ({
      id: item.id,
      titel: item.attributes.titel,
      beschreibung: item.attributes.beschreibung,
      bild: `${STRAPI_URL}${item.attributes.bild.data.attributes.url}`,
      slug: item.attributes.titel.toLowerCase().replace(/\s+/g, "-"),
      reihenfolge: item.attributes.reihenfolge,
    }));
  } catch {
    return mockThemenbereiche;
  }
}
