import FAQSection from "@/components/sections/FAQ";
import CTAStrip from "@/components/sections/CTAStrip";
import { getFAQ } from "@/lib/strapi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – Trainer Hamburg",
  description: "Häufig gestellte Fragen zu Kursen, Preisen, Anmeldung und Vereinsbeitritt.",
};

export default async function FAQPage() {
  const faq = await getFAQ();

  return (
    <div className="pt-16">
      <FAQSection items={faq} />
      <CTAStrip />
    </div>
  );
}
