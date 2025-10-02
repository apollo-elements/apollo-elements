import { LitElement, html, css } from 'lit';

// Original Apollo Elements Code Tabs component

const INSTANCES = new Set();

export class CodeTabs extends LitElement {
  static properties = {
    defaultTab: { attribute: 'default-tab' },
    align: { reflect: true },
    collection: { type: String },
    selectedIndex: { type: Number, attribute: 'selected-index', reflect: true }
  };

  static styles = css`
    :host {
      margin-block-end: var(--markdown-syntax-margin-block-end, 16px);
      display: block;
      position: relative;
      background: transparent;
      overflow: hidden;
    }

    * {
      box-sizing: border-box;
    }

    img {
      height: var(--code-tabs-icon-height, 24px);
      width: auto;
    }

    #tabs,
    #tabpanels {
      --code-tabs-border: 1px solid var(--code-tabs-border-color, transparent);
    }

    :host(:is(:focus-within, :hover)) :is(#tabs, #tabpanels) {
      --code-tabs-border: 1px solid var(--code-tabs-border-focus-color, var(--primary-color));
    }

    :host(:is(:focus-within, :hover)) #tabs button {
      border-block-end-color: var(--code-tabs-border-focus-color, var(--primary-color));
    }

    #tabs {
      display: flex;
      background: var(--code-tabs-tabs-background);
      overflow-x: auto;
      z-index: 2;
      position: relative;
      inset-block-end: -1px;
    }

    #tabs button {
      display: flex;
      align-items: center;
      gap: 9px;
      color: var(--code-button-color, inherit);
      position: relative;
      padding: 9px 16px;
      border: none;
      cursor: pointer;
      font-size: 16px;
      background: var(--code-button-background, var(--markdown-table-row-odd-background-color));
      outline: none;
      transition: color, background 0.1s ease;
      border-start-start-radius: var(--code-border-radius);
      border-start-end-radius: var(--code-border-radius);
      border-block-end: var(--code-tabs-border);
      border-block-end-color: var(--code-tabs-background, var(--markdown-syntax-background-color, #f6f8fa));
    }

    #tabs button:focus,
    #tabs button:hover {
      color: var(--code-button-focus-color, inherit);
      background: var(--code-button-focus-background, var(--primary-lines-color));
    }

    #tabs button:active {
      color: var(--code-button-active-color);
    }

    #tabs button[selected] {
      background: var(--code-tabs-background, var(--markdown-syntax-background-color, #f6f8fa));
      border: var(--code-tabs-border);
      border-block-start: 2px solid var(--code-tabs-selected-highlight-color, var(--markdown-link-color));
      border-block-end-color: var(--code-tabs-background, var(--markdown-syntax-background-color, #f6f8fa));
      border-block-end-width: 0;
      padding: 9px 15px 11px 15px;
      text-decoration: none;
    }

    #tabs button[selected]:focus,
    #tabs button[selected]:hover {
      color: inherit;
    }

    #tabs button[selected]::before {
      content: '';
      z-index: -1;
      position: absolute;
      inset-inline-start: -100%;
      border-end-end-radius: 3px;
      background-color: var(--code-tabs-background, var(--markdown-syntax-background-color, #f6f8fa));
    }

    #tabs button img:not([src]) {
      display: none;
    }

    #tabpanels {
      background: var(--code-tabs-tabpanel-background, var(--markdown-syntax-background-color, #f6f8fa));
      border-radius: var(--code-border-radius);
      overflow: hidden;
      min-height: var(--code-tabs-min-height, 1px);
      z-index: 1;
      position: relative;
      border: var(--code-tabs-border);
    }

    :host([selected-index="0"]) #tabpanels {
      border-start-start-radius: 0;
    }

    :host([align="start"]) #tabs {
      justify-content: var(--code-tabs-justify-tabs, start);
    }

    :host([align="end"]) #tabs {
      justify-content: var(--code-tabs-justify-tabs, end);
    }

    :host([align="start"]) #tabpanels {
      border-start-start-radius: 0;
      border-start-end-radius: var(--code-border-radius);
    }

    :host([align="end"]) #tabpanels {
      border-start-start-radius: var(--code-border-radius);
      border-start-end-radius: 0;
    }

    /* visually hidden */
    #sr-clone {
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    #default {
      padding: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    ::slotted(code-tab:not([selected])) {
      display: none !important;
    }

    ::slotted(code-tab[selected]) {
      display: block !important;
    }
  `;

  constructor() {
    super();
    this.selectedIndex = 0;
    this.align = 'start';
    this.tabs = [];
    this.items = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.initialSelectedIndex = parseInt(this.getAttribute('selected-index')) || 0;
    if (this.collection) {
      INSTANCES.add(this);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    INSTANCES.delete(this);
  }

  firstUpdated() {
    this.initTabs();
    this.selectIndex(this.getInitialSelectedIndex());
  }

  updated(changed) {
    if (changed.has('collection') && this.collection) {
      INSTANCES.add(this);
    }
  }

  initTabs() {
    this.items = Array.from(this.querySelectorAll('code-tab')).map(tab => ({
      dataset: {
        id: tab.dataset.id,
        label: tab.dataset.label || tab.dataset.id,
        iconHref: tab.dataset.iconHref,
        color: tab.dataset.color
      },
      element: tab
    }));
    this.requestUpdate();
  }

  getInitialSelectedIndex() {
    if (this.querySelector('[slot=default]')) return -1;

    const stored = this.collection ? localStorage.getItem(`code-tabs-selected-${this.collection}`) : null;
    if (stored) {
      const index = this.items.findIndex(x => x.dataset.id === stored);
      if (index >= 0) return index;
    }

    if (this.defaultTab) {
      const index = this.items.findIndex(x => x.dataset.id === this.defaultTab);
      if (index >= 0) return index;
    }

    return this.initialSelectedIndex || 0;
  }

  selectIndex(index) {
    // Remove selection from all tabs
    this.items.forEach(item => {
      item.element.removeAttribute('selected');
    });

    this.selectedIndex = index;

    if (index >= 0 && this.items[index]) {
      this.items[index].element.setAttribute('selected', '');
      this.selectedItem = this.items[index].element;
    } else {
      this.selectedItem = null;
    }

    this.requestUpdate();
    this.onSelect();
  }

  selectId(idToSelect) {
    const index = this.items.findIndex(({ dataset: { id } }) => id === idToSelect);
    if (index >= 0 && this.selectedIndex !== index) {
      this.selectIndex(index);
    }
  }

  onSelect() {
    // Update button states
    this.updateComplete.then(() => {
      const buttons = this.shadowRoot.querySelectorAll('[role="tab"]');
      buttons.forEach((button, i) => {
        button.removeAttribute('selected');
        button.setAttribute('aria-selected', this.selectedIndex === i);
        button.setAttribute('tabindex', this.selectedIndex === i ? '0' : '-1');
      });

      const selectedButton = buttons[this.selectedIndex];
      if (selectedButton) {
        selectedButton.setAttribute('selected', '');
        // Smooth scroll to selected tab
        const { left } = selectedButton.getBoundingClientRect();
        this.shadowRoot.getElementById('tabs').scrollTo({ behavior: 'smooth', left });
      }
    });

    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('select', {
      detail: { selectedIndex: this.selectedIndex, selectedItem: this.selectedItem },
      bubbles: true
    }));
  }

  onClickTab(event) {
    const button = event.target.closest('button');
    if (!button) return;

    const buttons = Array.from(this.shadowRoot.querySelectorAll('[role="tab"]'));
    const index = buttons.indexOf(button);

    if (index >= 0) {
      this.selectIndex(index);

      if (this.collection && this.items[index]) {
        const { id } = this.items[index].dataset;
        localStorage.setItem(`code-tabs-selected-${this.collection}`, id);
        // Sync with other instances
        INSTANCES.forEach(instance => {
          if (instance !== this) {
            instance.selectId(id);
          }
        });
      }
    }
  }

  render() {
    const items = this.items || [];
    return html`
      <div id="tabs" role="tablist" part="tablist">
        ${items.map(({ dataset: { id, iconHref, label } }, i) => html`
        <button role="tab"
                part="tab"
                data-id="${id}"
                id="button-${id}"
                aria-selected="${this.selectedIndex === i}"
                aria-controls="${id}"
                tabindex="${this.selectedIndex === i || (this.selectedIndex < 0 && i === 0) ? 0 : -1}"
                ?selected="${this.selectedIndex === i}"
                @click="${this.onClickTab}">
          ${iconHref ? html`<img src="${iconHref}" role="presentation"/>` : ''}
          ${label}
        </button>
        `)}
      </div>

      <!-- Screen reader accessible content -->
      <div id="sr-clone">${items.map((item, i) => html`
        <div id="${item.dataset.id}"
             role="tabpanel"
             aria-labelledby="button-${item.dataset.id}"
             ?hidden="${this.selectedIndex !== i}">
          ${Array.from(item.element.children, x => {
            const clone = x.cloneNode(true);
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

  onSlotchange() {
    // Re-initialize when slot content changes
    setTimeout(() => {
      this.initTabs();
      if (this.selectedIndex < 0 && this.items.length > 0) {
        this.selectIndex(0);
      }
    }, 0);
  }
}

export class CodeTab extends LitElement {
  static properties = {
    selected: { type: Boolean, reflect: true },
    noCopy: { type: Boolean, attribute: 'no-copy' }
  };

  static styles = css`
    :host(:not([selected])) {
      display: none;
    }

    :host([selected]) {
      display: block;
    }

    [part="content"] {
      display: flex;
      flex: 1;
    }

    ::slotted(pre) {
      margin-block-end: 0 !important;
    }
  `;

  render() {
    return html`<div part="content"><slot></slot></div>`;
  }
}

customElements.define('code-tabs', CodeTabs);
customElements.define('code-tab', CodeTab);