#!/usr/bin/env ts-node-script

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { JSDOM } from 'jsdom';

const DOCS_DIR = 'td';

const CLASSES_DIR = resolve(__dirname, '..', DOCS_DIR, 'classes');

const TEST = 'node_modules';

async function stripMembersByTextContent(filename: string): Promise<void> {
  const path = resolve(CLASSES_DIR, filename);
  const dom = new JSDOM(readFileSync(path, 'utf-8'));
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

  writeFileSync(path, dom.serialize());
}

const classes = readdirSync(CLASSES_DIR);

// eslint-disable-next-line no-loops/no-loops
for (const path of classes)
  stripMembersByTextContent(path);
