// Site-wide constants and the structured data every page carries.

export const SITE = {
  name: 'Andy Whyte Journal',
  shortName: 'AWJ',
  url: 'https://andywhyte.com',
  author: 'Andy Whyte',
  email: 'hello@andywhyte.com',
  /**
   * The Substack publication, for example https://andywhyte.substack.com.
   * Leave empty until Andy supplies it: the subscribe form then falls back to
   * the existing /api/subscribe function so no sign-up is lost.
   */
  substackUrl: '',
  facts: {
    years: 20,
    copies: '100,000',
    graduates: '35,000',
    founded: 2021,
  },
  nav: [
    ['Maxims', '/maxims/'],
    ['MEDDPICC', '/meddpicc/'],
    ['Speaking', '/speaking/'],
    ['Book', '/book/'],
    ['About', '/about/'],
  ] as [string, string][],
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andywhyte/' },
    { label: 'X', href: 'https://twitter.com/andywhyte' },
    { label: 'YouTube', href: 'https://www.youtube.com/@AndyWhyte_' },
    { label: 'Instagram', href: 'https://www.instagram.com/andywhyte_' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@andywhyte_' },
    { label: 'Facebook', href: 'https://www.facebook.com/andywhyteuk/' },
  ],
};

export const HUBS = [
  { slug: 'meddpicc', title: 'MEDDPICC and MEDDICC', line: 'The qualification framework, from the person who wrote the book on it.' },
  { slug: 'sales-leadership', title: 'Sales leadership', line: 'Inspect the deal, not the rep. Forecasts, deal reviews and the thinking behind them.' },
  { slug: 'keynote-speaking', title: 'Keynote speaking', line: 'Sales kickoffs and revenue summits. Practical, direct, no theatre.' },
  { slug: 'imposter-syndrome', title: 'Imposter syndrome', line: 'Only the self-aware suffer from it. Why that is a strength.' },
];

const sameAs = [...SITE.social.map((s) => s.href), ...(SITE.substackUrl ? [SITE.substackUrl] : [])];

export const personSchema = {
  '@type': 'Person',
  '@id': `${SITE.url}/#andy`,
  name: 'Andy Whyte',
  givenName: 'Andy',
  familyName: 'Whyte',
  jobTitle: 'Founder and CEO',
  worksFor: { '@type': 'Organization', '@id': 'https://meddicc.com/#org', name: 'MEDDICC', url: 'https://meddicc.com/' },
  sameAs,
  url: `${SITE.url}/about/`,
  image: `${SITE.url}/media/portrait/andy-portrait.jpg`,
  description: `Founder and CEO of MEDDICC and author of the best-selling book MEDDICC. Twenty years in sales at companies including Oracle, Sprinklr, Tealium, Branch and Poq before founding MEDDICC in ${SITE.facts.founded}. Keynote speaker at sales kickoffs and revenue summits.`,
  knowsAbout: [
    'MEDDICC', 'MEDDPICC', 'MEDDIC', 'Sales Qualification', 'Deal Inspection', 'Sales Forecasting',
    'Sales Leadership', 'Enterprise Sales', 'Keynote Speaking', 'Sales Kickoffs', 'Imposter Syndrome',
    'Founder-led Sales', 'Bootstrapped SaaS',
  ],
};

export const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE.url}/#org`,
  name: SITE.name,
  alternateName: SITE.shortName,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/notebook/mark/awj-mark-blue-320.png`,
  founder: { '@id': `${SITE.url}/#andy` },
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: `${SITE.url}/`,
  name: SITE.name,
  description: 'Principles for sales, founding and being human, written in a blue notebook. Essays, frameworks and a glossary from the author of MEDDICC.',
  publisher: { '@id': `${SITE.url}/#org` },
  inLanguage: 'en-GB',
};
