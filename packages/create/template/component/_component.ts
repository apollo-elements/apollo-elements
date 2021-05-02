import { <%= BASE_CLASS %>, html, TemplateResult } from '@apollo-elements/lit-apollo';
import { customElement } from 'lit/decorators.js';

import type {
  <%= OPERATION_DATA_TYPE %>Data as Data,
  <%= OPERATION_DATA_TYPE %>Variables as Variables,
} from '<%= SCHEMA_PATH %>';

import style from './<%= UNPREFIXED %>.css';<%= CSS_IMPORT %>

import <%= OPERATION_NAME %> from './<%= OPERATION_FILE_NAME %>';

declare global { interface HTMLElementTagNameMap { '<%= TAG_NAME %>': <%= CLASS_NAME %> } }

@customElement('<%= TAG_NAME %>')
export class <%= CLASS_NAME %> extends <%= BASE_CLASS %><Data, Variables> {
  static readonly is = '<%= TAG_NAME %>';

  static readonly styles = <%= CSS_ARRAY %>;

  <%= OPERATION_TYPE %> = <%= OPERATION_NAME %>;

  render(): TemplateResult {
    return html`
    `;
  }
}
