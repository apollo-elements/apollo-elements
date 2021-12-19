---
name: HTML Mutations with Haunted
attrs: fade-in fade-out
---

<img slot="end-start" alt="Haunted" src="/_merged_assets/brand-logos/haunted.svg"/>

```ts
import { component, html } from 'haunted';
import { useMutation } from '@apollo-elements/haunted';

function AddUser() {
  const [mutate] = useMutation(AddUserMutation);
  const [name, setName] = useState('');

  return html`
    <sl-input label="User name" @change="${event =>
        setName(event.target.value)}"></sl-input>
    <sl-button label="Add user" @click="${() =>
        mutate({ variables: { name } })}"></sl-button>
  `;
}

customElements.define('add-user', component(AddUser));
```
