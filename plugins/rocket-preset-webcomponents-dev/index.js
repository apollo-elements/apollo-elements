import chalk from 'chalk';
import esbuild from 'esbuild';
import hirestime from 'hirestime';
import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';

import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { markdownDirectives } from 'rocket-preset-markdown-directives';

const path = resolve(dirname(fileURLToPath(import.meta.url)));

export function webcomponentsDev() {
  return {
    path,
    before11ty: async function buildComponents() {
      console.log(chalk.yellow`[webcomponents-dev] ${chalk.blue`Building ${chalk.bold`<wcd-snippet>`}...`}`);
      const time = hirestime.default();

      await esbuild.build({
        bundle: true,
        minify: process.env.CI === 'true',
        sourcemap: true,
        format: 'esm',
        target: 'es2020',
        outdir: 'docs/_merged_assets/_static/webcomponents-dev',
        entryPoints: {
          'wcd-snippet': join(path, 'components', 'wcd-snippet', 'wcd-snippet.ts'),
        },
      }).catch(() => process.exit(1));

      console.log(chalk.yellow`[webcomponents-dev] ${chalk.green`Done in ${time.seconds()}s`}`);
    },

    setupEleventyPlugins: [
      addPlugin({
        name: 'webcomponents-dev',
        plugin(eleventyConfig) {
          eleventyConfig.addPassthroughCopy('_merged_assets/_static/webcomponents-dev/**/*');
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
          'wcd-snippet': '/_merged_assets/_static/webcomponents-dev/wcd-snippet.js',
        },
      })),

    ],

    setupUnifiedPlugins: [
      addPlugin({ name: 'markdown-directives', plugin: markdownDirectives, location: 'top' }),
      adjustPluginOptions('markdown-directives', {
        'wcd': ([id, file]) => ({ tagName: 'wcd-snippet', attributes: { 'data-id': id, file } }),
      }),
    ],

  };
}
