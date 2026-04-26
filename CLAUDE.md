# AWJ — Andy Whyte Journal

The codebase for **andywhyte.com** (currently live at **https://awj-ehz.pages.dev/**, will move to andywhyte.com via GoDaddy DNS at cutover).

> AWJ is a personal intellectual operating system, expressed publicly. *"A notebook page that earned the right to be on a billboard."*

## Stack

- **Astro 6** — static site generator, content collections for journal entries
- **TypeScript** strict
- **Cloudflare Pages** — hosting + CDN
- **Cloudflare Pages Functions** — serverless endpoints (currently just `/api/subscribe`)
- **Beehiiv** — newsletter platform; subscribe via the function above; auto-publish via GitHub Action
- **GitHub** — `awj27/awj`. Andy's GitHub user is `awj27`.

## Operating mode

**Full autopilot.** Push to `main`, deploy, walk away. Andy reviews live.

The GitHub repo is **not** yet connected to Cloudflare Pages for auto-deploy. Until that's set up, deploy manually after every meaningful change:

```bash
cd ~/Code/awj
npm run build
npx wrangler pages deploy dist --project-name=awj --branch=main --commit-dirty=true
```

(Wrangler is already authenticated.)

After every change, also push to GitHub so the source of truth stays current:

```bash
git add -A
git commit -m "<conventional message>"
git push
```

Both can be done in one chain.

## Repo layout

```
~/Code/awj/
├── astro.config.mjs              # site URL, sitemap, redirects
├── functions/
│   └── api/subscribe.ts          # Cloudflare Function for Beehiiv subscribe
├── public/
│   ├── _redirects                # Cloudflare-native HTTP 301s (legacy WP URLs)
│   ├── assets/                   # Brand assets from the design system
│   │   ├── logos/                # AWJ logo set (main, alt, submark × 4 colours)
│   │   ├── textures/             # Paper grounds (white, black, blue, yellow)
│   │   ├── scribbles/            # 100+ hand-drawn cutouts
│   │   ├── decor/                # Tape, paper-tear, polaroid frames
│   │   └── images/               # Andy headshot cutout
│   └── media/
│       ├── awj{1..12}.webp       # Featured images for each Maxim
│       ├── portrait/             # Andy hero portrait (homepage hero)
│       ├── gallery/              # Headshots
│       ├── candids/              # Behind-the-scenes photos
│       ├── clients/              # Speaking page client logos + headshots
│       ├── icons/                # SKO/Keynote/MC icons
│       ├── video/                # SKO keynote reel
│       └── book/                 # MEDDICC book cover
├── src/
│   ├── content.config.ts         # Astro content collection schema for journal
│   ├── content/journal/          # Each Maxim is one .md file with frontmatter
│   │   ├── awj-01-...md
│   │   └── ...
│   ├── components/
│   │   ├── Layout.astro          # ❌ doesn't exist; layout is in src/layouts/
│   │   ├── Header.astro          # AWJ submark + wordmark, nav, socials, Subscribe CTA
│   │   ├── Footer.astro          # AWJ main logo, tagline, socials, nav columns
│   │   ├── Pillar.astro          # Pillar pill (Sales/Founder/Human)
│   │   ├── Eyebrow.astro
│   │   ├── Btn.astro             # Primary/ghost/yellow/blue button
│   │   ├── Hl.astro              # Yellow/red/black highlighter strap (linear-gradient)
│   │   ├── Scribble.astro        # Absolute-positioned scribble PNG accent
│   │   ├── Signature.astro       # "—Andy" in marker font
│   │   ├── Gallery.astro         # CSS multi-column masonry gallery (no cropping)
│   │   ├── SocialIcons.astro     # 6-platform inline SVGs
│   │   └── SubscribeForm.astro   # Inline AWJ form → /api/subscribe
│   ├── layouts/
│   │   └── Layout.astro          # Site shell (head, header, footer, OG, schema)
│   ├── lib/
│   │   ├── utils.ts              # Pillar meta, formatDate, readingTime
│   │   └── videos.ts             # All 80 YouTube videos (32 long-form + 48 shorts)
│   ├── pages/
│   │   ├── index.astro           # Home
│   │   ├── about.astro
│   │   ├── speaking.astro
│   │   ├── book.astro
│   │   ├── media.astro
│   │   ├── subscribe.astro
│   │   ├── contact.astro
│   │   ├── maxims/index.astro    # Wall + archive list
│   │   ├── pillars/[pillar].astro
│   │   └── journal/
│   │       ├── [slug].astro      # Individual entry detail
│   │       └── rss.xml.ts        # /journal/rss.xml
│   └── styles/
│       ├── tokens.css            # AWJ design tokens (colours, type, spacing)
│       └── global.css            # Base styles, paper backgrounds, prose
├── .github/
│   ├── workflows/publish-to-beehiiv.yml  # Auto-publish action
│   └── scripts/publish-to-beehiiv.py     # Beehiiv API caller
└── package.json
```

## Brand voice (when writing copy)

- **Calm authority. Direct. Instructional. No hype.**
- **British English** spelling/punctuation in prose
- **Display headings ALL CAPS** (rendered via `text-transform: uppercase`; you write in normal case in markdown/JSX)
- **Body sentence case**
- **Short sentences. White space as punctuation.**
- Observation → principle → model → application
- No emoji in the design system (one exception: footer tagline "May your Champions be Strong 💪")
- Scribble PNGs from `public/assets/scribbles/` are the emotional accent system

## Adding a new Maxim entry

Drop a markdown file in `src/content/journal/` named `awj-NN-<kebab-slug>.md` with frontmatter:

```yaml
---
title: "The actual maxim line"
awj_number: 13
slug: the-actual-maxim-line
pillar: sales        # or founder | human
date: 2026-MM-DD
modified: 2026-MM-DD
video_id: abcXyz123  # optional — YouTube video ID
video_url: https://www.youtube.com/watch?v=abcXyz123  # optional
---

The body copy in markdown.
```

Then push. The GitHub Action will create a draft post in Beehiiv automatically (status currently set to `draft` — flip to `confirmed` in `.github/workflows/publish-to-beehiiv.yml` for true auto-send).

## Pillars

| Pillar  | Theme     | Tag       | Bg color  |
|---------|-----------|-----------|-----------|
| sales   | Authority | MEDDICC, deal inspection, sales as a thinking discipline | `#FFCE00` (yellow) |
| founder | Operator  | Bootstrap SaaS, trade-offs, no theatre | `#1F47FF` (blue)   |
| human   | Truth     | Controlled lessons from failure, mental health, growth | `#0A0A0A` (black)  |

## Common deploy failure modes I should watch for

- **Wrangler upload fails on >25MB file** — Cloudflare Pages caps at 25MiB. Compress (ffmpeg for video, sips for images).
- **Beehiiv subscribe form returns 503** — env vars not set in Cloudflare Pages. Check `npx wrangler pages secret list --project-name=awj`.
- **GitHub push rejected on `.github/workflows/`** — `gh` token needs `workflow` scope. Run `gh auth refresh -h github.com -s workflow`.
- **Cloudflare 25MiB cap** — applies per file. The 29MB SKO video had to be transcoded to 3.4MB.

## Where the design system lives

`~/Library/CloudStorage/Dropbox/Andy's Vault/raw/awj-design-system/awj-design-system/project/` — the original Claude Design handoff. CSS tokens, JSX prototypes, asset library. The wiki has a source summary at `wiki/sources/awj-design-system.md`.

## Andy's writing voice

When generating new content (Maxims, page copy), match this:

- *"Stagnation is pain."* — short, declarative, complete.
- *"You inspect the deal, not the rep."* — you-voice for instructions, never "I think."
- *"Nobody Regrets Qualifying Out"* — operator wisdom condensed, often paradoxical.
- No motivational hedging ("kind of," "I think maybe"). High signal density. A 200-word post should contain three principles, not three feelings.
