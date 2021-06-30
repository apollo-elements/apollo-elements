import hirestime from 'hirestime';
import esbuild from 'esbuild';
import chalk from 'chalk';

import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { slideDecksPlugin } from './eleventy/slide-decks.js';

const path = resolve(dirname(fileURLToPath(import.meta.url)));

/**
 * @return {Partial<import('@rocket/cli/dist-types/types/main').RocketPreset>}
 */
export function slideDecks() {
  return {
    path,

    async before11ty() {
      console.log(chalk.yellow`[slide-decks] ${chalk.blue`Building ${chalk.bold`<slidem-deck>`} and ${chalk.bold`<slidem-slide>`}...`}`);
      const time = hirestime.default();
      await esbuild.build({
        bundle: true,
        minify: process.env.CI === 'true',
        sourcemap: true,
        format: 'esm',
        target: 'es2020',
        outdir: 'docs/_merged_assets/_static/slide-decks',
        entryPoints: {
          'slidem': join(path, 'entrypoints', 'slidem.js'),
        },
      }).catch(() => process.exit(1));

      console.log(chalk.yellow`[slide-decks] ${chalk.green`Done in ${time.seconds()}s`}`);
    },

    setupEleventyPlugins: [
      addPlugin({
        name: 'slide-decks',
        plugin: slideDecksPlugin,
      }),
    ],

    setupBuildPlugins: [
      adjustPluginOptions('html', ({ exclude, ...options }) => ({ ...options, exclude: [
        ...Array.isArray(exclude) ? exclude : [exclude].filter(Boolean),
        '**/slide-decks/**/*',
        '**/slide-decks/*',
      ] })),
    ],

  };
}
