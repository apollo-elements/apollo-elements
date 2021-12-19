---
name: HTML Mutations with Lit
attrs: fade-out
---

<img slot="end-start" alt="Lit" src="/_merged_assets/brand-logos/lit.svg"/>

```ts
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ApolloMutationController } from '@apollo-elements/core';

@customElement('add-user')
export class AddUser extends LitElement {
  mutation = new ApolloMutationController(this, AddUserMutation);

  render() {
    return html`
      <sl-input label="User name" @change="${event =>
          this.mutation.variables = { name: event.target.value }}"></sl-input>
      <sl-button label="Add user" @click="${() =>
          this.mutation.mutate()}"></sl-button>
    `;
  }
}
```
