---
name: ApolloQueryController Lit
---

```ts playground lit-query-controller user-profile.ts
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js'
import { ApolloQueryController } from '@apollo-elements/core';
import { gql, TypedDocumentNode } from '@apollo/client/core';

import { client } from './client.js';

interface ProfileQueryData {
  profile: {
    name: string;
  }
}

const UserProfile: TypedDocumentNode<ProfileQueryData> = gql`
  query UserProfile {
    profile {
      name
    }
  }
`;

@customElement('user-profile')
class UserProfileElement extends LitElement {
  static styles = css`.loading { opacity: 0 }`;

  query = new ApolloQueryController(this, UserProfile, { client });

  render() {
    const { data, loading } = this.query;
    return html`
      <h2 class=${classMap({ loading })}>
        Welcome, ${data?.profile?.name}!
      </h2>
    `;
  }
}
```

```html playground-file lit-query-controller index.html
<user-profile></user-profile>
<script type="module" src="user-profile.js"></script>
```

```ts playground-file lit-query-controller client.ts
{% include '../controller-client.ts' %}
```
