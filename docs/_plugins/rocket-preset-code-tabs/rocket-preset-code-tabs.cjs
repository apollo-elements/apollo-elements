// import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';

// import { fileURLToPath } from 'url';
// import { dirname, resolve } from 'path';
// import { addPlugin, adjustPluginOptions } from 'plugins-manager';
// import { markdownDirectives } from 'rocket-preset-markdown-directives';
// import { createTab } from './lib/createTab.js';
// import { bundle } from './lib/bundle.js';

/** @type{(str: string) => string} */
const dash = str => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

// const path = resolve(dirname(fileURLToPath(import.meta.url)));

/** @typedef {import('./components/code-tabs').Tab} Tab */
/** @typedef {Record<string, Omit<Tab, 'id'>>} Collection */

/**
 * @typedef {object} CodeTabsOptions
 * @property {Record<string, Collection>} [collections]
 */

/**
 * Set up code tabs rocket preset
 * @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig
 * @param {CodeTabsOptions} [options] - tab collections
 */
module.exports = function (eleventyConfig, options) {
  const collectionMap = new Map(Object.entries(options?.collections ?? {}).map(([k, v]) => [
    dash(k),
    new Map(Object.entries(v).map(([k, v]) => [k, { id: k, ...v }])),
  ]));

  eleventyConfig.on('eleventy.before', async function() {
    const { bundle } = await import('./lib/bundle.js');
    await bundle({ path: __dirname });
  })

  // return {
  //
  //   setupUnifiedPlugins: [
  //     addPlugin(markdownDirectives, undefined /* options */, {
  //       location: 'top',
  //     }),
  //     adjustPluginOptions(markdownDirectives, x => ({ ...x,
  //         copy: () => ({ tagName: 'code-copy' }),
  //         tab: ([tab], opts) => createTab(tab, collectionMap, opts),
  //       })
  //     ),
  //   ],
  //
  // };
}
