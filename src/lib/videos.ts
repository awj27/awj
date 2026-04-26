export type Pillar = 'sales' | 'founder' | 'human';
export type VideoType = 'longform' | 'short';

export interface Video {
  id: string;             // YouTube video ID
  title: string;
  pillar: Pillar;
  type: VideoType;
  description?: string;
  publishedAt?: string;
  awjNumber?: number;
}

// Order within each list is newest-first (matches YouTube channel order).
//
// Excluded from this list (per Andy's curation, 2026-04-26):
//   - The Month End Show (TMES) — all 5 episodes
//   - LinkedIn Gurus EXPOSED!
//   - EXPOSING LinkedIn Humble Brags
//   - The YEAR End Show
//   - Q&A With A Sales CEO — Episode 1
//   - All Ask AW episodes (3)

export const VIDEOS: Video[] = [
  // ── LONG-FORM (32 — curated; back-catalogue via yt-dlp) ───────────────
  { id: 's8cH0ddsMKc', type: 'longform', pillar: 'human',   awjNumber: 9, title: 'Your Brain Is Lying To You About Authenticity' },
  { id: '-ez46w1rEyI', type: 'longform', pillar: 'founder',                title: 'Why Getting This Hire Right Really Matters' },
  { id: 'arBlDylbMUM', type: 'longform', pillar: 'human',                  title: "My Brother's 50th Birthday Surprise — A Norwich City VIP Experience!" },
  { id: 'N_HmHeTpm7Q', type: 'longform', pillar: 'human',  awjNumber: 8, title: 'This One Habit Separates Pros From Amateurs' },
  { id: 'z6TBd-Bv8Ic', type: 'longform', pillar: 'human',                  title: 'Bad Manager Ruining Your Job? Watch This' },
  { id: 'YXzPAzfMoXc', type: 'longform', pillar: 'human',  awjNumber: 7, title: "Cancer Didn't Break Me. But This Nearly Did." },
  { id: '4SFik1aPPNY', type: 'longform', pillar: 'human',  awjNumber: 6, title: "You Can't Fake Trust — How To Be Authentic In Business" },
  { id: 'lA5MUomi1xs', type: 'longform', pillar: 'founder',                title: 'Where I FAILED as a CEO (And How My Coach Helped Me)' },
  { id: 'RN7JBHge-2s', type: 'longform', pillar: 'founder', awjNumber: 5, title: 'Failure and Invention Are Inseparable Twins' },
  { id: 'ghRKisJMc-Q', type: 'longform', pillar: 'founder', awjNumber: 4, title: "Why There's No Room For A C-Player In Your Business" },
  { id: '_pAACnLfSuU', type: 'longform', pillar: 'founder',                title: 'The Road To $10MILLION Begins — Will We Succeed?' },
  { id: '6nVhfY0J_F0', type: 'longform', pillar: 'founder', awjNumber: 3, title: "The 'B' In B-player Stands For BUSY" },
  { id: '8r_rTKxvpHw', type: 'longform', pillar: 'founder', awjNumber: 2, title: "Feedback Is Like Milk — It's Best When It's Fresh" },
  { id: 'sROnH0v-o7U', type: 'longform', pillar: 'sales',   awjNumber: 1, title: 'Why A-Players Are Uncomfortable Being Comfortable' },
  { id: '0bKqyLTCAC4', type: 'longform', pillar: 'sales',                  title: 'How To Add VALUE To Your Sales Solutions' },
  { id: 'r5Qy5gvlQ18', type: 'longform', pillar: 'founder',                title: 'The CrowdStrike DM That Changed Everything…' },
  { id: '2FqGdsGmzCA', type: 'longform', pillar: 'founder',                title: "Behind The Scenes Of MEDDICC's BIGGEST Week EVER" },
  { id: 'pFgVsCFOAWs', type: 'longform', pillar: 'sales',                  title: "Sales CEO: The GTM Mistake Everyone Makes — Here's the Fix" },
  { id: '2R7vC0B7dr4', type: 'longform', pillar: 'sales',                  title: 'Sales Leaders — The TRUTH About Deal Reviews You NEED to Hear' },
  { id: 'BBO6714wJkE', type: 'longform', pillar: 'human',                  title: 'My Story With Imposter Syndrome' },
  { id: '3iTHDwsgwkE', type: 'longform', pillar: 'sales',                  title: 'Creativity in Keynotes: Secrets to Engaging the Audience at SKOs | KeyGOAT Returns' },
  { id: 'QPykjqreaww', type: 'longform', pillar: 'founder',                title: 'Ultimate Office Setup Tour!' },
  { id: 'I3zXHAE6Ze8', type: 'longform', pillar: 'human',                  title: 'Behind The Scenes: The Ultimate Blooper Reel' },
  { id: 'wvTDS0dMgNE', type: 'longform', pillar: 'founder',                title: "Getting S*** Done — But Where's My Invite?" },
  { id: 'E0-6CwN7Z88', type: 'longform', pillar: 'human',                  title: 'Surprising Andy on His Birthday!' },
  { id: 'ofF4c4HNj1o', type: 'longform', pillar: 'human',                  title: '24 hours of SPA: Roadtrip Across Europe' },
  { id: 'CAknpob0aVc', type: 'longform', pillar: 'sales',                  title: 'The ONE Book That Will Make You Rich' },
  { id: 'w0REVA0cg-M', type: 'longform', pillar: 'founder',                title: 'The GREAT YouTube HEIST: Media Team Takeover' },
  { id: 'LPhWYdv2ZGE', type: 'longform', pillar: 'sales',                  title: 'Meeting The ULTIMATE Sales Scientist' },
  { id: 'FbQu0xlKS8E', type: 'longform', pillar: 'founder',                title: 'I Secretly Recorded This EPIC Promotion' },
  { id: 'aZ7o3wR5CUU', type: 'longform', pillar: 'human',                  title: 'PROM RESCUE! — "Can I ride in your Porsche?"' },
  { id: '4hATA2kXYeQ', type: 'longform', pillar: 'sales',                  title: 'The Biggest Presentation Of My LIFE | KeyGoat' },

  // ── SHORTS (48) ────────────────────────────────────────────────────────
  { id: 'q6_uOclANHw', type: 'short', pillar: 'human',                  title: 'My 10 Year Old Directed This Video' },
  { id: 'F3r-A60dJDU', type: 'short', pillar: 'sales',                  title: "Be Careful — The Best Product Doesn't Always Win The Deal" },
  { id: 'HppLrg8gOug', type: 'short', pillar: 'sales',                  title: 'Win The Deal Before It Closes' },
  { id: 'IKJA681xg5A', type: 'short', pillar: 'sales',                  title: 'Why MEDDPICC Is Perfect For SDRs' },
  { id: 'RP4kFmJjFYc', type: 'short', pillar: 'sales',                  title: 'Four Rehearsals And A Funeral…' },
  { id: 'tI3Z-0GXsNk', type: 'short', pillar: 'sales',                  title: 'The "This Only Works For Enterprise Deals" Excuse Is No Longer Valid' },
  { id: 'oyZE9paB-fQ', type: 'short', pillar: 'sales',                  title: 'How To Connect Your Value To Business Objectives' },
  { id: 'iyqeLhFqyGc', type: 'short', pillar: 'sales',                  title: 'How To Out-position The Competition and Access The Economic Buyer' },
  { id: 'ELxcmT16jhU', type: 'short', pillar: 'human',                  title: 'This Study Changes EVERYTHING We Know About Authenticity' },
  { id: 'AZCs-mjWqPA', type: 'short', pillar: 'sales',                  title: 'This Is What Frustrates Me The Most About MEDDIC' },
  { id: 'muvNwsM_GFU', type: 'short', pillar: 'sales',                  title: 'Your Sales SKO Is A Waste Of Time (Unless…)' },
  { id: 'W6_J3hkBYko', type: 'short', pillar: 'sales',                  title: 'The first thing that people need to know about MEDDPICC is...' },
  { id: 'gaQMJcn22TU', type: 'short', pillar: 'human',                  title: 'A Norwich City surprise for my brother' },
  { id: 'zBWiUq8Cwc4', type: 'short', pillar: 'founder',                title: 'Inspiring My Team With My Comedic Genius' },
  { id: 'npTOuxKystk', type: 'short', pillar: 'human',                  title: 'You Need This to Unlock Your Full Potential' },
  { id: '6ZPYcm7bhPg', type: 'short', pillar: 'founder',                title: 'Someone Broke Into My Office. This Is What Happened.' },
  { id: 'j0dWNrqYAPU', type: 'short', pillar: 'sales',                  title: 'Salespeople Keep Missing This Important Point' },
  { id: 'QA8-0FpiwxM', type: 'short', pillar: 'founder',                title: "We Can't Mess This Hire Up" },
  { id: '6p0KLYSGL0M', type: 'short', pillar: 'human',                  title: "Me in the 90's 😁" },
  { id: 'Q8hwxGFDdVE', type: 'short', pillar: 'sales',                  title: 'Why Do People Still Say This About MEDDIC?' },
  { id: 'yfFF4P9KLVI', type: 'short', pillar: 'founder',                title: "Still Can't Believe We Pulled This Off!" },
  { id: 'QUcKuklg0yU', type: 'short', pillar: 'sales',                  title: 'Are Salespeople Outsourcing Their Thinking to AI?' },
  { id: '3cBAD9iAEkc', type: 'short', pillar: 'sales',                  title: 'The Person Your Customers Want To Hear From The Most' },
  { id: '3gxnta1UJCI', type: 'short', pillar: 'founder',                title: 'Building My Dream Place To Work' },
  { id: 'SMF-TJC5vw8', type: 'short', pillar: 'sales',                  title: 'Struggling with Metrics?' },
  { id: 'Gw6Lb6CJzgQ', type: 'short', pillar: 'sales',                  title: 'Post-SKO Initiative for GTM Teams' },
  { id: 'I-woDQpVczs', type: 'short', pillar: 'founder',                title: 'Bootstrapping, Bullies, and a Blueprint' },
  { id: 'bBj6QX8fwTI', type: 'short', pillar: 'sales',                  title: 'It blows my mind how many people still do this...' },
  { id: 'ftCnNKw-5Hw', type: 'short', pillar: 'founder',                title: "If You're a Founder or CEO — Watch This!" },
  { id: 'FX3LHl-3DRE', type: 'short', pillar: 'sales',                  title: 'Sales Reps will hate me for saying this' },
  { id: 'QAP-xBsOVAs', type: 'short', pillar: 'sales',                  title: 'Value Pyramid: The Cheat Code for Executive Alignment' },
  { id: 'S9_BXeeNKA0', type: 'short', pillar: 'sales',                  title: 'Why the F*** do people still do this?' },
  { id: 'v2K22LCBwbU', type: 'short', pillar: 'sales',                  title: 'The Number One Mistake that salespeople make' },
  { id: 'QQr3eLMAkhc', type: 'short', pillar: 'founder',                title: 'Advice For Founders Starting Out' },
  { id: 'HupjYzwfRcw', type: 'short', pillar: 'founder',                title: 'My Pride At One Year of The Female Sales Leader!' },
  { id: 'N9RxVQCvcpg', type: 'short', pillar: 'human', awjNumber: 10, title: 'How To Show Coachability' },
  { id: 'LVvndUo2sqg', type: 'short', pillar: 'founder',                title: 'When Should Founders Step Back?' },
  { id: 'D08rb95FzcA', type: 'short', pillar: 'founder',                title: 'The Mistake Founders Make Too Late' },
  { id: 'uL_cbKoaXAQ', type: 'short', pillar: 'sales',                  title: "How To Win When You're Not In The Room" },
  { id: 'kJqpHxo9n4Y', type: 'short', pillar: 'human',                  title: 'How To Deal With A Bad Boss At Work' },
  { id: '25P2fhBOWic', type: 'short', pillar: 'founder',                title: 'Leaders — Do THIS To Build A Good Culture' },
  { id: 'aSVfR6vrmjI', type: 'short', pillar: 'human',                  title: 'When you try to clone yourself from Temu…' },
  { id: 'AhA5CMdhKPc', type: 'short', pillar: 'sales',                  title: 'The behaviours that make a true Sales A-Player' },
  { id: '3zYRf2VK4Bo', type: 'short', pillar: 'human',                  title: 'These Four Words Could Help Someone' },
  { id: '7unw6ZEJmPM', type: 'short', pillar: 'sales',                  title: 'How To NAIL Your Keynote Presentation' },
  { id: '99OVR0ebCaQ', type: 'short', pillar: 'founder',                title: 'Happy Workplace + High Performance — How Do You Get Both?' },
  { id: 'BPrArz2NJXI', type: 'short', pillar: 'sales',                  title: 'Do This In Sales To Save Your Deals' },
  { id: 'QktxS5zeApw', type: 'short', pillar: 'human',                  title: 'Why Authenticity Is So Important' },
];

export const PILLAR_VIDEO_META: Record<Pillar, { label: string; tag: string; bg: string; fg: string }> = {
  sales:   { label: 'Sales',   tag: 'Authority', bg: '#FFCE00', fg: '#0A0A0A' },
  founder: { label: 'Founder', tag: 'Operator',  bg: '#1F47FF', fg: '#FFFFFF' },
  human:   { label: 'Human',   tag: 'Truth',     bg: '#0A0A0A', fg: '#FFFFFF' },
};
