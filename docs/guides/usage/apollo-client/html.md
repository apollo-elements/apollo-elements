# Usage >> Apollo Client >> apollo-client element || 10

When building your GraphQL app using Apollo Elements HTML components, use `<apollo-client>` to set up the client instance. You can mix-and-match, using the same client element with `<apollo-query>` or mutation elements, or with your own custom query elements.

<inline-notification type="tip">

This page is a HOW-TO guide. For detailed docs on `<apollo-client>` element's API, see the [API docs](/api/components/apollo-query/)

</inline-notification>

The element's main job is to manage it's children's `ApolloClient` instance. Every Apollo Element that's a child of an `<apollo-client>` element will share it's client instance, even across deeply nested (open) shadow roots.

```html
<apollo-client id="client-a">
  <query-a>
    #shadow-root
      <query-b>
        #shadow-root
          <mutation-a></mutation-a>
          <apollo-client id="client-b">
            <query-c><query-c>
          </apollo-client>
      </query-b>
  </query-a>
</apollo-client>
```

In the above example, queries A and B, and mutation A all share a client instance, but query C has its own client instance.

## Configuring

There are two ways to use `<apollo-client>`, automatic and manual. Automatic mode creates a basic Apollo client instance, while manual mode lets you customize the client with links and other options. If you're not sure which mode to use, start with automatic mode - you can always switch to manual mode later on.

## Automatic Mode

When setting the `uri` attribute on the `<apollo-client>` element, it creates a basic Apollo client instance directed at the given GraphQL server URI. At that point, any existing Apollo Element children receive the client instance on their `client` DOM property.

In the following example, an `<apollo-query>` element queries for `user` via an Apollo client pointed at a graphql server running at `/graphql` (i.e. on the same origin as the page). Later, JavaScript imports a [custom Apollo query element](/guides/usage/queries/html/) called `<custom-query>`, then appends it to the existing Apollo client element. Both query elements have the same `client` reference, and both will automatically query for data.

```html copy
<apollo-client uri="/graphql">
  <apollo-query>
    <script type="application/graphql">
      query User($userId: ID!) {
        user(userId: $userId) {
          name
        }
      }
    </script>
    <template>
      <style>
        .loading { opacity: 0; }
      </style>
      <p class="{%raw%}{{ loading ? 'loading' : '' }}{%endraw%}">Hi, {%raw%}{{ data.user.name }}{%endraw%}</p>
    </template>
  </apollo-query>
</apollo-client>
```

```js copy
import '../components/custom-query';
document
  .querySelector('apollo-client')
  .appendChild(document
    .createElement('custom-query'))
```

### Customizing Automatic Mode Clients

`<apollo-client>` uses the `createApolloClient` helper from `@apollo-elements/lib/create-apollo-client` under the hood, and it comes with some options for customizing the automatic-mode client. You can set the `validate-variables` attribute to try to prevent fetching operations that don't have all their required top-level variables.

<inline-notification type="warning">

`validate-variables` isn't foolproof. If your operation uses input variables (i.e. objects as variables), the client doesn't introspect the schema to see whether or not the required properties of the required inputs are there.

For example, if an `UpdateUser` mutation requires an `$input` variable of type `UserInput!`, and `UserInput` has a non-nullable property `userId`, the client will still attempt to fetch a mutation with variables `{ input: { name: 'username' } }`

</inline-notification>

You can also set a `typePolicies` DOM property on `<apollo-client>` using JavaScript in order to apply some default [type policies](https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicy-fields).

## Manual Mode

If you need more control over the client, for example to configure the links, use manual mode leaving out the `uri` attribute or DOM property on `<apollo-client>`. Instead, create your own `ApolloClient` instance, and assign it to the element's `client` DOM property.

To construct an instance, import from `@apollo/client/core` (*note*: `@apollo/client` exports a bunch of react code, so if you leave off the `/core`, you might experience TypeScript compilation errors, or larger bundle sizes)

```js copy
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client/core';

import { CustomLink } from './my-custom-link';

const cache =
  new InMemoryCache();

// Configure with a URL to your GraphQL endpoint
const link = ApolloLink.from([
  new CustomLink(),
  new HttpLink({ uri: '/graphql' }),
])

document.querySelector('apollo-client').client =
  new ApolloClient({ cache, link });
```

Once set, the element will ensure that all it's children, even across open shadow roots, receive the instance on their `client` property.


## Next Steps

- Learn how to write [query components](../../queries/)
