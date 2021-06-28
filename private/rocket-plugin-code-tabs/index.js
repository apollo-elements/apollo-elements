import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';

import { setupMarkdownDirectives } from 'rocket-plugin-markdown-directives/setupMarkdownDirectives.js';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { codeTabsEleventyPlugin } from './eleventy/code-tabs.js';

export function createTab(tab, collections, { node, page, parent }) {
  let idx = parent.children.findIndex(x => x === node);
  while (parent.children[idx]?.type !== 'html')
    idx--;

  if (idx < 0 || !parent.children[idx])
    throw new Error(`Could not find parent element for ${tab}. Make sure all tab directives are wrapped in a <code-tabs> element`);

  const collectionName =
    parent.children[idx]
      .value
      .match(/collection="(\w|-)+"/)[0]
      ?.replace(/collection="(.*)"/, '$1');

  const collection = collections.get(collectionName);

  if (!collection)
    throw new Error(`Could not find tab collection ${collectionName}`);

  const tagName = 'code-tab';

  if (!collection)
    throw new Error(`Unknown collection for ${tab}`);

  try {
    const { id, label, iconHref } = collection.get(tab);
    return {
      tagName,
      attributes: {
        'data-id': id,
        'data-icon-href': iconHref,
        'data-label': label,
      },
    };
  } catch {
    throw new Error(`Could not get tab collection for ${tab}`);
  }
}

const dash = str => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

/**
 * @return {Partial<import('@rocket/cli/dist-types/types/main').RocketPreset>}
 */
export function codeTabs({ collections }) {
  const collectionMap = new Map(Object.entries(collections).map(([k, v]) => [
    dash(k),
    new Map(Object.entries(v).map(([k, v]) => [k, { id: k, ...v }])),
  ]));

  return {
    path: resolve(dirname(fileURLToPath(import.meta.url))),
    setupEleventyPlugins: [
      addPlugin({ name: 'code-tabs', plugin: codeTabsEleventyPlugin }),

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
        ...options,
        specifiers: {
          ...options.specifiers,
          'code-copy': '/_assets/_static/code-tabs/code-copy.js',
          'code-tabs': '/_assets/_static/code-tabs/code-tabs.js',
        },
      })),

    ],

    setupUnifiedPlugins: [
      addPlugin({
        name: 'markdown-directives',
        plugin: setupMarkdownDirectives,
        location: 'top',
      }),

      adjustPluginOptions('markdown-directives', {
        'copy': () => ({ tagName: 'code-copy' }),
        'tab': ([tab], opts) => createTab(tab, collectionMap, opts),
      }),
    ],

  };
}
