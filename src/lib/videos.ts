export type VideoCategory = 'maxim' | 'keynote' | 'interview' | 'short';

export interface Video {
  id: string;            // YouTube video ID
  title: string;
  description: string;
  category: VideoCategory;
  publishedAt?: string;  // ISO date
  awjNumber?: number;    // when this video corresponds to a Maxim
}

// To add a video, append a new object below. To remove, delete its line.
// YouTube generates thumbnails automatically — no asset upload required.
export const VIDEOS: Video[] = [
  { id: 's8cH0ddsMKc', title: 'Your Brain Is Lying To You About Authenticity', description: 'Why authenticity is felt, not found.',                                  category: 'maxim',   awjNumber: 9,  publishedAt: '2026-04-09' },
  { id: 'N9RxVQCvcpg', title: 'How To Show Coachability',                       description: 'A short on the relationship between coachability and impostor syndrome.',  category: 'short',   awjNumber: 10, publishedAt: '2026-03-04' },
  { id: 'N_HmHeTpm7Q', title: 'This One Habit Separates Pros From Amateurs',    description: 'Take. Take. Mistake. Cut. Direction. Retake.',                              category: 'maxim',   awjNumber: 8,  publishedAt: '2026-03-04' },
  { id: 'YXzPAzfMoXc', title: "Cancer Didn't Break Me. But This Nearly Did.",    description: 'Mental health, the long way through.',                                       category: 'maxim',   awjNumber: 7,  publishedAt: '2026-02-18' },
  { id: '4SFik1aPPNY', title: "You Can't Fake Trust — How To Be Authentic In Business", description: 'Authenticity as the highest-value, most intangible asset.',          category: 'maxim',   awjNumber: 6,  publishedAt: '2026-02-12' },
  { id: 'RN7JBHge-2s', title: 'Failure and Invention Are Inseparable Twins',     description: 'A Bezos line, applied.',                                                     category: 'maxim',   awjNumber: 5,  publishedAt: '2026-01-29' },
  { id: 'ghRKisJMc-Q', title: "Why There's No Room For A C-Player In Your Business", description: 'Categorise A, B+, B-. There are no Cs.',                                   category: 'maxim',   awjNumber: 4,  publishedAt: '2026-01-20' },
  { id: '6nVhfY0J_F0', title: "The 'B' In B-Player Stands For BUSY",             description: 'Busy is not the same as productive.',                                        category: 'maxim',   awjNumber: 3,  publishedAt: '2025-12-18' },
  { id: '8r_rTKxvpHw', title: "Feedback Is Like Milk — It's Best When It's Fresh", description: 'Why procrastinating critical feedback is a leadership failure.',         category: 'maxim',   awjNumber: 2,  publishedAt: '2025-12-10' },
  { id: 'sROnH0v-o7U', title: 'Why A-Players Are Uncomfortable Being Comfortable', description: 'The mandate that drives the best.',                                       category: 'maxim',   awjNumber: 1,  publishedAt: '2025-12-02' },
];

export const CATEGORY_META: Record<VideoCategory, { label: string; tag: string }> = {
  maxim:     { label: 'Maxim',    tag: 'M' },
  keynote:   { label: 'Keynote',  tag: 'K' },
  interview: { label: 'Interview', tag: 'I' },
  short:     { label: 'Short',    tag: 'S' },
};
