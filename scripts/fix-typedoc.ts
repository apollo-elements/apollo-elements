#!/usr/bin/env ts-node-script

import { readdir, readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { JSDOM } from 'jsdom';

import { typedocOptions } from '../tsconfig.json';

const DOCS_DIR = typedocOptions.out;

const CLASSES_DIR = resolve(__dirname, '..', DOCS_DIR, 'classes');

const TEST = 'node_modules';

async function stripMembersByTextContent(filename: string): Promise<void> {
  const path = resolve(CLASSES_DIR, filename);

  const dom = new JSDOM(await readFile(path, 'utf-8'));
  const { window: { document } } = dom;
  const LINKS = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'));

  Array.from(document.querySelectorAll('section'))
    .filter(x => x.textContent.includes(TEST))
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

async function main() {
  console.log(`Fixing API Docs in ${DOCS_DIR}...`);

  const classes = await readdir(CLASSES_DIR);
  await Promise.all(classes.map(stripMembersByTextContent));

  console.log('Done!');
}

main();
