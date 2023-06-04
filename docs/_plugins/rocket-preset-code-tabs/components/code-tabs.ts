import { SelectMixin } from '@pwrs/mixins/select/select-mixin';
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, queryAll, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import './code-copy.js';

import ButtonHostStyles from './button-host.css';
import TabsStyles from './code-tabs.css';
import TabStyles from './code-tab.css';

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
}

const INSTANCES = new Set<CodeTabs>();

/**
 * @csspart tablist - container for tab buttons
 * @csspart tabpanels - container for content
 * @csspart tab - tab button
 * @csspart default-container - container for default tab
 *
 * @cssprop --code-tabs-icon-height - size of the tab icon
 * @cssprop --code-tabs-tabs-background - background for the tablist
 * @cssprop --code-tabs-justify-tabs - flex justification for tab buttons. Alternatively, set the `align` attribute
 * @cssprop [--code-tabs-min-height=1px] - tabpanel minimum height
 * @cssprop [--code-tabs-tabpanel-background=var(--markdown-syntax-background-color, #f6f8fa)] - tabpanel background
 * @cssprop [--code-tabs-background=var(--markdown-syntax-background-color, #f6f8fa)] - content and selected button background
 * @cssprop [--code-tabs-border=1px solid var(--code-tabs-border-color, var(--primary-color))] - border for code-tabs
 * @cssprop [--code-tabs-border-color=transparent] - border color for code-tabs
 * @cssprop [--code-tabs-border-focus-color=var(--primary-color)] - border color for code-tabs when focused
 * @cssprop [--code-tabs-selected-highlight-color=var(--markdown-link-color)] - color for selected tab highlight

 * @cssprop --code-button-active-color - button background when focused
 * @cssprop [--code-button-background=var(--markdown-table-row-odd-background-color)] - button background
 * @cssprop [--code-button-color=inherit] - button text color
 * @cssprop [--code-button-focus-background=var(--primary-lines-color)] - button background when focused
 * @cssprop [--code-button-focus-color=inherit] - button text color when focused
 * @cssprop [--code-border-radius=6px] - border radius for code-copy and code-tabs
 */
@customElement('code-tabs')
export class CodeTabs extends SelectMixin(LitElement) {
  static readonly allowedChildren = ['code-tab'];

  static readonly styles = [ButtonHostStyles, TabsStyles];

  static readonly keyboardMode = 'tablist';

  @state() private labels = new Map<string, Tab>();

  /** The tab buttons. */
  @queryAll('[role="tab"]') tabs: NodeListOf<HTMLButtonElement>;

  /** Which tab name to treat as default, in case the use has not yet made a selection. */
  @property({ attribute: 'default-tab' }) defaultTab: string;

  /** Tablist alignment */
  @property({ reflect: true }) align: 'start'|'end' = 'start';

  /**
   * Which tab collection to use.
   * @see {#rocket-preset-code-tabs-js}
   */
  @property() collection: string;

  constructor() {
    super();
    this.onClickTab = this.onClickTab.bind(this);
  }

  protected initialSelectedIndex = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.initialSelectedIndex = parseInt(this.getAttribute('selected-index'));
    if (this.collection)
      this.initCollection();
  }

  disconnectedCallback(): void {
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

  protected async getInitialSelectedIndex(): Promise<number> {
    if (this.querySelector('[slot=default]')) return -1;
    await this.updateComplete;
    const stored = localStorage.getItem(`code-tabs-selected-${this.collection}`);
    const index =
        stored ? this.items.findIndex(x => x.dataset.id === stored)
      : this.defaultTab ? this.items.findIndex(x => x.dataset.id === this.defaultTab)
      : this.initialSelectedIndex;
    return index < 0 ? this.initialSelectedIndex : index;
  }

  private initCollection() {
    if (this.collection)
      INSTANCES.add(this);
    else
      INSTANCES.delete(this);
  }

  render(): TemplateResult {
    const items = this.items ?? [];
    return html`
      <div id="tabs" role="tablist" part="tablist">
        ${items.map(({ dataset: { id, iconHref, label } }, i) => html`
        <button role="tab"
                part="tab"
                data-id="${id}"
                id="button-${id}"
                aria-selected="${this.selectedIndex === i}"
                aria-controls="${id}"
                tabindex="${this.selectedIndex === i || (this.selectedIndex < 0 && i === 0)? 0 : -1}"
                ?selected="${this.selectedIndex === i}"
                @click="${this.onClickTab}">
          <img src="${ifDefined(iconHref)}" role="presentation"/>
          ${label}
        </button>
        `)}
      </div>

      <!-- We'd prefer to us AOM to assign aria properties across roots,  -->
      <!-- but that's not ready across UAs yet, so we copy content instead. -->
      <div id="sr-clone">${Array.from(this.children as HTMLCollectionOf<CodeTab>, (node, i) => html`
        <div id="${node.dataset.id}"
             role="tabpanel"
             aria-labelledby="button-${node.dataset.id}"
             ?hidden="${this.selectedIndex !== i}">
          ${Array.from(node.children, x => {
            const clone = x.cloneNode(true) as HTMLElement;
            clone.setAttribute('aria-hidden', 'false');
            return clone;
          })}
        </div>`)}
      </div>
      <div id="tabpanels" part="tabpanels">
        <slot @slotchange="${this.onSlotchange}"></slot>
        <div id="default" ?hidden="${this.selectedItem}" part="default-container">
          <slot name="default"></slot>
        </div>
      </div>
    `;
  }

  public selectId(idToSelect: string): void {
    const index =
      this.items.findIndex(({ dataset: { id } }) => id === idToSelect);
    if (index >= 0 && this.selectedIndex !== index)
      this.selectIndex(index);
  }

  private onSlotchange() {
    for (const child of this.children)
      child.firstElementChild.setAttribute('aria-hidden', 'true');
    this.requestUpdate();
  }

  /** @private */
  override onSelect(): void {
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
    const tabs = [...this.tabs];
    let tab = event.target;
    while (!tabs.includes(tab))
      tab = tab.parentElement as HTMLButtonElement;
    const index = [...this.tabs].indexOf(tab);
    this.selectIndex(index);
    if (this.collection) {
      const [{ dataset: { id = this.defaultTab } }] = [this.selectedItem].flat();
      localStorage.setItem(`code-tabs-selected-${this.collection}`, id);
      INSTANCES.forEach(x => x.selectId(id));
    }
    this.fire('tab-selected', event.target);
  }

  protected initLabels(event?: Event): void {
    if (event) this.labels.clear();
    this.items
      .forEach(({ dataset: { id, label, iconHref, ...dataset } }: HTMLElement) => {
        const pkg: Tab = { id, label, iconHref };

        this.labels.set(pkg.id, pkg);
      });
  }
}

/**
 * @csspart content - container for tab content
 *
 * @cssprop --code-button-active-color - button background when focused
 * @cssprop [--code-button-background=var(--markdown-table-row-odd-background-color)] - button background
 * @cssprop [--code-button-color=inherit] - button text color
 * @cssprop [--code-button-focus-background=var(--primary-lines-color)] - button background when focused
 * @cssprop [--code-button-focus-color=inherit] - button text color when focused
 * @cssprop [--code-border-radius=6px] - border radius for code-copy and code-tabs
 */
@customElement('code-tab')
export class CodeTab extends LitElement {
  static readonly styles = [TabStyles];

  @property() tab: string;

  @property({ type: Boolean, attribute: 'no-copy' }) noCopy = false;

  render(): TemplateResult {
    if (this.noCopy)
      return html`<div part="content"><slot></slot></div>`;
    else
      return html`<code-copy part="content" .host=${this}><slot></slot></code-copy>`;
  }
}
