import { site, whatsappUrl } from '@/config/site';
import type { FaqItem, Service } from '@/data/services';

/** Werkgebied: Nederland. */
const areaServed = [
  { '@type': 'Country', name: 'Nederland' },
];

/**
 * Structured data (JSON-LD) voor Google. Bevat uitsluitend bevestigde gegevens:
 * velden die in src/config/site.ts op null staan, worden weggelaten.
 */
export function organizationSchema(origin: string, logoUrl: string) {
  const { contact, social } = site;
  const sameAs = [social.facebook, social.instagram, social.linkedin].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${origin}/#organisatie`,
    name: site.name,
    description: site.description,
    foundingDate: site.founded,
    founder: {
      '@type': 'Person',
      name: site.owner.name,
      jobTitle: site.owner.role,
      hasCredential: { '@type': 'EducationalOccupationalCredential', name: site.owner.education },
    },
    url: `${origin}/`,
    logo: logoUrl,
    image: logoUrl,
    slogan: site.tagline,
    areaServed,
    knowsLanguage: 'nl',
    ...(contact.email && { email: contact.email }),
    ...(contact.phone && { telephone: contact.phone }),
    address: {
      '@type': 'PostalAddress',
      ...(contact.address && { streetAddress: contact.address.street }),
      addressLocality: contact.address?.city ?? site.city,
      ...(contact.address?.district && { addressRegion: contact.address.district }),
      addressCountry: 'SR',
    },
    ...(sameAs.length && { sameAs }),
    ...(whatsappUrl() && {
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', url: whatsappUrl() },
    }),
  };
}

export function websiteSchema(origin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    name: site.name,
    url: `${origin}/`,
    inLanguage: 'nl',
    publisher: { '@id': `${origin}/#organisatie` },
  };
}

export function serviceSchema(origin: string, s: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${s.name} — ${s.subtitle}`,
    serviceType: s.subtitle,
    description: s.seoDescription,
    url: `${origin}/diensten/${s.slug}`,
    areaServed,
    provider: { '@id': `${origin}/#organisatie` },
    ...(s.priceFromHourly && {
      offers: {
        '@type': 'Offer',
        priceSpecification: { '@type': 'UnitPriceSpecification', minPrice: s.priceFromHourly, priceCurrency: 'EUR', unitCode: 'HUR' },
      },
    }),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}

export function breadcrumbSchema(origin: string, crumbs: { name: string; path: string }[]) {
  const all = [{ name: 'Home', path: '/' }, ...crumbs];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${origin}${c.path === '/' ? '/' : c.path}`,
    })),
  };
}

/** Dienst per softwarepakket (geen partnerschap; alleen de ondersteuning die wij leveren). */
export function softwareServiceSchema(origin: string, sw: { name: string; slug: string; seoDescription: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Ondersteuning financiële administratie in ${sw.name}`,
    serviceType: 'Uitbesteding van financiële administratie',
    description: sw.seoDescription,
    url: `${origin}/software/${sw.slug}`,
    areaServed,
    provider: { '@id': `${origin}/#organisatie` },
  };
}

/** Landenpagina: dezelfde organisatie, gericht op één land. */
export function countryServiceSchema(origin: string, path: string, country: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Uitbesteding van financiële administratie — ${country}`,
    serviceType: 'Uitbesteding van financiële administratie',
    description,
    url: `${origin}${path}`,
    areaServed: { '@type': 'Country', name: country },
    provider: { '@id': `${origin}/#organisatie` },
  };
}
