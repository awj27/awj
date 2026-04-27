// Client-side analytics helper.
//
// All events from the site funnel through `track()`. If GA isn't configured
// or the user has declined consent, gtag is a no-op (consent default is
// 'denied' until ConsentBanner sets it to 'granted').
//
// Event taxonomy:
//   subscribe_submit       — user clicked Subscribe (before fetch)
//   subscribe_success      — Beehiiv accepted (server fires the canonical
//                            one via Measurement Protocol; client mirrors)
//   subscribe_error        — client- or server-side failure
//   video_play             — first PLAYING state for a YouTube embed
//   video_progress         — 25 / 50 / 75 percent milestones
//   video_complete         — ENDED state
//
// Custom event params used across events:
//   pillar       (string)  — sales | founder | human   (page-scoped, set on Layout)
//   awj_number   (number)  — Maxim issue number         (page-scoped, set on Layout)
//   page_type    (string)  — home | maxim | pillar | media | page (page-scoped)
//   video_id     (string)  — YouTube video ID
//   video_title  (string)  — Video title
//   video_type   (string)  — longform | short
//   progress     (number)  — milestone percentage (25 | 50 | 75)
//   source       (string)  — where in the page the event fired

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type AnalyticsEvent =
  | 'subscribe_submit'
  | 'subscribe_success'
  | 'subscribe_error'
  | 'video_play'
  | 'video_progress'
  | 'video_complete'
  | 'outbound_click';

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', event, params);
}

export function isAnalyticsReady(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}
