---
title: "From Apollo Client 2.0"
weight: 20
sidebar: guides
---

Apollo Client 3 and Apollo Elements 3 both bring with them significant breaking changes. When upgrading your app to `@apollo-elements` 3, follow these steps to ease the transition:

### Replace imports with `@apollo/client/core`
`apollo-client`, `apollo-cache-inmemory`, `apollo-link-*` and others are now supplied by `@apollo/client/core`, so replace your import statements to match.
*NB:* you should always import from `@apollo/client/core`, not from `@apollo/client`, as the latter includes dependencies on `react` which you probably don't need or want. A single import statement from `@apollo/client` in your app can cause the TypeScript compiler to fail if `react` is not installed as a dependency. To avoid this, always import from `@apollo/client/core`.

### Remove calls to `writeData`
If your app used `client.writeData` (e.g. to set default values when loading the cache), you must replace it with calls to either `writeQuery`, `writeFragment` or `cache.modify`. You can also set default values in [field policies](#replace-resolvers-with-type-policies)

### Check Non-Nullable Variables
Query and Subscription elements in `@apollo-elements` 2 tried to prevent operations with non-nullable variables from fetching if their required arguments were null or undefined. Version 3 removes that check by default, so as long as there's a client and a query, they subscribe immediately. To avoid errors, always make sure to set your variables before you query.

To keep components from fetching until they have their required variables, see [Validating Variables](/guides/cool-tricks/validating-variables/).

### Replace Resolvers with Type Policies
Apollo client 3 deprecates local resolvers in favour of type policies. Your resolvers will still work for now, but it's recommended to migrate them.

Say you had this query, and you wanted to define the client-side type policies for it.

```graphql copy
query DetailsOpenQuery {
  eenieOpen @client
  meenieOpen @client
}
```

In which case you might define the type policies like this:

```ts copy
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

Use `TypePoliciesMixin` to declare a component's type policies by setting the `typePolicies` property on the component.

{{< code-tabs collection="libraries" default="lit" >}}

  ```html tab html
  <p>HTML apps should set all their type policies on the <code>apollo-client</code> element</p>
  <apollo-client>...</apollo-client>
  <script>
    import('./typePolicies')
      .then(({ DetailsTypePolicies }) => {
        document
          .currentScript
          .getRootNode()
          .querySelector('apollo-client')
          .typePolicies = DetailsTypePolicies;
      });
  </script>
  ```
  ```

  ```ts tab mixins
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

  ```ts tab lit
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

  ```ts tab fast
  import { ApolloQuery, customElement, html } from '@apollo-elements/fast';

  import { TypePoliciesMixins } from '@apollo-elements/mixins/type-policies-mixin';

  import { DetailsTypePolicies } from './typePolicies';

  const template: ViewTemplate = html`
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

  ```ts tab haunted
  import { useQuery, useEffect, component, html } from '@apollo-elements/haunted';

  import { DetailsTypePolicies } from './typePolicies';

  function ToggleViews() {
    const { client, data } = useQuery(DetailsOpenQuery)

    /**
     * There's no TypePoliciesMixin for haunted,
     * but you can use the `useEffect` hook to do the same
     */
    useEffect(({ host: { client } }) => {
      client.cache.policies.addTypePolicies(DetailsTypePolicies);
    }, [client]);

    function onToggle(event) {
      client.cache.writeQuery({
        query: DetailsOpenQuery,
        data: {
          ...data,
          [`${event.target.id}Open`]: event.target.open,
        }
      });
    }

    return html`
      <details id="eenie"
          ?open="${data.eenieOpen ?? false}"
          @toggle="${onToggle}">
        <summary>Eenie</summary>
        I'm the first mouse
      </details>

      <details id="meenie"
          ?open="${data.meenieOpen ?? false}"
          @toggle="${onToggle}">
        <summary>Meenie</summary>
        I'm the second mouse
      </details>
    `;
  }

  customElements.define('toggle-views', component(ToggleViews));
  ```

  ```ts tab hybrids
  import { query, define, property, html } from '@apollo-elements/hybrids';

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
  function connect(host) {
    host.client.cache.policies.addTypePolicies(host.typePolicies);
  }

  define('toggle-views', {
    render,
    query: query(DetailsOpenQuery),
    typePolicies: property(DetailsTypePolicies, connect),
  });
  ```

{{< /code-tabs >}}
