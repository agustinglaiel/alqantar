// Genera variantes redimensionadas + un placeholder LQIP para cada .webp de public/images.
// Salida: public/images/opt/<ruta>-<ancho>.webp  y  src/utils/imageManifest.js
// Es incremental: sólo reprocesa cuando la fuente es más nueva que la salida.

import { readdir, stat, mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC_DIR = path.join(ROOT, 'public/images');
const OUT_DIR = path.join(SRC_DIR, 'opt');
const MANIFEST = path.join(ROOT, 'src/utils/imageManifest.js');

const WIDTHS = [200, 400, 800, 1200, 1800, 2400];
const QUALITY = 75;
const BLUR_WIDTH = 16;
const CONCURRENCY = 4;

async function collect(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full === OUT_DIR) continue;
      out.push(...(await collect(full)));
    } else if (entry.name.toLowerCase().endsWith('.webp')) {
      out.push(full);
    }
  }
  return out;
}

async function isStale(source, target) {
  if (!existsSync(target)) return true;
  const [s, t] = await Promise.all([stat(source), stat(target)]);
  return s.mtimeMs > t.mtimeMs;
}

async function process(source) {
  const rel = path.relative(SRC_DIR, source).replace(/\.webp$/i, '');
  const key = `/images/${rel.split(path.sep).join('/')}.webp`;
  const buf = await readFile(source);
  const { width, height } = await sharp(buf).metadata();

  // Nunca escalamos hacia arriba: descartamos los anchos mayores al original.
  const variants = WIDTHS.filter((w) => w < width);
  if (variants.length === 0 || variants.at(-1) !== Math.min(width, WIDTHS.at(-1))) {
    variants.push(width);
  }

  await mkdir(path.join(OUT_DIR, path.dirname(rel)), { recursive: true });

  let written = 0;
  let bytes = 0;
  for (const w of variants) {
    const target = path.join(OUT_DIR, `${rel}-${w}.webp`);
    if (await isStale(source, target)) {
      await sharp(buf)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(target);
      written++;
    }
    bytes += (await stat(target)).size;
  }

  const blur = await sharp(buf)
    .resize({ width: BLUR_WIDTH })
    .webp({ quality: 35, alphaQuality: 50 })
    .toBuffer();

  return {
    key,
    entry: { w: width, h: height, v: variants, b: `data:image/webp;base64,${blur.toString('base64')}` },
    original: buf.length,
    bytes,
    written,
  };
}

async function pool(items, limit, fn) {
  const results = [];
  let cursor = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (cursor < items.length) {
        results.push(await fn(items[cursor++]));
      }
    })
  );
  return results;
}

const sources = (await collect(SRC_DIR)).sort();
const results = await pool(sources, CONCURRENCY, process);

const manifest = Object.fromEntries(
  results.sort((a, b) => a.key.localeCompare(b.key)).map((r) => [r.key, r.entry])
);

await writeFile(
  MANIFEST,
  `// GENERADO por scripts/optimize-images.mjs — no editar a mano.\n` +
    `// w/h = dimensiones del original, v = anchos disponibles en /images/opt, b = placeholder LQIP.\n` +
    `export default ${JSON.stringify(manifest, null, 0)};\n`
);

const mb = (n) => `${(n / 1e6).toFixed(1)} MB`;
const originals = results.reduce((a, r) => a + r.original, 0);
const generated = results.reduce((a, r) => a + r.bytes, 0);
const written = results.reduce((a, r) => a + r.written, 0);
const manifestSize = (await stat(MANIFEST)).size;

console.log(
  `${results.length} imágenes · ${written} variantes generadas\n` +
    `originales ${mb(originals)} → variantes ${mb(generated)}\n` +
    `manifest ${(manifestSize / 1024).toFixed(0)} KB`
);
