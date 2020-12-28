import { Item, SelectMixin } from '@pwrs/mixins/select/select-mixin';
import {
  LitElement,
  customElement,
  html,
  TemplateResult,
  PropertyValues,
  property,
  internalProperty,
  queryAll,
} from 'lit-element';

import { ifDefined } from "lit-html/directives/if-defined";

import ButtonStyles from './button.css';
import TabsStyles from './tabs.css';
import TabStyles from './tab.css';

declare module '@pwrs/mixins/select/select-mixin' {
  export interface Item {
    dataset: DOMStringMap & Tab;
  }
}

export interface Tab {
  id: string;
  label: string;
  iconHref?: string;
  iconTemplate?: string;
  synonyms?: string[];
}

const INSTANCES = new Set<CodeTabs>();

@customElement('code-tabs')
export class CodeTabs extends SelectMixin(LitElement) {
  static readonly allowedChildren = ['code-tab'];

  static readonly styles = [ButtonStyles, TabsStyles];

  @internalProperty() labels = new Map<string, Tab>();

  @queryAll('[role="tab"]') tabs: NodeListOf<HTMLButtonElement>;

  @property({ attribute: 'default-tab' }) defaultTab: string;

  @property() collection: string;

  constructor() {
    super();
    this.onClickTab = this.onClickTab.bind(this);
  }

  protected initialSelectedIndex = 0;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tablist');
    this.initialSelectedIndex = parseInt(this.getAttribute('selected-index'));
    if (this.collection)
      this.initCollection()
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    INSTANCES.delete(this);
  }

  async firstUpdated(changed: PropertyValues<this>): Promise<void> {
    this.initLabels();
    super.firstUpdated(changed);
    this.selectIndex(await this.getInitialSelectedIndex());
    this.onSelect();
  }

  updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    if (changed.has('collection'))
      this.initCollection();
  }

  protected async getInitialSelectedIndex() {
    await this.updateComplete;
    const stored = localStorage.getItem(`code-tabs-selected-${this.collection}`);
    const index =
        stored ? this.items.findIndex(x => x.dataset.id === stored)
      : this.defaultTab ? this.items.findIndex(x => x.dataset.id === this.defaultTab)
      : this.initialSelectedIndex
    return index;
  }

  private initCollection() {
    if (this.collection) {
      INSTANCES.add(this);
    } else {
      INSTANCES.delete(this);
    }
  }

  render(): TemplateResult {
    const items = this.items ?? [];
    return html`
      <div id="tabs" role="tablist">
        ${items.map(({ dataset: { id, iconHref, label } }, i) => html`
        <button role="tab" data-id="${id}" @click="${this.onClickTab}" ?selected="${this.selectedIndex === i}">
          <img src="${ifDefined(iconHref)}" role="presentation"/>
          ${label}
        </button>
        `)}
      </div>

      <div id="tabpanel" role="tabpanel">
        <slot></slot>
        <div id="default" ?hidden="${this.selectedItem}">
          <slot name="default"></slot>
        </div>
      </div>
    `;
  }

  public selectId(idToSelect: string) {
    const synonyms = this.getLabel(idToSelect)?.synonyms ?? [];
    const index =
      this.items.findIndex(({ dataset: { id }}) => id === idToSelect || synonyms.includes(id))
    if (index >= 0 && this.selectedIndex !== index)
      this.selectIndex(index)
  }

  onSelect() {
    for (const tab of this.tabs)
      tab.removeAttribute('selected');
    const tab = this.tabs[this.selectedIndex as number];
    if (!tab) return;
    tab.setAttribute('selected', '');
    const { left } = tab.getBoundingClientRect();
    this.shadowRoot.getElementById('tabs')
      .scrollTo({ behavior: 'smooth', left });
  }

  private onClickTab(event: Event & { target: HTMLButtonElement }) {
    const tabs = [...this.tabs]
    let tab = event.target;
    while (!tabs.includes(tab))
      tab = tab.parentElement as HTMLButtonElement;
    const index = [...this.tabs].indexOf(tab);
    this.selectIndex(index);
    if (this.collection) {
      const [{ dataset: { id = this.defaultTab } }] = [this.selectedItem].flat();
      localStorage.setItem(`code-tabs-selected-${this.collection}`, id);
      INSTANCES.forEach(x => x.selectId(id))
    }
    this.fire('tab-selected', event.target);
  }

  private getLabel(tag: string) {
    return this.labels.get(tag) ?? null;
  }

  protected initLabels(event?: Event): void {
    if (!!event) this.labels.clear();
    this.items
      .forEach(({ dataset: { id, label, iconHref, ...dataset } }: HTMLElement) => {
        const synonyms = (dataset.synonyms ?? '')
          .split(',')
          .map(x => x.trim());

        const pkg: Tab = { id, label ,iconHref, synonyms  };

        this.labels.set(pkg.id, pkg);
        for (const synonym of synonyms)
          this.labels.set(synonym, pkg)
      });
  }
}

@customElement('code-tab')
export class CodeTab extends LitElement {
  static readonly styles = [TabStyles];

  @property() tab: string;

  @property({ type: Boolean, attribute: 'no-copy' }) noCopy = false;

  render() {
    if (this.noCopy) {
      return html`
        <slot></slot>
      `;
    } else {
      return html`
        <code-copy>
          <slot></slot>
        </code-copy>
      `;
    }
  }
}
