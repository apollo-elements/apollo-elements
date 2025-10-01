---
title: Code Splitting
weight: 20
description: Optimize your GraphQL web app with code splitting and lazy loading
sidebar: guides
---

Code splitting or lazy-loading is the process of writing an app such that the user only loads the code they need when they need it, instead of loading the entire app in one huge bundle up front.

Imagine your single-page app has two kinds of users: regular users and admins. The admins have access to different pages than the regular users, and those pages have whole complicated state trees which are irrelevant to regular users.

It doesn't make sense to force regular users to download, parse, and compile the code for those pages which they'll never see and can't use. Instead, we can lazily load those components using dynamic `import()`, and register their state trees after-the-fact.

## TypePoliciesMixin

To facilitate this, import the `TypePoliciesMixin` so you can lazy-load portions of your client-side state store along with their UI components.

Let's say your client side router loads a different component depending on the user role:

```ts copy
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

And let's say you want to apply different type policies depending on the type of user:

```ts copy
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

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}} {{<include "profile-page-html.html">}} {{</code-tab>}}
  {{<code-tab package="mixins">}} {{<include "profile-page-mixins.ts">}} {{</code-tab>}}
  {{<code-tab package="lit">}} {{<include "profile-page-lit.ts">}} {{</code-tab>}}
  {{<code-tab package="fast">}} {{<include "profile-page-fast.ts">}} {{</code-tab>}}
  {{<code-tab package="haunted">}} {{<include "profile-page-haunted.ts">}} {{</code-tab>}}
  {{<code-tab package="atomico">}} {{<include "profile-page-atomico.tsx">}} {{</code-tab>}}
  {{<code-tab package="hybrids">}} {{<include "profile-page-hybrids.ts">}} {{</code-tab>}}
</code-tabs>

And you can lazy-load that same code for use in `src/components/admin-profile/admin-profile.ts`.

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}}
{{<include "admin-profile-page-html.html">}}
{{</code-tab>}}
  {{<code-tab package="mixins">}}
{{<include "admin-profile-page-mixins.ts">}}
{{</code-tab>}}
  {{<code-tab package="lit">}}
{{<include "admin-profile-page-lit.ts">}}
{{</code-tab>}}
  {{<code-tab package="fast">}}
{{<include "admin-profile-page-fast.ts">}}
{{</code-tab>}}
  {{<code-tab package="haunted">}}
{{<include "admin-profile-page-haunted.ts">}}
{{</code-tab>}}
  {{<code-tab package="atomico">}}
{{<include "admin-profile-page-atomico.tsx">}}
{{</code-tab>}}
  {{<code-tab package="hybrids">}}
{{<include "admin-profile-page-hybrids.ts">}}
{{</code-tab>}}
</code-tabs>

When using `Apollo*Controllers`, take inspiration from the `haunted` and `hybrids` examples and call `addTypePolicies` on the controller's cache when the host connects.
