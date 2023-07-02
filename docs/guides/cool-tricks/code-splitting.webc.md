---
title: Code Splitting
permalink: /guides/cool-tricks/asyncronous-client/index.html
eleventyNavigation:
  order: 20
templateEngineOverride: webc,md
description: Optimize your GraphQL web app with code splitting and lazy loading
---

Code splitting or lazy-loading is the process of writing an app such that the 
user only loads the code they need when they need it, instead of loading the 
entire app in one huge bundle up front.

Imagine your single-page app has two kinds of users: regular users and admins. 
The admins have access to different pages than the regular users, and those 
pages have whole complicated state trees which are irrelevant to regular users.

It doesn't make sense to force regular users to download, parse, and compile the 
code for those pages which they'll never see and can't use. Instead, we can 
lazily load those components using dynamic `import()`, and register their state 
trees after-the-fact.

## TypePoliciesMixin

To facilitate this, import the `TypePoliciesMixin` so you can lazy-load portions 
of your client-side state store along with their UI components.

Let's say your client side router loads a different component depending on the 
user role:

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

<code-copy>

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

</code-copy>

import `TypePoliciesMixin` from the mixins package to easily register type 
policies on a component. For example, in `src/components/profile/profile.ts` you 
can use `UserTypePolicies`

<code-tabs collection="libraries" default-tab="lit">
  <code-tab @tab="$data.codeTabs.html">

  ```html
  <p>HTML apps should set all their type policies on the <code>apollo-client</code> element</p>
  <apollo-client>...</apollo-client>
  <script>
    import('./typePolicies')
      .then(({ UserTypePolicies }) => {
        document
          .currentScript
          .getRootNode()
          .querySelector('apollo-client')
          .typePolicies = UserTypePolicies;
      });
  </script>
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.mixins">

  ```ts
  import { ApolloQueryMixin, TypePoliciesMixin } from '@apollo-elements/mixins';
  import { UserTypePolicies } from './typePolicies';

  import { UserQuery } from './User.query.graphql';

  export class ProfilePage extends TypePoliciesMixin(ApolloQueryMixin(HTMLElement))<typeof UserQuery> {
    query = UserQuery;

    typePolicies = UserTypePolicies;
  }

  customElements.define('profile-page', ProfilePage);
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.lit">

  ```ts
  import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';
  import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
  import { UserTypePolicies } from './typePolicies';

  import { UserQuery } from './User.query.graphql';

  @customElement('profile-page')
  export class ProfilePage extends TypePoliciesMixin(ApolloQuery)<typeof UserQuery> {
    query = UserQuery;

    typePolicies = UserTypePolicies;
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.fast">

  ```ts
  import { ApolloQuery } from '@apollo-elements/fast/bases/apollo-query';
  import { customElement } from '@microsoft/fast-element';
  import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
  import { UserTypePolicies } from './typePolicies';

  import { UserQuery } from './User.query.graphql';

  @customElement({ name: 'profile-page' })
  export class ProfilePage extends TypePoliciesMixin(ApolloQuery)<typeof UserQuery> {
    query = UserQuery;

    typePolicies = UserTypePolicies;
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.haunted">

  ```ts
  import { useQuery, useEffect, component, html } from '@apollo-elements/haunted';
  import { UserTypePolicies } from './typePolicies';

  import { UserQuery } from './User.query.graphql';

  function ProfilePage({ client }) {
    const { client, data } = useQuery(UserQuery);

    /**
     * There's no TypePoliciesMixin for haunted,
     * but you can use the `useEffect` hook to do the same
     */
    useEffect(() => {
      client.cache.policies.addTypePolicies(UserTypePolicies);
    }, [client]);

    return html`...`;
  }

  customElements.define('profile-page', component(ProfilePage));
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.atomico">

  ```tsx
  import { useQuery, useEffect, c } from '@apollo-elements/atomico';
  import { UserTypePolicies } from './typePolicies';

  import { UserQuery } from './User.query.graphql';

  function ProfilePage({ client }) {
    const { client, data } = useQuery(UserQuery);

    /**
     * There's no TypePoliciesMixin for atomico,
     * but you can use the `useEffect` hook to do the same
     */
    useEffect(() => {
      client.cache.policies.addTypePolicies(UserTypePolicies);
    }, [client]);

    return <host>...</host>;
  }

  customElements.define('profile-page', c(ProfilePage));
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.hybrids">

  ```ts
  import { query, define } from '@apollo-elements/hybrids';
  import { UserTypePolicies } from './typePolicies';
  import { UserQuery } from './User.query.graphql';

  define('profile-page', {
    query: query(UserQuery),
    __typePolicies: {
      /**
       * There's no TypePoliciesMixin for hybrids,
       * but you can use this one-line function to do the same
       */
      connect(host) {
        host.query.client.cache.policies.addTypePolicies(UserTypePolicies);
      }
    },
  });
  ```

  </code-tab>
</code-tabs>

And you can lazy-load that same code for use in 
`src/components/admin-profile/admin-profile.ts`.

<code-tabs collection="libraries" default-tab="lit">
  <code-tab @tab="$data.codeTabs.html">

  ```html
  <p>HTML apps should set all their type policies on the <code>apollo-client</code> element</p>
  <apollo-client>...</apollo-client>
  <script>
    import('./typePolicies')
      .then(({ UserTypePolicies }) => {
        document
          .currentScript
          .getRootNode()
          .querySelector('apollo-client')
          .typePolicies = UserTypePolicies;
      });
  </script>
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.mixins">

  ```ts
  import { ApolloQueryMixin, TypePoliciesMixin } from '@apollo-elements/mixins';
  import { UserTypePolicies, AdminTypePolicies } from './typePolicies';

  import { UserQuery } from './User.query.graphql';

  export class AdminProfilePage
  extends TypePoliciesMixin(ApolloQueryMixin(HTMLElement))<typeof UserQuery> {
    query = UserQuery;

    typePolicies = { ...UserTypePolicies, ...AdminTypePolicies };
  }

  customElements.define('admin-profile-page', AdminProfilePage);
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.lit">

  ```ts
  import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';
  import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
  import { UserTypePolicies } from './typePolicies';

  import { UserQuery } from './User.query.graphql';

  @customElement('admin-profile-page')
  export class AdminProfilePage extends TypePoliciesMixin(ApolloQuery)<typeof UserQuery> {
    query = UserQuery;

    typePolicies = { ...UserTypePolicies, ...AdminTypePolicies };
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.fast">

  ```ts
  import { customElement } from '@microsoft/fast-element';
  import { ApolloQuery } from '@apollo-elements/fast/bases/apollo-query';
  import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
  import { UserTypePolicies } from './typePolicies';

  import { UserQuery } from './User.query.graphql';

  @customElement({ name: 'admin-profile-page' })
  export class AdminProfilePage extends TypePoliciesMixin(ApolloQuery)<typeof UserQuery> {
    query = UserQuery;

    typePolicies = { ...UserTypePolicies, ...AdminTypePolicies };
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.haunted">

  ```ts
  import { useQuery, useEffect, component, html } from '@apollo-elements/haunted';
  import { UserTypePolicies, AdminTypePolicies } from './typePolicies';

  import { UserQuery } from './User.query.graphql';

  function AdminProfilePage() {
    const { client, data } = useQuery(UserQuery);

    /**
     * There's no TypePoliciesMixin for haunted,
     * but you can use the `useEffect` hook to do the same
     */
    useEffect(() => {
      client.cache.policies.addTypePolicies(UserTypePolicies),
      client.cache.policies.addTypePolicies(AdminTypePolicies),
    }, [client]);

    return html`...`;
  }

  customElements.define('admin-profile-page', component(AdminProfilePage));
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.atomico">

  ```ts

  ```
  </code-tab>
  <code-tab @tab="$data.codeTabs.hybrids">

  ```ts
  import { query, define } from '@apollo-elements/hybrids';
  import { UserTypePolicies, AdminTypePolicies } from './typePolicies';

  import { UserQuery } from './User.query.graphql';

  define('admin-profile-page', {
    query: query(UserQuery),
    __typePolicies: {
      /**
       * There's no TypePoliciesMixin for hybrids,
       * but you can use this one-line function to do the same
       */
      connect(host) {
        host.query.client.cache.policies.addTypePolicies(UserTypePolicies),
        host.query.client.cache.policies.addTypePolicies(AdminTypePolicies),
      }
    }
  });
  ```

  </code-tab>
</code-tabs>

When using `Apollo*Controllers`, take inspiration from the `haunted` and 
`hybrids` examples and call `addTypePolicies` on the controller's cache when the 
host connects.
