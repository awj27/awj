// Pages cut from the October 2026 journal shoot. Eighteen of the twenty are
// photographed; 16 and 17 are still to be written and shot by Andy.
export type Pillar = 'sales' | 'founder' | 'human';

export interface NotebookPage {
  number: number;
  title: string;
  pillar: Pillar;
  src: string;
  alt: string;
  href: string;
  /** Pillar not yet confirmed by Andy (unpublished Maxim). */
  provisional?: boolean;
}

export const pad2 = (n: number) => String(n).padStart(2, '0');
export const maximHref = (n: number) => `/design/maxim/${pad2(n)}/`;
const page = (number: number, title: string, pillar: Pillar, alt: string, provisional = false): NotebookPage => ({
  number, title, pillar, alt, provisional,
  src: `/notebook/pages/awj-${pad2(number)}.webp`,
  href: maximHref(number),
});

export const notebookPages: NotebookPage[] = [
  page(1,  'A-Players are uncomfortable being comfortable', 'sales',   'Handwritten in blue ink on a cream journal page: A-Players are uncomfortable being comfortable. Signed AWJ, number 1.'),
  page(2,  'Feedback is like milk. It is best fresh.',        'founder', 'Handwritten in blue ink: Feedback is like milk. It is best fresh. Attributed to Faith Meyer. Number 2.'),
  page(3,  'The B in B-Player stands for Busy',               'founder', 'Handwritten in blue ink: The B in B-Player stands for Busy. Signed AWJ, number 3.'),
  page(4,  'There is no such thing as a C Player',            'founder', 'Handwritten in blue ink: There is no such thing as a C Player. Signed AWJ, number 4.'),
  page(5,  'Failure and invention are inseparable twins',     'founder', 'Handwritten in blue ink: Failure and invention are inseparable twins. Attributed to Jeff Bezos. Signed AWJ, number 5.'),
  page(6,  'Authenticity is the most intangible invaluable interest you can have', 'human', 'Handwritten in blue ink: Authenticity is the most intangible, invaluable interest you can have, with the three IN words stacked. Signed AWJ, number 6.'),
  page(7,  'Your mental health is not linear',                'human',   'Handwritten in blue ink: Your mental health is not linear. Signed AWJ, number 7.'),
  page(8,  'Take. Take. Mistake. Cut. Direction. Retake.',    'founder', 'Handwritten in blue ink beneath three small drawings of a studio light, a camera and a clapperboard: Take, take, mistake. Cut, direction, retake. Signed AWJ, number 8.'),
  page(9,  'Authenticity is felt, not found',                 'human',   'Handwritten in blue ink: Authenticity is felt, not found. Signed AWJ, number 9.'),
  page(10, 'Imposter Syndrome ≡ Self-Awareness',              'human',   'Handwritten in blue ink: Imposter Syndrome, three horizontal lines meaning identical to, Self Awareness. Signed AWJ, number 10.'),
  page(11, 'Urgency is an emotion. Not a message.',           'sales',   'Handwritten in blue ink: Urgency is an emotion. Not a message. Signed AWJ, number 11.'),
  page(12, 'Nobody regrets qualifying out',                   'sales',   'Handwritten in blue ink: Nobody regrets qualifying out. Signed AWJ, number 12.'),
  page(13, 'Arrogance is only a strength at holding back growth', 'human', 'Handwritten in blue ink: Arrogance is only a strength at holding back growth. Signed AWJ, number 13.', true),
  page(14, 'Whether you were created or coded, you were put here to play a role', 'human', 'Handwritten in blue ink: Whether you were created or coded, you were put here to play a role. Signed AWJ, number 14.', true),
  page(15, 'Authenticity beats deception',                    'human',   'Handwritten in blue ink: Authenticity beats deception. Signed AWJ.', true),
  page(18, 'We fight most what we almost are',                'human',   'Handwritten in blue ink: We fight most what we almost are. Signed AWJ, number 18.', true),
  page(19, "You can't coach a lagging indicator",             'sales',   "Handwritten in blue ink: You can't coach a lagging indicator. Signed AWJ, number 19.", true),
  page(20, 'Judge decisions, not outcomes',                   'sales',   'Handwritten in blue ink: Judge decisions, not outcomes. Signed AWJ, number 20.', true),
];

/** The full library for the index below the journal, including the two still to come. */
export const library: { number: number; title: string; pillar?: Pillar; coming?: boolean }[] = [
  ...notebookPages.slice(0, 15).map((p) => ({ number: p.number, title: p.title, pillar: p.pillar })),
  { number: 16, title: 'Being written', coming: true },
  { number: 17, title: 'Being written', coming: true },
  ...notebookPages.slice(15).map((p) => ({ number: p.number, title: p.title, pillar: p.pillar })),
];

export const pillarLabel: Record<Pillar, string> = { sales: 'Sales', founder: 'Founder', human: 'Human' };

export const pillarInfo: Record<Pillar, { label: string; tag: string; description: string; hubs: string[] }> = {
  sales:   { label: 'Sales',   tag: 'Authority', description: 'MEDDICC, deal inspection and sales as a thinking discipline.', hubs: ['meddpicc', 'sales-leadership'] },
  founder: { label: 'Founder', tag: 'Operator',  description: 'Bootstrapped SaaS, trade-offs under uncertainty, no theatre.', hubs: ['sales-leadership', 'keynote-speaking'] },
  human:   { label: 'Human',   tag: 'Truth',     description: 'Controlled lessons from failure. The quality of your thinking determines the quality of your life.', hubs: ['imposter-syndrome'] },
};

export const pageFor = (n: number) => notebookPages.find((p) => p.number === n);
export const pageImage = (n: number) => `/notebook/pages/awj-${pad2(n)}.webp`;
export const ogImage = (n: number) => `/notebook/og/awj-${pad2(n)}.jpg`;
