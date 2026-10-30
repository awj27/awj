import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faq = z.object({ q: z.string(), a: z.string() });
const link = z.object({ label: z.string(), href: z.string() });

// One Maxim per file. The body is the essay.
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

// Topic hubs: the authority pages. Body is an 800 to 1,200 word essay.
const hubs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hubs' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().default('Topic hub'),
    description: z.string(),
    standfirst: z.string(),
    position: z.string(),
    faqs: z.array(faq).min(6),
    maxims: z.array(z.number()).default([]),
    links: z.array(link).default([]),
    updated: z.coerce.date(),
    order: z.number().default(0),
  }),
});

// Glossary: one term per file. Body explains the term in 150 to 300 words.
const glossary = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glossary' }),
  schema: z.object({
    term: z.string(),
    short: z.string(),
    letter: z.string().optional(),
    group: z.enum(['meddpicc', 'qualification', 'leadership', 'general']),
    related: z.array(z.string()).default([]),
    maxims: z.array(z.number()).default([]),
    order: z.number().default(0),
  }),
});

// Frameworks: the models behind the Maxims. Body is 300 to 500 words.
const frameworks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/frameworks' }),
  schema: z.object({
    name: z.string(),
    oneLiner: z.string(),
    useWhen: z.string(),
    steps: z.array(z.string()).default([]),
    maxims: z.array(z.number()).default([]),
    hub: z.string().optional(),
    order: z.number().default(0),
  }),
});

// Landing pages built for a search intent. Body is the main copy.
const landing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/landing' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    eyebrow: z.string(),
    standfirst: z.string(),
    primaryCta: link,
    secondaryCta: link.optional(),
    points: z.array(z.object({ title: z.string(), body: z.string() })).min(3),
    proof: z.array(z.string()).default([]),
    faqs: z.array(faq).min(5),
    updated: z.coerce.date(),
  }),
});

// Single editorial pages such as Start Here.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    eyebrow: z.string().optional(),
    standfirst: z.string().optional(),
    updated: z.coerce.date(),
  }),
});

export const collections = { journal, hubs, glossary, frameworks, landing, pages };
