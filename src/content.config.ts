import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    awj_number: z.number(),
    slug: z.string().optional(),
    pillar: z.enum(['sales', 'founder', 'human']),
    date: z.coerce.date(),
    modified: z.coerce.date().optional(),
    video_id: z.string().optional(),
    video_url: z.string().url().optional(),
    featured_image: z.string().optional(),
    excerpt: z.string().optional(),
    draft: z.boolean().default(false),
    original_wp_url: z.string().optional(),
    original_wp_id: z.number().optional(),
  }),
});

export const collections = { journal };
