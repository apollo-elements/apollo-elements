import { <%= BASE_CLASS %>, html, customElement, TemplateResult } from '@apollo-elements/lit-apollo';

import type {
  <%= OPERATION_DATA_TYPE %>Data as Data,
  <%= OPERATION_DATA_TYPE %>Variables as Variables,
} from '<%= SCHEMA_PATH %>';

import style from './<%= UNPREFIXED %>.css';<%= CSS_IMPORT %>

import <%= OPERATION_NAME %> from './<%= OPERATION_FILE_NAME %>';

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
