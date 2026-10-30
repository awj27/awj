// Static QA over dist/: internal links, JSON-LD, alt text, stale references.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const walk = (dir, out = []) => { for (const f of readdirSync(dir)) { const p = join(dir, f); statSync(p).isDirectory() ? walk(p, out) : p.endsWith('.html') && out.push(p); } return out; };
const pages = walk('dist');
const problems = [];
const ld = {};
let imgs = 0, imgsNoAlt = 0, links = 0, badLinks = new Map();

const resolves = (href) => {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return existsSync('dist/index.html');
  const p = join('dist', clean);
  return existsSync(p) || existsSync(join(p, 'index.html')) || existsSync(p.replace(/\/$/, '') + '.html');
};

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<img\b[^>]*>/g)) { imgs++; if (!/\balt=/.test(m[0])) { imgsNoAlt++; problems.push(`${file}: img without alt: ${m[0].slice(0, 80)}`); } }
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) { links++; if (!resolves(m[1])) badLinks.set(m[1], (badLinks.get(m[1]) || 0) + 1); }
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const j = JSON.parse(m[1]); const nodes = j['@graph'] ?? [j]; for (const n of nodes) ld[n['@type']] = (ld[n['@type']] || 0) + 1; }
    catch (e) { problems.push(`${file}: invalid JSON-LD: ${e.message}`); }
  }
  if (!/<title>[^<]+<\/title>/.test(html)) problems.push(`${file}: missing title`);
  if (!/<meta name="description" content="[^"]{20,}"/.test(html)) problems.push(`${file}: missing or short description`);
  if (!/<h1[\s>]/.test(html)) problems.push(`${file}: no h1`);
  for (const [re, label] of [[/\/assets\//, 'old /assets/ path'], [/awj_main_logo|awj_submark/, 'old logo'], [/17 years/, '"17 years"'], [/#1F47FF/i, 'old electric blue']]) {
    if (re.test(html)) problems.push(`${file}: ${label}`);
  }
  // Language rules (Andy, 30 Oct 2026), checked on what a reader or crawler sees: text, meta, alt, aria-label, JSON-LD. URLs are ignored.
  const copy = [
    html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' '),
    ...[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1].replace(/"https?:\/\/[^"]*"/g, '""')),
    ...[...html.matchAll(/\b(?:content|alt|aria-label|title)="([^"]*)"/g)].map((m) => m[1]).filter((v) => !/^(https?:)?\//.test(v)),
  ].join(' ');
  const banned = [
    [/\bnotebooks?\b/i, 'it is a journal, not a notebook'],
    [/\bnote ?pads?\b/i, 'it is a journal, not a notepad'],
    [/\bessays?\b/i, 'they are Maxims, not essays'],
    [/\b(qualification|sales) (framework|methodology)\b/i, 'MEDDPICC is a common language for qualification, methodology and value selling'],
    [/\bMEDD[A-Z]+ framework\b/, 'MEDDPICC is a common language, not a framework'],
    [/every Friday/i, '"every Friday" promises a cadence'],
  ];
  const allowed = [
    [/failure-and-invention-are-inseparable-twins/, /notebook/i], // Andy's own 2025 text
    [/the-b-in-b-player-stands-for-busy\/|sales-leadership\//, /every Friday/i], // the weekly one-page habit, not a publishing cadence
    [/^dist\/meddpicc\//, /sales methodology|qualification framework/i], // the question people ask, answered on the page
  ];
  for (const [re, label] of banned) {
    const m = copy.match(re);
    if (m && !allowed.some(([f, ok]) => f.test(file) && ok.test(m[0]))) problems.push(`${file}: ${label} ("${m[0]}")`);
  }
}
// Redirect sources must not shadow built pages: Pages applies _redirects before it looks for a static file.
if (existsSync('public/_redirects')) {
  for (const line of readFileSync('public/_redirects', 'utf8').split('\n')) {
    const src = line.trim().split(/\s+/)[0];
    if (!src || src.startsWith('#') || /[*:]/.test(src)) continue;
    const shadowed = join('dist', decodeURIComponent(src).replace(/\/$/, ''), 'index.html');
    if (existsSync(shadowed)) problems.push(`_redirects: ${src} shadows ${shadowed}`);
  }
}
console.log(`pages: ${pages.length}, links: ${links}, images: ${imgs} (${imgsNoAlt} without alt)`);
console.log('JSON-LD types:', Object.entries(ld).sort((a, b) => b[1] - a[1]).map(([t, c]) => `${t}×${c}`).join(', '));
if (badLinks.size) { console.log('\nBROKEN INTERNAL LINKS:'); for (const [h, c] of [...badLinks].sort((a, b) => b[1] - a[1])) console.log(`  ${h}  (${c})`); } else console.log('no broken internal links');
process.exitCode = problems.length || badLinks.size ? 1 : 0;
if (problems.length) { console.log(`\nPROBLEMS (${problems.length}):`); for (const p of problems.slice(0, 40)) console.log('  ' + p.replace('dist/', '')); if (problems.length > 40) console.log(`  ...and ${problems.length - 40} more`); } else console.log('no page problems');
