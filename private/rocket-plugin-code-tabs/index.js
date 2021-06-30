import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';
import chalk from 'chalk';
import esbuild from 'esbuild';
import hirestime from 'hirestime';

import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { litCssPlugin } from 'esbuild-plugin-lit-css';
import { markdownDirectives } from 'rocket-plugin-markdown-directives';
import { codeTabsEleventyPlugin } from './eleventy/code-tabs.js';
import { createTab } from './lib/createTab.js';

const dash = str => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

const path = resolve(dirname(fileURLToPath(import.meta.url)));

/**
 * @return {Partial<import('@rocket/cli/dist-types/types/main').RocketPreset>}
 */
export function codeTabs({ collections }) {
  const collectionMap = new Map(Object.entries(collections).map(([k, v]) => [
    dash(k),
    new Map(Object.entries(v).map(([k, v]) => [k, { id: k, ...v }])),
  ]));

  return {
    path,
    async before11ty() {
      console.log(chalk.yellow`[code-tabs] ${chalk.blue`Building ${chalk.bold`<code-tabs>`} and ${chalk.bold`<code-copy>`}...`}`);
      const time = hirestime.default();

      await esbuild.build({
        bundle: true,
        minify: process.env.CI === 'true',
        sourcemap: true,
        format: 'esm',
        target: 'es2020',
        outdir: 'docs/_merged_assets/_static/code-tabs',
        plugins: [litCssPlugin()],
        entryPoints: {
          'code-copy': join(path, 'components', 'code-copy.ts'),
          'code-tabs': join(path, 'components', 'code-tabs.ts'),
        },
      }).catch(() => {
        process.exit(1);
      });

      console.log(chalk.yellow`[code-tabs] ${chalk.green`Done in ${time.seconds()}s`}`);
    },
    setupEleventyPlugins: [
      addPlugin({ name: 'code-tabs', plugin: codeTabsEleventyPlugin }),

      addPlugin({
        name: 'auto-import-custom-elements',
        plugin: addWebComponentDefinitions,
        location: 'bottom',
        options: {
          quiet: true,
          singleScript: true,
        },
      }),

      adjustPluginOptions('auto-import-custom-elements', options => ({
        ...options,
        specifiers: {
          ...options.specifiers,
          'code-copy': '/_merged_assets/_static/code-tabs/code-copy.js',
          'code-tabs': '/_merged_assets/_static/code-tabs/code-tabs.js',
        },
      })),

    ],

    setupUnifiedPlugins: [
      addPlugin({
        name: 'markdown-directives',
        plugin: markdownDirectives,
        location: 'top',
      }),

      adjustPluginOptions('markdown-directives', {
        'copy': () => ({ tagName: 'code-copy' }),
        'tab': ([tab], opts) => createTab(tab, collectionMap, opts),
      }),
    ],

  };
}
