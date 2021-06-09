import fs from 'fs';
import { customElementsManifestToMarkdown } from '@custom-elements-manifest/to-markdown';

const header = fs.readFileSync('./packages/components/README.head.md');
const manifest = JSON.parse(fs.readFileSync('./packages/components/custom-elements.json'));
const markdown = customElementsManifestToMarkdown(manifest);

fs.writeFileSync('./packages/components/README.md', `${header}\n\n${markdown}`);
