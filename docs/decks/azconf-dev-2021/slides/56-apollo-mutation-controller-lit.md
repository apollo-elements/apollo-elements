---
name: ApolloMutationController Lit
---

```ts playground lit-mutation-controller user-profile.ts
import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js'
import { client } from './client.js';

import { ApolloQueryController, ApolloMutationController } from '@apollo-elements/core';

import { UserProfile } from './UserProfile.query.graphql.js';
import { UpdateProfile } from './UpdateProfile.mutation.graphql.js';

@customElement('user-profile')
class UserProfileElement extends LitElement {
  static styles = css`.loading { opacity: 0 }`;

  @query('sl-input') input: HTMLInputElement;

  query = new ApolloQueryController(this, UserProfile, { client });
  muttn = new ApolloMutationController(this, UpdateProfile, {
    client,
    update: (cache, result) => cache.writeQuery({
      query: UserProfile,
      data: { profile: result.data.updateProfile },
    }),
  });

  onClickSave() {
    this.muttn.mutate({ variables: { user: { name: this.input.value } } });
  }

  render() {
    const { data } = this.query;
    const loading = this.query.loading || this.muttn.loading;
    return html`
      <h2 class=${classMap({ loading })}>
        Welcome, ${data?.profile?.name}!
      </h2>

      <sl-input label="Edit Username"
           value=${data?.profile?.name ?? ''}
          .disabled=${loading}></sl-input>

      <sl-button type="primary"
          .disabled=${loading}
          @click=${this.onClickSave}>
        Save
      </sl-button>
    `;
  }
}
```

```html playground-file lit-mutation-controller index.html
<user-profile></user-profile>
<script type="module" src="user-profile.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.52/dist/themes/light.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.52/dist/shoelace.js"></script>
<style>
html {
  font-size: 2em;
}
</style>
```

```ts playground-file lit-mutation-controller UserProfile.query.graphql.ts
import { gql, TypedDocumentNode } from '@apollo/client/core';

interface Profile {
  name: string;
}

export const UserProfile: TypedDocumentNode<{ profile: Profile }> = gql`
query UserProfile {
  profile {
    name
  }
}
`;
```

```ts playground-file lit-mutation-controller UpdateProfile.mutation.graphql.ts
import { gql, TypedDocumentNode } from '@apollo/client/core';

interface Profile {
  name: string;
}

export const UpdateProfile: TypedDocumentNode<{ profile: Profile }, Profile> = gql`
mutation UpdateProfile($user: UserInput) {
  updateProfile(user: $user) {
    name
  }
}
`;
```

```ts playground-file lit-mutation-controller client.ts
{% include ../controller-client.ts %}
```
