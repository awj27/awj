// Remove the handwritten "#N" under the AWJ signature: paint out only the ink components that sit
// wholly inside the given box (digits), leaving anything that crosses the box edge (the underline).
// Usage: node scripts/retouch-number.mjs NN left top right bottom [...]
import sharp from 'sharp';
const isInk = (r, g, b) => (b - r) > 24 && (r + g + b) / 3 < 200;
const args = process.argv.slice(2);
for (let a = 0; a + 4 < args.length; a += 5) {
  const [num, L, T, R, B] = args.slice(a, a + 5); const bl = +L, bt = +T, br = +R, bb = +B;
  const file = `public/notebook/pages/awj-${num}.webp`;
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, C = info.channels;
  const ink = (x, y) => { const i = (y * W + x) * C; return isInk(data[i], data[i + 1], data[i + 2]); };
  const seen = new Uint8Array(W * H); const removed = [];
  for (let y = bt; y <= bb; y++) for (let x = bl; x <= br; x++) {
    if (seen[y * W + x] || !ink(x, y)) continue;
    // flood fill the component (8-connected), bounded to a margin around the box
    const stack = [[x, y]]; const comp = []; let touches = false;
    seen[y * W + x] = 1;
    while (stack.length) {
      const [cx, cy] = stack.pop(); comp.push([cx, cy]);
      if (cx <= bl || cx >= br || cy <= bt || cy >= bb) touches = true;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = cx + dx, ny = cy + dy;
        if (nx < bl - 40 || nx > Math.min(W - 1, br + 40) || ny < bt - 40 || ny > Math.min(H - 1, bb + 40)) continue;
        if (seen[ny * W + nx] || !ink(nx, ny)) continue;
        seen[ny * W + nx] = 1; stack.push([nx, ny]);
      }
    }
    if (touches || comp.length < 12) continue;
    removed.push(comp);
  }
  let painted = 0;
  for (const comp of removed) {
    // local paper colour from a ring around the component's box
    let x0 = W, y0 = H, x1 = 0, y1 = 0; for (const [x, y] of comp) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    let r = 0, g = 0, b = 0, n = 0;
    for (let y = Math.max(0, y0 - 18); y <= Math.min(H - 1, y1 + 18); y++) for (let x = Math.max(0, x0 - 18); x <= Math.min(W - 1, x1 + 18); x++) { if (ink(x, y)) continue; const i = (y * W + x) * C; r += data[i]; g += data[i + 1]; b += data[i + 2]; n++; }
    r /= n; g /= n; b /= n;
    // paint the stroke pixels plus a 3px halo (anti-aliased fringe)
    const mask = new Set(comp.map(([x, y]) => y * W + x));
    for (const [x, y] of comp) for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const nx = x + dx, ny = y + dy; if (nx >= 0 && nx < W && ny >= 0 && ny < H) mask.add(ny * W + nx); }
    for (const k of mask) { const i = k * C; const noise = (Math.random() - 0.5) * 4; data[i] = Math.round(r + noise); data[i + 1] = Math.round(g + noise); data[i + 2] = Math.round(b + noise); painted++; }
  }
  const out = await sharp(data, { raw: { width: W, height: H, channels: C } }).webp({ quality: 86 }).toBuffer();
  await sharp(out).toFile(file);
  console.log(`awj-${num}: removed ${removed.length} components, ${painted} px painted`);
}
