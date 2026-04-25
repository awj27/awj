// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.andywhyte.com',
  integrations: [sitemap()],
  build: { format: 'directory' },
  // Redirects live in `public/_redirects` (Cloudflare Pages native) for true HTTP 301s
});
