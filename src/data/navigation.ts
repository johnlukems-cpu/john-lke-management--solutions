import { services, servicePath } from '@/data/services';

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; hint: string }[];
}

/** Link voor "Plan een kennismaking" — opent het formulier met het juiste onderwerp. */
export const kennismakingHref = '/contact?onderwerp=kennismaking#formulier';

export const mainNav: NavItem[] = [
  {
    label: 'Diensten',
    href: '/diensten',
    children: services.map((s) => ({ label: s.name, href: servicePath(s), hint: s.subtitle })),
  },
  { label: 'Werkwijze', href: '/#werkwijze' },
  { label: 'Over ons', href: '/over-ons' },
  { label: 'Veelgestelde vragen', href: '/veelgestelde-vragen' },
  { label: 'Contact', href: '/contact' },
];
