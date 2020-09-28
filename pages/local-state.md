Apollo Client 3 provides a number of ways to manage local state in your app.

## Reading Local State

Like in Apollo Client 2.x, you can get your stored local state in the apollo cache by using the `@client` directive in queries:

```graphql
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

```graphql
query ThemeToggle {
  theme @client
}
```

Let's define a custom element that displays a button to toggle the theme.

```ts
type Theme = 'dark'|'light';

@customElement('theme-toggle')
class ThemeToggle
extends ApolloQuery<{ theme: Theme }, null> {
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
}
```

In order for our query to load the user's theme preference from their browser or OS settings, we'll define a type policy for the `theme` field.

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

We can register that type policy eagerly when we create our `ApolloClient` instance:

```ts
const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache({ typePolicies }),
})
```

or we can use [`TypePoliciesMixin`](../Cool%20Tricks/code-splitting.html#typepoliciesmixin) to lazy-load the type policies when the component connects:

```ts
import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
import { typePolicies } from './typePolicies';

@customElement('theme-toggle')
class ThemeToggle
extends TypePoliciesMixin(ApolloQuery)<{ theme: Theme }, null> {
  typePolicies = typePolicies;

  // ...
}
```

All that's left is to define the `toggleTheme` function to actually update the cache:

```ts
toggleTheme() {
  const theme = this.nextTheme;
  this.client.writeQuery({
    query: this.query,
    data: { theme },
  });
}
```

## Storing State in Reactive Variables

We can acheive the same effect using the new `makeVar` function from Apollo Client. First we'll define our theme variable, initializing it with the user preference:

```ts
import { makeVar } from '@apollo/client/core';

export const themeVar = makeVar<Theme>(getUAPreferredTheme());
```

Then we'll modify our type policy to read the value from that variable:

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

Last, we'll refactor the `toggleTheme` method to directly update the value of `themeVar`. We do that by calling `themeVar` with a value. Apollo Client will ensure that all queries that depend on `theme` will get the new value every time we call.

```ts
toggleTheme() {
  themeVar(this.nextTheme);
}
```

## Bringing our own Storage

If for whatever reason we prefer to store a piece of state ourselves, we can redefine the type policy to read from that storage. Here's an example using localStorage:

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

Now in order to update the theme, we need to perform two steps:
1. Change the stored value
2. Invalidate the Apollo cache's value for theme on the root query using the `evict` method on `InMemoryCache`.

```ts
toggleTheme() {
  localStorage.setItem('theme', this.nextTheme);
  this.client.cache.evict({ fieldName: 'theme' });
}
```

Note that type policy read functions *must be synchronous*. If you need to perform async work to read a value, you'll need some helper that uses reactive variables underneath. See the [issue on apollo-client](https://github.com/apollographql/apollo-client/issues/6852) which discusses the reason why and provides a workaround.