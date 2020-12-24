import { XTabs, XTab, Tab } from './x-tabs';
import { customElement, html, PropertyValues } from 'lit-element';

import './code-copy';

const PACKAGES = new Map<string, Tab>(Object.entries<Tab>({
  lit:      { id: 'lit', label:'LitElement', iconHref: new URL('./library-logos/lit.svg', import.meta.url).href, synonyms: ['lit-apollo'] },
  fast:     { id: 'fast', label:'FAST',       iconHref: new URL('./library-logos/fast.svg', import.meta.url).href },
  gluon:    { id: 'gluon', label:'Gluon',      iconHref: new URL('./library-logos/html5.svg', import.meta.url).href },
  haunted:  { id: 'haunted', label:'Haunted',    iconHref: new URL('./library-logos/haunted.svg', import.meta.url).href },
  hybrids:  { id: 'hybrids', label:'Hybrids',    iconHref: new URL('./library-logos/hybrids.svg', import.meta.url).href },
  vanilla:  { id: 'vanilla', label:'Vanilla',    iconHref: new URL('./library-logos/html5.svg', import.meta.url).href, synonyms: ['mixins', 'html'] },
  polymer:  { id: 'polymer', label:'Polymer',    iconHref: new URL('./library-logos/polymer.svg', import.meta.url).href },
}));

PACKAGES.set('lit-apollo', PACKAGES.get('lit'))
PACKAGES.set('mixins', PACKAGES.get('vanilla'))
PACKAGES.set('html', PACKAGES.get('vanilla'))

const PACKAGE_MANAGERS = new Map<string, Tab>(Object.entries<Tab>({
  npm:  { id: 'npm', label:'NPM',    iconHref: new URL('./pm-logos/npm.svg', import.meta.url).href, synonyms: ['NPM'] },
  yarn: { id: 'yarn', label:'Yarn',   iconHref: new URL('./pm-logos/yarn.svg', import.meta.url).href },
  pnpm: { id: 'pnpm', label:'PNPM',   iconHref: new URL('./pm-logos/pnpm.svg', import.meta.url).href },
}));

const COLLECTIONS = new Map<string, Map<string, Tab>>(Object.entries({
  libraries: PACKAGES,
  'package-managers': PACKAGE_MANAGERS,
}));

// TODO: XTabs should have enough to make this unneeded, i.e define XTabs as <code-tabs collection="libraries">, with a 'copy' attr
@customElement('code-tabs')
export class CodeTabs extends XTabs {
  static readonly allowedChildren = ['code-tab'];

  connectedCallback() {
    this.defaultTab =
        this.collection === 'libraries' ? 'lit'
      : this.collection === 'package-managers' ? 'npm'
      : undefined;
    super.connectedCallback();
  }
}

@customElement('code-tab')
export class CodeTab extends XTab {

  render() {
    return html`
      <code-copy>
        <slot></slot>
      </code-copy>
    `;
  }

  updated(changed: PropertyValues<this>): void {
    const { tab } = this;
    const { collection } = this.closest<CodeTabs>('code-tabs');
    if (!collection || !tab) return;
    const col = COLLECTIONS.get(collection);
    if (!col) return;
    const { label, iconHref, synonyms } = col.get(this.tab);
    this.setAttribute('data-id', this.tab);
    this.setAttribute('data-label', label);
    this.setAttribute('data-icon-href', iconHref);
    if (synonyms)
      this.setAttribute('data-synonyms', synonyms.join(''));
  }
}
