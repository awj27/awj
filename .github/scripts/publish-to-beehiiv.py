#!/usr/bin/env python3
"""
Publish (or draft) an AWJ entry to Beehiiv via their v2 API.

Reads a markdown file with frontmatter, builds an AWJ-styled HTML email body,
and POSTs it to /v2/publications/{publicationId}/posts.

Required env vars:
  BEEHIIV_API_KEY         — Bearer token from Beehiiv Settings → API
  BEEHIIV_PUBLICATION_ID  — like "pub_xxxxxxxx"
  BEEHIIV_POST_STATUS     — "confirmed" (auto-send) or "draft" (review in Beehiiv)
"""

import json
import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

SITE_URL = "https://www.andywhyte.com"

PILLAR_NAME = {"sales": "Sales", "founder": "Founder", "human": "Human"}
PILLAR_BG   = {"sales": "#FFCE00", "founder": "#1F47FF", "human": "#0A0A0A"}
PILLAR_FG   = {"sales": "#0A0A0A", "founder": "#FFFFFF", "human": "#FFFFFF"}


def parse_frontmatter(text: str):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.DOTALL)
    if not m:
        return {}, text
    fm_text, body = m.groups()
    fm = {}
    for line in fm_text.split("\n"):
        if ":" not in line:
            continue
        k, v = line.split(":", 1)
        v = v.strip().strip('"\'')
        if v.lower() in ("true", "false"):
            v = v.lower() == "true"
        else:
            try:
                v = int(v)
            except (TypeError, ValueError):
                pass
        fm[k.strip()] = v
    return fm, body


def excerpt_html(body_md: str, max_paragraphs: int = 3) -> str:
    """Take the first few non-heading paragraphs of the markdown body and
    wrap them in inline-styled <p> tags suitable for HTML email."""
    paragraphs = []
    for chunk in re.split(r"\n\s*\n", body_md.strip()):
        chunk = chunk.strip()
        if not chunk:
            continue
        if chunk.startswith("#") or chunk.startswith(">"):
            continue
        # Strip simple markdown bold/italic — keep it readable in plain text fallback
        cleaned = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", chunk)
        cleaned = re.sub(r"(?<!\*)\*([^*\n]+?)\*(?!\*)", r"<em>\1</em>", cleaned)
        # Convert single line breaks to <br>
        cleaned = cleaned.replace("\n", "<br>")
        paragraphs.append(cleaned)
        if len(paragraphs) >= max_paragraphs:
            break
    return "\n".join(
        f'<p style="font-family:Inter,system-ui,sans-serif;font-size:17px;line-height:1.6;color:#111;margin:0 0 16px;">{p}</p>'
        for p in paragraphs
    )


def build_email_html(fm: dict, body_md: str) -> str:
    title = str(fm.get("title", "Untitled")).strip()
    awj_n = fm.get("awj_number", 0)
    pillar = str(fm.get("pillar", "sales")).lower()
    slug = str(fm.get("slug", "")).strip()
    video_id = str(fm.get("video_id", "")).strip()
    canonical = f"{SITE_URL}/journal/{slug}/" if slug else SITE_URL

    pillar_label = PILLAR_NAME.get(pillar, pillar.title())
    pillar_bg = PILLAR_BG.get(pillar, "#FFCE00")
    pillar_fg = PILLAR_FG.get(pillar, "#0A0A0A")

    body = excerpt_html(body_md)
    video_block = ""
    if video_id:
        video_block = (
            f'<p style="margin:0 0 24px;">'
            f'<a href="https://www.youtube.com/watch?v={video_id}" '
            f'style="color:#1F47FF;font-weight:700;text-decoration:none;border-bottom:1px solid #1F47FF;padding-bottom:1px;">'
            f"Watch the video on YouTube →</a></p>"
        )

    return f"""\
<!DOCTYPE html>
<html lang="en-GB">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F4F1EA;font-family:Inter,system-ui,-apple-system,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F4F1EA;">
    <tr><td align="center" style="padding:24px 16px;">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#FFFFFF;border:2px solid #0A0A0A;">
        <tr><td style="padding:32px 32px 16px;">
          <p style="margin:0;font-family:'Courier New',monospace;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#4A4842;">
            AWJ #{awj_n} ·
            <span style="display:inline-block;background:{pillar_bg};color:{pillar_fg};padding:2px 8px;border-radius:999px;font-weight:700;letter-spacing:0.16em;">{pillar_label}</span>
          </p>
          <h1 style="font-family:'Anton','Bebas Neue',Impact,sans-serif;font-weight:400;font-size:48px;line-height:0.95;text-transform:uppercase;letter-spacing:-0.005em;margin:16px 0 24px;color:#0A0A0A;">{title}</h1>
        </td></tr>
        <tr><td style="padding:0 32px 16px;">
          {video_block}
          {body}
        </td></tr>
        <tr><td style="padding:8px 32px 32px;">
          <p style="margin:24px 0;">
            <a href="{canonical}" style="display:inline-block;padding:14px 22px;background:#0A0A0A;color:#FFCE00;text-decoration:none;font-family:Inter,sans-serif;font-weight:800;font-size:13px;letter-spacing:0.16em;text-transform:uppercase;">Read the full entry →</a>
          </p>
          <p style="margin:24px 0 0;font-family:'Caveat',cursive;font-size:24px;color:#0A0A0A;">— Andy</p>
        </td></tr>
        <tr><td style="padding:24px 32px;background:#0A0A0A;color:#8B8780;font-size:12px;font-family:Inter,sans-serif;">
          <p style="margin:0;">AWJ — Andy Whyte Journal · One entry. Every Friday. No noise.</p>
          <p style="margin:8px 0 0;"><a href="{SITE_URL}" style="color:#FFCE00;text-decoration:none;">andywhyte.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>"""


def main():
    if len(sys.argv) < 2:
        print("usage: publish-to-beehiiv.py <entry.md>", file=sys.stderr)
        sys.exit(2)

    file_path = Path(sys.argv[1])
    text = file_path.read_text(encoding="utf-8")
    fm, body_md = parse_frontmatter(text)

    if fm.get("draft"):
        print(f"[skip] {file_path.name} is marked draft: true")
        return

    api_key = os.environ.get("BEEHIIV_API_KEY", "")
    pub_id = os.environ.get("BEEHIIV_PUBLICATION_ID", "")
    status = os.environ.get("BEEHIIV_POST_STATUS", "draft")  # default safe
    if not api_key or not pub_id:
        print("ERROR: BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID missing", file=sys.stderr)
        sys.exit(1)

    title = str(fm.get("title", file_path.stem)).strip()
    awj_n = fm.get("awj_number", 0)
    subtitle = f"AWJ #{awj_n} — read the full entry on andywhyte.com" if awj_n else ""
    pillar = str(fm.get("pillar", "sales")).lower()
    html_body = build_email_html(fm, body_md)

    payload = {
        "title": f"AWJ #{awj_n}: {title}" if awj_n else title,
        "subtitle": subtitle,
        "body_content": html_body,
        "status": status,                      # "draft" | "confirmed"
        "platform": "both",                    # email + web
        "content_tags": [pillar, "awj"],
        "email_settings": {
            "email_subject_line": f"AWJ #{awj_n}: {title}" if awj_n else title,
            "email_preview_text": (body_md.strip().split("\n", 1)[0] or title)[:140],
        },
    }

    url = f"https://api.beehiiv.com/v2/publications/{pub_id}/posts"
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": "AWJ-GitHubAction/1.0",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            print(f"[ok] {file_path.name} → {r.status}")
            print(r.read().decode("utf-8")[:500])
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"[fail] {file_path.name} → HTTP {e.code}\n{body}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
