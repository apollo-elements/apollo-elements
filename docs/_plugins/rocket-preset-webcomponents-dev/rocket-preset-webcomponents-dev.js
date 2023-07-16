import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { markdownDirectives, markdownShortcodePlugin } from 'rocket-preset-markdown-directives';

import { bundle } from './lib/bundle.js';

import { wcdShortcodePlugin } from './eleventy/wcdShortcode.js';

const path = resolve(dirname(fileURLToPath(import.meta.url)));

export function webcomponentsDev() {
  return {
    path,

    async before11ty() { await bundle({ path }); },

    setupEleventyPlugins: [

      addPlugin(markdownShortcodePlugin),

      addPlugin(wcdShortcodePlugin, undefined, {
        location: markdownShortcodePlugin,
        how: 'after',
      }),

      // addPlugin(addWebComponentDefinitions, {
      //   quiet: true,
      //   singleScript: true,
      // }, {
      //   location: 'bottom',
      // }),
      //
      // adjustPluginOptions(addWebComponentDefinitions, options => ({
      //   ...options ?? {},
      //   specifiers: {
      //     ...options?.specifiers,
      //     'wcd-snippet': '/assets/_static/webcomponents-dev/wcd-snippet.js',
      //   },
      // })),

    ],

    setupUnifiedPlugins: [
      addPlugin(markdownDirectives, undefined, { location: 'top' }),
      adjustPluginOptions(markdownDirectives, {
        'wcd': ([id, file]) => ({ tagName: 'wcd-snippet', attributes: { 'data-id': id, file } }),
      }),
    ],

  };
}
