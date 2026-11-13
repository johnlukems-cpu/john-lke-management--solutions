import { services, servicePath } from '@/data/services';

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; hint: string }[];
}

/** Contactformulier (outsourcingaanvraag), optioneel met voorgeselecteerde werkzaamheid. */
export const contactHref = (dienst?: string) => `/contact${dienst ? `?dienst=${dienst}` : ''}#formulier`;

/** Header-CTA */
export const kennismakingHref = contactHref();

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Diensten',
    href: '/diensten',
    children: services.map((s) => ({ label: s.name, href: servicePath(s), hint: s.subtitle })),
  },
  { label: 'Software', href: '/software' },
  { label: 'Over ons', href: '/over-ons' },
  { label: 'Nieuws', href: '/nieuws' },
  { label: 'Contact', href: '/contact' },
];
