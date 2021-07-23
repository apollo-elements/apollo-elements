import { LitElement, html, TemplateResult } from 'lit';
import { <%= CONTROLLER_CLASS %> } from '@apollo-elements/core';
import { customElement } from 'lit/decorators.js';

import { <%= OPERATION_NAME %> } from '<%= SCHEMA_PATH %>';

import style from './<%= UNPREFIXED %>.css';<%= CSS_IMPORT %>

declare global { interface HTMLElementTagNameMap { '<%= TAG_NAME %>': <%= CLASS_NAME %> } }

@customElement('<%= TAG_NAME %>')
export class <%= CLASS_NAME %> extends LitElement {
  static readonly is = '<%= TAG_NAME %>';

  static readonly styles = <%= CSS_ARRAY %>;

  <%= OPERATION_TYPE %> = new <%= CONTROLLER_CLASS %>(this, <%= OPERATION_NAME %>);

  render(): TemplateResult {
    return html`
      <pre ?hidden="${!this.<%= OPERATION_TYPE %>.error}">${this.<%= OPERATION_TYPE %>.error?.message}</pre>
    `;
  }
}
