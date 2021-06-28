import { asyncFunctionPlugin } from './async-method.js';
import { rewriteTsExtensionsPlugin } from './rewrite-ts-ext.js';
import { typeTablesPlugin } from './type-tables.js';
import { readonlyPlugin } from './readonly.js';
import { exampleTagPlugin } from './example-tag.js';
import { copyPlugin } from './copy.js';
import { primitiveTypePlugin } from './primitive-type.js';

export {
  asyncFunctionPlugin,
  rewriteTsExtensionsPlugin,
  typeTablesPlugin,
  readonlyPlugin,
  exampleTagPlugin,
  copyPlugin,
};

export const plugins = [
  asyncFunctionPlugin(),
  rewriteTsExtensionsPlugin(),
  typeTablesPlugin(),
  readonlyPlugin(),
  exampleTagPlugin(),
  primitiveTypePlugin(),
];
