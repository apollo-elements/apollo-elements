import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';

import style from './css-value-doc.css';

@customElement('css-value-doc')
export class CssValueDoc extends LitElement {
  static readonly styles = [style];

  @property({ type: Boolean, attribute: 'data-empty-body' }) emptyBody = false;

  @state() color: string;

  render(): TemplateResult {
    return html`
      <slot></slot>
      <data id="color" part="color"
          value="${ifDefined(this.color)}"
          style="${styleMap({ backgroundColor: this.color || 'transparent' })}"
      ></data>
    `;
  }

  mo = new MutationObserver(() => this.onMutation()); // eslint-disable-line no-invalid-this

  constructor() {
    super();
    this.mo.observe(this, { characterData: true });
    this.onMutation();
  }

  onMutation(): void {
    const value = this.textContent.trim();
    this.color = CSS.supports('color', value) ? value : undefined;
  }
}
