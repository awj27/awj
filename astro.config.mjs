// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.andywhyte.com',
  integrations: [sitemap()],
  build: { format: 'directory' },
  redirects: {
    '/portfolios/awj-1-aplayers-are-uncomfortable-being-comfortable': '/journal/a-players-are-uncomfortable-being-comfortable',
    '/portfolios/awj-2-feedback-is-like-milk-it-is-best-served-fresh': '/journal/feedback-is-like-milk-it-is-best-served-fresh',
    '/portfolios/awj-3-the-b-in-b-player-stands-for-busy': '/journal/the-b-in-b-player-stands-for-busy',
    '/portfolios/awj-4-there-is-no-such-thing-as-a-c-player': '/journal/there-is-no-such-thing-as-a-c-player',
    '/portfolios/awj-5-failure-and-invention-are-inseparable-twins-jeff-bezos': '/journal/failure-and-invention-are-inseparable-twins-jeff-bezos',
    '/portfolios/awj-6-authenticity-is-the-most-intangible-invaluable-interest-you-can-have': '/journal/authenticity-is-the-most-intangible-invaluable-interest-you-can-have',
    '/portfolios/awj-7-your-mental-health-is-not-linear': '/journal/your-mental-health-is-not-linear',
    '/portfolios/awj-8-take-take-mistake-cut-direction-retake': '/journal/take-take-mistake-cut-direction-retake',
    '/portfolios/awj-9-authenticity-is-felt-not-found': '/journal/authenticity-is-felt-not-found',
    '/portfolios/awj-10-imposter-syndrome': '/journal/imposter-syndrome-self-awareness',
    '/portfolios/awj-11-urgency-is-an-emotion-not-a-message': '/journal/urgency-is-an-emotion-not-a-message',
    '/portfolios/awj-12-nobody-regrets-qualifying-out': '/journal/nobody-regrets-qualifying-out',
  },
});
