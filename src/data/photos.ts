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
    alt: 'Nette kantoorwerkplek met laptop, financiële administratie en kantoorbenodigdheden',
    brief: 'Een nette kantoorwerkplek met laptop en administratie (liggend, rustig, veel licht).',
  },
  intro: {
    alt: 'Moderne, eenvoudige kantooromgeving van een administratiekantoor',
    brief: 'Een moderne, eenvoudige kantooromgeving.',
  },
  administratie: {
    alt: 'Facturen, documenten en financiële rapportages op een bureau',
    brief: 'Facturen, documenten en financiële rapportages.',
  },
  payroll: {
    alt: 'Georganiseerde werkplek voor salarisadministratie met loonstroken en calculator',
    brief: 'Een georganiseerde werkplek voor salarisadministratie.',
  },
  tax: {
    alt: 'Calculator, notitieboek en belastingdocumenten op een bureau',
    brief: 'Een calculator, notitieboek en kantoorbenodigdheden.',
  },
  jaarrekening: {
    alt: 'Bureau met financiële jaaroverzichten en een balans',
    brief: 'Een bureau met financiële jaaroverzichten.',
  },
  werkwijze: {
    alt: 'Laptop met een boekhoudkundig dashboard',
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
