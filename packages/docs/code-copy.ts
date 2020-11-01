import { customElement, html, internalProperty, LitElement } from 'lit-element'

import ButtonStyles from './button.css';
import CopyStyles from './copy.css';

const supportsClipboard = 'clipboard' in navigator;

@customElement('code-copy')
export class CodeCopy extends LitElement {
  static readonly is = 'code-copy';

  static readonly styles = [ButtonStyles, CopyStyles];

  @internalProperty() copyButtonText = 'Copy';

  render() {
    return html`
      <slot></slot>

      <button id="copy-button"
          @click="${this.onCopy}"
          ?hidden="${!supportsClipboard}">
        ${this.copyButtonText}
      </button>
    `;
  }

  async onCopy() {
    const { textContent } = this;
    await navigator.clipboard.writeText(textContent.trim());
    this.copyButtonText = 'Copied ✅';
    setTimeout(() => {
      this.copyButtonText = 'Copy';
    }, 2000);
  }
}