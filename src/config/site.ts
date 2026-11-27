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
  tagline: 'Uw cijfers. Onze expertise. Uw groei.',
  /** Kernpositionering */
  positioning: 'Financiële administratieve outsourcing voor Nederlandse administratiekantoren, accountantskantoren en mkb-bedrijven.',
  description:
    'John-Luke Finance Outsourcing ondersteunt Nederlandse administratiekantoren, accountantskantoren en mkb-bedrijven met financiële administratieve verwerking, controle en afsluitondersteuning — vanuit Suriname, in de software die zij al gebruiken.',
  /** Doelmarkt: Nederland; de onderneming is gevestigd in Zanderij (district Para), Suriname */
  locale: 'nl_NL',
  language: 'nl',
  city: 'Zanderij',
  district: 'Para',
  country: 'Suriname',
  /** Ervaring met Nederlandse administraties en btw (door de eigenaar opgegeven) */
  outsourcingExperience: 'meer dan 3 jaar',

  /** Oprichting en eigenaar — door de eigenaar aangeleverd */
  founded: '2025-06',
  contact: {
    /** Zakelijk e-mailadres, bijv. 'info@uwdomein.com'. null = niet tonen. */
    email: 'info@johnlukefinance.nl' as string | null,
    /** Telefoonnummer zoals bezoekers het lezen, bijv. '+597 123 4567'. null = niet tonen. */
    phone: '+31 6 43060319' as string | null,
    /**
     * WhatsApp-nummer in internationaal formaat zonder plus, spaties of streepjes
     * (zo verwacht wa.me het), bijv. '5971234567'. null = geen WhatsApp-knop.
     */
    whatsapp: '31643060319' as string | null,
    /** Vestigingsadres. null = niet tonen. */
    address: { street: 'Moeristraat 44', city: 'Zanderij', district: 'Para' } as Address | null,
    /** Bereikbaarheid, bijv. 'Ma–vr 08:00–16:30'. null = niet tonen. */
    openingHours: null as string | null,
    /** Inschrijvingsnummer Kamer van Koophandel (door de eigenaar opgegeven). null = niet tonen. */
    kkf: '91731' as string | null,
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
