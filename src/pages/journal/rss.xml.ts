import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const entries = (await getCollection('journal', e => !e.data.draft))
    .sort((a, b) => b.data.awj_number - a.data.awj_number);

  return rss({
    title: 'Andy Whyte Journal',
    description: 'A journal of principles for sales, founding and being human. Twenty Maxims, each written in full, from the author of MEDDICC.',
    site: context.site!,
    items: entries.map(e => ({
      title: `AWJ #${e.data.awj_number}: ${e.data.title}`,
      pubDate: e.data.date,
      description: e.body?.slice(0, 200) ?? e.data.title,
      link: `/journal/${e.data.slug ?? e.id}/`,
      categories: [e.data.pillar],
    })),
  });
}
