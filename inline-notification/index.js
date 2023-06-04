import { LitElement, css, html } from 'lit-element';

/**
 * @element inline-notification
 * @cssprop  [--inline-notification-tip-background-color=rgba(221, 221, 221, 0.3)]
 * @cssprop  [--inline-notification-tip-border-color=#42b983]
 * @cssprop  [--inline-notification-warning-background-color=rgba(255, 229, 100, 0.2)]
 * @cssprop  [--inline-notification-warning-border-color=#e7c000]
 * @cssprop  [--inline-notification-danger-background-color=rgba(192, 0, 0, 0.1)]
 * @cssprop  [--inline-notification-danger-border-color=#c00]
 * @cssprop  [--inline-notification-warning-heading-color=#b29400]
 * @cssprop  [--inline-notification-danger-heading-color=#900]
 * @csspart title - the title heading
 */
export class InlineNotification extends LitElement {
  static get properties() {
    return {
      type: { type: String, reflect: true },
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = '';
    /** @type {'tip'|'warning'|'danger'} */
    this.type = 'tip';
  }

  static get styles() {
    return css`
      :host {
        padding: 0.1rem 1.5rem;
        border-left-width: 0.5rem;
        border-left-style: solid;
        margin: 1rem 0;
        display: block;
      }

      h3 {
        font-weight: 600;
        margin-bottom: 7px;
        text-transform: uppercase;
      }

      :host([type='tip']) {
        background-color: var(--inline-notification-tip-background-color, rgba(221, 221, 221, 0.3));
        border-color: var(--inline-notification-tip-border-color, #42b983);
      }

      :host([type='warning']) {
        background-color: var(
          --inline-notification-warning-background-color,
          rgba(255, 229, 100, 0.2)
        );
        border-color: var(--inline-notification-warning-border-color, #e7c000);
      }

      :host([type='danger']) {
        background-color: var(--inline-notification-danger-background-color, rgba(192, 0, 0, 0.1));
        border-color: var(--inline-notification-danger-border-color, #c00);
      }

      :host([type='warning']) h3 {
        color: var(--inline-notification-warning-heading-color, #b29400);
      }

      :host([type='danger']) h3 {
        color: var(--inline-notification-danger-heading-color, #900);
      }

      ::slotted(p) {
        line-height: 1.7;
      }
    `;
  }

  render() {
    return html`
      <h3 part="title">${this.title || this.type}</h3>
      <slot></slot>
    `;
  }
}
