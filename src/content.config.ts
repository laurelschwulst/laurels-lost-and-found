import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const walks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/walks' }),
  schema: z.object({
    date: z.coerce.date(),
    duration: z.number(), // minutes
    path: z.string(), // path to an SVG in /public
  }),
});

export const collections = { walks };
