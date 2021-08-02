---
layout: layout-api-index
package: '@apollo-elements/fast'
---
# Web Component Libraries >> FAST

<style data-helmet>
#apollo-fast {
  --playground-preview-width: 300px;
}
</style>

[FAST](https://fast.design) is a new and innovative web component library and design system from Microsoft. It features statically typed template literals and a flexible reactivity model.

## Installation

<code-tabs collection="package-managers" default-tab="npm" align="end">

  ```bash tab npm
  npm i -S @apollo-elements/fast
  ```

  ```bash tab yarn
  yarn add @apollo-elements/fast
  ```

  ```bash tab pnpm
  pnpm add @apollo-elements/fast
  ```

</code-tabs>

`@apollo-elements/fast` base classes extend from [`FASTElement`](https://fast.design), with all it's ergonomics and reactivity.

```ts playground apollo-fast Profile.ts
import type { Binding, ViewTemplate } from '@microsoft/fast-element'
import { FASTElement, customElement, html, ref, when, repeat } from '@microsoft/fast-element';
import { ApolloQueryBehavior, ApolloMutationBehavior } from '@apollo-elements/fast';
import { ProfileQuery } from './Profile.query.graphql.js';
import { CountriesQuery } from './Countries.query.graphql.js';
import { UpdateProfileMutation } from './UpdateProfile.mutation.graphql.js';
import { client } from './client.js';
import { styles } from './user-profile.css.js';

const name = 'user-profile';
const getCountry: Binding<UserProfile> = x => x.profile.data?.profile?.country.countryCode ?? '';
const getFlag: Binding<UserProfile> = x => x.profile.data?.profile?.country.emoji ?? '';
const getName: Binding<UserProfile> = x => x.profile.data?.profile?.name ?? 'New User';
const hasProfile: Binding<UserProfile> = x => !!x.profile.data?.profile;
const onClickSave: Binding<UserProfile> = x => x.onClickSave();
const getCountries: Binding<UserProfile> = x => Array.from(x.countries.data?.countries ?? []);

const template: ViewTemplate<UserProfile> = html`
  <fast-card>
    <p>Hello, ${getName} ${getFlag}</p>
    <fast-text-field ${ref('nameInput')}
        appearance="filled"
        placeholder="Username">Name</fast-text-field>
    <label for="country">Country</label>
    <fast-combobox autocomplete="both" ${ref('countryInput')}
        id="country"
        value="${getCountry}">${repeat(getCountries, html`
      <fast-option value="${x => x.countryCode}">${x => x.name}
        <span slot="start">${x => x.emoji}</span>
      </fast-option>`)}
    </fast-combobox>
    <fast-button @click="${onClickSave}">Save</fast-button>
  </fast-card>
`;

@customElement({ name, template, styles })
class UserProfile extends FASTElement {
  countryInput: HTMLSelectElement;
  nameInput: HTMLInputElement;

  countries = new ApolloQueryBehavior(this, CountriesQuery, { client });
  profile = new ApolloQueryBehavior(this, ProfileQuery, { client });
  update = new ApolloMutationBehavior(this, UpdateProfileMutation, {
    client,
    update(cache, result) {
      const profile = result.data.updateProfile;
      cache.writeQuery({
        query: ProfileQuery,
        data: { profile },
      });
    }
  });

  onClickSave() {
    this.update.mutate({
      variables: {
        input: {
          name: this.nameInput.value,
          country: this.countryInput.options[this.countryInput.selectedIndex]?.value ?? null,
        },
      },
    });
  }
}
```

```js playground-file apollo-fast user-profile.css.js
import { css } from '@microsoft/fast-element';
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

```html playground-file apollo-fast index.html
<script type="module" src="https://unpkg.com/@microsoft/fast-components"></script>
<script type="module" src="Profile.js"></script>
<fast-design-system-provider use-defaults>
  <user-profile></user-profile>
</fast-design-system-provider>
```

```css playground-file apollo-fast style.css
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
}
```

```ts playground-file apollo-fast Profile.query.graphql.ts
import type { Profile } from './client.js';
import type { TypedDocumentNode } from '@apollo/client/core';
import { gql } from '@apollo/client/core';

export const ProfileQuery: TypedDocumentNode<{ profile: Profile }> = gql`
  query ProfileQuery {
    countries { countryCode name emoji }
    profile {
      name
      country {
        countryCode
        name
        emoji
      }
    }
  }
`;
```

```ts playground-file apollo-fast Countries.query.graphql.ts
import type { Country } from './client.js';
import type { TypedDocumentNode } from '@apollo/client/core';
import { gql } from '@apollo/client/core';

export const CountriesQuery: TypedDocumentNode<{ countries: Country[] }> = gql`
  query CountriesQuery {
    countries { countryCode name emoji }
  }
`;
```

```ts playground-file apollo-fast UpdateProfile.mutation.graphql.ts
import type { Profile, ProfileInput } from './client.js';
import type { TypedDocumentNode } from '@apollo/client/core';
import { gql } from '@apollo/client/core';

export const UpdateProfileMutation: TypedDocumentNode<
  { updateProfile: Profile },
  { input: ProfileInput }
> = gql`
  mutation UpdateProfileMutation($input: ProfileInput) {
    updateProfile(input: $input) {
      name
      country {
        countryCode
        name
        emoji
      }
    }
  }
`;
```

```ts playground-file apollo-fast client.ts
import type { NormalizedCacheObject } from '@apollo/client/core';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import countries from './countries.js'

export interface Country {
  countryCode: string;
  name: string;
  emoji: string
}

export interface Profile {
  name: string;
  country: Country;
};

const typeDefs = `
  type Country {
    countryCode: String
    name: String
    emoji: String
  }

  type Profile {
    name: String
    country: Country
  }

  type Query {
    countries: [Country]
    profile: Profile
  }

  input ProfileInput {
    name: String
    country: String
  }

  type Mutation {
    updateProfile(input: ProfileInput): Profile
  }
`;

declare global { interface Window { __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>; } }

let PROFILE = null;

export const client  = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers: {
        Profile: {
          country({ country }) {
            return {
              countryCode: country,
              ...countries[country],
            };
          },
        },
        Query: {
          countries(): Country[] {
            return Object
                .entries(countries)
                .map(([countryCode, v]) =>
                  ({ ...v, countryCode }));
          },
          profile(): Profile {
            return PROFILE;
          },
        },
        Mutation: {
          updateProfile(_, { input }) {
            PROFILE = input;
            return PROFILE;
          }
        }
      }
    }),
  }),
});
```

```ts playground-file apollo-fast countries.ts
export default {{ countries }}
```
