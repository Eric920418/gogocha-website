import { site, stats } from "@/lib/site";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.png`,
    telephone: site.phone,
    sameAs: [],
  };
}

export function buildTaxiServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    image: `${site.url}/og-image.png`,
    priceRange: "$$",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "花蓮縣",
      containedInPlace: {
        "@type": "Country",
        name: "Taiwan",
      },
    },
    provider: {
      "@type": "Organization",
      name: site.name,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: stats.rating,
      reviewCount: stats.reviewCount.replace(/[^\d]/g, ""),
    },
  };
}

export function buildFAQJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
