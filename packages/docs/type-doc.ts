import { LitElement, customElement, html, TemplateResult, property } from 'lit-element';

import style from './type-doc.css';

@customElement('type-doc')
export class TypeDoc extends LitElement {
  static readonly styles = [style];

  @property({ type: Boolean, reflect: true }) expanded = false;

  render(): TemplateResult {
    const isInherited = this.hasAttribute('data-inherited-from');
    const { expanded } = this;
    return html`
      <header>
        <span aria-hidden="true" @click="${this.toggleInherited}" @slotchange="${this.cloneHeading}">
          <slot name="name"></slot>
        </span>
        <span class="visually-hidden"></span>
        <slot name="attribute"></slot>
        <slot name="type"></slot>
        <span id="inheritance" ?hidden="${!isInherited}">
          <slot name="inheritance"></slot>
          <button id="toggle"
              aria-label="Toggle details"
              aria-expanded="${expanded}"
              aria-controls="body"
              @click="${this.toggleInherited}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" fill="currentColor"/>
            </svg>
          </button>
        </span>
      </header>
      <article id="body" ?hidden="${isInherited && !expanded}">
        <slot></slot>
      </article>
    `;
  }

  firstUpdated() {
    this.cloneHeading();
  }

  private cloneHeading() {
    const hidden = this.shadowRoot.querySelector(".visually-hidden");
    for (const child of hidden.children) child.remove();
    const heading = this.querySelector('[slot="name"]');
    if (!heading) return;
    hidden.append(heading.cloneNode(true));
  }

  private toggleInherited() {
    this.expanded = !this.expanded;
  }
}
