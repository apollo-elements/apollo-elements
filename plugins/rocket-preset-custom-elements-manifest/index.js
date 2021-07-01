import footnotes from 'eleventy-plugin-footnotes';
import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';
import esbuild from 'esbuild';
import hirestime from 'hirestime';
import chalk from 'chalk';

import { litCssPlugin } from 'esbuild-plugin-lit-css';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { customElementsManifest } from './eleventy/custom-elements-manifest.js';

const path = resolve(dirname(fileURLToPath(import.meta.url)));

/**
 * @return {Partial<import('@rocket/cli/dist-types/types/main').RocketPreset>}
 */
export function customElementsManifestAPIDocs({ typeLinks = undefined } = {}) {
  return {
    path,

    async before11ty() {
      console.log(chalk.yellow`[custom-elements-manifest] ${chalk.blue`Building ${chalk.bold`<type-doc>`} and ${chalk.bold`<json-viewer>`}...`}`);
      const time = hirestime.default();
      await esbuild.build({
        bundle: true,
        minify: process.env.CI === 'true',
        sourcemap: true,
        format: 'esm',
        target: 'es2020',
        outdir: 'docs/_merged_assets/_static/custom-elements-manifest',
        plugins: [litCssPlugin()],
        entryPoints: {
          'type-doc': join(path, 'components', 'type-doc', 'type-doc.ts'),
          'json-viewer': '@power-elements/json-viewer',
        },
      }).catch(() => process.exit(1));
      console.log(chalk.yellow`[custom-elements-manifest] ${chalk.green`Done in ${time.seconds()}s`}`);
    },

    setupEleventyPlugins: [

      addPlugin({ name: 'footnotes', plugin: footnotes }),

      addPlugin({
        name: 'custom-elements-manifest',
        plugin: customElementsManifest,
        options: {
          typeLinks,
          imports: { keepExtension: false },
        },
      }),

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
        ...options ?? {},
        specifiers: {
          ...options?.specifiers,
          'type-doc': '/_merged_assets/_static/custom-elements-manifest/type-doc.js',
          'json-viewer': '/_merged_assets/_static/custom-elements-manifest/json-viewer.js',
        },
      })),

    ],

    setupBuildPlugins: [
      adjustPluginOptions('html', ({ exclude, ...options }) => ({ ...options, exclude: [
        ...Array.isArray(exclude) ? exclude : [exclude].filter(Boolean),
        '**/playground-service-worker-proxy.html',
      ] })),
    ],

  };
}
