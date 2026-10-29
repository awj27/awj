// Helpers shared by the pages that list or render Maxims.
import type { CollectionEntry } from 'astro:content';

export type Entry = CollectionEntry<'journal'>;

export const entrySlug = (e: Entry) => e.data.slug ?? e.id;
export const entryHref = (e: Entry) => `/journal/${entrySlug(e)}/`;

export function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

/** A clean one-line description from a markdown body: strip tags and markup, collapse whitespace. */
export function plainExcerpt(body: string, max = 160): string {
  const plain = body
    .replace(/<!--([\s\S]*?)-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ')
    .replace(/[#*_>`]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > max ? plain.slice(0, max - 3).trimEnd() + '...' : plain;
}

export function formatDate(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export const byNumber = (a: Entry, b: Entry) => a.data.awj_number - b.data.awj_number;
export const byNumberDesc = (a: Entry, b: Entry) => b.data.awj_number - a.data.awj_number;
