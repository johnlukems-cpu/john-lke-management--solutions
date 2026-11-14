/**
 * Centrale bedrijfsgegevens van John-Luke Finance Outsourcing.
 *
 * LET OP — niets in dit bestand mag worden verzonnen.
 * Velden met `null` zijn nog niet bevestigd en worden NIET op de website getoond.
 * Zodra u een gegeven invult, verschijnt het automatisch in de header, footer,
 * contactsectie, WhatsApp-knop en de structured data voor Google.
 */

export interface Address {
  street: string;
  city: string;
  /** Bijv. 'Paramaribo' of het district */
  district?: string;
}

export const site = {
  /** Officiële bedrijfsnaam — schrijf dit altijd exact zo */
  name: 'John-Luke Finance Outsourcing',
  shortName: 'John-Luke',
  tagline: 'The smarter way forward.',
  /** Kernpositionering */
  positioning: 'Uw betrouwbare partner voor Financial Outsourcing.',
  description:
    'John-Luke Finance Outsourcing helpt Nederlandse administratie- en accountantskantoren hun capaciteit te vergroten door financiële administratieve werkzaamheden professioneel en efficiënt vanuit Suriname te laten uitvoeren.',
  /** Primaire doelmarkt is Nederland; de onderneming is gevestigd in Paramaribo, Suriname */
  locale: 'nl_NL',
  language: 'nl',
  city: 'Paramaribo',
  country: 'Suriname',
  /** Ervaring met Nederlandse administraties en btw (door de eigenaar opgegeven) */
  outsourcingExperience: 'meer dan 3 jaar',

  /** Oprichting en eigenaar — door de eigenaar aangeleverd */
  founded: '2025-06',
  owner: {
    name: 'Jagernath John',
    role: 'Eigenaar en Finance Controller',
    education: 'Master of Accounting',
    experience: 'Meer dan 10 jaar ervaring in administratie',
    quote: 'Sterke financiële controle is de ruggengraat van goed bestuur.',
  },

  contact: {
    /** Zakelijk e-mailadres, bijv. 'info@uwdomein.com'. null = niet tonen. */
    email: null as string | null,
    /** Telefoonnummer zoals bezoekers het lezen, bijv. '+597 123 4567'. null = niet tonen. */
    phone: null as string | null,
    /**
     * WhatsApp-nummer in internationaal formaat zonder plus, spaties of streepjes
     * (zo verwacht wa.me het), bijv. '5971234567'. null = geen WhatsApp-knop.
     */
    whatsapp: null as string | null,
    /** Vestigingsadres. null = niet tonen. */
    address: null as Address | null,
    /** Bereikbaarheid, bijv. 'Ma–vr 08:00–16:30'. null = niet tonen. */
    openingHours: null as string | null,
    /** KKF-inschrijvingsnummer. null = niet tonen. */
    kkf: null as string | null,
  },

  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    linkedin: null as string | null,
  },
} as const;

/** Standaardbericht dat in WhatsApp wordt voorgevuld. */
export const whatsappMessage =
  'Goedendag, ik heb een vraag over de dienstverlening van John-Luke Finance Outsourcing.';

/** Volledige wa.me-link, of null als er (nog) geen WhatsApp-nummer is. */
export function whatsappUrl(message: string = whatsappMessage): string | null {
  const number = site.contact.whatsapp?.replace(/\D/g, '');
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** tel:-link op basis van het telefoonnummer. */
export function phoneHref(): string | null {
  const phone = site.contact.phone;
  return phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : null;
}

/** Zijn er directe contactgegevens ingevuld? (Formulier werkt los daarvan.) */
export const hasDirectContact = Boolean(
  site.contact.email || site.contact.phone || site.contact.whatsapp,
);

/** Ingevulde social-media-profielen, in vaste volgorde. */
export const socialLinks = [
  { label: 'LinkedIn', href: site.social.linkedin },
  { label: 'Instagram', href: site.social.instagram },
  { label: 'Facebook', href: site.social.facebook },
].filter((l): l is { label: string; href: string } => Boolean(l.href));
