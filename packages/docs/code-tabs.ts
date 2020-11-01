import { Item, SelectMixin } from '@pwrs/mixins/select';
import { LitElement, customElement, html, TemplateResult, property, queryAll } from 'lit-element';
import { ifDefined } from "lit-html/directives/if-defined";

import './code-copy';

import ButtonStyles from './button.css';
import TabsStyles from './tabs.css';
import TabStyles from './tab.css';

declare module '@pwrs/mixins/select' {
  export interface Item {
    library: keyof typeof PACKAGES;
  }
}

const INSTANCES = new Set<CodeTabs>();

const PACKAGES = {
  'lit-apollo': { label: 'LitElement', icon: '/images/lit.svg' },
  'fast': { label: 'FAST', icon: '/images/fast.svg' },
  'gluon': { label: 'Gluon', icon: '/images/gluon.svg' },
  'hybrids': { label: 'Hybrids', icon: '/images/hybrids.svg' },
  'mixins': { label: 'Vanilla', icon: '/images/js.svg' },
  'polymer': { label: 'Polymer', icon: '/images/polymer.svg' },
}

@customElement('code-tabs')
export class CodeTabs extends SelectMixin(LitElement) {
  static readonly allowedChildren = ['code-tab'];

  static readonly styles = [ButtonStyles, TabsStyles];

  @queryAll('button[role="tab"]') tabs: NodeListOf<HTMLButtonElement>;

  connectedCallback() {
    super.connectedCallback();
    INSTANCES.add(this);
    this.setAttribute('role', 'tablist');
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    INSTANCES.delete(this);
  }

  firstUpdated(changed) {
    super.firstUpdated(changed);
    const lib = localStorage.getItem('code-tabs-selected-lib');
    const index = !lib ? 0 : this.items.findIndex(x => x.library === lib);
    this.selectIndex(index);
    this.onSelect();
  }

  render(): TemplateResult {
    const items = this.items ?? [];
    return html`
      <div id="tabs" role="tablist">
        ${items.map(({ library }) => {
          const { icon, label } = PACKAGES[library];
          return html`
        <button role="tab"
            @click="${this.onClickTab}"
            data-library="${library}">
          <img src="${ifDefined(icon)}" alt=""/>
          ${label}
        </button>
        `})}
      </div>

      <div role="tabpanel">
        <slot></slot>
      </div>
    `;
  }

  onClickTab(event: Event & { target: HTMLButtonElement }) {
    const tabs = [...this.tabs]
    let tab = event.target;
    while (!tabs.includes(tab))
      tab = tab.parentElement as HTMLButtonElement;
    const index = [...this.tabs].indexOf(tab);
    this.selectIndex(index);
  }

  onSelect() {
    for (const tab of this.tabs)
      tab.removeAttribute('selected');
    const tab =
      this.tabs[this.selectedIndex as number];
    tab.setAttribute('selected', '');
    const { left } = tab.getBoundingClientRect();
    this.shadowRoot.getElementById('tabs')
      .scrollTo({ behavior: 'smooth', left });
    const item = this.selectedItem as Item;
    localStorage.setItem('code-tabs-selected-lib', item.library);
    INSTANCES.forEach(x => x.selectLib(item.library))
  }

  selectLib(library: string) {
    const index =
      this.items.findIndex(x => x.library === library)
    if (index >= 0 && this.selectedIndex !== index)
      this.selectIndex(index)
  }
}

@customElement('code-tab')
export class CodeTab extends LitElement {
  static readonly styles = [TabStyles];

  @property({ reflect: true }) library: keyof typeof PACKAGES;

  render() {
    return html`
      <code-copy>
        <slot></slot>
      </code-copy>
    `;
  }
}