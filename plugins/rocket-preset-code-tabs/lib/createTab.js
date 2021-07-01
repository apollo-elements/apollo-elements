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
