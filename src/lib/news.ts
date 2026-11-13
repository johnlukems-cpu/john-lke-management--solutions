import { getCollection, type CollectionEntry } from 'astro:content';

export type NewsEntry = CollectionEntry<'nieuws'>;

/** Gepubliceerde berichten, nieuwste eerst. */
export async function getNews(): Promise<NewsEntry[]> {
  const items = await getCollection('nieuws', ({ data }) => !data.draft);
  return items.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const newsPath = (entry: NewsEntry) => `/nieuws/${entry.id}`;

/** Bijv. "10 november 2026" */
export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
