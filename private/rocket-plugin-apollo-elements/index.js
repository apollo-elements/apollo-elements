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
          eleventyConfig.on('beforeBuild', buildComponents);
          eleventyConfig.addWatchTarget('packages/components/*.ts');
          eleventyConfig.addPassthroughCopy('docs/_assets/_static/sandbox.js');
          eleventyConfig.addPassthroughCopy('docs/_assets/_static/apollo-elements/**/*');
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
        name: 'fix-noscript',
        location: 'bottom',
        plugin(eleventyConfig) {
          // In some cases, 11ty is encoding `<noscript><link>`, in the `<head>`,
          // even though that is legitimate HTML. This transform ensures the final
          // HTML has noscript styles.
          // NOTE: the double-encoding may be happening in node_modules/@rocket/cli/src/eleventy-plugins/processLocalReferences.cjs
          eleventyConfig.addTransform('fix-noscript-style', content =>
            content.replace(/<noscript>\s*&.*;link/g, '<noscript><link'));
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
          'codesandbox-button': '/_merged_assets/_static/sandbox.js',
          'inline-notification': '@rocket/launch/inline-notification/inline-notification.js',
        },
      })),

    ],

    setupBuildPlugins: [
      adjustPluginOptions('html', options => ({
        ...options,
        ignore: [
          ...Array.isArray(options.ignore) ? options.ignore : [options.ignore].filter(Boolean),
          '**/_assets/**/*.html',
          '**/_merged_assets/**/*.html',
        ],
      })),
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
