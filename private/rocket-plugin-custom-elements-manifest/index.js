import footnotes from 'eleventy-plugin-footnotes';
import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { customElementsManifest } from './eleventy/custom-elements-manifest.js';

/**
 * @return {Partial<import('@rocket/cli/dist-types/types/main').RocketPreset>}
 */
export function customElementsManifestAPIDocs({ typeLinks = undefined } = {}) {
  return {
    path: resolve(dirname(fileURLToPath(import.meta.url))),
    setupEleventyPlugins: [

      addPlugin({ name: 'footnotes', plugin: footnotes }),

      addPlugin({
        name: 'custom-elements-manifest',
        plugin: customElementsManifest,
        options: {
          imports: { keepExtension: false },
          types: typeLinks,
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
      adjustPluginOptions('html', options => ({
        ...options,
        ignore: [
          ...Array.isArray(options.ignore) ? options.ignore : [options.ignore].filter(Boolean),
          '**/playground-service-worker-proxy.html',
        ],
      })),
    ],

  };
}
