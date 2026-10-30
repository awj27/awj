// Social preview images: one default, one per photographed Maxim. Run after adding a page.
import sharp from 'sharp';
import { readdirSync } from 'node:fs';

const PAPER = { r: 243, g: 241, b: 238 };
const pages = readdirSync('public/notebook/pages').filter((f) => /^awj-\d+\.webp$/.test(f));
for (const f of pages) {
  const num = f.match(/\d+/)[0];
  const img = sharp(`public/notebook/pages/${f}`).resize({ width: 1120, height: 560, fit: 'contain', background: PAPER });
  const page = await img.toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#FFFFFF' } })
    .composite([{ input: page, left: 40, top: 35 }])
    .jpeg({ quality: 86 })
    .toFile(`public/notebook/og/awj-${num}.jpg`);
}
// default: the open pad, cropped to the written page
const meta = await sharp('public/notebook/pad-open-01.webp').metadata();
const cropH = Math.round(meta.width / 1.9048);
await sharp('public/notebook/pad-open-01.webp')
  .extract({ left: 0, top: Math.min(meta.height - cropH, Math.round(meta.height * 0.5)), width: meta.width, height: cropH })
  .resize({ width: 1200, height: 630 })
  .jpeg({ quality: 86 })
  .toFile('public/notebook/og/default.jpg');
console.log(`wrote ${pages.length} page previews + default`);
