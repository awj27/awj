// Assemble public/llms-full.txt from the content collections: every essay, hub, glossary term,
// framework and editorial page as plain text, for answer engines that read one file.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://andywhyte.com';
const read = (dir) => readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => ({ id: f.replace(/\.md$/, ''), ...parse(readFileSync(join(dir, f), 'utf8')) }));

function parse(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: src };
  const data = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  return { data, body: m[2] };
}

const strip = (md) => md
  .replace(/<!--([\s\S]*?)-->/g, '')
  .replace(/<[^>]+>/g, '')
  .replace(/^#{1,6}\s+/gm, '')
  .replace(/[*_`]/g, '')
  .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

const out = [];
out.push('# Andy Whyte Journal: full text', '', 'Andy Whyte is the founder and CEO of MEDDICC and the author of the best-selling book MEDDICC. Twenty years in sales. Keynote speaker at sales kickoffs and revenue summits. This file holds the full text of the journal and its reference pages.', '');

const journal = read('src/content/journal').sort((a, b) => Number(a.data.awj_number) - Number(b.data.awj_number));
out.push('## The Maxims', '');
for (const e of journal) {
  out.push(`### AWJ No. ${String(e.data.awj_number).padStart(2, '0')}: ${e.data.title}`, `Pillar: ${e.data.pillar}. URL: ${SITE}/journal/${e.data.slug || e.id}/`, '', strip(e.body), '');
}

for (const [dir, heading, path] of [['src/content/hubs', 'Topic hubs', ''], ['src/content/pages', 'Editorial pages', ''], ['src/content/landing', 'Landing pages', ''], ['src/content/frameworks', 'Frameworks', 'frameworks/'], ['src/content/glossary', 'Glossary', 'glossary/']]) {
  let items = [];
  try { items = read(dir); } catch { continue; }
  if (!items.length) continue;
  out.push(`## ${heading}`, '');
  for (const e of items.sort((a, b) => Number(a.data.order ?? 0) - Number(b.data.order ?? 0))) {
    const title = e.data.title || e.data.term || e.data.name || e.id;
    out.push(`### ${title}`, `URL: ${SITE}/${path}${e.id}/`, '');
    if (e.data.short) out.push(e.data.short, '');
    if (e.data.standfirst) out.push(e.data.standfirst, '');
    if (e.data.oneLiner) out.push(e.data.oneLiner, '');
    out.push(strip(e.body), '');
  }
}

writeFileSync('public/llms-full.txt', out.join('\n'));
console.log(`wrote public/llms-full.txt (${Math.round(out.join('\n').length / 1024)} KB)`);
