import { LitElement, html, css } from 'lit';

// Original Apollo Elements Codesandbox Button component
// For embedding CodeSandbox demos

export class CodesandboxButton extends LitElement {
  static properties = {
    sandboxId: { attribute: 'sandbox-id' },
    module: { type: String },
    showDemo: { type: Boolean, attribute: 'show-demo' },
    theme: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: var(--code-tabs-min-height, 505px);
    }

    .sandbox-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--code-tabs-background, #f6f8fa);
      border-radius: var(--code-border-radius, 6px);
      overflow: hidden;
    }

    .sandbox-placeholder {
      text-align: center;
      padding: 2rem;
      color: var(--color-text-secondary, #656d76);
    }

    .sandbox-iframe {
      width: 100%;
      height: 100%;
      border: none;
      background: white;
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      color: var(--color-text-secondary, #656d76);
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-border, #e1e5e9);
      border-top: 3px solid var(--primary-color, #a0f);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .demo-button {
      padding: 0.75rem 1.5rem;
      background: var(--primary-color, #a0f);
      color: white;
      border: none;
      border-radius: var(--code-border-radius, 6px);
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-top: 1rem;
    }

    .demo-button:hover {
      background: var(--primary-color-darker, #8a0dd6);
      transform: translateY(-1px);
    }

    ::slotted([slot="button"]) {
      display: none !important;
    }
  `;

  constructor() {
    super();
    this.showDemo = false;
    this.theme = 'light';
  }

  render() {
    if (!this.showDemo) {
      return html`
        <div class="sandbox-container">
          <div class="sandbox-placeholder">
            <h3>CodeSandbox Demo</h3>
            <p>Click the tab to load the interactive demo</p>
            <button class="demo-button" @click="${this.loadDemo}">
              Load Demo
            </button>
          </div>
        </div>
      `;
    }

    if (!this.sandboxId) {
      return html`
        <div class="sandbox-container">
          <div class="sandbox-placeholder">
            <p>Demo configuration required</p>
          </div>
        </div>
      `;
    }

    return html`
      <div class="sandbox-container">
        <iframe
          class="sandbox-iframe"
          src="${this.getSandboxUrl()}"
          title="CodeSandbox Demo"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          loading="lazy">
        </iframe>
      </div>
    `;
  }

  getSandboxUrl() {
    const baseUrl = `https://codesandbox.io/embed/${this.sandboxId}`;
    const params = new URLSearchParams({
      fontsize: '14',
      hidenavigation: '1',
      theme: this.theme || 'light',
      view: 'split',
      editorsize: '50',
      moduleview: '1',
      expanddevtools: '0'
    });

    if (this.module) {
      params.set('module', this.module);
    }

    return `${baseUrl}?${params.toString()}`;
  }

  loadDemo() {
    this.showDemo = true;

    // Dispatch event to notify parent components
    this.dispatchEvent(new CustomEvent('demo-loaded', {
      detail: { sandboxId: this.sandboxId, module: this.module },
      bubbles: true
    }));
  }

  updated(changedProperties) {
    if (changedProperties.has('showDemo') && this.showDemo) {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        const iframe = this.shadowRoot.querySelector('.sandbox-iframe');
        if (iframe) {
          iframe.addEventListener('load', () => {
            this.dispatchEvent(new CustomEvent('demo-ready', {
              detail: { sandboxId: this.sandboxId },
              bubbles: true
            }));
          }, { once: true });
        }
      }, 100);
    }
  }
}

customElements.define('codesandbox-button', CodesandboxButton);