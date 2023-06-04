
/** @typedef {import('rocket-preset-markdown-directives').Config} Config*/
/** @typedef {import('../components/code-tabs').Tab} Tab*/

/**
 * @typedef {object} CodeTabAttrsMap
 * @property {string} data-id
 * @property {string} data-label
 * @property {string} [data-icon-href]
 */

/**
 * @typedef {object} CodeTabTransformerResult
 * @property {'code-tab'} tagName
 * @property {CodeTabAttrsMap} attributes
 */

/**
 * Makes a Tab element
 * @param  {string} tab Tab ID. For ad-hoc collections, this is also the label.
 * @param  {Map<string, Map<string, Tab>>} collections
 * @param {import('rocket-preset-markdown-directives').TransformerOptions} transformerOptions
 * @return {CodeTabTransformerResult}
 */
export function createTab(tab, collections, { node, parent }) {
  let idx = parent.children.findIndex(x => x === node);
  while (parent.children[idx]?.type !== 'html')
    idx--;

  const child = parent.children[idx];

  if (idx < 0 || !child)
    throw new Error(`Could not find parent element for ${tab}. Make sure all tab directives are wrapped in a <code-tabs> element`);

  /** @type{'code-tab'} */
  const tagName = 'code-tab';

  try {
    if (typeof child.value !== 'string')
      throw new Error('Not a node with value');

    const collectionName =
      child
        .value
        .match(/collection="(\w|-)+"/)
        ?.[0]
        ?.replace(/collection="(.*)"/, '$1');

    const collection = collections.get(collectionName);

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
    return {
      tagName,
      attributes: {
        'data-id': tab,
        'data-label': tab,
      },
    };
  }
}
