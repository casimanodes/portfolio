import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import Stats from "@/components/sections/Stats";
import OffersGrid from "@/components/sections/OffersGrid";
import Schedule from "@/components/sections/Schedule";
import Testimonials from "@/components/sections/Testimonials";
import FAQSection from "@/components/sections/FAQ";
import CTAStrip from "@/components/sections/CTAStrip";
import ContactSection from "@/components/sections/ContactSection";
import {
  getOffers,
  getSchedule,
  getTestimonials,
  getFAQ,
  getThemenbereiche,
  getHeroContent,
  getStats,
  getAboutContent,
  getOffersSection,
  getContactSection,
  getSiteSettings,
} from "@/lib/strapi";

export default async function HomePage() {
  const [
    offers,
    schedule,
    testimonials,
    faq,
    themenbereiche,
    heroContent,
    stats,
    about,
    offersSection,
    contactSection,
    siteSettings,
  ] = await Promise.all([
    getOffers(),
    getSchedule(),
    getTestimonials(),
    getFAQ(),
    getThemenbereiche(),
    getHeroContent(),
    getStats(),
    getAboutContent(),
    getOffersSection(),
    getContactSection(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Hero
        content={heroContent}
        heroStats={stats}
        nextSchedule={schedule}
        themenbereiche={themenbereiche}
      />
      <AboutPreview about={about} />
      <Stats stats={stats} />
      <OffersGrid offers={offers} section={offersSection} />
      <Schedule schedule={schedule} />
      <Testimonials testimonials={testimonials} />
      <FAQSection items={faq} />
      <CTAStrip />
      <ContactSection content={contactSection} settings={siteSettings} />
    </>
  );
}
