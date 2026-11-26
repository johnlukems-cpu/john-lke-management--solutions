/**
 * Na de build: samengestelde woorden met een koppelteken (btw-aangifte, mkb-bedrijven,
 * Yuki-omgeving, John-Luke …) worden in zichtbare tekst omsloten door <span class="nobr">.
 * Zo breekt de browser zo'n woord nooit op het koppelteken af ("mkb-" / "bedrijven").
 *
 * Alleen tekst tussen tags wordt aangepast: attributen, <title>, <script>, <style>,
 * <textarea> en <option> blijven ongemoeid (dus ook JSON-LD en de CSP-hashes).
 * Het bijbehorende CSS (.nobr { white-space: nowrap }) staat in src/styles/global.css.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const SKIP = new Set(['title', 'script', 'style', 'textarea', 'option', 'noscript']);
// Woord, koppelteken, woord (eventueel herhaald), met leestekens erachter
const COMPOUND = /(?<![\p{L}\p{N}-])(\(?[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)+[.,:;!?)]*)/gu;

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

function transform(html) {
  const parts = html.split(/(<[^>]+>)/);
  const stack = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith('<')) {
      const m = part.match(/^<\s*(\/)?\s*([a-zA-Z0-9-]+)/);
      if (m) {
        const name = m[2].toLowerCase();
        if (SKIP.has(name)) {
          if (m[1]) stack.pop();
          else if (!part.endsWith('/>')) stack.push(name);
        }
      }
      continue;
    }
    if (stack.length || !part.includes('-')) continue;
    parts[i] = part.replace(COMPOUND, '<span class="nobr">$1</span>');
  }
  return parts.join('');
}

let count = 0;
for await (const file of htmlFiles('dist')) {
  const html = await readFile(file, 'utf8');
  const out = transform(html);
  if (out !== html) {
    await writeFile(file, out);
    count++;
  }
}
console.log(`Koppeltekens beschermd tegen afbreken in ${count} pagina's.`);
