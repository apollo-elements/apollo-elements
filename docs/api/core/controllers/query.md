---
layout: layout-api
package: '@apollo-elements/core'
module: apollo-query-controller.js
description: Query Controller for Apollo Elements
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Core >> Controllers >> ApolloQueryController || 20

`ApolloQueryController` gets data from your GraphQL server. Pass it a GraphQL query, and any options you choose, and it will update its host when it's state (e.g. `data`, `error`, or `loading`) changes.

The (optional) third argument to the constructor is an [`ApolloQueryControllerOptions`](#options) object, with all properties optional. Pass a `fetchPolicy`, or `variables` to customize the query, `noAutoSubscribe: false` or a `shouldSubscribe` predicate function to prevent automatically fetching data, or `onData`/`onError` callbacks to run side-effects when the query resolves or errors.

<inline-notification type="tip">

Apollo Elements controllers are not limited to Lit. Use them with any object that [implements the `ReactiveControllerHost` interface](https://lit.dev/docs/composition/controllers/). See [`ControllerHostMixin`](/api/libraries/mixins/controller-host-mixin/) for an example.

</inline-notification>

```ts playground query-controller profile-home.ts
import { ApolloQueryController } from '@apollo-elements/core';
import { customElement } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ProfileQuery } from './Profile.query.graphql.js';

@customElement('profile-home')
class ProfileHome extends LitElement {
  static styles = css`
    img { height: 200px; width: auto; }
  `;

  profile = new ApolloQueryController(this, ProfileQuery, {
    variables: { id: 1 }
  });

  render() {
    return html`
      <h2>User ID Variable</h2>
      <input id="1" type="radio" name="id" value="1" @change="${this.onChange}"/>
      <label for="1">1</label>
      <input id="2" type="radio" name="id" value="2" @change="${this.onChange}"/>
      <label for="2">2</label>
      <input id="3" type="radio" name="id" value="3" @change="${this.onChange}"/>
      <label for="3">3</label>
      <header class=${classMap({ loading: this.profile?.loading })}>
        <h1>Welcome, ${this.profile.data?.profile?.name}</h1>
      </header>
      <img .src=${this.profile.data?.profile?.picture} alt=""/>
    `;
  }

  onChange(event) {
    this.profile.variables = { id: event.target.value }
  }
}
```

```html playground-file query-controller index.html
<script type="module" src="profile-home.js"></script>
<script type="module" src="client.js"></script>

<apollo-client>
  <profile-home></profile-home>
</apollo-client>
```

```ts playground-file query-controller Profile.query.graphql.ts
import { gql, TypedDocumentNode } from '@apollo/client/core';
export const ProfileQuery: TypedDocumentNode<{
  profile: {
    name: string;
    picture: string;
  }
}> = gql`
query ProfileQuery($id: ID) {
  profile(id: $id) {
    name
    picture
  }
}
`;
```

```js playground-file query-controller client.js
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

const USERS = [
  { id: 1, name: 'Neil', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Neil_Armstrong_pose.jpg/1024px-Neil_Armstrong_pose.jpg?1623601441968' },
  { id: 2, name: 'Buzz', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Buzz_Aldrin.jpg/1024px-Buzz_Aldrin.jpg?1623601483170' },
  { id: 3, name: 'Michael', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Michael_Collins_%28S69-31742%2C_restoration%29.jpg/1024px-Michael_Collins_%28S69-31742%2C_restoration%29.jpg?1623601522599' },
];

const schema = makeExecutableSchema({
  typeDefs: `
    type User {
      id: ID
      name: String
      picture: String
    }

    type Query {
      profile(id: ID): User
    }
  `,
  resolvers: {
    Query: {
      async profile(_, { id }) {
        return USERS.find(x => x.id == parseInt(id));
      }
    },
  }
});

document.querySelector('apollo-client')
  .client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema }),
  });
```
