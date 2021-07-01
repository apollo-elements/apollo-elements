import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { markdownDirectives } from './lib/markdownDirectives.js';
import { addPlugin, adjustPluginOptions } from 'plugins-manager';

export function mdDirectives({ directives }) {
  return {
    path: resolve(dirname(fileURLToPath(import.meta.url))),
    setupUnifiedPlugins: [
      addPlugin({ name: 'markdown-directives', plugin: markdownDirectives, location: 'top' }),
      adjustPluginOptions('markdown-directives', directives),
    ],
  };
}

export { markdownDirectives };
