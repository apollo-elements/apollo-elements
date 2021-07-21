---
layout: layout-api
package: '@apollo-elements/fast'
module: apollo-mutation-behavior.js
---
<!-- ----------------------------------------------------------------------------------------
     Welcome! This file includes automatically generated API documentation.
     To edit the docs that appear within, find the original source file under `packages/*`,
     corresponding to the package name and module in this YAML front-matter block.
     Thank you for your interest in Apollo Elements 😁
------------------------------------------------------------------------------------------ -->

# Web Component Libraries >> FAST >> ApolloMutationBehavior || 30

`ApolloMutationBehavior` extends [`ApolloMutationController`](/api/core/controllers/mutation/) and implements the [`Behavior`](https://www.fast.design/docs/api/fast-element.behavior) interface.

Read the [mutation component guides](/guides/usage/mutations/) for examples and tips.

## Live Demo

```ts playground fast-mutation AddUser.ts
import type { Binding, ViewTemplate } from '@microsoft/fast-element';
import { FASTElement, customElement, html, when } from '@microsoft/fast-element';
import { ApolloMutationBehavior } from '@apollo-elements/fast';
import { AddUserMutation } from './AddUser.mutation.graphql.js';
import { client } from './client.js';
import { styles } from './add-user.css.js';

const format = x => { try { return new Date(x).toDateString(); } catch { return ''; } };

const name = 'add-user';

const getAddedUser: Binding<AddUser> = x => x.addUser.data?.insertUsers?.returning?.[0];
const getLoading:   Binding<AddUser> = x => x.addUser.loading;
const getTimestamp: Binding<AddUser> = x => format(getAddedUser(x)?.timestamp);
const getUserName:  Binding<AddUser> = x => getAddedUser(x)?.name ?? '';
const hasData:      Binding<AddUser> = x => x.addUser.called || !!x.addUser.data;
const onClick:      Binding<AddUser> = x => x.addUser.mutate();
const onInput:      Binding<AddUser> = (x, { event }) => x.onInput(event);

const dataTemplate: ViewTemplate<AddUser> = html`
<dl>
  <dt>Name</dt>  <dd>${getUserName}</dd>
  <dt>Added</dt> <dd>${getTimestamp}</dd>
</dl>`;

const template: ViewTemplate<AddUser> = html`
  <fast-card>
    <h2>Add User</h2>
    ${when(hasData, dataTemplate)}
    <fast-text-field ?disabled="${getLoading}" @input="${onInput}">
      User Name
    </fast-text-field>
    <fast-button ?disabled="${getLoading}" @click="${onClick}">
      Add User
    </fast-button>
  </fast-card>
`;
@customElement({ name, template, styles })
class AddUser extends FASTElement {
  addUser = new ApolloMutationBehavior(this, AddUserMutation, { client });

  onInput(event: Event & { target: HTMLInputElement }): boolean {
    const name = event.target.value
    this.addUser.variables = { name }
    return true;
  }
}
```

```graphql playground-file fast-mutation AddUser.mutation.graphql.ts
import { gql, TypedDocumentNode } from '@apollo/client/core';

interface Data {
  insertUsers: {
    returning: {
      name: string;
      id: string;
      timestamp: string;
    }
  }
}

export const AddUserMutation: TypedDocumentNode<Data, { name: string }> = gql`
  mutation InsertUser($name: String!) {
    insertUsers: insert_users(objects: {name: $name}) {
      returning {
        name
        id
        timestamp
      }
    }
  }
`;
```

```html playground-file fast-mutation index.html
<script type="module" src="https://unpkg.com/@microsoft/fast-components"></script>
<script type="module" src="AddUser.js"></script>
<fast-design-system-provider use-defaults>
  <add-user></add-user>
</fast-design-system-provider>
```

```css playground-file fast-mutation style.css
body {
  display: grid;
  background-color: #111;
  color: white;
  font-family: "Open Sans", Arial, Helvetica, sans-serif;
  place-items: center center;
  height: 100vh;
}

fast-design-system-provider {
  height: 100%;
  width: 100%;
}
```

```js playground-file fast-mutation add-user.css.js
import { css} from '@microsoft/fast-element';
export const styles = css`
fast-card {
  display: grid;
  padding: 10px;
  gap: 10px;
  align-content: start;
}

fast-text-field {
  width: auto;
}
`;
```

```js playground-file fast-mutation client.js
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'https://api.spacex.land/graphql' }),
});
```
