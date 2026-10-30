/**
 * Controle na de build: elk inline <script> in dist/ moet met zijn sha256-hash in de
 * Content-Security-Policy van vercel.json staan. Anders zou de browser het script op
 * productie blokkeren. Faalt de build met een duidelijke melding als dat niet zo is.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const vercel = JSON.parse(await readFile('vercel.json', 'utf8'));
const csp = vercel.headers
  .flatMap((h) => h.headers)
  .find((h) => h.key === 'Content-Security-Policy')?.value ?? '';

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

const missing = new Map();
for await (const file of htmlFiles('dist')) {
  const html = await readFile(file, 'utf8');
  for (const [, attrs, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc=/.test(attrs) || /application\/ld\+json/.test(attrs)) continue;
    const hash = `'sha256-${createHash('sha256').update(body).digest('base64')}'`;
    if (!csp.includes(hash)) missing.set(hash, file);
  }
}

if (missing.size) {
  console.error('CSP-controle mislukt — voeg deze hashes toe aan script-src in vercel.json:');
  for (const [hash, file] of missing) console.error(`  ${hash}  (o.a. ${file})`);
  process.exit(1);
}
console.log('CSP-controle: alle inline scripts staan in de Content-Security-Policy.');
