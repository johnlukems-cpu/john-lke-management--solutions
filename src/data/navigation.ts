import { services, servicePath } from '@/data/services';

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; hint: string }[];
}

/** Contactformulier (outsourcingaanvraag), optioneel met voorgeselecteerde werkzaamheid. */
export const contactHref = (dienst?: string, land?: 'nederland') => {
  const params = new URLSearchParams();
  if (dienst) params.set('dienst', dienst);
  if (land) params.set('land', land);
  const q = params.toString();
  return `/contact${q ? `?${q}` : ''}#formulier`;
};

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
  { label: 'Nederland', href: '/nederland' },
  { label: 'Over ons', href: '/over-ons' },
  { label: 'Contact', href: '/contact' },
];
