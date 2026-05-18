// One-time font conversion: Gilroy .otf -> .woff2 with Latin + Latin Extended-A subset.
//
// Run: node scripts/convert-gilroy.mjs
//
// Output: src/assets/fonts/Radomir-Tinkov---Gilroy-{Regular,Bold}.woff2
//
// Glyph coverage:
// - ASCII printable (U+0020-007E)
// - Latin-1 Supplement + Latin Extended-A (U+00A0-017F) — covers Polish ąćęłńóśźż and all common European diacritics
// - General punctuation U+2010-2030 — hyphens, dashes, smart quotes, ellipsis
// - Euro (U+20AC) and trademark (U+2122)

import subsetFont from 'subset-font';
import { readFile, writeFile } from 'node:fs/promises';

function range(start, end) {
  const chars = [];
  for (let cp = start; cp <= end; cp++) chars.push(String.fromCodePoint(cp));
  return chars.join('');
}

const includeChars =
  range(0x0020, 0x007E) +
  range(0x00A0, 0x017F) +
  range(0x2010, 0x2030) +
  '€' +
  '™';

const fonts = [
  'Radomir-Tinkov---Gilroy-Regular',
  'Radomir-Tinkov---Gilroy-Bold',
];

for (const name of fonts) {
  const inputPath = `src/assets/fonts/${name}.otf`;
  const outputPath = `src/assets/fonts/${name}.woff2`;
  const input = await readFile(inputPath);
  const output = await subsetFont(input, includeChars, { targetFormat: 'woff2' });
  await writeFile(outputPath, output);
  const pct = (100 * output.length / input.length).toFixed(0);
  console.log(`${name}.woff2 — ${input.length} -> ${output.length} bytes (${pct}% of original)`);
}
