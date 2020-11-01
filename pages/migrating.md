<meta name="description" content="How to update your Apollo Elements 2 app to Apollo Elements 3"/>

Apollo Client 3 and Apollo Elements 3 both bring with them significant breaking changes. When upgrading your app to `@apollo-elements` 3, follow these steps to ease the transition:

## Replace imports with `@apollo/client/core`
`apollo-client`, `apollo-cache-inmemory`, `apollo-link-*` and others are now supplied by `@apollo/client/core`, so replace your import statements to match.
*NB:* you should always import from `@apollo/client/core`, not from `@apollo/client`, as the latter includes dependencies on `react` which you probably don't need or want. A single import statement from `@apollo/client` in your app can cause the TypeScript compiler to fail if `react` is not installed as a dependency. To avoid this, always import from `@apollo/client/core`.

## Remove calls to `writeData`
If your app used `client.writeData` (e.g. to set default values when loading the cache), you must replace it with calls to either `writeQuery`, `writeFragment` or `cache.modify`. You can also set default values in [field policies](#replace-resolvers-with-type-policies)

## Check Non-Nullable Variables
Query and Subscription elements in `@apollo-elements` 2 tried to check if any non-nullable variables were defined before subscribing. Version 3 simplifies that check, now elements will only check that a client and a query exist before subscribing. To avoid errors, always make sure your variables are set before your query.

### Example

This query reads the "route param" `/:pageId` and exports is at the `$pageId` variable:

<code-copy>

```graphql
query Post($postId: ID!) {
  route @client {
    params {
      postId @export(as: "postId")
    }
  }

  post(postId: $postId) {
    id
    title
    image
    content
  }
}
```

</code-copy>

Let's imagine a client-side router which calculates the `/:pageId` route param from the current page URL, and updates the `routeVar` [reactive variable](https://www.apollographql.com/docs/react/local-state/reactive-variables/) on every page navigation.

<code-copy>

```ts
// router implementation left to reader's imagination
export const routeVar = makeVar(makeRoute(window.location))
router.onNavigate = location => routeVar(makeRoute(location));

const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          route() {
            return routeVar();
          }
        }
      }
    }
  })
});
```

</code-copy>

If a component subscribes to this query automatically when the query property is set (i.e. the default behaviour), the graphql server may respond with an error

> Variable ”$postId“ of required type ”ID!“ was not provided.

For queries like this one, where the variables are dynamic, (e.g. they're based on the current page URL), you have two good options to prevent these kinds of errors:

1. Implement a variable-validating link
2. Override the `shouldSubscribe` method on your components to determine whether they should subscribe


### Option 1: Implement a Variable-Validating Link

This link checks every outgoing operation (e.g. query or mutation) to make sure it has all it's non-nullable variables.

<code-copy>

```ts
import { ApolloLink } from '@apollo/client/link';
import { hasAllVariables } from './has-all-variables';
export const validateVariablesLink =
  new ApolloLink((operation, forward) =>
    hasAllVariables(operation) && forward(operation));
```

</code-copy>

The `<apollo-client uri="/graphql">` component from `@apollo-elements/components/apollo-client` and the `createApolloClient({ validateVariables: true })` helper from `@apollo-elements/lib/create-apollo-client` both incorporate this link.

### Option 2: Override the `shouldSubscribe` Method

With this approach, you can control on a per-component basis when to begin subscribing.

<code-tabs>

<code-tab library="mixins">

```ts
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import PostQuery from './Post.query.graphql';
import { routeVar } from '../variables';

class BlogPost extends ApolloQueryMixin(HTMLElement)<Data, Variables> {
  query = PostQuery;

  shouldSubscribe() {
    return !!(routeVar().params?.postId)
  }
}

customElements.define('blog-post', BlogPost);
```

</code-tab>

<code-tab library="lit-apollo">

```ts
import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';
import PostQuery from './Post.query.graphql';
import { routeVar } from '../variables';

@customElement('blog-post')
class BlogPost extends ApolloQuery<Data, Variables> {
  query = PostQuery;

  shouldSubscribe() {
    return !!(routeVar().params?.postId)
  }
}
```

</code-tab>

<code-tab library="fast">

```ts
import { ApolloQuery, customElement } from '@apollo-elements/fast';
import PostQuery from './Post.query.graphql';
import { routeVar } from '../variables';

@customElement({ name: 'blog-post' })
class BlogPost extends ApolloQuery<Data, Variables> {
  query = PostQuery;

  shouldSubscribe() {
    return !!(routeVar().params?.postId)
  }
}
```

</code-tab>

<code-tab library="hybrids">

```ts
import { define, query, client } from '@apollo-elements/hybrids';
import PostQuery from './Post.query.graphql';
import { routeVar } from '../variables';

function shouldSubscribe() {
  return !!(routeVar().params?.postId)
}

define('blog-post', {
  client: client(window.__APOLLO_CLIENT__),
  query: query(PostQuery),
  shouldSubscribe: { get(host) { return shouldSubscribe(host); } }
});
```

</code-tab>
</code-tabs>

### Opting in to Old Behaviour
The old variable-validating behaviour is still available, but you have to opt-in to get it. Import the `ValidateVariablesMixin` from `@apollo-elements/mixins/validate-variables-mixin` and apply it to your base class

Considering this query:
<code-copy>

```graphql
query NonNullable($nonNull: String!) {
  nonNullable(nonNull: $nonNull)
}
```

</code-copy>

<code-tabs>
<code-tab library="mixins">

```ts
import { ValidateVariablesMixin, ApolloQueryMixin } from '@apollo-elements/mixins';

import NonNullableQuery from './NonNullable.query.graphql';

class NonNullable extends
ValidateVariablesMixin(ApolloQueryMixin(HTMLElement))<Data, Variables> {
  query = NonNullableQuery;
}

customElements.define('non-nullable');
```

</code-tab>

<code-tab library="lit-apollo">

```ts
import { ValidateVariablesMixin } from '@apollo-elements/mixins';
import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';

import NonNullableQuery from './NonNullable.query.graphql';

@customElement('non-nullable')
class NonNullable extends
ValidateVariablesMixin(ApolloQuery)<Data, Variables> {
  query = NonNullableQuery;
}
```

</code-tab>

<code-tab library="fast">

```ts
import { ValidateVariablesMixin } from '@apollo-elements/mixins';
import { ApolloQuery, customElement } from '@apollo-elements/fast';

import NonNullableQuery from './NonNullable.query.graphql';

@customElement({ name: 'non-nullable' })
class NonNullable extends
ValidateVariablesMixin(ApolloQuery)<Data, Variables> {
  query = NonNullableQuery;
}
```

</code-tab>

<code-tab library="hybrids">

There's no `ValidateVariablesMixin` for hybrids, so use one of the other techniques.

</code-tab>
</code-tabs>

## Replace Resolvers with Type Policies
Apollo client 3 deprecates local resolvers in favour of type policies. Your resolvers will still work for now, but it's recommended to migrate them.

Say you had this query, and you wanted to define the client-side type policies for it.

<code-copy>

```graphql
query DetailsOpenQuery {
  eenieOpen @client
  meenieOpen @client
}
```

</code-copy>

In which case you might define the type policies like this:

<code-copy>

```ts
export const DetailsTypePolicies: TypePolicies = {
  Query: {
    fields: {
      eenieOpen: {
        read(prev) { return prev; },
        merge(_, next) { return next; },
      },
      meenieOpen: {
        read(prev) { return prev; },
        merge(_, next) { return next; },
      }
    }
  }
}
```

</code-copy>

Use `TypePoliciesMixin` to declare a component's type policies by setting the `typePolicies` property on the component.

<code-tabs>
<code-tab library="mixins">

```ts
import { ApolloQueryMixin, TypePoliciesMixins } from '@apollo-elements/mixins';

import { DetailsTypePolicies } from './typePolicies';

const template = document.createElement('template');
template.innerHTML = `
  <details id="eenie">
    <summary>Eenie</summary>
    I'm the first mouse
  </details>

  <details id="meenie">
    <summary>Meenie</summary>
    I'm the second mouse
  </details>
`;

class ToggleViews extends TypePoliciesMixin(ApolloQuery)<Data, Variables> {
  query = DetailsOpenQuery;

  typePolicies = DetailsTypePolicies;

  #data: Data = null;

  get data() { return this.#data; }

  set data(value: Data) {
    this.#data = value;
    this.render();
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true))
    for (const details of this.shadowRoot.querySelectorAll('details'))
      details.addEventListener('toggle', this.onToggle.bind(this));
    this.render();
  }

  render() {
    this.shadowRoot.getElementById('eenie').open =
      this.data?.eenieOpen ?? false;

    this.shadowRoot.getElementById('meenie').open =
      this.data?.meenieOpen ?? false;
  }

  onToggle(event) {
    this.client.cache.writeQuery({
      query: this.query,
      data: {
        ...this.data,
        [`${event.target.id}Open`]: event.target.open,
      }
    });
  }
}

customElements.define('toggle-views', ToggleViews);
```

</code-tab>
<code-tab library="lit-apollo">

```ts
import { ApolloQuery, customElement, html } from '@apollo-elements/lit-apollo';

import { TypePoliciesMixins } from '@apollo-elements/mixins/type-policies-mixin';

import { DetailsTypePolicies } from './typePolicies';

@customElement('toggle-views')
class ToggleViews extends TypePoliciesMixin(ApolloQuery)<Data, Variables> {
  query = DetailsOpenQuery;

  typePolicies = DetailsTypePolicies;

  render() {
    return html`
      <details id="eenie"
          ?open="${this.data?.eenieOpen ?? false}"
          @toggle="${this.onToggle}">
        <summary>Eenie</summary>
        I'm the first mouse
      </details>

      <details id="meenie"
          ?open="${this.data?.meenieOpen ?? false}"
          @toggle="${this.onToggle}">
        <summary>Meenie</summary>
        I'm the second mouse
      </details>
    `;
  }

  onToggle(event) {
    this.client.cache.writeQuery({
      query: this.query,
      data: {
        ...this.data,
        [`${event.target.id}Open`]: event.target.open,
      }
    });
  }
}
```

</code-tab>
<code-tab library="fast">

```ts
import { ApolloQuery, customElement, html } from '@apollo-elements/fast';

import { TypePoliciesMixins } from '@apollo-elements/mixins/type-policies-mixin';

import { DetailsTypePolicies } from './typePolicies';

const template = html<ToggleViews>`
  <details id="eenie"
      ?open="${x => x.data?.eenieOpen ?? false}"
      @toggle="${(x, { event }) => x.onToggle(event)}">
    <summary>Eenie</summary>
    I'm the first mouse
  </details>

  <details id="meenie"
      ?open="${x => x.data?.meenieOpen ?? false}"
      @toggle="${(x, { event }) => x.onToggle(event)}">
    <summary>Meenie</summary>
    I'm the second mouse
  </details>
`;

@customElement({ name: 'toggle-views', template })
class ToggleViews extends TypePoliciesMixin(ApolloQuery)<Data, Variables> {
  query = DetailsOpenQuery;

  typePolicies = DetailsTypePolicies;

  onToggle(event) {
    this.client.cache.writeQuery({
      query: this.query,
      data: {
        ...this.data,
        [`${event.target.id}Open`]: event.target.open,
      }
    });
  }
}
```

</code-tab>
<code-tab library="hybrids">

```ts
import { client, query, define, property, html } from '@apollo-elements/fast';

import { DetailsTypePolicies } from './typePolicies';

function onToggle(host, event) {
  host.client.cache.writeQuery({
    query: host.query,
    data: {
      ...host.data,
      [`${event.target.id}Open`]: event.target.open,
    }
  });
}

const render = ({ data }) => html`
  <details id="eenie"
      open="${data.eenieOpen ?? false}"
      ontoggle="${onToggle}">
    <summary>Eenie</summary>
    I'm the first mouse
  </details>

  <details id="meenie"
      open="${data.meenieOpen ?? false}"
      ontoggle="${onToggle}">
    <summary>Meenie</summary>
    I'm the second mouse
  </details>
`;

/**
 * There's no TypePoliciesMixin for hybrids,
 * but you can use this one-line function to do the same
 */
function connnect(host) {
  host.client.cache.policies.addTypePolicies(host.typePolicies);
}

define('toggle-views', {
  render,
  client: client(window.__APOLLO_QUERY__),
  query: query(DetailsOpenQuery),
  typePolicies: property({
    Query: {
      fields: {
        eenieOpen: {
          read(prev) { return prev; },
          merge(_, next) { return next; },
        },
        meenieOpen: {
          read(prev) { return prev; },
          merge(_, next) { return next; },
        }
      }
    }
  }, connect),
});
```

</code-tab>
</code-tabs>