---
name: HTML Mutations with FAST
attrs: fade-in fade-out
---

<img slot="end-start" alt="FAST" src="/_merged_assets/brand-logos/fast.svg"/>

```ts
import { FASTElement, customElement, html } from '@microsoft/fast';
import { ApolloMutationBehavior } from '@apollo-elements/fast';

@customElement({
  name: 'add-user',
  template: html`
    <sl-input label="User name" @change="${(x, event) =>
        x.mutation.variables = { name: event.target.value }}"></sl-input>
    <sl-button label="Add user" @click="${(x) =>
        x.mutation.mutate()}"></sl-button>
  `,
})
export class AddUser extends FASTElement {
  mutation = new ApolloMutationBehavior(this, AddUserMutation);
}
```
