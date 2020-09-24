#!/usr/bin/env ts-node-script

import { readdir, readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { JSDOM } from 'jsdom';

import { out as DOCS_DIR } from '../typedoc.json';

const CLASSES_DIR = resolve(__dirname, '..', DOCS_DIR, 'classes');

const TEST = 'node_modules';

function isSectionFromANodeModule(x: HTMLElement): boolean {
  return x.textContent.includes(TEST);
}

async function stripMembersByTextContent(filename: string): Promise<void> {
  const path = resolve(CLASSES_DIR, filename);

  const dom = new JSDOM(await readFile(path, 'utf-8'));
  const { window: { document } } = dom;
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

  await writeFile(path, dom.serialize());

  console.log(`  ${filename} Done!`);
}

async function fixIndex() {
  const path = resolve(DOCS_DIR, 'index.html');
  const dom = new JSDOM(await readFile(path, 'utf-8'));
  dom.window.document.head.querySelector('title').innerText =
    'Apollo Elements';
  dom.window.document.head.querySelector<HTMLMetaElement>('meta[name="description"]').content =
    '🌑 Custom elements meet Apollo GraphQL 🌜';
  dom.window.document.head.innerHTML += `
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://apolloelements.dev">
    <meta property="og:title" content="Apollo Elements">
    <meta property="og:description" content="🌑 Custom elements meet Apollo GraphQL 🌜">
    <meta property="og:image" content="/logo.svg">
    <meta property="twitter:card" content="summary_large_image"/>
    <meta property="twitter:url" content="https://apolloelements.dev"/>
    <meta property="twitter:image" content="/logo.svg">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👩‍🚀</text></svg>">
  `;
  Array.from(dom.window.document.querySelectorAll('a')).filter(x => x.href.includes('./packages/'))
    .forEach(link => link.href = `${link.href.replace('./packages/', './modules/_apollo_elements_')}.html`);
  await writeFile(path, dom.serialize());
}

async function main() {
  console.log(`Fixing index.html in ${DOCS_DIR}...`);
  await fixIndex();
  console.log(`Fixing API Docs in ${DOCS_DIR}...`);

  const classes = await readdir(CLASSES_DIR);
  await Promise.all(classes.map(stripMembersByTextContent));

  console.log('Done!');
}

main();
