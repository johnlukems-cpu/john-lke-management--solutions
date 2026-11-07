/**
 * Centrale bedrijfsgegevens van John-Luke Management Solutions.
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
  name: 'John-Luke Management Solutions',
  shortName: 'John-Luke',
  tagline: 'Uw financiële administratie. Onze zorg. Uw ruimte om te groeien.',
  description:
    'John-Luke Management Solutions ondersteunt kleine en middelgrote ondernemingen in Suriname met professionele administratie, salarisverwerking, belastingondersteuning, jaarrekeningen, advies, interne audits en AI & automation.',
  locale: 'nl_SR',
  language: 'nl',
  country: 'Suriname',
  currency: 'SRD',

  contact: {
    /** Zakelijk e-mailadres, bijv. 'info@uwdomein.sr'. null = niet tonen. */
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
  'Goedendag, ik heb een vraag over de dienstverlening van John-Luke Management Solutions.';

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
