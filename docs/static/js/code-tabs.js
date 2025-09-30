import { LitElement, html, css } from 'lit';

export class CodeTabs extends LitElement {
  static properties = {
    selectedItem: { type: String },
    collection: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .tabs-container {
      border: 1px solid var(--color-border, #e1e5e9);
      border-radius: var(--radius-lg, 8px);
      overflow: hidden;
      background: var(--color-surface, white);
    }

    .tab-buttons {
      display: flex;
      background: var(--color-surface-secondary, #f6f8fa);
      border-bottom: 1px solid var(--color-border, #e1e5e9);
      overflow-x: auto;
    }

    button {
      padding: 0.75rem 1rem;
      border: none;
      background: transparent;
      color: var(--color-text-secondary, #656d76);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      white-space: nowrap;
      border-right: 1px solid var(--color-border, #e1e5e9);
      transition: all 0.2s ease;
      position: relative;
    }

    button:last-child {
      border-right: none;
    }

    button:hover {
      background: var(--color-primary-light, rgba(160, 0, 255, 0.1));
      color: var(--color-primary, #a0f);
    }

    button[aria-selected="true"] {
      background: var(--color-surface, white);
      color: var(--color-primary, #a0f);
      border-bottom: 2px solid var(--color-primary, #a0f);
    }

    button[aria-selected="true"]::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--color-primary, #a0f);
    }

    .tab-content {
      min-height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ::slotted([slot="default"]) {
      display: flex !important;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
    }

    ::slotted(code-tab:not([selected])) {
      display: none !important;
    }

    ::slotted(code-tab[selected]) {
      display: block !important;
      width: 100%;
    }
  `;

  constructor() {
    super();
    this.selectedItem = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleTabClick);
    this.updateComplete.then(() => {
      this.setupTabs();
    });
  }

  setupTabs() {
    const tabs = this.querySelectorAll('code-tab');
    if (tabs.length === 0) return;

    // Select first tab by default if none selected
    if (!this.selectedItem) {
      const firstTab = tabs[0];
      if (firstTab) {
        this.selectedItem = firstTab.dataset.id || firstTab.dataset.label;
        firstTab.setAttribute('selected', '');
      }
    }

    this.requestUpdate();
  }

  handleTabClick(event) {
    const button = event.target.closest('button');
    if (!button) return;

    const tabId = button.dataset.id;
    if (tabId) {
      this.selectTab(tabId);
    }
  }

  selectTab(tabId) {
    // Remove selection from all tabs
    const tabs = this.querySelectorAll('code-tab');
    tabs.forEach(tab => {
      tab.removeAttribute('selected');
    });

    // Select the new tab
    const selectedTab = this.querySelector(`code-tab[data-id="${tabId}"]`);
    if (selectedTab) {
      selectedTab.setAttribute('selected', '');
      this.selectedItem = tabId;

      // Dispatch select event
      this.dispatchEvent(new CustomEvent('select', {
        detail: { selectedTab, tabId },
        bubbles: true
      }));

      this.requestUpdate();
    }
  }

  getTabButtons() {
    const tabs = this.querySelectorAll('code-tab');
    return Array.from(tabs).map(tab => ({
      id: tab.dataset.id,
      label: tab.dataset.label || tab.dataset.id,
      color: tab.dataset.color,
      selected: tab.hasAttribute('selected')
    }));
  }

  render() {
    const tabButtons = this.getTabButtons();

    return html`
      <div class="tabs-container">
        <div class="tab-buttons">
          ${tabButtons.map(tab => html`
            <button
              data-id="${tab.id}"
              aria-selected="${tab.selected}"
              style="color: ${tab.selected ? tab.color : ''}"
            >
              ${tab.label}
            </button>
          `)}
        </div>
        <div class="tab-content">
          <slot name="default"></slot>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export class CodeTab extends LitElement {
  static properties = {
    selected: { type: Boolean, reflect: true },
    noCopy: { type: Boolean, attribute: 'no-copy' }
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    :host(:not([selected])) {
      display: none;
    }

    .tab-content {
      padding: 1.5rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ::slotted(*) {
      width: 100%;
      height: 100%;
    }
  `;

  render() {
    return html`
      <div class="tab-content">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('code-tabs', CodeTabs);
customElements.define('code-tab', CodeTab);