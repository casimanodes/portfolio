export interface Offer {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  badge: string;
  badgeColor: "primary" | "blue" | "green" | "pink" | "amber";
  gradient: string;
  features: string[];
  prices: PriceOption[];
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

export interface ScheduleItem {
  id: number;
  day: string;
  time: string;
  type: string;
  offerSlug: string;
  badgeColor: "primary" | "blue" | "green" | "pink" | "amber";
  location: string;
  spotsLeft?: number;
  price?: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  authorName: string;
  authorRole: string;
  authorInitials: string;
  rating: number;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

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
