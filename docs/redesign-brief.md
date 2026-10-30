# andywhyte.com redesign brief

Decisions locked with Andy on 29 October 2026. This file is the source of truth for the rebuild. Change it here first, then change the site.

## Vision

The AWJ journal, in web form. A cobalt hardcover journal sits centre stage on a clean white canvas. Scrolling flips its pages up over the top edge, one Maxim per page, in Andy's own blue handwriting. Clicking a page lifts it out of the journal and turns it into the Maxim in full. The whole site is rebuilt around that object, and around being the reference that search engines and AI assistants cite for MEDDPICC, MEDDIC and MEDDICC, sales leadership, keynote speaking and imposter syndrome.

## Decisions

### The journal hero

- Opening: the closed cobalt cover fills the hero. The first scroll opens it onto Maxim one.
- Flip: top-bound. Pages lift over the top edge exactly like the physical journal.
- Scroll: one Maxim per scroll step, snapping with a soft spring. Arrow keys and swipes also flip. A skip control lets people jump through a long sequence.
- Content: every Maxim is a page in the journal, up to twenty at launch. A flat archive list sits below the hero for scanning.
- Phones: the same flip at phone size, one page visible, lighter shadows and tilt. The concept survives on the device most people use.
- Pages: the photographed handwriting is the page image. The same words sit in HTML beneath it for search engines and assistive technology.
- Numbering: the site's numbering is the source of truth. Handwritten numbers that differ are cropped or retouched.
- Click: the page morphs into the Maxim page through a view transition. The handwritten line stays on top, the Maxim in full sits in clean type below.
- Alive: the journal tilts toward the cursor on desktop and follows the gyroscope on phones. Pages lift with a soft shadow on hover and the top corner curls gently while idle. A custom cursor appears over the journal. A quiet paper flick plays on flip, off by default with a toggle.
- Budget: hero visible well under three seconds on a 4G phone. Roughly 300 KB of JavaScript as the ceiling. CSS 3D, not WebGL. Visitors who prefer reduced motion get a flat list.

### Content and positioning

- Launch set: every photographed Maxim. Numbers 1 to 14, number 15 "Authenticity beats deception", and 18, 19 and 20. Andy writes and photographs 16 and 17 before launch. Six Maxims need writing in full: 13, 14, 15, 18, 19, 20.
- Structure: the pillars Sales, Founder and Human stay as the journal's lens. Four topic hubs are added: MEDDPICC and MEDDICC, sales leadership, keynote speaking, imposter syndrome.
- AEO scope, all in: hub pages of 800 to 1,200 words with ten or more questions answered in plain text and FAQ schema; a glossary of MEDDICC terms with DefinedTerm schema; Frameworks and Start Here pages; landing pages for "MEDDPICC training" and "sales keynote speaker UK".
- Writing: Claude drafts in Andy's voice from the Maxims, the existing writing and the LinkedIn beliefs. Andy edits and approves before anything publishes.
- Relationship to meddicc.com: this site owns the person, the author, the speaker, the thinker and the opinionated explainers. meddicc.com owns the methodology product and training. The two are cross-linked as author and through sameAs.
- Imposter syndrome: a hub page grown from Maxim ten. Andy briefs his stance before drafting starts.
- Language, corrected by Andy on 30 October 2026 after launch: it is a journal, not a notebook. The pieces are Maxims, not essays. MEDDIC, MEDDICC and MEDDPICC are a common language used for qualification, methodology and value selling, never a qualification framework.
- Pages: all nine existing pages return in the new brand: About, Speaking, Book, Media, Subscribe, Contact, Privacy, Maxims and the three Pillar pages.

### Facts to use everywhere

- Twenty years of sales experience.
- The book: over 100,000 copies sold. The MEDDICC Masterclass: over 35,000 graduates. Both stated, separately.
- Newsletter: Substack. The subscribe flow and the auto-publish action move off Beehiiv. Substack joins the sameAs links.
- No fixed publishing cadence anywhere on the site.

### Brand

- Mark: the handwritten "AWJ" sign-off lifted from the pages, in journal blue, with "Andy Whyte" typeset beside it. The AWJ logos are retired.
- Colour: journal blue sampled from the real cover, around #3A4EB2 in light and deeper in shadow, to be finalised from the RAW files. White canvas. Ink blue for handwriting. Yellow only for highlights and calls to action.
- Type: real handwriting for Maxims. A clean modern grotesk for everything else. No condensed shouting capitals.
- Decoration: scribbles and crumpled paper textures are gone. The only flourishes are the ink marks that exist on real pages.
- Photography: build from the existing shoot, 15 edited frames and 58 RAW frames. A controlled reshoot on a fixed rig follows later so every page matches and new Maxims slot in.

### Process

- Work happens on the branch `redesign/notebook` with Cloudflare preview links. The live site stays untouched until launch.
- Three checkpoints: design direction, the live hero prototype, the full build.
- No fixed launch date.

## What Andy owes the project

- His stance on imposter syndrome. A voice note or a few bullet points is enough.
- Maxims 16 and 17, written in the journal and photographed in the same setup as the others.
- The Substack publication address and API access for the subscribe flow.
- Confirmation of the exact wording for the copies and graduates figures.
- The speaker booking route: a published fee or enquiry only.

## Technical direction

- CSS 3D pages in the DOM, perspective and rotateX with the origin on the top edge. No WebGL. Jackie Zhang's notebook works this way.
- Native scrolling with snap points per Maxim and a spring settle. Smooth-scroll smoothing only if it fits the JavaScript budget.
- Astro view transitions morph the page into the Maxim page.
- Every Maxim is an article element with a heading inside the journal. ItemList schema on the home page. Person, Article, FAQ, DefinedTerm and Book schemas across the site. The llms.txt files are refreshed. Every page renders all of its text without JavaScript.
- Keyboard flipping, focus management, a reduced-motion flat list, and alt text on every page image.

## Checkpoint one

Design direction: the colour and type system, the mark, home and Maxim page layouts as static mockups, and a short motion study of the flip, delivered as a preview page for review.

Delivered and approved on 29 October 2026. Typeface: Instrument Sans.

## Checkpoint two

The live hero prototype, delivered 29 October 2026 at `/design/home/` on the preview:

- The journal is bound to the page scroll. One segment of scroll per turn (six tenths of the stage height on laptops, seven tenths on phones), native snap points at every page, a soft settle bounce on the page that lands, and the breathing curl while it waits.
- All eighteen photographed Maxims are in the journal: 1 to 15 and 18 to 20. Numbers 16 and 17 are listed in the library as coming.
- Every page is HTML underneath: a heading, the pillar and a link, so the hero reads as a list to search engines and screen readers. Pages load on demand, two ahead of the one on top.
- Clicking a page opens its own Maxim page at `/design/maxim/NN/`. The page image carries a view transition name so the photograph morphs from the journal into the Maxim page header. Maxims render from the existing journal entries where they exist; the six unpublished Maxims say the Maxim is being written.
- Arrow keys, Page Up and Down and the space bar turn pages while the journal is pinned. The number rail on the right jumps to any page. A skip link drops to the library.
- Tilt follows the pointer on desktop and the gyroscope on phones, with the iOS permission button. The custom cursor reads Open on the cover and Read on a page. The paper flick is synthesised, off by default.
- Reduced motion collapses the hero to a static open journal on page one and shows every page in the list below.
- Budget: 21 KB of JavaScript in total, 7.4 KB gzipped. First paint loads the cover and two pages, about 300 KB of images.

Still to settle after review: the pace of one page per scroll segment, whether eighteen pages earns its length, the pillars of the six unpublished Maxims, and the vector trace of the mark.

## Checkpoint three

The full build, delivered 30 October 2026 on the branch and the preview. Seventy pages.

- The whole site now runs on the new shell: `SiteLayout.astro`, the journal header and footer, self-hosted Instrument Sans, view transitions, the GA4 consent banner carried over. The old design system, its scribbles, textures and logos are deleted from the repo. The review pages under `/design/` are gone; the home page is the hero.
- The nine existing pages are rebuilt in the brand on their original URLs: home, Maxims, the three pillars, every Maxim at `/journal/<slug>/`, About, Speaking, Book, Media, Contact, Subscribe, Privacy, plus a 404. The fifty legacy redirects are untouched.
- New: four topic hubs at `/meddpicc/`, `/sales-leadership/`, `/keynote-speaking/`, `/imposter-syndrome/`, each 900 to 1,200 words with Andy's position and ten questions answered; a glossary of 23 terms at `/glossary/` with DefinedTerm schema; seven frameworks at `/frameworks/` with HowTo schema; `/start-here/`; and landing pages at `/meddpicc-training/` and `/sales-keynote-speaker-uk/`.
- Six Maxims written in full, 13, 14, 15, 18, 19 and 20, drafted in Andy's voice with the writing skill. Numbers 16 and 17 remain reserved.
- Structured data on every page: Person, Organization, WebSite, BreadcrumbList, then Article and VideoObject on Maxims, FAQPage on hubs and landing pages, CollectionPage and ItemList on the indexes, Book, Service, ProfilePage, DefinedTermSet, HowTo. Social preview images for every Maxim and a default. `llms.txt` rewritten and `llms-full.txt` generated from the content.
- Newsletter: Substack first. The publication address goes in `substackUrl` in `src/data/site.ts`; until it is set, forms post to the existing Beehiiv function. The Beehiiv auto-publish Action is removed.
- The handwritten numbers on pages 11 to 14 are painted out so the pages no longer contradict the site's numbering.
- Budget: 24 KB of JavaScript in total across the site, 3.4 KB of it the paper sound.

### What Andy reviews

Andy chose to launch on 30 October 2026 with this list open, so it is now a post-launch list. Each item is live copy until he edits it.

1. The six new Maxims. Four contain light first-person details invented for rhythm (for example a line about spending a decade believing hours were the score); keep, change or cut. Two cite Robert Axelrod and Annie Duke inline.
2. The four hubs. The imposter syndrome hub extends Maxim 10 with inferred moments (a first SKO keynote, being called CEO); Andy has not briefed his stance yet. The sales leadership hub uses the Poq "six to twenty in twelve months" figure from his Medium writing.
3. The glossary and frameworks: the Champion criteria follow the book's three; the MEDDIC origin story (Dunkel and Napoli at PTC) is kept.
4. The landing pages and Start Here, which assume he is UK based.
5. The pillars assigned to the six unpublished Maxims.
6. The Substack address, so the subscribe forms switch over.
7. Maxims 16 and 17, written and photographed.

### The person first: portrait hero, Maxim sheet, controlled turning

Decided with Andy on 30 October 2026 after launch, built on the branch `hero/portrait`, reviewed on its preview and merged to `main` the same day.

- The home page opens on Andy, not the journal. His black and white portrait, cut out of the studio backdrop, stands centred in front of his name set huge in cover blue, with the handwritten AWJ as a signature and one yellow highlight in the copy. He arrives serious and breaks into the smile as the pointer comes towards him (after a beat on a phone, where a tap toggles it), the name and the figure move at different speeds with the pointer, and scrolling hands over to the journal. No 3D, no helmet, no face mesh: the references were landonorris.com (WebGL helmet, Rive type) and benkaluza.com (a photo plus a depth map through a shader, with a tracking lens on top); Dennis Snellenberg's site showed the same composition works with a plain photograph.
- The two frames come from the same shoot. The smiling frame is registered to the serious one by the shoulders (scaled 1.09 and shifted), so the body stays still and only the head and face move. Assets in `public/portrait/`, cut with the Mac's Vision person segmentation.
- The journal gets an introduction in plain words: what it is, scroll to turn, tap a page to read. The first time the closed journal sits in view, the cover lifts once to show what scrolling does.
- A Maxim opens in a sheet beside the journal on wide screens and as a bottom sheet on phones, with the page photo, the video, the Maxim in full, previous and next, and a link to its own page. The journal stays where it is; the URL becomes `/#maxim-NN` so the back button closes the sheet and links can be shared; the Maxim pages at `/journal/<slug>/` are unchanged and remain the canonical pages. `/#awj-NN` turns the journal to a page without opening the sheet, and the Maxim pages link back to it.
- Turning is animated by the site, not the browser. The CSS scroll snapping and smooth scrolling were steering the same scroll and fighting each other, which is what felt buggy. Now the scroll settles to the nearest page after the visitor stops, turns from the keys and buttons are animated and cancelled the moment the visitor moves, and phones no longer re-measure the journal when the address bar changes height.
- Analytics gained `maxim_open` and a sampled `journal_turn`.

### Launch

Launched 30 October 2026. `redesign/notebook` was merged into `main` with a merge commit and the deploy Action shipped it to andywhyte.com. The old social preview images and favicon at `/assets/logos/` and `/media/awjN.webp` redirect to their journal equivalents so earlier shares keep a picture.

Still to do after launch: set the Substack address in `src/data/site.ts`, submit `sitemap-index.xml` in Search Console, watch the first week of analytics for the hero's turn events, and work through the review list above.
