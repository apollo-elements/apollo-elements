# Building Apps >> Local State || 40

<meta name="description" data-helmet
      content="Introductory recipes for managing local state with Apollo Elements" />

Apollo Client 3 provides a number of ways to manage local state in your app.

## Reading Local State

Like in Apollo Client 2.x, you can get your stored local state in the apollo cache by using the `@client` directive in queries:

```graphql copy
query AppQuery {
  theme @client
  user @client { name picture }
}
```

## Writing Local State
Apollo Client 3 removes the `writeData` method from `ApolloClient`, as well it deprecates the concept of "local resolvers". Rather than defining resolver functions for your local state, you should now instead define type policies for local fields. Type Policies are not limited to local state. For example, if the server returns ISO 8601 Date Format string, you can define a type policy which converts it to a Date object, or formats the string according to the user's locale. We'll focus from now on on managing local state with apollo-elements.

How you update a piece of your local state depends on how you define that field's type policy. Generally speaking, you have three options:

1. Store the state in the apollo cache. This is most similar to the pattern from Apollo Client 2.x
2. Store the state in new Apollo Client 3 "Reactive Variables"
3. Bring your own storage (i.e. LocalStorage or IndexedDB)

Each approach has pros and cons, and we'll try to address them all here

### Storing State in the Apollo Cache

To update your state in the apollo cache, use `writeFragment` or `writeQuery`.

Say we wanted to toggle the page's colour scheme by changing the `theme` field on the root query:

```graphql copy
query ThemeToggle {
  theme @client
}
```

Let's define a custom element that displays a button to toggle the theme.

<code-tabs collection="libraries">

  ```ts tab mixins
  import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

  type Theme = 'dark'|'light';
  type Data = { theme: Theme };

  const template = document.createElement('template');
  template.innerHTML = '<button @click="${this.toggleTheme}"></button>';
  template.content.append(new Text('Change to '));
  template.content.append(new Text(''));
  template.content.append(new Text(' theme'));

  export class ThemeToggle extends ApolloQueryMixin(HTMLElement)<Data, null> {
    query = ThemeToggleQuery;

    #data: Data = null;
    get data() { return this.#data; }
    set data(value: Data) {
      this.#data = data;
      this.render();
    }

    get nextTheme(): Theme {
      return this.data?.theme === 'dark' ? 'light' : 'dark';
    }

    $(selector) { return this.shadowRoot.querySelector(selector); }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(template.content.cloneNode(true));
      this.$('button').addEventListener('click', this.toggleTheme.bind(this));
    }

    render() {
      const [, nextTheme] = this.$('button').childNodes;
      nextTheme.data = this.nextTheme;
    }

    toggleTheme() {
      // TBD
    }
  }

  customElements.define('theme-toggle', ThemeToggle);
  ```

  ```ts tab lit
  import { ApolloQuery, customElement, html } from '@apollo-elements/lit-apollo';

  type Theme = 'dark'|'light';
  type Data = { theme: Theme };

  @customElement('theme-toggle')
  class ThemeToggle extends ApolloQuery<Data, null> {
    query = ThemeToggleQuery;

    get nextTheme(): Theme {
      return this.data?.theme === 'dark' ? 'light' : 'dark';
    }

    render() {
      return html`
        <button @click="${this.toggleTheme}">
          Change to ${this.nextTheme} theme
        </button>
      `;
    }

    toggleTheme() {
      // TBD
    }
  }
  ```

  ```ts tab fast
  import { ApolloQuery, customElement, html } from '@apollo-elements/fast';

  type Theme = 'dark'|'light';
  type Data = { theme: Theme };

  const template = html<ThemeToggle>`
    <button @click="${x => x.toggleTheme()}">
      Change to ${x => x.nextTheme} theme
    </button>
  `;

  @customElement({ name: 'theme-toggle', template})
  class ThemeToggle extends ApolloQuery<Data, null> {
    query = ThemeToggleQuery;

    get nextTheme(): Theme {
      return this.data?.theme === 'dark' ? 'light' : 'dark';
    }

    toggleTheme() {
      // TBD
    }
  }
  ```

  ```ts tab haunted
  import { useQuery, component, html } from '@apollo-elements/haunted';

  type Theme = 'dark'|'light';
  type Data = { theme: Theme };

  function ThemeToggle() {
    const { data } = useQuery<Data, null>(ThemeToggleQuery);

    const nextTheme = data?.theme === 'dark' ? 'light' : 'dark';

    function toggleTheme(host) {
      // TBD
    }

    return html`
      <button @click="${toggleTheme}">
        Change to ${nextTheme} theme
      </button>
    `,
  }

  customElements.define('theme-toggle', component(ThemeToggle));
  ```

  ```ts tab hybrids
  import { client, query, define, html } from '@apollo-elements/hybrids';

  type Theme = 'dark'|'light';
  type Data = { theme: Theme };

  function toggleTheme(host) {
    // TBD
  }

  define('theme-toggle', {
    client: client(window.__APOLLO_CLIENT__),
    query: query<Data, null>(ThemeToggleQuery),
    nextTheme: {
      get(host) {
        host.data?.theme === 'dark' ? 'light' : 'dark';
      }
    },
    render: ({ data, nextTheme }) => html`
      <button onclick="${toggleTheme}">
        Change to ${nextTheme} theme
      </button>
    `,
  });
  ```

</code-tabs>

In order for our query to load the user's theme preference from their browser or OS settings, we'll define a type policy for the `theme` field.

```ts copy
import type { TypePolicy } from '@apollo/client/core';

/** Get the user's Browser-or-OS preferred theme */
function getUAPreferredTheme(): Theme {
  const { matches } = window.matchMedia('prefers-color-scheme: dark');
  return matches ? 'dark' : 'light';
}

export const typePolicies: TypePolicy = {
  Query: {
    fields: {
      theme(existing: Theme): Theme {
        return existing ?? getUAPreferredTheme();
      }
    }
  }
}
```

We can register that type policy eagerly when we create our `ApolloClient` instance:

```ts copy
const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache({ typePolicies }),
})
```

or we can use [`TypePoliciesMixin`](/guides/cool-tricks/code-splitting/#typepoliciesmixin) to lazy-load the type policies when the component connects:

<code-tabs collection="libraries">

  ```ts tab mixins
  import { ApolloQueryMixin, TypePoliciesMixin } from '@apollo-elements/mixins';
  import { typePolicies } from './typePolicies';

  @customElement('theme-toggle')
  class ThemeToggle extends
  TypePoliciesMixin(ApolloQueryMixin(HTMLElement))<Data, null> {
    typePolicies = typePolicies;

    // ...
  }
  ```

  ```ts tab lit
  import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
  import { typePolicies } from './typePolicies';

  @customElement('theme-toggle')
  class ThemeToggle extends TypePoliciesMixin(ApolloQuery)<Data, null> {
    typePolicies = typePolicies;

    // ...
  }
  ```

  ```ts tab fast
  import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
  import { typePolicies } from './typePolicies';

  @customElement({ name: 'theme-toggle', template })
  class ThemeToggle extends TypePoliciesMixin(ApolloQuery)<Data, null> {
    typePolicies = typePolicies;

    // ...
  }
  ```

  ```ts tab haunted
  import { useQuery, useEffect, component, html } from '@apollo-elements/haunted';
  import { typePolicies } from './typePolicies';

  function ThemeToggle({ client }) {
    const { data } = useQuery<Data, null>(ThemeToggleQuery);

    /**
     * There's no TypePoliciesMixin for haunted,
     * but you can use the `useEffect` hook to do the same
     */
    useEffect(({ host: { client } }) => {
      client.cache.policies.addTypePolicies(typePolicies);
    }, [client]);

    const nextTheme = data?.theme === 'dark' ? 'light' : 'dark';

    function toggleTheme(host) {
      // TBD
    }

    return html`
      <button @click="${toggleTheme}">
        Change to ${nextTheme} theme
      </button>
    `,
  }
  ```

  ```ts tab hybrids
  import { typePolicies } from './typePolicies';

  /**
   * There's no TypePoliciesMixin for hybrids,
   * but you can use this one-line function to do the same
   */
  function connect(host) {
    host.client.cache.policies.addTypePolicies(host.typePolicies);
  }

  define('theme-toggle', {
    //... code from previous steps
    typePolicies: property(typePolicies, connect),
  });
  ```

</code-tabs>

All that's left is to define the `toggleTheme` function to actually update the cache:

<code-tabs collection="libraries">

  ```ts tab mixins
  toggleTheme() {
    const theme = this.nextTheme;
    this.client.writeQuery({
      query: this.query,
      data: { theme },
    });
  }
  ```

  ```ts tab lit
  toggleTheme() {
    const theme = this.nextTheme;
    this.client.writeQuery({
      query: this.query,
      data: { theme },
    });
  }
  ```

  ```ts tab fast
  toggleTheme() {
    const theme = this.nextTheme;
    this.client.writeQuery({
      query: this.query,
      data: { theme },
    });
  }
  ```

  ```ts tab haunted
  function toggleTheme() {
    const theme = nextTheme;
    client.writeQuery({
      query: ToggleThemeQuery,
      data: { theme },
    });
  }
  ```

  ```ts tab hybrids
  function toggleTheme(host) {
    const theme = host.nextTheme;
    host.client.writeQuery({
      query: host.query,
      data: { theme },
    });
  }
  ```

</code-tabs>

## Storing State in Reactive Variables

We can acheive the same effect using the new `makeVar` function from Apollo Client. First we'll define our theme variable, initializing it with the user preference:

```ts copy
import { makeVar } from '@apollo/client/core';

export const themeVar = makeVar<Theme>(getUAPreferredTheme());
```

Then we'll modify our type policy to read the value from that variable:

```ts copy
import { themeVar } from './variables';

export const typePolicies: TypePolicy = {
  Query: {
    fields: {
      theme(): Theme {
        return themeVar();
      }
    }
  }
}
```

Last, we'll refactor the `toggleTheme` method to directly update the value of `themeVar`. We do that by calling `themeVar` with a value. Apollo Client will ensure that all queries that depend on `theme` will get the new value every time we call.

<code-tabs collection="libraries">

  ```ts tab mixins
  toggleTheme() {
    themeVar(this.nextTheme);
  }
  ```

  ```ts tab lit
  toggleTheme() {
    themeVar(this.nextTheme);
  }
  ```

  ```ts tab fast
  toggleTheme() {
    themeVar(this.nextTheme);
  }
  ```

  ```ts tab haunted
  function toggleTheme() {
    themeVar(nextTheme);
  }
  ```

  ```ts tab hybrids
  function toggleTheme(host) {
    themeVar(host.nextTheme);
  }
  ```

</code-tabs>

## Bringing our own Storage

If for whatever reason we prefer to store a piece of state ourselves, we can redefine the type policy to read from that storage. Here's an example using localStorage:

```ts copy
export const typePolicies: TypePolicy = {
  Query: {
    fields: {
      theme(): Theme {
        return localStorage.getItem('theme') ?? getUAPreferredTheme();
      }
    }
  }
}
```

Now in order to update the theme, we need to perform two steps:
1. Change the stored value
2. Invalidate the Apollo cache's value for theme on the root query using the `evict` method on `InMemoryCache`.

<code-tabs collection="libraries">

  ```ts tab mixins
  toggleTheme() {
    localStorage.setItem('theme', this.nextTheme);
    this.client.cache.evict({ fieldName: 'theme' });
  }
  ```

  ```ts tab lit
  toggleTheme() {
    localStorage.setItem('theme', this.nextTheme);
    this.client.cache.evict({ fieldName: 'theme' });
  }
  ```

  ```ts tab fast
  toggleTheme() {
    localStorage.setItem('theme', this.nextTheme);
    this.client.cache.evict({ fieldName: 'theme' });
  }
  ```

  ```ts tab haunted
  function toggleTheme() {
    localStorage.setItem('theme', nextTheme);
    client.cache.evict({ fieldName: 'theme' });
  }
  ```

  ```ts tab hybrids
  function toggleTheme(host) {
    localStorage.setItem('theme', host.nextTheme);
    host.client.cache.evict({ fieldName: 'theme' });
  }
  ```

</code-tabs>

Note that type policy read functions *must be synchronous*. If you need to perform async work to read a value, you'll need some helper that uses reactive variables underneath. See the [issue on apollo-client](https://github.com/apollographql/apollo-client/issues/6852) which discusses the reason why and provides a workaround.
