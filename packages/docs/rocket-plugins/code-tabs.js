/* eslint-disable max-len */
const identify = x => [
  [x.id, x],
  ...!Array.isArray(x.synonyms) ? [] : x.synonyms.map(syn => [syn, x])
];

const PACKAGES = new Map([
  { id: 'html', label: 'HTML', iconHref: '/_merged_assets/library-logos/html5.svg', synonyms: ['lit-apollo'] },
  { id: 'lit', label: 'Lit', iconHref: '/_merged_assets/library-logos/lit.svg', synonyms: ['lit-apollo'] },
  { id: 'fast', label: 'FAST', iconHref: '/_merged_assets/library-logos/fast.svg' },
  { id: 'gluon', label: 'Gluon', iconHref: '/_merged_assets/library-logos/js.svg' },
  { id: 'haunted', label: 'Haunted', iconHref: '/_merged_assets/library-logos/haunted.svg' },
  { id: 'hybrids', label: 'Hybrids', iconHref: '/_merged_assets/library-logos/hybrids.svg' },
  { id: 'vanilla', label: 'Vanilla', iconHref: '/_merged_assets/library-logos/js.svg', synonyms: ['mixins'] },
  { id: 'polymer', label: 'Polymer', iconHref: '/_merged_assets/library-logos/polymer.svg' },
].flatMap(identify));

const PACKAGE_MANAGERS = new Map([
  { id: 'npm', label: 'NPM', iconHref: '/_merged_assets/pm-logos/npm.svg', synonyms: [] },
  { id: 'yarn', label: 'Yarn', iconHref: '/_merged_assets/pm-logos/yarn.svg' },
  { id: 'pnpm', label: 'PNPM', iconHref: '/_merged_assets/pm-logos/pnpm.svg' },
].flatMap(identify));

const FRAMEWORKS = new Map([
  { id: 'angular', label: 'Angular', iconHref: '/_merged_assets/framework-logos/angular.svg' },
  { id: 'preact', label: 'Preact', iconHref: '/_merged_assets/framework-logos/preact.svg' },
  { id: 'react', label: 'React', iconHref: '/_merged_assets/framework-logos/react.svg' },
  { id: 'svelte', label: 'Svelte', iconHref: '/_merged_assets/framework-logos/svelte.svg' },
  { id: 'vue', label: 'Vue', iconHref: '/_merged_assets/framework-logos/vue.svg' },
].flatMap(identify))
/* eslint-enable max-len */

const COLLECTIONS = [FRAMEWORKS, PACKAGE_MANAGERS, PACKAGES];

function getCollection(tab) {
  return COLLECTIONS.find(x => x.has(tab));
}

export function wrapTab(tab) {
  const tagName = 'code-tab';
  const collection = getCollection(tab)
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
