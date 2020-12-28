const PACKAGES = new Map(Object.entries({
  lit: { id: 'lit', label: 'LitElement', iconHref: '/_merged_assets/library-logos/lit.svg', synonyms: ['lit-apollo'] },
  fast: { id: 'fast', label: 'FAST', iconHref: '/_merged_assets/library-logos/fast.svg' },
  gluon: { id: 'gluon', label: 'Gluon', iconHref: '/_merged_assets/library-logos/html5.svg' },
  haunted: { id: 'haunted', label: 'Haunted', iconHref: '/_merged_assets/library-logos/haunted.svg' },
  hybrids: { id: 'hybrids', label: 'Hybrids', iconHref: '/_merged_assets/library-logos/hybrids.svg' },
  vanilla: { id: 'vanilla', label: 'Vanilla', iconHref: '/_merged_assets/library-logos/html5.svg', synonyms: ['mixins', 'html'] },
  polymer: { id: 'polymer', label: 'Polymer', iconHref: '/_merged_assets/library-logos/polymer.svg' },
}));

PACKAGES.set('lit-apollo', PACKAGES.get('lit'));
PACKAGES.set('mixins', PACKAGES.get('vanilla'));
PACKAGES.set('html', PACKAGES.get('vanilla'));

const PACKAGE_MANAGERS = new Map(Object.entries({
  npm: { id: 'npm', label: 'NPM', iconHref: '/_merged_assets/pm-logos/npm.svg' },
  yarn: { id: 'yarn', label: 'Yarn', iconHref: '/_merged_assets/pm-logos/yarn.svg' },
  pnpm: { id: 'pnpm', label: 'PNPM', iconHref: '/_merged_assets/pm-logos/pnpm.svg' },
}));

function getCollection(tab) {
  if (PACKAGES.has(tab)) return PACKAGES;
  else if (PACKAGE_MANAGERS.has(tab)) return PACKAGE_MANAGERS;
  else return null;
}

export function wrapTab(tab) {
  const tagName = 'code-tab';
  const collection = getCollection(tab);
  if (!collection)
    throw new Error(`Unknown collection for ${tab}`);

  const { id, label, iconHref, synonyms = [] } = collection.get(tab);

  return {
    tagName,
    attributes: {
      'data-id': id,
      'data-icon-href': iconHref,
      'data-label': label,
      'data-synonyms': synonyms.join(''),
    },
  };
}
