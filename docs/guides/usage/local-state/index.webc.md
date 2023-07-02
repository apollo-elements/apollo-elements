---
title: Local State
permalink: /guides/usage/local-state/index.html
eleventyNavigation:
  order: 50
templateEngineOverride: webc,md
description: Introductory recipes for managing local state with Apollo Elements
---

Apollo Client 3 provides a number of ways to manage local state in your app.

## Reading Local State

Like in Apollo Client 2.x, you can get your stored local state in the apollo 
cache by using the `@client` directive in queries:

<code-copy>

  ```graphql
  query AppQuery {
    theme @client
    user @client { name picture }
  }
  ```

</code-copy>

## Writing Local State
Apollo Client 3 removes the `writeData` method from `ApolloClient`, as well it 
deprecates the concept of "local resolvers". Rather than defining resolver 
functions for your local state, you should now instead define type policies for 
local fields. Type Policies are not limited to local state. For example, if the 
server returns ISO 8601 Date Format string, you can define a type policy which 
converts it to a Date object, or formats the string according to the user's 
locale. We'll focus from now on on managing local state with apollo-elements.

How you update a piece of your local state depends on how you define that 
field's type policy. Generally speaking, you have three options:

1. Store the state in the apollo cache. This is most similar to the pattern from 
   Apollo Client 2.x
2. Store the state in new Apollo Client 3 "Reactive Variables"
3. Bring your own storage (i.e. LocalStorage or IndexedDB)

Each approach has pros and cons, and we'll try to address them all here

### Storing State in the Apollo Cache

To update your state in the apollo cache, use `writeFragment` or `writeQuery`.

Say we wanted to toggle the page's colour scheme by changing the `theme` field 
on the root query:

<code-copy>

  ```graphql
  query ThemeToggle {
    theme @client
  }
  ```

</code-copy>


Let's define a custom element that displays a button to toggle the theme.

<code-tabs collection="libraries" default-tab="lit">
  <code-tab @tab="$data.codeTabs.html">

  ```html
  <apollo-query>
    <template>
      <button @click="{%raw%}{{ toggleTheme }}{%endraw%}">
        Change to {%raw%}{{ data.theme === 'dark' ? 'light' : 'dark' }}{%endraw%} theme
      </button>
    </template>
  </apollo-query>

  <script>
    document.currentScript.getRootNode()
      .querySelector('apollo-query')
      .extras = {
        toggleTheme() {
          // TBD
        }
      }
  </script>
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.mixins">

  ```ts
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

  </code-tab>
  <code-tab @tab="$data.codeTabs.lit">

  ```ts
  import { ApolloQueryController } from '@apollo-elements/core';
  import { LittElement, html } from 'lit';
  import { customElement } from 'lit/decorators.js';

  type Theme = 'dark'|'light';
  type Data = { theme: Theme };

  @customElement('theme-toggle')
  class ThemeToggle extends LitElement {
    query = new ApolloQueryController(this, ThemeToggleQuery);

    get nextTheme(): Theme {
      return this.query.data?.theme === 'dark' ? 'light' : 'dark';
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

  </code-tab>
  <code-tab @tab="$data.codeTabs.fast">

  ```ts
  import { FASTElement, customElement, html, ViewTemplate } from '@microsoft/fast-element';
  import { ApolloQueryBehavior } from '@apollo-elements/fast';

  type Theme = 'dark'|'light';
  type Data = { theme: Theme };

  const template: ViewTemplate<ThemeToggle> = html`
    <fast-button @click="${x => x.toggleTheme()}">
      Change to ${x => x.nextTheme} theme
    </fast-button>
  `;

  @customElement({ name: 'theme-toggle', template})
  class ThemeToggle extends FASTElement {
    query = new ApolloQueryBehavior(this, ThemeToggleQuery);

    get nextTheme(): Theme {
      return this.query.data?.theme === 'dark' ? 'light' : 'dark';
    }

    toggleTheme() {
      // TBD
    }
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.haunted">

  ```ts
  import { useQuery, component, html } from '@apollo-elements/haunted';

  type Theme = 'dark'|'light';
  type Data = { theme: Theme };

  function ThemeToggle() {
    const { data } = useQuery(ThemeToggleQuery);

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

  </code-tab>
  <code-tab @tab="$data.codeTabs.atomico">

  ```tsx
  import { useQuery, c } from '@apollo-elements/atomico';

  type Theme = 'dark'|'light';
  type Data = { theme: Theme };

  function ThemeToggle() {
    const { data } = useQuery(ThemeToggleQuery);

    const nextTheme = data?.theme === 'dark' ? 'light' : 'dark';

    function toggleTheme(host) {
      // TBD
    }

    return (
      <host>
        <button onclick={toggleTheme}>
          Change to {nextTheme} theme
        </button>
      </host>
    );
  }

  customElements.define('theme-toggle', c(ThemeToggle));
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.hybrids">

  ```ts
  import { query, define, html } from '@apollo-elements/hybrids';

  type Theme = 'dark'|'light';
  type Data = { theme: Theme };

  function toggleTheme(host) {
    // TBD
  }

  define('theme-toggle', {
    query: query(ThemeToggleQuery),
    nextTheme: {
      get(host) {
        host.query.data?.theme === 'dark' ? 'light' : 'dark';
      }
    },
    render: ({ query: { data }, nextTheme }) => html`
      <button onclick="${toggleTheme}">
        Change to ${nextTheme} theme
      </button>
    `,
  });
  ```

  </code-tab>
</code-tabs>

In order for our query to load the user's theme preference from their browser or 
OS settings, we'll define a type policy for the `theme` field.

<code-copy>

  ```ts
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

</code-copy>

We can register that type policy eagerly when we create our `ApolloClient` 
instance:

<code-copy>

  ```ts
  const client = new ApolloClient({
    link: new HttpLink({ uri: '/graphql' }),
    cache: new InMemoryCache({ typePolicies }),
  })
  ```

</code-copy>

or we can use 
[`TypePoliciesMixin`](/guides/cool-tricks/code-splitting/#typepoliciesmixin) to 
lazy-load the type policies when the component connects:

<code-tabs collection="libraries" default-tab="lit">
  <code-tab @tab="$data.codeTabs.html">

  ```html
  <apollo-client>
    <apollo-query>
      <!-- ... -->
    </apollo-query>
  </apollo-client>

  <script>
    import('./typePolicies')
      .then(({ typePolicies }) => {
        // In the case of HTML components,
        // register type policies on the <apollo-client> element
        document.currentScript.getRootNode()
          .querySelector('apollo-client')
          .typePolicies = typePolicies;
      });
  </script>
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.mixins">

  ```ts
  import { ApolloQueryMixin, TypePoliciesMixin } from '@apollo-elements/mixins';
  import { typePolicies } from './typePolicies';

  @customElement('theme-toggle')
  class ThemeToggle extends
  TypePoliciesMixin(ApolloQueryMixin(HTMLElement))<Data, null> {
    typePolicies = typePolicies;

    // ...
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.lit">

  ```ts
  import { typePolicies } from './typePolicies';

  @customElement('theme-toggle')
  class ThemeToggle extends LitElement {
    query = new ApolloQueryController(this, ThemeToggleQuery);

    connectedCallback() {
      super.connectedCallback();
      this.query.client.cache.policies.addTypePolicies(typePolicies);
    }
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.fast">

  ```ts
  import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
  import { typePolicies } from './typePolicies';

  @customElement({ name: 'theme-toggle', template })
  class ThemeToggle extends FASTElement {
    query = new ApolloQueryBehavior(this, ThemeToggleQuery);

    connectedCallback() {
      super.connectedCallback();
      this.query.client.cache.policies.addTypePolicies(typePolicies);
    }
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.haunted">

  ```ts
  import { useQuery, useEffect, component, html } from '@apollo-elements/haunted';
  import { typePolicies } from './typePolicies';

  function ThemeToggle() {
    const { client, data } = useQuery(ThemeToggleQuery);

    /**
     * There's no TypePoliciesMixin for haunted,
     * but you can use the `useEffect` hook to do the same
     */
    useEffect(({ host: { client } }) => {
      client.cache.policies.addTypePolicies(typePolicies);
    }, [client]);

    const nextTheme = data?.theme === 'dark' ? 'light' : 'dark';

    function toggleTheme() {
      // TBD
    }

    return html`
      <button @click="${toggleTheme}">
        Change to ${nextTheme} theme
      </button>
    `,
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.atomico">

  ```tsx
  import { useQuery, useEffect, c } from '@apollo-elements/atomico';
  import { typePolicies } from './typePolicies';

  function ThemeToggle() {
    const { client, data } = useQuery(ThemeToggleQuery);

    /**
     * There's no TypePoliciesMixin for atomico,
     * but you can use the `useEffect` hook to do the same
     */
    useEffect(({ host: { client } }) => {
      client.cache.policies.addTypePolicies(typePolicies);
    }, [client]);

    const nextTheme = data?.theme === 'dark' ? 'light' : 'dark';

    function toggleTheme() {
      // TBD
    }

    return (
      <host>
        <button onclick={toggleTheme}>
          Change to {nextTheme} theme
        </button>
      </host>
    );
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.hybrids">

  ```ts
  import { typePolicies } from './typePolicies';

  /**
   * There's no TypePoliciesMixin for hybrids,
   * but you can use this one-line function to do the same
   */
  function connect(host) {
    host.query.client.cache.policies.addTypePolicies(host.typePolicies);
  }

  define('theme-toggle', {
    //... code from previous steps
    __typePolicies: { connect },
  });
  ```

  </code-tab>
</code-tabs>

All that's left is to define the `toggleTheme` function to actually update the cache:

<code-tabs collection="libraries" default-tab="lit">
  <code-tab @tab="$data.codeTabs.html">

  ```html
  <apollo-client>
    <apollo-query>
      <!-- ... -->
    </apollo-query>
  </apollo-client>

  <script>
    {
      const queryEl =
        document.currentScript.getRootNode()
          .querySelector('apollo-query')
      queryEl.extras = {
        toggleTheme() {
          const theme = queryEl.data.theme === 'light' ? 'dark' : 'light';
          queryEl.client.writeQuery({
            query: queryEl.query,
            data: { theme },
          });
        }
      };
    }
  </script>
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.mixins">

  ```ts
  toggleTheme() {
    const theme = this.nextTheme;
    this.client.writeQuery({
      query: this.query,
      data: { theme },
    });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.lit">

  ```ts
  toggleTheme() {
    const theme = this.nextTheme;
    this.query.client.writeQuery({
      query: this.query.query,
      data: { theme },
    });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.fast">

  ```ts
  toggleTheme() {
    const theme = this.nextTheme;
    this.query.client.writeQuery({
      query: this.query.query,
      data: { theme },
    });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.haunted">

  ```ts
  function toggleTheme() {
    const theme = nextTheme;
    client.writeQuery({
      query: ToggleThemeQuery,
      data: { theme },
    });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.atomico">

  ```tsx
  function toggleTheme() {
    const theme = nextTheme;
    client.writeQuery({
      query: ToggleThemeQuery,
      data: { theme },
    });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.hybrids">

  ```ts
  function toggleTheme(host) {
    const theme = host.nextTheme;
    host.query.client.writeQuery({
      query: host.query.query,
      data: { theme },
    });
  }
  ```

  </code-tab>
</code-tabs>

## Storing State in Reactive Variables

We can acheive the same effect using the new `makeVar` function from Apollo 
Client. First we'll define our theme variable, initializing it with the user 
preference:

<code-copy>

  ```ts
  import { makeVar } from '@apollo/client/core';

  export const themeVar = makeVar<Theme>(getUAPreferredTheme());
  ```

</code-copy>

Then we'll modify our type policy to read the value from that variable:

<code-copy>

  ```ts
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

</code-copy>

Last, we'll refactor the `toggleTheme` method to directly update the value of 
`themeVar`. We do that by calling `themeVar` with a value. Apollo Client will 
ensure that all queries that depend on `theme` will get the new value every time 
we call.

<code-tabs collection="libraries" default-tab="lit">
  <code-tab @tab="$data.codeTabs.html">

  ```js
  toggleTheme() {
    themeVar(queryEl.data.theme === 'light' ? 'dark' : 'light');
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.mixins">

  ```ts
  toggleTheme() {
    themeVar(this.nextTheme);
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.lit">

  ```ts
  toggleTheme() {
    themeVar(this.nextTheme);
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.fast">

  ```ts
  toggleTheme() {
    themeVar(this.nextTheme);
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.haunted">

  ```ts
  function toggleTheme() {
    themeVar(nextTheme);
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.atomico">

  ```tsx
  function toggleTheme() {
    themeVar(nextTheme);
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.hybrids">

  ```ts
  function toggleTheme(host) {
    themeVar(host.nextTheme);
  }
  ```

  </code-tab>
</code-tabs>

## Bringing our own Storage

If for whatever reason we prefer to store a piece of state ourselves, we can 
redefine the type policy to read from that storage. Here's an example using 
localStorage:

<code-copy>

  ```ts
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

</code-copy>

Now in order to update the theme, we need to perform two steps:
1. Change the stored value
2. Invalidate the Apollo cache's value for theme on the root query using the `evict` method on `InMemoryCache`.

<code-tabs collection="libraries" default-tab="lit">
  <code-tab @tab="$data.codeTabs.html">

  ```js
  toggleTheme() {
    localStorage.setItem('theme', queryEl.data.theme === 'light' ? 'dark' : 'light');
    queryEl.client.cache.evict({ fieldName: 'theme' });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.mixins">

  ```ts
  toggleTheme() {
    localStorage.setItem('theme', this.nextTheme);
    this.client.cache.evict({ fieldName: 'theme' });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.lit">

  ```ts
  toggleTheme() {
    localStorage.setItem('theme', this.nextTheme);
    this.query.client.cache.evict({ fieldName: 'theme' });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.fast">

  ```ts
  toggleTheme() {
    localStorage.setItem('theme', this.nextTheme);
    this.query.client.cache.evict({ fieldName: 'theme' });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.haunted">

  ```ts
  function toggleTheme() {
    localStorage.setItem('theme', nextTheme);
    client.cache.evict({ fieldName: 'theme' });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.atomico">

  ```ts
  function toggleTheme() {
    localStorage.setItem('theme', nextTheme);
    client.cache.evict({ fieldName: 'theme' });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.hybrids">

  ```ts
  function toggleTheme(host) {
    localStorage.setItem('theme', host.nextTheme);
    host.query.client.cache.evict({ fieldName: 'theme' });
  }
  ```

  </code-tab>
</code-tabs>

Note that type policy read functions *must be synchronous*. If you need to 
perform async work to read a value, you'll need some helper that uses reactive 
variables underneath. See the [issue on 
apollo-client](https://github.com/apollographql/apollo-client/issues/6852) which 
discusses the reason why and provides a workaround.

Next Steps:
 - [Advanced Local State](./advanced-local-state.md)
