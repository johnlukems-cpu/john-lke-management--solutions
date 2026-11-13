import type { ImageMetadata } from 'astro';

/**
 * Fotografie per plek op de website.
 *
 * Plaats een foto als `src/assets/photos/<slot>.jpg` (of .jpeg/.png/.webp) en hij
 * verschijnt automatisch op de juiste plek. Astro optimaliseert elke foto bij de
 * build naar AVIF/WebP in meerdere formaten — u hoeft zelf niets te verkleinen.
 * Lever bij voorkeur liggende foto's van minimaal 1600 px breed aan.
 *
 * Zolang een foto ontbreekt, toont de site een rustig, neutraal vlak in de
 * huisstijl (geen illustratie). Zie src/assets/photos/README.md voor de fotobrief.
 */
export const photoSlots = {
  hero: {
    alt: 'Werkplek met laptop en beeldscherm in een licht kantoor',
    brief: 'Een nette kantoorwerkplek met laptop en administratie (liggend, rustig, veel licht).',
  },
  intro: {
    alt: 'Licht kantoor met werkplek en planten',
    brief: 'Een moderne, eenvoudige kantooromgeving.',
  },
  administratie: {
    alt: 'Financiële documenten met een rekenmachine op een bureau',
    brief: 'Facturen, documenten en financiële rapportages.',
  },
  payroll: {
    alt: 'Klembord met formulier naast een laptop',
    brief: 'Een georganiseerde werkplek voor salarisadministratie.',
  },
  tax: {
    alt: 'Rekenmachine voor administratief werk',
    brief: 'Een calculator, notitieboek en kantoorbenodigdheden.',
  },
  jaarrekening: {
    alt: 'Grafiek op papier met liniaal en pennen',
    brief: 'Een bureau met financiële jaaroverzichten.',
  },
  advies: {
    alt: 'Notitieboek met pen en bril',
    brief: 'Een notitieboek met aantekeningen, een begroting en een laptop op een vergadertafel.',
  },
  automation: {
    alt: 'Financieel dashboard met grafieken op een scherm',
    brief: 'Een laptop met digitale administratie of een dashboard, naast een scanner of gedigitaliseerde documenten.',
  },
  werkwijze: {
    alt: 'Laptop met een financieel dashboard',
    brief: 'Een laptop met een boekhoudkundig dashboard.',
  },
} as const;

export type PhotoSlot = keyof typeof photoSlots;

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

/** Geeft de foto voor een plek terug, of undefined als die nog niet is aangeleverd. */
export function getPhoto(slot: PhotoSlot): ImageMetadata | undefined {
  for (const [path, mod] of Object.entries(files)) {
    const name = path.split('/').pop()!.replace(/\.[^.]+$/, '');
    if (name === slot) return mod.default;
  }
  return undefined;
}
