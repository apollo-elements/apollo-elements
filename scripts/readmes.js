/* eslint-env node */
import path from 'path';
import fs from 'fs';

import { customElementsManifestToMarkdown } from '@custom-elements-manifest/to-markdown';

const componentsDir =
  path.join(path.dirname(new URL(import.meta.url).pathname), '../packages/components/');

try {
  const header = fs.readFileSync(path.join(componentsDir, '/README.head.md'));
  const manifest = JSON.parse(fs.readFileSync(path.join(componentsDir, '/custom-elements.json')));
  const markdown = customElementsManifestToMarkdown(manifest);

  fs.writeFileSync(path.join(componentsDir, '/README.md'), `${header}\n\n${markdown}`);
} catch (e) {
  console.error(e);
  process.exit(1);
}
