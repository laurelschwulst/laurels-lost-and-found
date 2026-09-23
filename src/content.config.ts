import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// These files are written by `npm run walks` from the local session.json files.
const walks = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/walks' }),
  schema: z.object({
    // St. Louis date, e.g. 2026-09-22. YAML turns an unquoted date into a Date at
    // UTC midnight, so turn it back into the plain text date.
    date: z
      .union([z.string(), z.date()])
      .transform((d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d))
      .pipe(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
    duration: z.number(), // minutes
    path: z.string(), // SVG in /public
  }),
});

export const collections = { walks };
