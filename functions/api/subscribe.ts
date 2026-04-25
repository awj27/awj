// Cloudflare Pages Function — proxies subscribe requests to Substack so
// the user never leaves andywhyte.com. The custom AWJ-styled form on the
// site POSTs JSON here; we POST to Substack server-side and return a
// clean ok/error response for the front-end to render inline.

interface Body { email?: string; }

export const onRequestPost: PagesFunction = async (context) => {
  let body: Body;
  try {
    body = await context.request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request body' }, 400);
  }

  const email = (body.email ?? '').trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  }

  const origin = 'https://andywhyte.com';

  let res: Response;
  try {
    res = await fetch('https://andywhyte.substack.com/api/v1/free', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AWJ-Subscribe/1.0 (+https://andywhyte.com)',
        'Origin': origin,
        'Referer': origin + '/',
      },
      body: JSON.stringify({
        email,
        first_url: origin,
        first_referrer: '',
        current_url: origin,
        current_referrer: '',
        referral_code: '',
        source: 'awj-site',
      }),
    });
  } catch (e) {
    return json({ ok: false, error: 'Network error. Try again.' }, 502);
  }

  if (res.ok) {
    return json({ ok: true, message: "You're in. Check your inbox to confirm." });
  }

  let detail = '';
  try { detail = await res.text(); } catch {}
  return json({ ok: false, error: 'Subscribe failed. Try again or email hello@andywhyte.com.', detail }, 502);
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
