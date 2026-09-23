import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each walk is a session.json file dropped into src/content/walks/.
// Only the fields below are read; everything else in the file is ignored.
const walks = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/walks' }),
  schema: z.object({
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    locationPoints: z.array(
      z.object({
        latitude: z.number(),
        longitude: z.number(),
        accuracy: z.number().optional(),
      })
    ),
  }),
});

export const collections = { walks };
