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
    alt: 'Handen met pen bij financiële documenten naast een laptop',
    brief: 'Professionele werkplek met financiële documenten en een laptop.',
  },
  payroll: {
    alt: 'Facturen en financiële documenten met een rekenmachine op een bureau',
    brief: 'Facturen, documenten en een rekenmachine: crediteuren- en debiteurenbeheer.',
  },
  tax: {
    alt: 'Controle van financiële stukken met een pen',
    brief: 'Controle van rapportages en cijfers.',
  },
  jaarrekening: {
    alt: 'Maandplanner met koffie op een bureau',
    brief: 'Planning van periodieke afsluitingen.',
  },
  advies: {
    alt: 'Licht, modern kantoor met meerdere werkplekken',
    brief: 'Moderne kantooromgeving met meerdere werkplekken: capaciteit en continuïteit.',
  },
  automation: {
    alt: 'Checklist die met een pen wordt afgevinkt',
    brief: 'Structuur, overzicht en voortgang bij het wegwerken van achterstanden.',
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
