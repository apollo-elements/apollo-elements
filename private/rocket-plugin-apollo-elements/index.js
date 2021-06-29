import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';
import helmet from 'eleventy-plugin-helmet';

import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { buildComponents } from './build-components.js';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { getWebmentionsForUrl } from './webmentions.js';
import { githubTag } from './liquid/github.js';
import { icon } from './icon.js';
import { linkTag } from './liquid/link.js';
import { setupMarkdownDirectives } from 'rocket-plugin-markdown-directives';

export function apolloElements() {
  return {
    path: resolve(dirname(fileURLToPath(import.meta.url))),
    setupEleventyPlugins: [
      addPlugin({
        name: 'apollo-elements',
        plugin(eleventyConfig) {
          console.log(eleventyConfig.ignores);
          eleventyConfig.on('beforeBuild', buildComponents);
          eleventyConfig.addWatchTarget('packages/components/*.ts');
          eleventyConfig.addPassthroughCopy('**/_static/apollo-elements/**/*');
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
      addPlugin({ name: 'markdown-directives', plugin: setupMarkdownDirectives, location: 'top' }),
      adjustPluginOptions('markdown-directives', {
        'reveal': () => ({ tagName: 'div', attributes: { reveal: 'true' } }),
        'center': () => ({ tagName: 'div', attributes: { center: 'true' } }),
      }),
    ],

  };
}
