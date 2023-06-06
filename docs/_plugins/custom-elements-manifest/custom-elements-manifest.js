import footnotes from 'eleventy-plugin-footnotes';
import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { customElementsManifestPlugin } from './eleventy/custom-elements-manifest.js';
import { bundle } from './lib/bundle.js';
import { getCustomElementsManifests } from './lib/getCustomElementsManifests.js';
import { markdownShortcodePlugin } from 'rocket-preset-markdown-directives';

const path = resolve(dirname(fileURLToPath(import.meta.url)));

/**
 * @param {import('./lib/getCustomElementsManifests').Options & import('./eleventy/custom-elements-manifest').CEMOptions} options
 * @return {Partial<import('@rocket/cli/dist-types/types/preset').RocketPreset>}
 */
export function customElementsManifest(options) {
  const { typeLinks } = options ?? {};

  const getter = getCustomElementsManifests(options);
  return {
    path,

    async before11ty() { await bundle({ path }); },

    setupEleventyPlugins: [

      addPlugin(footnotes),

      addPlugin(markdownShortcodePlugin),

      addPlugin(customElementsManifestPlugin, {
        typeLinks,
        imports: { keepExtension: false },
      }),

      // addPlugin(addWebComponentDefinitions, {
      //   quiet: true,
      //   singleScript: true,
      // }, {
      //   location: 'bottom',
      // }),
      //
      // adjustPluginOptions(addWebComponentDefinitions, opts => ({
      //   ...opts ?? {},
      //   specifiers: {
      //     ...opts?.specifiers,
      //     'css-value-doc': '/_merged_assets/_static/custom-elements-manifest/css-value-doc.js',
      //     'type-doc': '/_merged_assets/_static/custom-elements-manifest/type-doc.js',
      //     'json-viewer': '/_merged_assets/_static/custom-elements-manifest/json-viewer.js',
      //   },
      // })),

    ],

    setupEleventyComputedConfig: [
      addPlugin(class CEM {
        static dataName = 'cem';

        async execute(data) {
          return getter(data)
        }
      }),
    ],

  };
}
