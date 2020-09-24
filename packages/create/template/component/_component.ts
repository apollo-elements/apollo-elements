import { <%= BASE_CLASS %>, html, customElement, TemplateResult } from '@apollo-elements/lit-apollo';

import type {
  <%= OPERATION_NAME %>Data as Data,
  <%= OPERATION_NAME %>Variables as Variables,
} from '<%= SCHEMA_PATH %>';

import shared from '<%= SHARED_CSS_PATH %>';
import style from './<%= UNPREFIXED %>.css';

import <%= OPERATION_NAME %> from './<%= OPERATION_FILE_NAME %>';

@customElement('<%= TAG_NAME %>')
export class <%= CLASS_NAME %> extends <%= BASE_CLASS %><Data, Variables> {
  static readonly is = '<%= TAG_NAME %>';

  static readonly styles = [shared, style];

  <%= OPERATION_TYPE %> = <%= OPERATION_NAME %>;

  render(): TemplateResult {
    return html`
    `;
  }
}
