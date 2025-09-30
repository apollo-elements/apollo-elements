---
title: "Mutations"
sidebar: guides
weight: 30
description: "How to use Apollo Elements to write declarative GraphQL mutation web components"
---

Mutation components combine a <abbr title="Graph query language">GraphQL</abbr> mutation with a custom element which you would typically define with a <abbr title="document object model">DOM</abbr> template and optionally some custom JavaScript behaviours. Mutation component encapsulate GraphQL mutation actions with a template for their resulting data, and/or their input fields.

<inline-notification type="tip">

This page is a HOW-TO guide. For detailed docs on the `ApolloMutation` interface see the [API docs](/api/core/interfaces/mutation/)

</inline-notification>

Mutations are how you make changes to the data in your GraphQL application. If you think of queries as analogous to <abbr title="hypertext transfer protocol">HTTP</abbr> [`GET` requests](https://www.wikiwand.com/en/Hypertext_Transfer_Protocol#/Request_methods) or <abbr title="structured query language">[SQL](https://www.wikiwand.com/en/SQL)</abbr> `READ` statements, then mutations are kind of like HTTP `POST` requests or SQL `WRITE` statements.

Unlike [query components](/guides/usage/queries/), which automatically fetch their data by default, mutation components don't do anything until you program them to, e.g. in reaction to the user pressing a "save" button or entering text in a text field. Mutation components, or indeed the imperative call to their `mutate()` method, take options to control how the mutation is performed and how the application should respond when it succeeds and returns a result.

Apollo Elements gives you four options for defining mutations in your <abbr title="user interface">UI</abbr>, which you can mix and match them, depending on your particular needs.

1. Using the [`<apollo-mutation>` component](#with-apollo-mutation)
2. Using the [`ApolloMutationController`](#apollomutationcontroller)
3. Making a [mutation component](#mutation-components) by extending `ApolloMutation` or by using `useMutation`
4. Calling `client.mutate` [imperatively](#imperative-mutations)


## HTML Mutations

<!-- maintain links to the old heading -->
<a id="with-apollo-mutation"></a>

You can declaratively define mutations using the `<apollo-mutation>` HTML element from `@apollo-elements/components`. Provide the GraphQL mutation, variable input fields, and result template as children of the element.

```html copy
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

Read more about declarative mutations in [using `<apollo-mutation>`](./html/) and [composing mutations](./composition/) or check out the [mutation component API docs](/api/components/apollo-mutation/).

## ApolloMutationController

Add a mutation to your component by creating an [`ApolloMutationController`](/api/core/controllers/mutation/). Call it's `mutate()` method to fire the mutation. You can use it on any element which implements `ReactiveControllerHost`, e.g. `LitElement`, or you can use it on `HTMLElement` if you apply `ControllerHostMixin` from [`@apollo-elements/mixins`](/api/libraries/mixins/controller-host-mixin/)

```js copy
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

## Custom Mutation Elements

<!-- maintain links to the old heading -->
<a id="mutation-components"></a>

Unlike query and subscription components, mutation components don't automatically send a request to the GraphQL server. You have to call their `mutate()` method to issue the mutation, typically in response to some user input.

As such, you can only expect your component's `data` property to be truthy once the mutation resolves.

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}}{{<include add-user-html.html>}}{{</code-tab>}}
  {{<code-tab package="mixins">}}{{<include add-user-mixins.ts>}}{{</code-tab>}}
  {{<code-tab package="lit">}}{{<include add-user-lit.ts>}}{{</code-tab>}}
  {{<code-tab package="fast">}}{{<include add-user-fast.ts>}}{{</code-tab>}}
  {{<code-tab package="haunted">}}{{<include add-user-haunted.ts>}}{{</code-tab>}}
  {{<code-tab package="atomico">}}{{<include add-user-atomico.tsx>}}{{</code-tab>}}
  {{<code-tab package="hybrids">}}{{<include add-user-hybrids.ts>}}{{</code-tab>}}
</code-tabs>

The key here is the `<mwc-button>` element which, on click, calls the element's `mutate()` method. Until the user clicks that button and the mutation resolves, the element will have a null `data` property, and therefore the `<dl>` element which displays the mutation result will remain hidden.

## Imperative Mutations

You don't need to define a component in order to issue a mutation. The Apollo client instance has a `mutate()` method which you can call imperatively at any time. This is good for one-off actions, or for when you want to issue a mutation programatically, i.e. not in response to a user action.

```ts copy
onClickSubmit() {
  const { data, error, loading } =
    await this.client.mutate({ mutation, variables });
}
```

## Mutation Variables

Set the `variables` DOM property on your mutation component using JavaScript:

```ts copy
document.querySelector('add-user-mutation-element').variables = { name: 'Yohanan' };
```

Or call your element's `mutate()` method with a `variables` argument:

```ts copy
document.querySelector('add-user-mutation-element').mutate({
  variables: {
    name: 'Reish Lakish',
  },
});
```

## Optimistic UI

Apollo client provides us with a feature called [optimistic UI](https://www.apollographql.com/docs/react/performance/optimistic-ui/) which lets us calculate the *expected* result of a mutation before the GraphQL server responds. Set the `optimisticResponse` property on your element to take advantage of this. The value of `optimisticResponse` can either be an object which represents the expected result value of the mutation, or it can be a function which takes a single argument `vars` (the variables for the mutation) and return a result object.

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

Often, you don't just want to fire a mutation and leave it at that, but you want the results of your mutation to update the state of the application as well. In the case of our `AddUser` example, we might want to update an existing query for list of users.

### Refetch Queries

If you specify the `refetchQueries` property, Apollo client will automatically refetch all the queries you list.

```ts
const el = document.querySelector('add-user-mutation-element');
el.refetchQueries = ['UsersQuery'];
```

If you also set the boolean property `awaitRefetchQueries`, then the mutation component won't set it's `data` and `loading` properties until after the specified queries are also resolved.

You can set the `refetch-queries` attribute as a comma-separated list as well

```html
<add-user-mutation-element
    refetch-queries="UsersQuery,FriendsListQuery"
></add-user-mutation-element>
```

### Updater Function

For more performant and customizable updates, you can define a [mutation update function](https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-after-a-mutation). See the [cache management guide](/guides/usage/mutations/cache-management/) for more info.

## Next Steps

Read about the [`<apollo-mutation>` HTML element](/guides/usage/mutations/html/),
dive into the [`ApolloMutation` API](/api/core/interfaces/mutation/) and [component lifecycle](/api/core/interfaces/mutation/lifecycle/)
or continue on to the [subscriptions guide](/guides/usage/subscriptions/).
