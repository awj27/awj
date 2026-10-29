// Pages cut from the October 2026 notebook shoot. Seven of the twenty for the
// design direction; the full set follows once the remaining pages are cut.
export type Pillar = 'sales' | 'founder' | 'human';

export interface NotebookPage {
  number: number;
  title: string;
  pillar: Pillar;
  src: string;
  alt: string;
  href: string;
}

export const notebookPages: NotebookPage[] = [
  { number: 1,  title: 'A-Players are uncomfortable being comfortable', pillar: 'sales',   src: '/notebook/pages/awj-01.webp', alt: 'Handwritten in blue ink on a cream notebook page: A-Players are uncomfortable being comfortable. Signed AWJ, number 1.', href: '/design/maxim/' },
  { number: 2,  title: 'Feedback is like milk. It is best fresh.',        pillar: 'founder', src: '/notebook/pages/awj-02.webp', alt: 'Handwritten in blue ink: Feedback is like milk. It is best fresh. Attributed to Faith Meyer. Number 2.', href: '/design/maxim/' },
  { number: 5,  title: 'Failure and invention are inseparable twins',     pillar: 'founder', src: '/notebook/pages/awj-05.webp', alt: 'Handwritten in blue ink: Failure and invention are inseparable twins. Attributed to Jeff Bezos. Signed AWJ, number 5.', href: '/design/maxim/' },
  { number: 8,  title: 'Take. Take. Mistake. Cut. Direction. Retake.',    pillar: 'founder', src: '/notebook/pages/awj-08.webp', alt: 'Handwritten in blue ink beneath three small drawings of a studio light, a camera and a clapperboard: Take, take, mistake. Cut, direction, retake. Signed AWJ, number 8.', href: '/design/maxim/' },
  { number: 10, title: 'Imposter Syndrome ≡ Self-Awareness',              pillar: 'human',   src: '/notebook/pages/awj-10.webp', alt: 'Handwritten in blue ink: Imposter Syndrome, three horizontal lines meaning identical to, Self Awareness. Signed AWJ, number 10.', href: '/design/maxim/' },
  { number: 12, title: 'Nobody regrets qualifying out',                   pillar: 'sales',   src: '/notebook/pages/awj-12.webp', alt: 'Handwritten in blue ink: Nobody regrets qualifying out. Signed AWJ, number 12.', href: '/design/maxim/' },
  { number: 13, title: 'Arrogance is only a strength at holding back growth', pillar: 'human', src: '/notebook/pages/awj-13.webp', alt: 'Handwritten in blue ink: Arrogance is only a strength at holding back growth. Signed AWJ, number 13.', href: '/design/maxim/' },
];

// The published library, for the index below the notebook.
export const library: { number: number; title: string; pillar: Pillar }[] = [
  { number: 1,  title: 'A-Players are uncomfortable being comfortable', pillar: 'sales' },
  { number: 2,  title: 'Feedback is like milk. It is best served fresh.', pillar: 'founder' },
  { number: 3,  title: 'The B in B-Player stands for Busy', pillar: 'founder' },
  { number: 4,  title: 'There is no such thing as a C Player', pillar: 'founder' },
  { number: 5,  title: 'Failure and invention are inseparable twins', pillar: 'founder' },
  { number: 6,  title: 'Authenticity is the most intangible invaluable interest you can have', pillar: 'human' },
  { number: 7,  title: 'Your mental health is not linear', pillar: 'human' },
  { number: 8,  title: 'Take. Take. Mistake. Cut. Direction. Retake.', pillar: 'founder' },
  { number: 9,  title: 'Authenticity is felt, not found', pillar: 'human' },
  { number: 10, title: 'Imposter Syndrome ≡ Self-Awareness', pillar: 'human' },
  { number: 11, title: 'Urgency is an emotion. Not a message.', pillar: 'sales' },
  { number: 12, title: 'Nobody regrets qualifying out', pillar: 'sales' },
];

export const pillarLabel: Record<Pillar, string> = { sales: 'Sales', founder: 'Founder', human: 'Human' };
export const pad2 = (n: number) => String(n).padStart(2, '0');
