import chalk from 'chalk';
import esbuild from 'esbuild';
import path from 'path';
import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';

import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { setupMarkdownDirectives } from 'rocket-plugin-markdown-directives';

const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

const NS_PER_SEC = 1e9;

export function webcomponentsDev() {
  return {
    path: resolve(dirname(fileURLToPath(import.meta.url))),
    before11ty: async function buildComponents() {
      console.log(chalk.yellow`[webcomponents-dev] ${chalk.blue`Building ${chalk.bold`<wcd-snippet>`}...`}`);
      const time = process.hrtime();

      await esbuild.build({
        bundle: true,
        minify: process.env.CI === 'true',
        sourcemap: true,
        format: 'esm',
        target: 'es2020',
        outdir: 'docs/_merged_assets/_static/webcomponents-dev',
        entryPoints: {
          'wcd-snippet': path.join(__dirname, 'components', 'wcd-snippet', 'wcd-snippet.ts'),
        },
      }).catch(() => {
        process.exit(1);
      });

      const [s, ns] = process.hrtime(time);
      const durationNs = s * NS_PER_SEC + ns;

      console.log(chalk.yellow`[webcomponents-dev] ${chalk.green`Done in ${durationNs / NS_PER_SEC}s`}`);
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
      addPlugin({ name: 'markdown-directives', plugin: setupMarkdownDirectives, location: 'top' }),
      adjustPluginOptions('markdown-directives', {
        'wcd': ([id, file]) => ({ tagName: 'wcd-snippet', attributes: { 'data-id': id, file } }),
      }),
    ],

  };
}
