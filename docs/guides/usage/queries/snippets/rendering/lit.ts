import { ApolloQueryController } from '@apollo-elements/core';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { HelloQuery } from './Hello.query.graphql';

@customElement('hello-query')
export class HelloQueryElement extends LitElement {
  #query = new ApolloQueryController(this, HelloQuery);

  render() {
    return html`
      <article class=${classMap({ skeleton: this.#query.loading })}>
        <p id="error" ?hidden=${!this.#query.error}>${this.#query.error?.message}</p>
        <p>
          ${this.#query.data?.greeting ?? 'Hello'},
          ${this.#query.data?.name ?? 'Friend'}
        </p>
      </article>
    `;
  }
}
