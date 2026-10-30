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
  for (const [re, label] of [[/\/assets\//, 'old /assets/ path'], [/awj_main_logo|awj_submark/, 'old logo'], [/every Friday/i, '"every Friday"'], [/17 years/, '"17 years"'], [/#1F47FF/i, 'old electric blue']]) {
    if (re.test(html)) problems.push(`${file}: ${label}`);
  }
}
console.log(`pages: ${pages.length}, links: ${links}, images: ${imgs} (${imgsNoAlt} without alt)`);
console.log('JSON-LD types:', Object.entries(ld).sort((a, b) => b[1] - a[1]).map(([t, c]) => `${t}×${c}`).join(', '));
if (badLinks.size) { console.log('\nBROKEN INTERNAL LINKS:'); for (const [h, c] of [...badLinks].sort((a, b) => b[1] - a[1])) console.log(`  ${h}  (${c})`); } else console.log('no broken internal links');
if (problems.length) { console.log(`\nPROBLEMS (${problems.length}):`); for (const p of problems.slice(0, 40)) console.log('  ' + p.replace('dist/', '')); if (problems.length > 40) console.log(`  ...and ${problems.length - 40} more`); } else console.log('no page problems');
