// Second pass after retouch-number: inside a box that lies wholly on the paper, flatten faint blue
// fringe left by anti-aliased digit strokes to the local paper colour. Strong ink (the underline) stays.
import sharp from 'sharp';
const strongInk = (r, g, b) => (b - r) > 24 && (r + g + b) / 3 < 200;
const args = process.argv.slice(2);
for (let a = 0; a + 4 < args.length; a += 5) {
  const [num, L, T, R, B] = args.slice(a, a + 5); const bl = +L, bt = +T, br = +R, bb = +B;
  const file = `public/notebook/pages/awj-${num}.webp`;
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const W = info.width, C = info.channels;
  let fixed = 0;
  for (let y = bt; y <= bb; y++) for (let x = bl; x <= br; x++) {
    const i = (y * W + x) * C; const R = data[i], G = data[i + 1], Bc = data[i + 2];
    if (strongInk(R, G, Bc) || (Bc - R) <= 5) continue;
    // local paper: mean of neutral pixels in a 15px ring
    let r = 0, g = 0, b = 0, n = 0;
    for (let yy = Math.max(0, y - 15); yy <= Math.min(info.height - 1, y + 15); yy += 3) for (let xx = Math.max(0, x - 15); xx <= Math.min(W - 1, x + 15); xx += 3) { const j = (yy * W + xx) * C; if ((data[j + 2] - data[j]) <= 5 && !strongInk(data[j], data[j + 1], data[j + 2])) { r += data[j]; g += data[j + 1]; b += data[j + 2]; n++; } }
    if (!n) continue;
    const noise = (Math.random() - 0.5) * 3;
    data[i] = Math.round(r / n + noise); data[i + 1] = Math.round(g / n + noise); data[i + 2] = Math.round(b / n + noise); fixed++;
  }
  const out = await sharp(data, { raw: { width: W, height: info.height, channels: C } }).webp({ quality: 86 }).toBuffer();
  await sharp(out).toFile(file);
  console.log(`awj-${num}: flattened ${fixed} fringe px`);
}
