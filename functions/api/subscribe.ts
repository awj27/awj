// Cloudflare Pages Function — proxies subscribe requests to Beehiiv's
// official API so the user never leaves andywhyte.com.
//
// Form on the site → POST { email } → this function → Beehiiv API
//   POST https://api.beehiiv.com/v2/publications/{pub_id}/subscriptions
// Beehiiv handles confirmation email, list management, etc.
//
// Required Cloudflare Pages environment variables (Settings → Environment
// variables → Production):
//   BEEHIIV_API_KEY         — Bearer token (Beehiiv → Settings → API)
//   BEEHIIV_PUBLICATION_ID  — pub_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
//
// Encrypt the API key (toggle "Encrypt" when adding) — never plain text.

import { sendMeasurementEvent } from '../../src/lib/measurement-protocol';

interface Body { email?: string; }

interface Env {
  BEEHIIV_API_KEY?: string;
  BEEHIIV_PUBLICATION_ID?: string;
  PUBLIC_GA_MEASUREMENT_ID?: string;
  GA_API_SECRET?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: Body;
  try {
    body = await context.request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request body.' }, 400);
  }

  const email = (body.email ?? '').trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  }

  const apiKey = context.env.BEEHIIV_API_KEY;
  const pubId = context.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !pubId) {
    return json({ ok: false, error: 'Subscription is temporarily unavailable. Email hello@andywhyte.com to be added.' }, 503);
  }

  // Detect referer so Beehiiv's analytics show where the sign-up came from
  const referer = context.request.headers.get('referer') ?? 'https://andywhyte.com';

  let res: Response;
  try {
    res = await fetch(`https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'AWJ-Subscribe/1.0',
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: 'awj-site',
        referring_site: referer,
      }),
    });
  } catch (e) {
    return json({ ok: false, error: 'Network error. Try again.' }, 502);
  }

  if (res.ok || res.status === 201) {
    // Server-side conversion event — canonical record (bypasses consent-mode
    // limits and runs even if the client closes the page mid-redirect).
    await sendMeasurementEvent(context.env, context.request, {
      name: 'subscribe_success',
      params: { source: 'pages_function', referrer: referer },
    });
    return json({ ok: true, message: "You're in. Check your inbox to confirm." });
  }

  // Surface a useful message but not the raw API detail to the public
  let detail = '';
  try { detail = await res.text(); } catch {}
  // Common: 422 = invalid email or already-subscribed (treat as success-ish)
  if (res.status === 422 && /already/i.test(detail)) {
    await sendMeasurementEvent(context.env, context.request, {
      name: 'subscribe_already',
      params: { source: 'pages_function', referrer: referer },
    });
    return json({ ok: true, message: 'Already subscribed — thank you.' });
  }
  return json({ ok: false, error: 'Subscription failed. Try again or email hello@andywhyte.com.', detail }, 502);
};

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
