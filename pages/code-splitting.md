<meta name="description" content="How to implement code-splitting (a.k.a. lazy loading) with Apollo Elements to decrease page loading times and improve user experience"/>

Code splitting or lazy-loading is the process of writing an app such that the user only loads the code they need when they need it, instead of loading the entire app in one huge bundle up front.

Imagine your single-page app has two kinds of users: regular users and admins. The admins have access to different pages than the regular users, and those pages have whole complicated state trees which are irrelevant to regular users.

It doesn't make sense to force regular users to download, parse, and compile the code for those pages which they'll never see and can't use. Instead, we can lazily load those components using dynamic `import()`, and register their state trees after-the-fact.

## TypePoliciesMixin

To facilitate this, import the `TypePoliciesMixin` so you can lazy-load portions of your client-side state store along with their UI components.

Let's say your client side router loads a different component depending on the user role:

<code-copy>

```ts
// router.ts
export const router = new Router({
  routes: [{
    path: '/profile',
    async onEnter(context) {
      if (context.user.roles.includes('admin'))
        await import('../components/admin-profile');
      else
        await import('../components/profile');
    },
  }]
})
```

</code-copy>


And let's say you want to apply different type policies depending on the type of user:

```ts
// src/components/user/typePolicies.ts
export const UserTypePolicies = {
  User: {
    fields: {
      fullName(_, { readField }) {
        return `${readField('firstName')} ${readField('lastName')}`;
      }
    }
  }
};

export const AdminTypePolicies = {
  User: {
    fields: {
      role() {
        return 'admin';
      }
    }
  }
};
```

import `TypePoliciesMixin` from the mixins package to easily register type policies on a component. For example, in `src/components/profile/profile.ts` you can use `UserTypePolicies`

<code-tabs>

<code-tab library="lit-apollo">

```ts
import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';
import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
import { UserTypePolicies } from './typePolicies';

import UserQuery from './User.query.graphql';

import type {
  UserQueryData as Data,
  UserQueryVariables as Variables,
} from '../schema';

@customElement('profile-page')
export class ProfilePage extends TypePoliciesMixin(ApolloQuery)<Data, Variables> {
  query = UserQuery;

  typePolicies = UserTypePolicies;
}
```

</code-tab>

<code-tab library="fast">

```ts
import { ApolloQuery, customElement } from '@apollo-elements/fast';
import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
import { UserTypePolicies } from './typePolicies';

import UserQuery from './User.query.graphql';

import type {
  UserQueryData as Data,
  UserQueryVariables as Variables,
} from '../schema';

@customElement({ name: 'profile-page' })
export class ProfilePage extends TypePoliciesMixin(ApolloQuery)<Data, Variables> {
  query = UserQuery;

  typePolicies = UserTypePolicies;
}
```

</code-tab>

<code-tab library="hybrids">

```ts
import { client, query, define } from '@apollo-elements/hybrids';
import { UserTypePolicies } from './typePolicies';

import UserQuery from './User.query.graphql';

import type {
  UserQueryData as Data,
  UserQueryVariables as Variables,
} from '../schema';

/**
 * There's no TypePoliciesMixin for hybrids,
 * but you can use this one-line function to do the same
 */
function connnect(host) {
  host.client.cache.policies.addTypePolicies(host.typePolicies);
}

define('profile-page', {
  client: client(window.__APOLLO_QUERY__),
  query: query(UserQuery),
  typePolicies: property(UserTypePolicies, connect),
});
```

</code-tab>

</code-tabs>

And you can lazy-load that same code for use in `src/components/admin-profile/admin-profile.ts`.

<code-tabs>

<code-tab library="lit-apollo">

```ts
import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';
import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
import { UserTypePolicies } from './typePolicies';

import UserQuery from './User.query.graphql';

import type {
  UserQueryData as Data,
  UserQueryVariables as Variables,
} from '../schema';

@customElement('profile-page')
export class ProfilePage extends TypePoliciesMixin(ApolloQuery)<Data, Variables> {
  query = UserQuery;

  typePolicies = { ...UserTypePolicies, ...AdminTypePolicies };
}
```

</code-tab>

<code-tab library="fast">

```ts
import { ApolloQuery, customElement } from '@apollo-elements/fast';
import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
import { UserTypePolicies } from './typePolicies';

import UserQuery from './User.query.graphql';

import type {
  UserQueryData as Data,
  UserQueryVariables as Variables,
} from '../schema';

@customElement({ name: 'profile-page' })
export class ProfilePage extends TypePoliciesMixin(ApolloQuery)<Data, Variables> {
  query = UserQuery;

  typePolicies = { ...UserTypePolicies, ...AdminTypePolicies };
}
```

</code-tab>

<code-tab library="hybrids">

```ts
import { client, query, define } from '@apollo-elements/hybrids';
import { UserTypePolicies, AdminTypePolicies } from './typePolicies';

import UserQuery from './User.query.graphql';

import type {
  UserQueryData as Data,
  UserQueryVariables as Variables,
} from '../schema';

/**
 * There's no TypePoliciesMixin for hybrids,
 * but you can use this one-line function to do the same
 */
function connnect(host) {
  host.client.cache.policies.addTypePolicies(host.typePolicies);
}

define('profile-page', {
  client: client(window.__APOLLO_QUERY__),
  query: query(UserQuery),
  typePolicies: property({
    ...UserTypePolicies,
    ...AdminTypePolicies
  }, connect),
});
```

</code-tab>

</code-tabs>