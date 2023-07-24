---
title: Migrating
eleventyNavigation:
  order: 50
description: How to update your Apollo Elements 2 app to Apollo Elements 3
---

> Migrating from Apollo Client 2? See the [previous migration 
> guide](./apollo-client-2/)

## From `@apollo-elements/components` 1.x

Version 2 Removes `variables` and `trigger` named slots from 
`<apollo-mutation>`, replacing them with a single anonymous slot. This gives 
users more control over their mutation components.

The previous named-slot-based API assumed that the user wanted the trigger to 
appear in the DOM after the variable-inputs, but this isn't always what the user 
wants. Users also had to make their inputs and triggers direct children of the 
mutation element - it would not work if they nested them in `<label>` or 
`<header>` elements, for example.

Instead of using `slot="variable"` add a `data-variable` attribute to any 
input-like element that represents a variable, e.g. `<input 
data-variable="varName"\>` would represent the value of the `varName` variable.

Similarly, to assign a button-like element as the trigger, add a `trigger` 
attribute to it.

Version 2 also removes the protected `trigger` and `button` accessors, and 
replaces them with `triggers` and `buttons`, which return `NodeList`s.

<article class="before-after">

```html
<apollo-mutation input-key="input">
  <!-- Oops! appears after `a-input` in shadow DOM -->
  <button slot="trigger">Mutate!</button>

  <label>
   <span>Name:</span>
   <!-- Oops! Not slotted into `<apollo-mutation>`! -->
   <input slot="variable" data-variable="name"/>
  </label>
</apollo-mutation>
```


<code-copy>

```html
<apollo-mutation input-key="input">
  <button trigger>Mutate!</button>

  <label>
   <span>A:</span>
   <input data-variable="name"/>
  </label>
</apollo-mutation>
```

</code-copy>

</article>

## From `@apollo-elements/fast` 1.x

If you used inline GraphQL script children or JSON script variables, import and 
apply `GraphQLScriptChildMixin`

<article class="before-after">

```js
import { ApolloQuery } from '@apollo-elements/fast';
export class QueryElement extends ApolloQuery {/*...*/}
```

```js
import { ApolloQuery } from '@apollo-elements/fast';
import { GraphQLScriptChildMixin } from '@apollo-elements/mixins';
export class QueryElement extends GraphQLScriptChildMixin(ApolloQuery) {/*...*/}
```

</article>

## From `@apollo-elements/haunted` 1.x

Previous versions mixed the ApolloElement interface into the host element. This 
was a bad hack, if you relied on it (e.g. by referencing `this.data`, etc.), 
change your references to the hook controller instead.

<article class="before-after">

```js
function QueryComponent() {
  const { data } = useQuery(SomeQuery);
  useEffect(() => {
    this.dispatchEvent(new CustomEvent('data'))
  }, [data]);
}

customElements.define('query-component', component(QueryComponent));

document.querySelector('query-component')
  .addEventListener('data', event => {
    // referencing `data` on the element - Bad!
    const { data } = event.target;
  });
```

```js
function UsesQueryComponent() {
  const { data } = useQuery(SomeQuery);

  useEffect(() => {
    this.dispatchEvent(new CustomEvent('data', { detail: { data } }))
  }, [data]);
}

customElements.define('uses-query-component', component(UsesQueryComponent));

document.querySelector('uses-query-component')
  .addEventListener('data', event => {
    // referencing `data` from the hook's controller - Better!
    const { data } = event.detail;
  });
```

</article>

## From `@apollo-elements/hybrids` 3.x

Previous versions required the use of the `client` factory to mix the 
ApolloElement interface into the host element. Render functions and other 
references to the host would access the query data on `host.data`, etc.

Version 4 removes the `client` factory and keeps the GraphQL data within the 
factory's controller.
Change your references from the host to the factory's property:

<article class="before-after">

```js
define('query-component', {
  client: client(),
  query: query(SomeQuery),
  render: host => html`
    <output>${host.data}</output>
  `,
});
```

```js
define('has-a-query-component', {
  query: query(SomeQuery),
  render: host => html`
    <output>${host.query.data}</output>
  `,
});
```

</article>

Version 4 also removes the pre-made hybrids spread objects altogether. Use the 
factories instead.

<article class="before-after">

```js
define('query-component', {
  ...ApolloQuery,
  render: host => html`
    <output>${host.data}</output>
  `,
});

document.querySelector('query-component').query = SomeQuery;
```

```js
define('has-a-query-component', {
  query: query(null),
  render: host => html`
    <output>${host.query.data}</output>
  `,
});

document.querySelector('query-component').query.query = SomeQuery;
```

</article>

## From `@apollo-elements/lit-apollo` 3.x

If you used inline GraphQL script children or JSON script variables, import and 
apply `GraphQLScriptChildMixin`

<article class="before-after">

```js
import { ApolloQuery } from '@apollo-elements/lit-apollo';
export class QueryElement extends ApolloQuery {/*...*/}
```

```js
import { GraphQLScriptChildMixin } from '@apollo-elements/mixins';
import { ApolloQuery } from '@apollo-elements/lit-apollo';
export class QueryElement extends GraphQLScriptChildMixin(ApolloQuery) {/*...*/}
```

</article>

More broadly, Lit users should now prefer to use controllers from `core` over 
the `lit-apollo` package.

<article class="before-after">

```js
import { ApolloQuery } from '@apollo-elements/lit-apollo';
export class QueryElement extends ApolloQuery {
  query = SomeQuery;
  render() {
    const { data, error, loading } = this;
    return html` ... `;
  }
}
```

```js
import { ApolloQueryController } from '@apollo-elements/core';
export class QueryElement extends LitElement {
  query = new ApolloQueryController(this, SomeQuery);

  render() {
    const { data, error, loading } = this.query;
    return html` ... `;
  }
}
```

</article>

## From `@apollo-elements/mixins` 3.x

If you used inline GraphQL script children or JSON script variables, import and 
apply `GraphQLScriptChildMixin`

<article class="before-after">

```js
import { ApolloQueryMixin } from '@apollo-elements/mixins';
export class QueryElement extends ApolloQueryMixin(HTMLElement) {/*...*/}
```

```js
import { ApolloQueryMixin, GraphQLScriptChildMixin } from '@apollo-elements/mixins';
export class QueryElement extends GraphQLScriptChildMixin(ApolloQueryMixin(HTMLElement)) {/*...*/}
```

</article>

More broadly, mixins users can use controller-based workflows by applying the 
`ControllerHostMixin`:

<article class="before-after">

```js
import { ApolloQueryMixin } from '@apollo-elements/mixins';
import { SomeQuery } from './Some.query.graphql';
export class QueryElement extends ApolloQueryMixin(HTMLElement)<typeof SomeQuery> {
  myRenderCallback() {
    // get the query data on the element
    const { data } = this;
    // ...somehow render the query data
  }
}
```

```js
import { ControllerHostMixin } from '@apollo-elements/mixins';
import { SomeQuery } from './Some.query.graphql';

export class ElementWithAQuery extends ControllerHostMixin(HTMLElement) {
  query = new ApolloQueryController(this, SomeQuery);

  update() {
    this.myRenderCallback()
    // Don't forget the super call
    super.update();
  }

  myRenderCallback() {
    // get the query data from the Controller
    const { data } = this.query;
    // ...somehow render the query data
  }
}
```

</article>

## From `@apollo-elements/polymer` 3.x

The element names and import paths have changed. Prefix them with `polymer-`.

<article class="before-after">

```js
import '@apollo-elements/polymer/apollo-query';
class MyElement extends PolymerElement {
  static get template() {
    return html`
      <apollo-query></apollo-query>
    `
  }
}
```

```js
import '@apollo-elements/polymer/polymer-apollo-query';
class MyElement extends PolymerElement {
  static get template() {
    return html`
      <polymer-apollo-query></polymer-apollo-query>
    `
  }
}
```

</article>
