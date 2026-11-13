import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Nieuwsberichten — één Markdown-bestand per bericht in src/content/nieuws/.
 * Zie src/content/nieuws/README.md voor een stappenplan om een bericht toe te voegen.
 */
const nieuws = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/nieuws' }),
  schema: ({ image }) =>
    z.object({
      /** Titel (H1 en kaarttitel) */
      title: z.string(),
      /** Optionele afwijkende <title> voor zoekmachines */
      seoTitle: z.string().optional(),
      /** Meta description, ±150 tekens */
      description: z.string(),
      /** Korte introductie op de nieuwskaart */
      intro: z.string(),
      /** Publicatiedatum (JJJJ-MM-DD) */
      date: z.coerce.date(),
      category: z.string().default('Nieuws / Actualiteiten'),
      /** Hoofdafbeelding; wordt ook als thumbnail en deelafbeelding gebruikt */
      image: image(),
      imageAlt: z.string(),
      keywords: z.array(z.string()).default([]),
      /** true = (nog) niet publiceren */
      draft: z.boolean().default(false),
    }),
});

export const collections = { nieuws };
