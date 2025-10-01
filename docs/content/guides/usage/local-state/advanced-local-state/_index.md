---
title: "Advanced Local State"
sidebar: guides
weight: 20
description: "Advanced recipes for Apollo Elements to manage local state"
---

<style>
figure {
  margin-inline: 0;
}

figure pre {
  border-start-start-radius: 0 !important;
  border-start-end-radius: 0 !important;
}

figcaption {
  border-start-start-radius: 6px;
  border-start-end-radius: 6px;
  background-color: var(--markdown-table-row-odd-background-color);
  padding: 4px 6px;
}
</style>

Say your app deals with Networks and Sites. Each network has a list of sites which belongs to it, so you define the field `isInNetwork` on `Site` which takes a network ID as a field argument. You want to develop <dfn><abbr title="Create, Read, Update, Delete">CRUD</abbr></dfn> operations for networks, and have those operations relate to the list of sites as well.

## The Plan - One Way Data Flow

We'll develop an Apollo element which queries the entire list of sites and displays them in a multi-select dropdown. Clicking a button will issue a mutation to create a new network with the selected sites.

The mutation will take a list of string site IDs as its input. In order to get that list of selected sites, we'll define a `selected` client-side state property on the `Site` object. Whenever the user selects a site in the list, we'll update the local state using `writeFragment`, then when the user clicks the *Create Network* button, we'll filter the list of all sites, taking only the ids of those sites which are selected.

<!-- TODO: Add sequence diagram for one-way data flow:
  1. from Apollo Cache, to create-network element via AllSitesQuery
  2. from create-network element to select-item element via Property Assignment
  3. then from select-item element back to create-network element via MouseEvent
  4. then from create-network element back to Apollo Cache via writeFragment
-->

Let's define a schema for our app. We'll need `Site` and `Network` types, as well as their associated operations.

<figure>
<figcaption>schema.graphql</figcaption>

```graphql copy
type Site {
  id: ID
  name: String
  isInNetwork(networkId: ID): Boolean
}

type Network {
  id: ID
  name: String
  sites: [Site]
}

type Query {
  sites: [Site]
}

type Mutation {
  createNetwork(sites: [ID]!): Network
}
```

</figure>

<inline-notification type="tip" title="GraphQL Codegen">

The rest of this page assumes we're working in a project that uses [GraphQL code generator](https://www.graphql-code-generator.com/docs/presets/near-operation-file) to convert `.graphql` files to TypeScript sources.

</inline-notification>

We'll also need a query document for the list of sites and a mutation document for the "create network" operation.

<figure>
<figcaption>Sites.query.graphql</figcaption>

```graphql copy
query Sites {
  sites {
    id
    name
    selected @client
  }
}
```

</figure>

<figure>

<figcaption>CreateNetwork.mutation.graphql</figcaption>

```graphql copy
mutation CreateNetwork($sites: ID[]!) {
  createNetwork(sites: $sites) {
    id
    name
    sites {
      id
    }
  }
}
```

</figure>

Then we'll define a component `create-network` which fetches and displays the list of sites. The rendered shadow DOM for the component will look something like this, using a hypothetical `<select-list>` element:

```html
<select-list>
  <select-item item-id="1" item-name="Site 1" selected></select-item>
  <select-item item-id="2" item-name="Site 2"></select-item>
  <select-item item-id="3" item-name="Site 3"></select-item>
</select-list>
```

The `<select-list>` element (hypothetically) fires a `select` event whenever the selected item changes, so we'll attach a listener to keep each site's local state in sync. When our user clicks on the checkboxes in the list of `<select-item>`s, we'll update that `Site`'s client-side `selected @client` field, which in turn will be read to determine whether a site's corresponding `<select-item>` component will be marked selected.

<figure>
<figcaption>selectedSite.fragment.graphql</figcaption>

```graphql copy
fragment siteSelected on Site {
  selected @client
}
```

</figure>

Our UI component will use that fragment to update the specific sites selected.

## Create Mutation Component

To create the Network, the user selects some Sites and then clicks a button which issues the `createNetwork` mutation, so let's implement that mutation now.

This mutation requires an input which is a list of site IDs, which we'll get from the cached local state we prepared above.

Then, when the user is ready to create the Network, she clicks the `Create` button, and the component issues the mutation over the network with variables based on the currently selected sites.

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}} {{<include "final-html.html">}} {{</code-tab>}}
  {{<code-tab package="mixins">}} {{<include "final-mixins.ts">}} {{</code-tab>}}
  {{<code-tab package="lit">}} {{<include "final-lit.ts">}} {{</code-tab>}}
  {{<code-tab package="fast">}} {{<include "final-fast.ts">}} {{</code-tab>}}
  {{<code-tab package="haunted">}} {{<include "final-haunted.ts">}} {{</code-tab>}}
  {{<code-tab package="atomico">}} {{<include "final-atomico.tsx">}} {{</code-tab>}}
  {{<code-tab package="hybrids">}} {{<include "final-hybrids.ts">}} {{</code-tab>}}
</code-tabs>

## Update Network Component

This is great for the `/create-network` page, but now we want to implement an 'update network' mutation component at a `update-network/:networkId` route. Now we have to show the same `<select-list>` of Sites, but the `selected` property of each one has to relate only to the specific page the user is viewing it on.

In other words, if a user loads up `/create-network`, selects sites A and B, then loads up `/update-network/:networkId`, they shouldn't see A and B selected on that page, since they're on the page of a specific site. Then, if they select C and D on `/update-network/:networkId` then return to `/create-network`, they should only see A and B selected, not C and D.

To do this, let's define the `<update-network-page>`'s query to pass a `networkId` argument to the client-side selected field

<figure>
<figcaption>UpdateNetwork.mutation.graphql</figcaption>

```graphql copy
query UpdateNetworkPageQuery($networkId: ID!) {
  location @client {
    params {
      networkId @export(as: "networkId")
    }
  }

  sites {
    id
    name
    isInNetwork(networkId: $networkId)
    selected(networkId: $networkId)
  }

  network(networkId: $networkId) {
    id
    name
  }
}
```

</figure>

This query lets us combine a view of all Sites with their relationship to a particular Network.

## The Type Policies

Let's define a `FieldPolicy` for `Site`'s `selected` field which lets us handle both cases: the create page and the update page

```ts copy
const typePolicies: TypePolicies = {
  Site: {
    fields: {
      selected: {
        keyArgs: ['networkId'],
        read(prev, { args, storage, readField }) {
          if (!args?.networkId)
            return prev ?? true;
          else {
            return storage[args.networkId] ?? readField({
              typename: 'Site',
              fieldName: 'isInNetwork',
              args: { networkId: args.networkId }
            });
          }
        },
        merge(_, next, { args, storage }) {
          if (args?.networkId)
            storage[args.networkId] = next;
          return next;
        },
      }
    }
  }
}
```

With this type policy, any time the `selected` field gets accessed without any args, or with no `networkId` arg, the caller gets the previous known value - a boolean flag on the site object.
But if the field is queried with a `networkId` arg, as in the update-network page, instead of returning the 'global' value (`prev`), it will return the value stored at `storage[args.networkId]`, which is a `Record<string, boolean>`.
