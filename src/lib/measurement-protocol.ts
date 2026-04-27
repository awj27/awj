// Server-side GA4 Measurement Protocol helper for Cloudflare Pages Functions.
//
// Why: Client-side `gtag('event', ...)` can drop events when the user has
// declined consent (cookieless mode → modeled only) or when the page
// redirects/closes mid-request. Server-side events bypass consent (because
// they carry no client identifier beyond an opaque `client_id`) and are
// the canonical record for conversions like `subscribe_success`.
//
// Required env vars on the calling Function:
//   PUBLIC_GA_MEASUREMENT_ID  (e.g. G-XXXXXXXXXX) — same value as client
//   GA_API_SECRET             — Measurement Protocol API secret (encrypted)

interface MPEnv {
  PUBLIC_GA_MEASUREMENT_ID?: string;
  GA_API_SECRET?: string;
}

interface MPEvent {
  name: string;
  params?: Record<string, unknown>;
}

/**
 * Stable-ish client identifier from request headers. GA4 requires a
 * `client_id` per event; without one events are rejected. We hash a
 * combo of CF-Connecting-IP + UA so the same visitor produces the same
 * id within a session, but it's not personally identifiable.
 */
async function deriveClientId(request: Request): Promise<string> {
  const ip =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for') ??
    '0.0.0.0';
  const ua = request.headers.get('user-agent') ?? 'unknown';
  const data = new TextEncoder().encode(`${ip}::${ua}`);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hex = Array.from(new Uint8Array(hash))
    .slice(0, 8)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  // GA4 expects something resembling its `cid` format: <int>.<int>
  const a = parseInt(hex.slice(0, 8), 16);
  const b = parseInt(hex.slice(8, 16), 16) || Date.now();
  return `${a}.${b}`;
}

export async function sendMeasurementEvent(
  env: MPEnv,
  request: Request,
  events: MPEvent | MPEvent[],
): Promise<void> {
  const measurementId = env.PUBLIC_GA_MEASUREMENT_ID;
  const apiSecret = env.GA_API_SECRET;
  if (!measurementId || !apiSecret) return; // silently noop if not configured

  const eventArray = Array.isArray(events) ? events : [events];
  const clientId = await deriveClientId(request);

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
    measurementId,
  )}&api_secret=${encodeURIComponent(apiSecret)}`;

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        events: eventArray.map(e => ({
          name: e.name,
          params: {
            engagement_time_msec: 100,
            ...e.params,
          },
        })),
      }),
    });
  } catch {
    // Never let analytics break the user-facing flow
  }
}
