#!/usr/bin/env ts-node-script

import { readdir, readFile, writeFile, copyFile } from 'fs/promises';
import { resolve, join } from 'path';
import { JSDOM } from 'jsdom';
import * as globby from 'globby';

import { out as DOCS_DIR } from '../typedoc.json';

const CLASSES_DIR = resolve(__dirname, '..', DOCS_DIR, 'classes');

const TEST = 'node_modules';

function isSectionFromANodeModule(x: HTMLElement): boolean {
  return x.textContent.includes(TEST);
}

async function fixHTML(path: string) {
  console.log(`Fixing ${path.replace(process.cwd(), '')}`);

  const dom = new JSDOM(await readFile(path, 'utf-8'));

  const { window: { document } } = dom;

  document.head.querySelector<HTMLMetaElement>('meta[name="description"]').content =
    '🌑 Custom elements meet Apollo GraphQL 🌜';

  document.head.innerHTML += `
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://apolloelements.dev">
    <meta property="og:image" content="/logo.svg">
    <meta property="twitter:card" content="summary_large_image"/>
    <meta property="twitter:url" content="https://apolloelements.dev"/>
    <meta property="twitter:image" content="/logo.svg">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👩‍🚀</text></svg>">
    <link rel="stylesheet" href="/assets/css/theme.css">
  `;

  if (path === resolve(DOCS_DIR, 'index.html')) {
    // document.head.querySelector('title').innerText = 'Apollo Elements';
    Array.from(
      document.querySelectorAll('a'))
      .filter(x => x.href.includes('./packages/')
      ).forEach(link =>
        link.href = `${link.href.replace('./packages/', './modules/_apollo_elements_')}.html`);
  }

  if (path.includes(CLASSES_DIR)) {
    console.log('  Fixing API Docs...');

    const LINKS = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'));

    Array.from(document.querySelectorAll('section'))
      .filter(isSectionFromANodeModule)
      .map(x => x.querySelector('a').getAttribute('name'))
      .filter(Boolean)
      .forEach(name => {
        document.querySelector(`[name="${name}"]`)
        ?.closest('section')
        ?.remove();

        LINKS
          .filter(x => x.href.endsWith(`#${name}`))
          .forEach(x => x.closest('li')?.remove());
      });
  }

  await writeFile(path, dom.serialize());
}

async function main() {
  console.log('Copying CSS...');

  await copyFile(
    resolve(DOCS_DIR, '../pages/theme.css'),
    resolve(DOCS_DIR, 'assets', 'css', 'theme.css')
  );

  console.log(`Fixing HTML in ${DOCS_DIR}...`);

  const htmlFiles =
    await globby(['*/*.html', '**/*.html'], { cwd: DOCS_DIR, absolute: true });

  for (const file of htmlFiles)
    await fixHTML(file);

  console.log('Done!');
}

main();
