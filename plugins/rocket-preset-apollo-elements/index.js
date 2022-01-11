import chalk from 'chalk';
import helmet from 'eleventy-plugin-helmet';
import hirestime from 'hirestime';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';
import { rollupPluginHTML } from '@web/rollup-plugin-html';

import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import { markdownDirectives } from 'rocket-preset-markdown-directives';
import { writeFile, readFile, mkdir } from 'fs/promises';

import { bundle } from './lib/bundle.js';
import { getWebmentionsForUrl } from './webmentions.js';
import { githubTag } from './liquid/github.js';
import { icon } from './lib/icon.js';
import { linkTag } from './liquid/link.js';

const processor = postcss([
  postcssPresetEnv({ features: { 'nesting-rules': true } }),
]);

const path = resolve(dirname(fileURLToPath(import.meta.url)));

export function apolloElements({ transformCSS = '' } = {}) {
  return {
    path,
    async before11ty() {
      await bundle();
    },
    setupEleventyPlugins: [
      addPlugin({
        // @ts-expect-error: setupEleventyPlugins does not conform to the type for addPlugin
        configFunction(eleventyConfig) {
          eleventyConfig.addWatchTarget('packages/components/*.ts');
          eleventyConfig.setTemplateFormats(['md', 'njk']);

          eleventyConfig.addPlugin(helmet);

          /* start blog */
          eleventyConfig.addFilter('getWebmentionsForUrl', getWebmentionsForUrl);
          eleventyConfig.addFilter('icon', icon(eleventyConfig));
          eleventyConfig.addFilter('uniUrlFilter', x => encodeURI(x));
          eleventyConfig.addLiquidTag('github', githubTag);
          eleventyConfig.addLiquidTag('dev', linkTag);
          /* end blog */

          eleventyConfig.on('afterBuild', async () => {
            if (!transformCSS) return;
            const cwd = new URL('../../docs/', import.meta.url).pathname;
            const paths = await globby(transformCSS, { cwd });
            // @ts-expect-error: https://github.com/seriousManual/hirestime/pull/39
            const end = hirestime.default();
            // eslint-disable-next-line easy-loops/easy-loops
            for (const path of paths) {
              try {
                const to = new URL(join('../../_site-dev', path), import.meta.url).pathname;
                const from = new URL(join('../../docs', path), import.meta.url).pathname;
                const src = await readFile(from, 'utf-8');
                const { css: out } = await processor.process(src, { to, from });
                await mkdir(dirname(to), { recursive: true });
                await writeFile(to, out, 'utf-8');
              } catch (error) {
                console.error(error);
              }
            }
            console.log(chalk.yellow`[apollo-elements]`, 'PostCSS took', end.ms(), 'ms');
          });
        },
      }, {
        location: 'bottom',
      }),

    ],

    setupBuildPlugins: [
      adjustPluginOptions(rollupPluginHTML, ({ exclude, ...options }) => ({ ...options, exclude: [
        ...Array.isArray(exclude) ? exclude : [exclude].filter(Boolean),
        '**/{_assets,_merged_assets}/**/*.{html,js}',
        '**/_static/apollo-elements/**/*',
        '**/_static/apollo-elements/*',
      ] })),
    ],

    setupUnifiedPlugins: [
      addPlugin(markdownDirectives, undefined, { location: 'top' }),
      adjustPluginOptions(markdownDirectives, x => ({ ...x,
        'reveal': () => ({ tagName: 'div', attributes: { reveal: 'true' } }),
        'center': () => ({ tagName: 'div', attributes: { center: 'true' } }),
      })),
    ],

  };
}
