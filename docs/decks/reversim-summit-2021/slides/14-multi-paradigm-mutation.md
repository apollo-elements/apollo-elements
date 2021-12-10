---
name: HTML Mutations
attrs: float-header
---

## Mutations

<section progressive>

```ts
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

```ts reveal
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

```ts reveal
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

```html reveal
<apollo-mutation refetch-queries="LatestUsers" await-refetch-queries>
  <script type="application/graphql" src="InsertUser.mutation.graphql"></script>
  <sl-input data-variable="name" label="User name"></sl-input>
  <sl-button trigger label="Add user"></sl-button>
</apollo-mutation>











```

</section>
