# AWJ, the Andy Whyte Journal

The codebase for **andywhyte.com**. Live via Cloudflare Pages (project `awj`), source on GitHub `awj27/awj` (Andy's GitHub user is `awj27`).

> A notebook of principles for sales, founding and being human. Twenty handwritten Maxims, one line each, an essay behind every one.

## Stack

- **Astro 6**, static output. Content collections for the journal, hubs, glossary, frameworks, landing pages and editorial pages (`src/content.config.ts`).
- **TypeScript** strict. **No frameworks**: the notebook hero is CSS 3D plus a few kilobytes of vanilla script.
- **Cloudflare Pages** hosting. **Pages Functions** for `/api/contact` (Resend) and `/api/subscribe` (the Beehiiv fallback, see Newsletter).
- **GitHub Actions**: `.github/workflows/deploy.yml` builds and deploys to Cloudflare Pages on every push to `main`.

## Operating mode

Work on a branch, deploy a preview, review, then merge to `main`.

```bash
cd ~/Code/awj
npm run dev                                   # http://localhost:4321
npm run build
npx wrangler pages deploy dist --project-name=awj --branch=<branch-name> --commit-dirty=true
```

A branch deploy gets an alias at `https://<branch-name>.awj-ehz.pages.dev`, protected by Cloudflare Access (one-time code to Andy's email). Pushing to `main` deploys production through the Action; the `PUBLIC_GA_MEASUREMENT_ID` build variable lives in `deploy.yml`. Wrangler is already authenticated on Andy's Mac.

## Design

The design is the notebook on a white desk. Everything derives from the real pad photographed in October 2026.

- Tokens in `src/styles/notebook.css`: cover blue `#3B4DB2`, ink `#224A8F`, paper `#F3F1EE`, white canvas, yellow accent `#FFCE00`, text `#1A2140`. Typeface Instrument Sans, self-hosted from `public/fonts/`.
- The mark is Andy's handwritten "AWJ" lifted from page one: `public/notebook/mark/` (ink, blue, white; 320px versions for UI).
- Maxim pages are photographs: `public/notebook/pages/awj-NN.webp`, cut and paper-normalised from the shoot in `Dropbox/Claude-Work/PROJECTS/AWJ/Maxim Notebook Images`. Social previews in `public/notebook/og/`.
- No scribbles, no textures, no logos. Yellow only for highlights and calls to action.
- The decisions behind all of this are in `docs/redesign-brief.md`. Read it before changing the design.

## Repo layout

```
src/
├── content.config.ts         # collection schemas
├── content/
│   ├── journal/              # one Maxim per file: awj-NN-<slug>.md
│   ├── hubs/                 # the four topic hubs (meddpicc, sales-leadership, keynote-speaking, imposter-syndrome)
│   ├── glossary/             # one term per file
│   ├── frameworks/           # one framework per file
│   ├── landing/              # meddpicc-training, sales-keynote-speaker-uk
│   └── pages/                # start-here
├── data/
│   ├── site.ts               # site constants, nav, hubs list, Person/Organization/WebSite schema
│   └── notebook-pages.ts     # the photographed pages, pillars, helpers
├── layouts/SiteLayout.astro  # head, structured data, analytics, header, footer, view transitions
├── components/v2/            # SiteHeader, SiteFooter, NotebookHero, Notebook (study), SubscribeForm, FAQ
├── components/analytics/     # GA4 loader, consent banner, YouTube tracker
├── lib/                      # maxims.ts helpers, analytics.ts, videos.ts
├── pages/
│   ├── index.astro           # the notebook hero + library + hubs + about + book
│   ├── [slug].astro          # hubs, landing pages and editorial pages at the root
│   ├── maxims/, pillars/, journal/[slug].astro, journal/rss.xml.ts
│   ├── glossary/, frameworks/
│   ├── about, speaking, book, media, contact, subscribe, privacy, 404
│   └── design/               # review-only pages from the redesign (noindex); delete once no longer useful
public/
├── notebook/                 # cover, pages, mark, og images
├── fonts/                    # Instrument Sans woff2
├── media/                    # portraits, gallery, candids, clients, icons, video, book
├── _redirects                # legacy WordPress URLs, 301
├── robots.txt, llms.txt, llms-full.txt
functions/api/                # contact.ts (Resend), subscribe.ts (Beehiiv fallback)
docs/redesign-brief.md        # the decisions
```

## Adding a Maxim

1. Write the page in the pad, photograph it like the others, cut it to `public/notebook/pages/awj-NN.webp` (paper normalised to `#F3F1EE`; the cutting script lives in the redesign session's scratchpad, or redo it with sharp).
2. Add the page to `notebookPages` in `src/data/notebook-pages.ts` (number, title, pillar, alt text) and to `library` if it fills one of the "coming" slots.
3. Create `src/content/journal/awj-NN-<slug>.md`:

```yaml
---
title: "The Maxim line"
awj_number: NN
slug: the-maxim-line
pillar: sales        # or founder | human
date: 2026-MM-DD
modified: 2026-MM-DD
video_id: abcXyz123  # optional
---
The essay.
```

4. Run `node scripts/og-images.mjs` to make the social preview, build, deploy.

Numbers 16 and 17 are reserved and still to be written. The site's numbering is the source of truth; handwritten numbers that differ get retouched.

## Newsletter

The journal is published on Substack. Set `substackUrl` in `src/data/site.ts` to the publication address and every subscribe form will hand the email to Substack's own sign-up page. Until it is set, forms post to `/api/subscribe`, the existing Beehiiv function, so no sign-up is lost. The old Beehiiv auto-publish Action has been removed.

## Voice

Calm authority. Direct. Instructional. British English. No em dashes, ever. Observation, principle, model, application. Capitalise defined concepts (Champion, Economic Buyer). End on a question where it fits. The `andy-whyte-writing` skill holds the full voice model; use it for any new copy.

## Facts to use everywhere

Twenty years in sales. Founder and CEO of MEDDICC (2021). The MEDDICC book: over 100,000 copies, 4.7 stars across 1,447+ reviews. The Masterclass: more than 35,000 graduates. Keynotes for CrowdStrike, Microsoft, Amazon Web Services, Dun and Bradstreet. Email hello@andywhyte.com.

## Analytics

GA4 behind a consent banner (`src/components/analytics/`), Cloudflare Web Analytics optional via `PUBLIC_CF_ANALYTICS_TOKEN`. Page dimensions `pillar`, `awj_number`, `page_type` are passed through `SiteLayout` props. Events: `subscribe_submit`, `subscribe_success`, `subscribe_error`, `video_play`, `video_progress`, `video_complete`. YouTube embeds need `id`, `data-yt-track`, `data-yt-title` and `data-yt-type` to be tracked. The privacy page describes all of it; update its `lastUpdated` when this changes.

## Things that bite

- `PUBLIC_*` env vars are inlined at build time, so the GA id must be present where the build runs (it is, in `deploy.yml`).
- Cloudflare Pages caps files at 25 MiB. Compress video with ffmpeg and images with sharp.
- `gh` needs the `workflow` scope to push changes under `.github/workflows/`.
- Component scripts must initialise on `astro:page-load`, because the site uses Astro's ClientRouter for view transitions.
