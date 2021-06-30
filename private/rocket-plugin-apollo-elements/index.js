import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';
import chalk from 'chalk';
import execa from 'execa';
import helmet from 'eleventy-plugin-helmet';
import hirestime from 'hirestime';

import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { buildComponents } from './lib/build-components.js';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { getWebmentionsForUrl } from './webmentions.js';
import { githubTag } from './liquid/github.js';
import { icon } from './lib/icon.js';
import { linkTag } from './liquid/link.js';
import { markdownDirectives } from 'rocket-plugin-markdown-directives';

const path = resolve(dirname(fileURLToPath(import.meta.url)));

export function apolloElements() {
  return {
    path,
    async before11ty() {
      console.log(chalk.yellow`[apollo-elements] ${chalk.blue`Analyzing ${chalk.bold`Apollo Elements`} packages...`}`);
      const atime = hirestime.default();
      console.log(chalk.yellow`[apollo-elements] ${chalk.green`Done in ${atime.seconds()}s`}`);
      await execa('yarn', ['analyze']);

      console.log(chalk.yellow`[apollo-elements] ${chalk.blue`Building ${chalk.bold`Apollo Elements`} packages...`}`);
      const btime = hirestime.default();
      await buildComponents();
      console.log(chalk.yellow`[apollo-elements] ${chalk.green`Done in ${btime.seconds()}s`}`);
    },
    setupEleventyPlugins: [
      addPlugin({
        name: 'apollo-elements',
        plugin(eleventyConfig) {
          eleventyConfig.addWatchTarget('packages/components/*.ts');
          eleventyConfig.addPassthroughCopy('_merged_assets/_static/apollo-elements/**/*');
          eleventyConfig.setTemplateFormats(['md', 'njk']);

          eleventyConfig.addPlugin(helmet);

          /* start blog */
          eleventyConfig.addFilter('getWebmentionsForUrl', getWebmentionsForUrl);
          eleventyConfig.addFilter('icon', icon(eleventyConfig));
          eleventyConfig.addFilter('uniUrlFilter', x => encodeURI(x));
          eleventyConfig.addLiquidTag('github', githubTag);
          eleventyConfig.addLiquidTag('dev', linkTag);
          /* end blog */
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
          'inline-notification': '@rocket/launch/inline-notification/inline-notification.js',
          'codesandbox-button': '/_merged_assets/_static/apollo-elements/sandbox.js',
        },
      })),

    ],

    setupBuildPlugins: [
      adjustPluginOptions('html', ({ exclude, ...options }) => ({ ...options, exclude: [
        ...Array.isArray(exclude) ? exclude : [exclude].filter(Boolean),
        '**/{_assets,_merged_assets}/**/*.{html,js}',
        '**/_static/apollo-elements/**/*',
        '**/_static/apollo-elements/*',
      ] })),
    ],

    setupUnifiedPlugins: [
      addPlugin({ name: 'markdown-directives', plugin: markdownDirectives, location: 'top' }),
      adjustPluginOptions('markdown-directives', {
        'reveal': () => ({ tagName: 'div', attributes: { reveal: 'true' } }),
        'center': () => ({ tagName: 'div', attributes: { center: 'true' } }),
      }),
    ],

  };
}
