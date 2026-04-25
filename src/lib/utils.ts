export const PILLARS = ['sales', 'founder', 'human'] as const;
export type Pillar = (typeof PILLARS)[number];

export const PILLAR_META: Record<Pillar, { label: string; tag: string; bg: string; fg: string; description: string }> = {
  sales:   { label: 'Sales',   tag: 'Authority', bg: '#FFCE00', fg: '#0A0A0A', description: 'MEDDICC, deal inspection, sales as a thinking discipline.' },
  founder: { label: 'Founder', tag: 'Operator',  bg: '#1F47FF', fg: '#FFFFFF', description: 'Bootstrap SaaS, trade-offs under uncertainty, no theatre.' },
  human:   { label: 'Human',   tag: 'Truth',     bg: '#0A0A0A', fg: '#FFFFFF', description: 'Controlled lessons from failure. Quality of thinking, quality of life.' },
};

export function formatDate(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatIssueDate(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
}

export function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}
