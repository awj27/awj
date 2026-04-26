// Cloudflare Pages Function — accepts contact-form submissions, validates,
// and emails Andy via Resend's API.
//
// Form on the site → POST /api/contact { name, email, topic, message } →
// this function → Resend → hello@andywhyte.com (which Cloudflare Email
// Routing forwards to Andy's real inbox).
//
// Required Cloudflare Pages environment variables (Settings → Environment
// variables → Production):
//   RESEND_API_KEY        — Bearer token (Resend → API Keys)
//   CONTACT_NOTIFY_EMAIL  — where to deliver (default: hello@andywhyte.com)
//   CONTACT_FROM_ADDRESS  — display "From" (default: AWJ Contact <contact@andywhyte.com>;
//                           must be on a Resend-verified domain — until you
//                           verify andywhyte.com in Resend, set this to
//                           "AWJ Contact <onboarding@resend.dev>")
//
// Encrypt RESEND_API_KEY (toggle "Encrypt" when adding) — never plain text.

interface Body {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
  website?: string; // honeypot
}

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_NOTIFY_EMAIL?: string;
  CONTACT_FROM_ADDRESS?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: Body;
  try {
    body = await context.request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request body.' }, 400);
  }

  // Honeypot: silent success so bots don't probe
  if (body.website && body.website.trim().length > 0) {
    return json({ ok: true, message: "Thanks — your message is on its way." });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim().toLowerCase();
  const topic = (body.topic ?? 'General').trim();
  const message = (body.message ?? '').trim();

  if (!name || name.length > 200) {
    return json({ ok: false, error: 'Please include your name.' }, 400);
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  }
  if (message.length < 10 || message.length > 10000) {
    return json({ ok: false, error: 'Please write at least a sentence (max 10,000 chars).' }, 400);
  }

  const apiKey = context.env.RESEND_API_KEY;
  if (!apiKey) {
    return json(
      { ok: false, error: 'Contact form is temporarily unavailable. Email hello@andywhyte.com directly.' },
      503,
    );
  }

  const to = context.env.CONTACT_NOTIFY_EMAIL ?? 'hello@andywhyte.com';
  const from = context.env.CONTACT_FROM_ADDRESS ?? 'AWJ Contact <contact@andywhyte.com>';

  const subject = `[AWJ contact] ${topic} — from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Topic: ${topic}`,
    '',
    message,
  ].join('\n');
  const html = [
    `<p><strong>Name:</strong> ${escapeHtml(name)}<br>`,
    `<strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a><br>`,
    `<strong>Topic:</strong> ${escapeHtml(topic)}</p>`,
    `<hr>`,
    `<p style="white-space:pre-wrap;">${escapeHtml(message)}</p>`,
  ].join('');

  let res: Response;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });
  } catch {
    return json({ ok: false, error: 'Network error. Try again or email hello@andywhyte.com.' }, 502);
  }

  if (res.ok) {
    return json({ ok: true, message: "Thanks — your message is on its way. I'll reply soon." });
  }

  let detail = '';
  try { detail = await res.text(); } catch {}
  return json(
    { ok: false, error: 'Send failed. Try emailing hello@andywhyte.com directly.', detail },
    502,
  );
};

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
