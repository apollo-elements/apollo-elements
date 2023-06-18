---
title: Mutations
permalink: /guides/usage/mutations/index.html
eleventyNavigation:
  order: 30
templateEngineOverride: webc,md
description: How to use Apollo Elements to write declarative GraphQL mutation web components
---

# Mutations

Mutation components combine a <abbr title="Graph query language">GraphQL</abbr> 
mutation with a custom element which you would typically define with a <abbr 
  title="document object model">DOM</abbr> template and optionally some custom 
JavaScript behaviours. Mutation component encapsulate GraphQL mutation actions 
with a template for their resulting data, and/or their input fields.

<inline-notification type="tip">

This page is a HOW-TO guide. For detailed docs on the `ApolloMutation` interface 
see the [API docs](/api/core/interfaces/mutation/)

</inline-notification>

Mutations are how you make changes to the data in your GraphQL application. If 
you think of queries as analogous to <abbr title="hypertext transfer 
  protocol">HTTP</abbr> [`GET` 
requests](https://www.wikiwand.com/en/Hypertext_Transfer_Protocol#/Request_methods) 
or <abbr title="structured query 
  language">[SQL](https://www.wikiwand.com/en/SQL)</abbr> `READ` statements, 
then mutations are kind of like HTTP `POST` requests or SQL `WRITE` statements.

Unlike [query components](/guides/usage/queries/), which automatically fetch 
their data by default, mutation components don't do anything until you program 
them to, e.g. in reaction to the user pressing a "save" button or entering text 
in a text field. Mutation components, or indeed the imperative call to their 
`mutate()` method, take options to control how the mutation is performed and how 
the application should respond when it succeeds and returns a result.

Apollo Elements gives you four options for defining mutations in your <abbr 
  title="user interface">UI</abbr>, which you can mix and match them, depending 
on your particular needs.

1. Using the [`<apollo-mutation>` component](#with-apollo-mutation)
2. Using the [`ApolloMutationController`](#apollomutationcontroller)
3. Making a [mutation component](#mutation-components) by extending 
`ApolloMutation` or by using `useMutation`
4. Calling `client.mutate` [imperatively](#imperative-mutations)


## HTML Mutations

<!-- maintain links to the old heading -->
<a id="with-apollo-mutation"></a>

You can declaratively define mutations using the `<apollo-mutation>` HTML 
element from `@apollo-elements/components`. Provide the GraphQL mutation, 
variable input fields, and result template as children of the element.

<code-copy>
  <template webc:raw>

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
  <input id="username" data-variable="name"/>

  <button trigger>Add User</button>

    <template>
    <slot></slot>
    <template type="if" if="{{ data }}">
    <p>{{ data.user.name }} added!</p>
    </template>
    </template>
  </apollo-mutation>
  ```

  </template>
</code-copy>

Read more about declarative mutations in [using `<apollo-mutation>`](./html/) and [composing mutations](./composition/) or check out the [mutation component API docs](/api/components/apollo-mutation/).

## ApolloMutationController

Add a mutation to your component by creating an [`ApolloMutationController`](/api/core/controllers/mutation/). Call it's `mutate()` method to fire the mutation. You can use it on any element which implements `ReactiveControllerHost`, e.g. `LitElement`, or you can use it on `HTMLElement` if you apply `ControllerHostMixin` from [`@apollo-elements/mixins`](/api/libraries/mixins/controller-host-mixin/)

<code-copy>
  <template webc:raw>

  ```js
  import { LitElement, html } from 'lit';
  import { ApolloMutationController } from '@apollo-elements/core';

  export class MutatingElement extends LitElement {
    mutation = new ApolloMutationController(this, AddUserMutation);

    render() { /*...*/ }

    onClickSubmit() {
      this.mutation.mutate();
    }
  }
  ```

  </template>
</code-copy>

## Custom Mutation Elements

<!-- maintain links to the old heading -->
<a id="mutation-components"></a>

Unlike query and subscription components, mutation components don't automatically send a request to the GraphQL server. You have to call their `mutate()` method to issue the mutation, typically in response to some user input.

As such, you can only expect your component's `data` property to be truthy once the mutation resolves.

<code-tabs collection="libraries" default-tab="lit">
  <code-tab @tab="$data.codeTabs.html">

  ```html
  <apollo-mutation>
    <template>
      <p-card>
        <h2 slot="heading">Add User</h2>

        <dl ?hidden="{{ !data }}">
          <dt>Name</dt>  <dd>{{ data.name }}</dd>
          <dt>Added</dt> <dd>{{ dateString(data.timestamp) }}</dd>
        </dl>

        <slot slot="actions"></slot>
      </p-card>
    </template>

    <mwc-textfield outlined
        label="User Name"
        data-variable="name"></mwc-textfield>

    <mwc-button label="Add User" trigger></mwc-button>
  </apollo-mutation>

  <script>
    document.currentScript.getRootNode()
      .querySelector('apollo-mutation')
      .extras = {
        dateString(timestamp) {
          return new Date(timestamp).toDateString();
        }
      }
  </script>
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.mixins">

  ```ts
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

  </code-tab>
  <code-tab @tab="$data.codeTabs.lit">

  ```ts
  import { ApolloMutationController } from '@apollo-elements/core';
  import { html, TemplateResult } from 'lit';
  import { customElement } from 'lit/decorators.js';

  import { AddUserMutation } from './AddUser.mutation.graphql';

  @customElement('add-user')
  export class AddUserElement extends LitElement {
    mutation = new ApolloMutationController(this, AddUserMutation);

    render(): TemplateResult {
      const name = this.mutation.data.name ?? '';
      const timestamp =
          !this.mutation.data ? ''
        : new Date(this.mutation.data.timestamp).toDateString();

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
              @input="${() => this.mutation.mutate()}"></mwc-button>
        </p-card>
      `;
    }

    onInput({ target: { value: name } }) {
      this.mutation.variables = { name };
    }
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.fast">

  ```ts
  import type { Binding, ViewTemplate } from '@microsoft/fast-element';

  import { ApolloMutationBehavior } from '@apollo-elements/fast';

  import { FASTElement, customElement, html } from '@microsoft/fast-element';

  import { AddUserMutation } from './AddUser.mutation.graphql';

  const getName: Binding<AddUserElement> =
     x =>
       x.mutation.data?.name ?? ''

  const getTimestamp: Binding<AddUserElement> =
    x =>
      x.mutation.data ? new Date(x.mutation.data.timestamp).toDateString() : '';

  const setVariables: Binding<AddUserElement) =
    (x, { target: { value: name } }) => {
      x.mutation.variables = { name };
    }

  const template: ViewTemplate<AddUserElement> = html`
    <fast-card>
      <h2>Add User</h2>

      <dl ?hidden="${x => !x.mutation.data}">
        <dt>Name</dt>  <dd>${getName}</dd>
        <dt>Added</dt> <dd>${getTimestamp}</dd>
      </dl>

      <fast-text-field @input="${setVariables}">User Name</fast-text-field>
      <fast-button @input="${x => x.mutation.mutate()}">Add User</fast-button>
    </fast-card>
  `;
  @customElement({ name: 'add-user' template })
  export class AddUserElement extends FASTElement {
    mutation = new ApolloMutationBehavior(this, AddUserMutation);
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.haunted">

  ```ts
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

  </code-tab>
  <code-tab @tab="$data.codeTabs.atomico">

  ```tsx
  import { useMutation } from '@apollo-elements/atomico/useMutation';
  import { useState, c } from 'atomico';
  import { AddUserMutation } from './AddUser.mutation.graphql';

  function AddUser() {
    const [addUser, { called, data }] = useMutation(AddUserMutation);
    const [variables, setVariables] = useState({ });

    const onInput = event => setVariables({ name: event.target.value }));

    const name = data.name ?? '';
    const timestamp = data ? new Date(data.timestamp).toDateString() : '';

    return (
      <host shadowDom>
        <p-card>
          <h2 slot="heading">Add User</h2>
          <dl hidden={!data}>
            <dt>Name</dt>  <dd>${name}</dd>
            <dt>Added</dt> <dd>${timestamp}</dd>
          </dl>
          <mwc-textfield slot="actions"
              label="User Name"
              outlined
              oninput={onInput}></mwc-textfield>
          <mwc-button slot="actions"
              label="Add User"
              oninput={() => addUser({ variables })}></mwc-button>
        </p-card>
      </host>
    );
  }

  customElements.define('add-user', c(AddUser));
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.hybrids">

  ```ts
  import { mutation, define, html } from '@apollo-elements/hybrids';

  import { AddUserMutation } from './AddUser.mutation.graphql';

  type AddUserElement = {
    mutation: ApolloMutationController<typeof AddUserMutation>;
  }

  const onInput =
    (host, event) =>
      setVariables({ name: event.target.value }));

  const mutate =
    host =>
      host.mutate();

  define<AddUserElement>('add-user', {
    mutation: mutation(AddUserMutation),
    render: ({ mutation }) => {
      const name = mutation.data?.name ?? '';
      const timestamp = mutation.data ? new Date(mutation.data.timestamp).toDateString() : '';
      return html`
        <p-card>
          <h2 slot="heading">Add User</h2>

          <dl ?hidden="${!mutation.data}">
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

  </code-tab>
</code-tabs>

The key here is the `<mwc-button>` element which, on click, calls the element's 
`mutate()` method. Until the user clicks that button and the mutation resolves, 
the element will have a null `data` property, and therefore the `<dl>` element 
which displays the mutation result will remain hidden.

## Imperative Mutations

You don't need to define a component in order to issue a mutation. The Apollo 
client instance has a `mutate()` method which you can call imperatively at any 
time. This is good for one-off actions, or for when you want to issue a mutation 
programatically, i.e. not in response to a user action.

<code-copy>

  ```ts
  onClickSubmit() {
    const { data, error, loading } =
      await this.client.mutate({ mutation, variables });
  }
  ```

</code-copy>

## Mutation Variables

Set the `variables` DOM property on your mutation component using JavaScript:

<code-copy>

  ```ts
  document.querySelector('add-user-mutation-element').variables = { name: 'Yohanan' };
  ```

</code-copy>

Or call your element's `mutate()` method with a `variables` argument:

<code-copy>

  ```ts
  document.querySelector('add-user-mutation-element').mutate({
    variables: {
      name: 'Reish Lakish',
    },
  });
  ```

</code-copy>

## Optimistic UI

Apollo client provides us with a feature called [optimistic 
UI](https://www.apollographql.com/docs/react/performance/optimistic-ui/) which 
lets us calculate the *expected* result of a mutation before the GraphQL server 
responds. Set the `optimisticResponse` property on your element to take 
advantage of this. The value of `optimisticResponse` can either be an object 
which represents the expected result value of the mutation, or it can be a 
function which takes a single argument `vars` (the variables for the mutation) 
and return a result object.

```ts
import type { AddUserMutationVariables, AddUserMutationData } from '../generated-schema';
const el = document.querySelector('add-user-mutation-element');
el.optimisticResponse =
  (vars: AddUserMutationVariables): AddUserMutationData => ({
    addUser: {
      data: {
        name: vars.name,
      },
    },
  });
```

## Reacting to Updates

Often, you don't just want to fire a mutation and leave it at that, but you want 
the results of your mutation to update the state of the application as well. In 
the case of our `AddUser` example, we might want to update an existing query for 
list of users.

### Refetch Queries

If you specify the `refetchQueries` property, Apollo client will automatically 
refetch all the queries you list.

```ts
const el = document.querySelector('add-user-mutation-element');
el.refetchQueries = ['UsersQuery'];
```

If you also set the boolean property `awaitRefetchQueries`, then the mutation 
component won't set it's `data` and `loading` properties until after the 
specified queries are also resolved.

You can set the `refetch-queries` attribute as a comma-separated list as well

```html
<add-user-mutation-element
  refetch-queries="UsersQuery,FriendsListQuery"
></add-user-mutation-element>
```

### Updater Function

For more performant and customizable updates, you can define a [mutation update 
function](https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-after-a-mutation). 
See the [cache management guide](/guides/usage/mutations/cache-management/) for 
more info.

## Next Steps

Read about the [`<apollo-mutation>` HTML 
element](/guides/usage/mutations/html/),
dive into the [`ApolloMutation` API](/api/core/interfaces/mutation/) and 
[component lifecycle](/api/core/interfaces/mutation/lifecycle/)
or continue on to the [subscriptions guide](/guides/usage/subscriptions/).
