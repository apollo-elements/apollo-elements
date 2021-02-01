---
description: How to use Apollo Elements to write declarative GraphQL mutation web components
---

# Building Apps >> Mutations || 20

Mutations are how you change data in your graphql. If you think of queries as analogous to HTTP `GET` requests or SQL `READ` statements, then mutations are kind of like HTTP `POST` requests or SQL `WRITE` statements.

Apollo Elements gives you three options for defining mutations in your UI. You can mix and match them, depending on your particular needs.

## Imperative Mutations

First, you can call the Apollo client's `mutate` method imperatively. This is good for one-off actions, or for when you want to issue a mutation programatically, i.e. not in response to a user action.

```ts
onClickSubmit() {
  const { data, error, loading } =
    await this.client.mutate({ mutation, variables });
}
```

## Mutation Components

Unlike query and subscription components, mutation components don't automatically send a request to the GraphQL server. You have to call their `mutate()` method to issue the mutation, typically in response to some user input.

As such, you can only expect your component's `data` property to be truthy once the mutation resolves.

<code-tabs collection="libraries" default-tab="lit">

  ```ts tab mixins
  import type { ResultOf, VariablesOf } from '@graphql-typed-document-node/core';

  import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';

  import { AddUserMutation } from './AddUser.mutation.graphql';

  const template = document.createElement('template');
  template.innerHTML = `
    <p-card>
      <h2 slot="heading">Add User</h2>

      <dl hidden>
        <dt>Name</dt>  <dd data-field="name"></dd>
        <dt>Added</dt> <dd data-field="timestamp"></dd>
      </dl>

      <mwc-textfield slot="actions" label="User Name" outlined></mwc-textfield>
      <mwc-button slot="actions" label="Add User"></mwc-button>
    </p-card>
  `;

  export class AddUserElement extends ApolloMutation<typeof AddUserMutation> {
    mutation = AddUserMutation;

    #data: ResultOf<typeof AddUserMutation>;
    get data(): ResultOf<typeof AddUserMutation> { return this.#data; }
    set data(data: ResultOf<typeof AddUserMutation>) { this.render(this.#data = data); }

    $(selector) { return this.shadowRoot.querySelector(selector); }

    constructor() {
      super();
      this
        .attachShadow({ mode: 'open' })
        .append(template.content.cloneNode(true));
      this.onInput = this.onInput.bind(this);
      this.$('mwc-textfield').addEventListener('click', this.onInput);
      this.$('mwc-button').addEventListener('click', () => this.mutate());
    }

    onInput({ target: { value: name } }) {
      this.variables = { name };
    }

    render(data) {
      this.$('dl').hidden = !!data;
      if (data) {
        const timestamp = new Date(data.timestamp).toDateString();
        const { name } = data;
        for (const [key, value] of Object.entries({ name, timestamp })
          this.$(`[data-field="${key}"]`).textContent = value;
      }
    }
  }

  customElements.define('add-user', component(AddUser));
  ```

  ```ts tab lit
  import { ApolloMutation } from '@apollo-elements/lit-apollo/apollo-mutation';
  import { customElement, html, TemplateResult } from 'lit-element';

  import { AddUserMutation } from './AddUser.mutation.graphql';

  @customElement('add-user')
  export class AddUserElement extends ApolloMutation<typeof AddUserMutation> {
    mutation = AddUserMutation;

    render(): TemplateResult {
      const name = this.data.name ?? '';
      const timestamp = this.data ? new Date(this.data.timestamp).toDateString() : '';
      return html`
        <p-card>
          <h2 slot="heading">Add User</h2>

          <dl ?hidden="${!this.data}">
            <dt>Name</dt>  <dd>${name}</dd>
            <dt>Added</dt> <dd>${timestamp}</dd>
          </dl>

          <mwc-textfield slot="actions"
              label="User Name"
              outlined
              @input="${this.onInput}"></mwc-textfield>
          <mwc-button slot="actions"
              label="Add User"
              @input="${() => this.mutate()}"></mwc-button>
        </p-card>
      `;
    }

    onInput({ target: { value: name } }) {
      this.variables = { name };
    }
  }
  ```

  ```ts tab fast
  import { ApolloMutation } from '@apollo-elements/fast/apollo-mutation';

  import { customElement, html } from '@microsoft/fast-element';

  import { AddUserMutation } from './AddUser.mutation.graphql';

  import type { Binding } from '@microsoft/fast-element';

  const getName: Binding<AddUserElement> =
     x =>
       x.data?.name ?? ''

  const getTimestamp: Binding<AddUserElement> =
    x =>
      x.data ? new Date(x.data.timestamp).toDateString() : '';

  const setVariables: Binding<AddUserElement) =
    (x, { target: { value: name } }) => {
      x.variables = { name };
    }

  @customElement({
    name: 'add-user'
    template: html<AddUserElement>`
      <p-card>
        <h2 slot="heading">Add User</h2>

        <dl ?hidden="${x => !x.data}">
          <dt>Name</dt>  <dd>${getName}</dd>
          <dt>Added</dt> <dd>${getTimestamp}</dd>
        </dl>

        <mwc-textfield slot="actions"
            label="User Name"
            outlined
            @input="${setVariables}"></mwc-textfield>
        <mwc-button slot="actions"
            label="Add User"
            @input="${x => x.mutate()}"></mwc-button>
      </p-card>
    `,
  })
  export class AddUserElement extends ApolloMutation<typeof AddUserMutation> {
    mutation = AddUserMutation;
  }
  ```

  ```ts tab haunted
  import { useMutation } from '@apollo-elements/haunted/useMutation';
  import { useState, component, html } from 'haunted';
  import { AddUserMutation } from './AddUser.mutation.graphql';

  function AddUser() {
    const [addUser, { called, data }] = useMutation(AddUserMutation);
    const [variables, setVariables] = useState({ });

    const onInput = event => setVariables({ name: event.target.value }));

    const name = data.name ?? '';
    const timestamp = data ? new Date(data.timestamp).toDateString() : '';

    return html`
      <p-card>
        <h2 slot="heading">Add User</h2>

        <dl ?hidden="${!data}">
          <dt>Name</dt>  <dd>${name}</dd>
          <dt>Added</dt> <dd>${timestamp}</dd>
        </dl>

        <mwc-textfield slot="actions"
            label="User Name"
            outlined
            @input="${onInput}"></mwc-textfield>
        <mwc-button slot="actions"
            label="Add User"
            @input="${() => addUser({ variables })}"></mwc-button>
      </p-card>
    `;
  }

  customElements.define('add-user', component(AddUser));
  ```

  ```ts tab hybrids
  import { client, mutation, define, html } from '@apollo-elements/hybrids';

  import { AddUserMutation } from './AddUser.mutation.graphql';

  const onInput =
    (host, event) =>
      setVariables({ name: event.target.value }));

  const mutate =
    host =>
      host.mutate();

  define<ApolloMutationElement<typeof AddUserMutation>('add-user', {
    client: client(),
    mutation: mutation(AddUserMutation),
    render: ({ host }) => {
      const name = host.data.name ?? '';
      const timestamp = host.data ? new Date(host.data.timestamp).toDateString() : '';
      return html`
        <p-card>
          <h2 slot="heading">Add User</h2>

          <dl ?hidden="${!host.data}">
            <dt>Name</dt>  <dd>${name}</dd>
            <dt>Added</dt> <dd>${timestamp}</dd>
          </dl>

          <mwc-textfield slot="actions"
              label="User Name"
              outlined
              @input="${onInput}"></mwc-textfield>
          <mwc-button slot="actions"
              label="Add User"
              @input="${mutate}"></mwc-button>
        </p-card>
      `;
    },
  })
  ```

</code-tabs>

The key here is the `<mwc-button>` element which, on click, calls the element's `mutate()` method.

See [mutation lifecycle](./lifecycle.md) for more information.

## With `<apollo-mutation>`

You can also declaratively define mutations using the `<apollo-mutation>` component.

```html
<apollo-mutation>
  <script type="application/graphql">
    mutation AddUser($name: String) {
      addUser(name: $name) {
        id name
      }
    }
  </script>
  <label for="username">Name</label>
  <input id="username" slot="variable"/>
  <button slot="trigger">Add User</button>
</apollo-mutation>
```

Read more about declarative mutations in [using `<apollo-mutation>`](./apollo-mutation-component.md) and [composing mutations](./composition.md) or check out the [mutation component API docs](/api/components/apollo-mutation/).
