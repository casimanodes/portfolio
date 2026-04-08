// ── Angebote ──
export interface Offer {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  badge: string;
  badgeColor: BadgeColor;
  gradient: string;
  features: string[];
  prices: PriceOption[];
  image?: string;
  ctaText: string;
  ctaLink: string;
}

export interface PriceOption {
  id: number;
  name: string;
  price: number;
  unit: string;
  description: string;
  highlighted?: boolean;
}

// ── Termine ──
export interface ScheduleItem {
  id: number;
  day: string;
  time: string;
  type: string;
  offerSlug: string;
  badgeColor: BadgeColor;
  location: string;
  spotsLeft?: number;
  price?: number;
}

// ── Testimonials ──
export interface Testimonial {
  id: number;
  quote: string;
  authorName: string;
  authorRole: string;
  authorInitials: string;
  rating: number;
}

// ── FAQ ──
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// ── Hero ──
export interface HeroContent {
  tagline: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
}

// ── Stats (die Zahlen-Leiste) ──
export interface StatItem {
  id: number;
  value: string;
  label: string;
  reihenfolge: number;
}

// ── Über mich ──
export interface AboutContent {
  headline: string;
  highlightedWord: string;
  text1: string;
  text2: string;
  portraitImage?: string;
  portraitBadgeText: string;
  qualifications: Qualification[];
  tags: TagItem[];
}

export interface Qualification {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface TagItem {
  id: number;
  label: string;
  color: BadgeColor;
}

// ── Seitenweite Einstellungen ──
export interface SiteSettings {
  siteName: string;
  siteSubtitle: string;
  logoText: string;
  email: string;
  location: string;
  responseTime: string;
  socialInstagram: string;
  socialFacebook: string;
  socialYoutube: string;
  socialTiktok: string;
}

// ── Kontakt ──
export interface ContactInfo {
  email: string;
  location: string;
  responseTime: string;
  socials: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// ── Shared ──
export type BadgeColor = "primary" | "blue" | "green" | "pink" | "amber";

// ── Strapi Helpers ──
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
}
