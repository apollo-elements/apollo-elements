## TypePoliciesMixin

Imagine your single-page app has two kinds of users: regular users and admins. The admins have access to different pages than the regular users, and those pages have whole complicated state trees which are irrelevant to regular users.

It doesn't make sense to force regular users to download, parse, and compile the code for those pages which they'll never see and can't use. Instead, we can lazily load those components using dynamic `import()`, and register their state trees after-the-fact.

Let's say your client side router loads a different component depending on the user role:

```ts
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

import `TypePoliciesMixin` from the mixins package to easily register type policies on a component:

```ts
// components/profile
import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
import * as UserTypePolicies from './typePolicies';

@customElement('profile-page')
export class ProfilePage
extends TypePoliciesMixin(ApolloQuery)<Data, Variables> {
  typePolicies = UserTypePolicies;
}
```

```ts
// components/admin-profile
import { TypePoliciesMixin } from '@apollo-elements/mixins/type-policies-mixin';
import * as UserTypePoliciesForAdmins from './typePolicies';

@customElement('profile-page')
export class AdminProfilePage
extends TypePoliciesMixin(ApolloQuery)<Data, Variables> {
  typePolicies = UserTypePoliciesForAdmins;
}
```