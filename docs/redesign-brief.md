# andywhyte.com redesign brief

Decisions locked with Andy on 29 October 2026. This file is the source of truth for the rebuild. Change it here first, then change the site.

## Vision

The AWJ notebook, in web form. A cobalt hardcover reporter pad sits centre stage on a clean white canvas. Scrolling flips its pages up over the top edge, one Maxim per page, in Andy's own blue handwriting. Clicking a page lifts it out of the pad and turns it into the essay behind the Maxim. The whole site is rebuilt around that object, and around being the reference that search engines and AI assistants cite for MEDDPICC, MEDDIC and MEDDICC, sales leadership, keynote speaking and imposter syndrome.

## Decisions

### The notebook hero

- Opening: the closed cobalt cover fills the hero. The first scroll opens it onto Maxim one.
- Flip: top-bound. Pages lift over the top edge exactly like the physical pad.
- Scroll: one Maxim per scroll step, snapping with a soft spring. Arrow keys and swipes also flip. A skip control lets people jump through a long sequence.
- Content: every Maxim is a page in the notebook, up to twenty at launch. A flat archive list sits below the hero for scanning.
- Phones: the same flip at phone size, one page visible, lighter shadows and tilt. The concept survives on the device most people use.
- Pages: the photographed handwriting is the page image. The same words sit in HTML beneath it for search engines and assistive technology.
- Numbering: the site's numbering is the source of truth. Handwritten numbers that differ are cropped or retouched.
- Click: the page morphs into the essay page through a view transition. The handwritten Maxim stays on top, the essay sits in clean type below.
- Alive: the pad tilts toward the cursor on desktop and follows the gyroscope on phones. Pages lift with a soft shadow on hover and the top corner curls gently while idle. A custom cursor appears over the notebook. A quiet paper flick plays on flip, off by default with a toggle.
- Budget: hero visible well under three seconds on a 4G phone. Roughly 300 KB of JavaScript as the ceiling. CSS 3D, not WebGL. Visitors who prefer reduced motion get a flat list.

### Content and positioning

- Launch set: every photographed Maxim. Numbers 1 to 14, number 15 "Authenticity beats deception", and 18, 19 and 20. Andy writes and photographs 16 and 17 before launch. Six new essays are needed: 13, 14, 15, 18, 19, 20.
- Structure: the pillars Sales, Founder and Human stay as the journal's lens. Four topic hubs are added: MEDDPICC and MEDDICC, sales leadership, keynote speaking, imposter syndrome.
- AEO scope, all in: hub essays of 800 to 1,200 words with ten or more questions answered in plain text and FAQ schema; a glossary of MEDDICC terms with DefinedTerm schema; Frameworks and Start Here pages; landing pages for "MEDDPICC training" and "sales keynote speaker UK".
- Writing: Claude drafts in Andy's voice from the Maxims, the existing essays and the LinkedIn beliefs. Andy edits and approves before anything publishes.
- Relationship to meddicc.com: this site owns the person, the author, the speaker, the thinker and the opinionated explainers. meddicc.com owns the methodology product and training. The two are cross-linked as author and through sameAs.
- Imposter syndrome: a hub page plus a first essay grown from Maxim ten. Andy briefs his stance before drafting starts.
- Pages: all nine existing pages return in the new brand: About, Speaking, Book, Media, Subscribe, Contact, Privacy, Maxims and the three Pillar pages.

### Facts to use everywhere

- Twenty years of sales experience.
- The book: over 100,000 copies sold. The MEDDICC Masterclass: over 35,000 graduates. Both stated, separately.
- Newsletter: Substack. The subscribe flow and the auto-publish action move off Beehiiv. Substack joins the sameAs links.
- No fixed publishing cadence anywhere on the site.

### Brand

- Mark: the handwritten "AWJ" sign-off lifted from the pages, in notebook blue, with "Andy Whyte" typeset beside it. The AWJ logos are retired.
- Colour: notebook blue sampled from the real cover, around #3A4EB2 in light and deeper in shadow, to be finalised from the RAW files. White canvas. Ink blue for handwriting. Yellow only for highlights and calls to action.
- Type: real handwriting for Maxims. A clean modern grotesk for everything else. No condensed shouting capitals.
- Decoration: scribbles and crumpled paper textures are gone. The only flourishes are the ink marks that exist on real pages.
- Photography: build from the existing shoot, 15 edited frames and 58 RAW frames. A controlled reshoot on a fixed rig follows later so every page matches and new Maxims slot in.

### Process

- Work happens on the branch `redesign/notebook` with Cloudflare preview links. The live site stays untouched until launch.
- Three checkpoints: design direction, the live hero prototype, the full build.
- No fixed launch date.

## What Andy owes the project

- His stance on imposter syndrome. A voice note or a few bullet points is enough.
- Maxims 16 and 17, written in the pad and photographed in the same setup as the others.
- The Substack publication address and API access for the subscribe flow.
- Confirmation of the exact wording for the copies and graduates figures.
- The speaker booking route: a published fee or enquiry only.

## Technical direction

- CSS 3D pages in the DOM, perspective and rotateX with the origin on the top edge. No WebGL. Jackie Zhang's notebook works this way.
- Native scrolling with snap points per Maxim and a spring settle. Smooth-scroll smoothing only if it fits the JavaScript budget.
- Astro view transitions morph the page into the essay.
- Every Maxim is an article element with a heading inside the notebook. ItemList schema on the home page. Person, Article, FAQ, DefinedTerm and Book schemas across the site. The llms.txt files are refreshed. Every page renders all of its text without JavaScript.
- Keyboard flipping, focus management, a reduced-motion flat list, and alt text on every page image.

## Checkpoint one

Design direction: the colour and type system, the mark, home and Maxim page layouts as static mockups, and a short motion study of the flip, delivered as a preview page for review.

Delivered and approved on 29 October 2026. Typeface: Instrument Sans.

## Checkpoint two

The live hero prototype, delivered 29 October 2026 at `/design/home/` on the preview:

- The notebook is bound to the page scroll. One segment of scroll per turn (six tenths of the stage height on laptops, seven tenths on phones), native snap points at every page, a soft settle bounce on the page that lands, and the breathing curl while it waits.
- All eighteen photographed Maxims are in the pad: 1 to 15 and 18 to 20. Numbers 16 and 17 are listed in the library as coming.
- Every page is HTML underneath: a heading, the pillar and a link, so the hero reads as a list to search engines and screen readers. Pages load on demand, two ahead of the one on top.
- Clicking a page opens its own Maxim page at `/design/maxim/NN/`. The page image carries a view transition name so the photograph morphs from the pad into the essay header. Essays render from the existing journal entries where they exist; the six unpublished Maxims say the essay is being written.
- Arrow keys, Page Up and Down and the space bar turn pages while the notebook is pinned. The number rail on the right jumps to any page. A skip link drops to the library.
- Tilt follows the pointer on desktop and the gyroscope on phones, with the iOS permission button. The custom cursor reads Open on the cover and Read on a page. The paper flick is synthesised, off by default.
- Reduced motion collapses the hero to a static open pad on page one and shows every page in the list below.
- Budget: 21 KB of JavaScript in total, 7.4 KB gzipped. First paint loads the cover and two pages, about 300 KB of images.

Still to settle after review: the pace of one page per scroll segment, whether eighteen pages earns its length, the pillars of the six unpublished Maxims, and the vector trace of the mark.
