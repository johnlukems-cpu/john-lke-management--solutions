/**
 * Eigenaar — naam, foto en gegevens (door de eigenaar aangeleverd).
 *
 * Tijdelijk NIET zichtbaar op de website, op verzoek van de eigenaar.
 * Terugzetten: zet `showOwner` op true. Naam, rol, opleiding en citaat verschijnen dan weer
 * op Home en Over ons en in de structured data, met de foto uit src/assets/team/.
 *
 * Dit bestand wordt alleen bij het bouwen gelezen en komt niet in de JavaScript voor bezoekers.
 */
export const showOwner = false as boolean;

export const owner = {
  name: 'Jagernath John',
  role: 'Eigenaar en Finance Controller',
  education: 'Master of Accounting',
  experience: 'Meer dan 10 jaar ervaring in administratie',
  quote: 'Sterke financiële controle is de ruggengraat van goed bestuur.',
};

/** Foto alleen laden (en dus alleen publiceren) als showOwner aan staat. */
const photos = import.meta.glob<{ default: ImageMetadata }>('/src/assets/team/*.{webp,jpg,jpeg,png}');
export async function getOwnerPhoto(): Promise<ImageMetadata | null> {
  if (!showOwner) return null;
  const load = Object.values(photos)[0];
  return load ? (await load()).default : null;
}
