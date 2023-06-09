import { html, isServer, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';

import ButtonHostStyles from './button-host.css';
import CopyStyles from './code-copy.css';

/**
 * @csspart copy-button - copy button
 *
 * @cssprop --code-button-active-color - button background when focused
 * @cssprop [--code-button-background=var(--markdown-table-row-odd-background-color)] - button background
 * @cssprop [--code-button-color=inherit] - button text color
 * @cssprop [--code-button-focus-background=var(--primary-lines-color)] - button background when focused
 * @cssprop [--code-button-focus-color=inherit] - button text color when focused
 * @cssprop [--code-border-radius=6px] - border radius for code-copy and code-tabs
 *
 * @slot copy-icon - Button content
 * @slot success-icon - Button content which alerts on copying. Use `role="alert"` if overriding default.
 * @event {CustomEvent<string>} copy - when successfully copying
 */
@customElement('code-copy')
export class CodeCopy extends LitElement {
  static readonly is = 'code-copy';

  static readonly styles = [ButtonHostStyles, CopyStyles];

  static readonly shadowRootOptions: ShadowRootInit = {
    mode: 'open',
    delegatesFocus: true,
  }

  static copyIcon = html`
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <!-- Copyright Github, license MIT -->
      <path fill-rule="evenodd" d="M5.962 2.513a.75.75 0 01-.475.949l-.816.272a.25.25 0 00-.171.237V21.25c0 .138.112.25.25.25h14.5a.25.25 0 00.25-.25V3.97a.25.25 0 00-.17-.236l-.817-.272a.75.75 0 01.474-1.424l.816.273A1.75 1.75 0 0121 3.97v17.28A1.75 1.75 0 0119.25 23H4.75A1.75 1.75 0 013 21.25V3.97a1.75 1.75 0 011.197-1.66l.816-.272a.75.75 0 01.949.475z"/>
      <path fill-rule="evenodd" d="M7 1.75C7 .784 7.784 0 8.75 0h6.5C16.216 0 17 .784 17 1.75v1.5A1.75 1.75 0 0115.25 5h-6.5A1.75 1.75 0 017 3.25v-1.5zm1.75-.25a.25.25 0 00-.25.25v1.5c0 .138.112.25.25.25h6.5a.25.25 0 00.25-.25v-1.5a.25.25 0 00-.25-.25h-6.5z"/>
    </svg>
  `;

  /** The element to copy text from. */
  @state() host: HTMLElement = this;

  @state() success = 'pending';

  /** Number of milliseconds to wait after successfully copying before restoring the copy button's icon to 'pending'. */
  @property({ type: Number }) timeout = 2000;

  render(): TemplateResult {
    return html`
      <slot></slot>

      <button id="copy-button" part="copy-button"
          @click="${this.onCopy}"
          ?hidden="${isServer || 'clipboard' in globalThis.navigator}">
        <div part="copy-icon" aria-hidden="${this.success === 'copied'}">
          <slot name="copy-icon">
            <i aria-label="copy" role="img">${CodeCopy.copyIcon}</i>
          </slot>
        </div>
        <div part="success-icon" aria-hidden="${this.success !== 'copied'}">
          <slot name="success-icon">
            <i aria-label="copied" role="alert">${CodeCopy.copyIcon}</i>
          </slot>
        </div>
      </button>
    `;
  }

  private async onCopy(): Promise<void> {
    const { textContent } = this.host;
    await navigator.clipboard.writeText(textContent.trim());
    this.success = 'copied';
    this.dispatchEvent(new CustomEvent('copy', { detail: textContent }));
    setTimeout(() => {
      this.success = 'pending';
    }, this.timeout);
  }
}
