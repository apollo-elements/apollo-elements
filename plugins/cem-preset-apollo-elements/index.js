import { fileURLToPath } from 'url';
import { asyncFunctionPlugin } from 'cem-plugin-async-function';
import { moduleFileExtensionsPlugin } from 'cem-plugin-module-file-extensions';
import { typeDescriptionsMarkdownPlugin } from 'cem-plugin-type-descriptions-markdown';
import { readonlyPlugin } from 'cem-plugin-readonly';
import { jsdocExamplePlugin } from 'cem-plugin-jsdoc-example';

/** Relative path to the markdown tables */
const typeTablesDir = fileURLToPath(new URL('../../docs/type-tables/', import.meta.url));

export const plugins = [
  asyncFunctionPlugin(),
  moduleFileExtensionsPlugin(),
  typeDescriptionsMarkdownPlugin({ typeTablesDir }),
  readonlyPlugin(),
  jsdocExamplePlugin(),
];
