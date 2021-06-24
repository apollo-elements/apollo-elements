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
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ProfileQuery } from './Profile.query.graphql.js';
import style from './profile-home.css.js';

@customElement('profile-home')
class ProfileHome extends LitElement {
  static ids = [1,2,3];

  static styles = style;

  profile = new ApolloQueryController(this, ProfileQuery, {
    variables: { id: 1 }
  });

  radio(id) {
    const astronaut = this.profile.data?.profile;
    return html`
      <label> <input id=${id} type=radio name=id value=${id}
               ?checked=${astronaut?.id == id}
               @change=${this.onChange}/> ${id} </label>`;
  }

  onChange(event) { this.profile.variables = { id: event.target.value } }

  render() {
    const { data, loading } = this.profile;
    const astronaut = data?.profile;
    return html`
      <form><legend>Crew ID</legend>${ProfileHome.ids.map(this.radio, this)}</form>
      <article class=${classMap({ loading })}>
        <img .src=${astronaut?.picture} alt=""/>
        <figure>
          <blockquote>${astronaut?.quote}</blockquote>
          <figcaption>- ${astronaut?.name}, ${astronaut?.position}</figcaption>
        </figure>
      </article>
    `;
  }
}
```

```js playground-file query-controller profile-home.css.js
import { css } from 'lit';
export default css`
  :host { display: block; }
  .loading { opacity: 0.5; filter: grayscale(100%); }
  img { width: 100%; height: auto; background: lightgrey; min-height: 295px; }
  article { width: 100%; }
  figure { margin: 0; }
  form {
    display: grid;
    grid-template: 40px / max-content repeat(3, 40px);
    place-items: center;
  }
`;
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
type Data = { profile: { id: number; name: string; picture: string; quote: string; } };
type Variables = { id: number; };
export const ProfileQuery: TypedDocumentNode<Data, Variables> = gql`
query ProfileQuery($id: ID) {
  profile(id: $id) {
    id
    name
    position
    picture
    quote
  }
}
`;
```

```js playground-file query-controller client.js
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

const USERS = [
  {
    id: 1,
    name: 'Neil',
    position: 'Commander',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Neil_Armstrong_pose.jpg/1024px-Neil_Armstrong_pose.jpg?1623601441968',
    quote: 'That’s one small step for a man, one giant leap for mankind.',
  },
  {
    id: 2,
    name: 'Buzz',
    position: 'Lunar Module Pilot',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Buzz_Aldrin.jpg/1024px-Buzz_Aldrin.jpg?1623601483170',
    quote: 'Those footprints belong to each and every one of you, to all mankind.',
  },
  {
    id: 3,
    name: 'Michael',
    position: 'Command Module Pilot',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Michael_Collins_%28S69-31742%2C_restoration%29.jpg/1024px-Michael_Collins_%28S69-31742%2C_restoration%29.jpg?1623601522599',
    quote: 'It’s human nature to stretch, to go, to see, to understand. Exploration is not a choice, really; it’s an imperative.',
  },
];

const schema = makeExecutableSchema({
  typeDefs: `
    type User {
      id: ID
      name: String
      picture: String
      position: String
      quote: String
    }

    type Query {
      profile(id: ID): User
    }
  `,
  resolvers: {
    Query: {
      async profile(_, { id }) {
        await new Promise(r => setTimeout(r, Math.random() * 1000));
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
