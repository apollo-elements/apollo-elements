---
layout: layout-api
package: '@apollo-elements/polymer'
module: 'polymer-apollo-mutation.js'
---

# Web Component Libraries >> Polymer >> polymer-apollo-mutation || 20

`<apollo-mutation>` fires Polymer-style prop-changed events when its `called`, `data`, `error`, or `loading` properties change.

See [ApolloMutationInterface](/api/interfaces/mutation/) for more information.

```js playground polymer-apollo AddUser.js
import { PolymerElement, html } from '@polymer/polymer';
import { AddUserMutation } from './Hello.query.graphql.js';
import './elements.js';

class AddUserMutationElement extends PolymerElement {
  static get template() {
    return html`
      <polymer-apollo-mutation id="userMutation" data="{%raw%}{{data}}{%endraw%}" mutation="[[mutation]]"></polymer-apollo-mutation>

      <p-card>
        <h2 slot="heading">Add a User</h2>
        <paper-input hidden="[[data]]" label="Name" value="{%raw%}{{name}}{%endraw%}"></paper-input>
        <paper-button slot="actions" hidden="[[data]]" on-click="mutate">Submit</paper-button>
        <p hidden="[[!data]]">[[data.insertUsers.returning.0.name]] added!</p>
      </p-card>
    `;
  }

  static get properties() {
    return {
      mutation: { type: Object, value: () => AddUserMutation },
    };
  }

  mutate() {
    const { name } = this;
    return this.$.userMutation.mutate({ variables: { name } });
  }
}

customElements.define('add-user', AddUserMutationElement);
```

```js playground-file polymer-apollo Hello.query.graphql.js
import { gql } from '@apollo/client/core';
export const AddUserMutation = gql`
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

```html playground-file polymer-apollo index.html
<script type="module" src="AddUser.js"></script>

<apollo-client uri="https://api.spacex.land/graphql">
  <add-user></add-user>
</apollo-client>
```

```js playground-file polymer-apollo elements.js
import '@apollo-elements/components/apollo-client';
import '@apollo-elements/polymer/polymer-apollo-mutation';
import '@polymer/paper-button/paper-button'
import '@polymer/paper-input/paper-input';
import '@power-elements/card';
```
