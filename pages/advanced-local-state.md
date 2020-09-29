<meta name="description" content="Some advanced recipes for Apollo Elements to manage local state"/>

Say your app has Networks and Sites. A network has a list of Sites which belong to it, so you implement a field `isInNetwork` on Site which takes a network ID. You want to implement <dfn><abbr title="Create, Read, Update, Delete">CRUD</abbr></dfn> operations for Networks.

```graphql
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
```

The first mutation you implement is `createNetwork`. The page which fires that mutation is at `/create-network`, and it displays a selection list of all the sites in your app.

```graphql
query CreateNetworkPageQuery {
  sites {
    id
    name
    selected @client
  }
}
```

```ts
render() {
  return html`
    <select-list>
      ${this.data.sites.map(site => html`
      <select-item
          item-id="${site.id}"
          item-name="${site.name}"
          ?selected="${site.selected}"
          @select="${this.onSelectItem}"
      ></select-item>
      `)}
    </select-list>
  `;
}

onSelectItem(event: CustomEvent<{ itemId: string, selected: boolean }>) {
  this.client.writeFragment({
    id: `Site:${event.detail.itemId}`,
    fragment: gql`
      fragment siteSelected on Site {
        selected @client
      }
    `,
    data: {
      selected: event.detail.selected
    }
  })
}
```

In order to create the Network, the user selects some Sites and then clicks a button which issues the `createNetwork` mutation.

```graphql
mutation CreateNetwork($sites: string[]!) {
  createNetwork(sites: $sites) {
    id
    name
    sites {
      id
    }
  }
}
```

The `selected` field determines whether a site's corresponding `<select-item>` component will be marked selected. Whenever the user clicks on an item in the list, `onSelectItem` writes the new selected state to the cache for that Site.

Then, when the user is ready to create the Network, she clicks the `Create` button, and the component issues the mutation over the network with variables based on the currently selected sites.

```ts
render() {
  return html`
    <select-list>
      <!-- ... -->
    </select-list>

    <apollo-mutation
        .mutation="${CreateNetworkMutation}"
        @will-mutate="${this.onWillMutate}">
      <button slot="trigger">Create</button>
    </apollo-mutation>
  `;
}

onWillMutate(event) {
  event.target.variables = {
    sites: this.data.sites
      .filter(x => x.selected)
      .map(x => x.id); // string[]
  }
}
```

This is great for the `/create-network` page, but things get tricker when we want to implement the `updateNetwork` mutation on page `/update-network/:networkId`. Now we have to show the same `<select-list>` of Sites, but the `selected` property of each one has to relate only to the specific page the user is viewing it on.

In other words, if a user loads up `/create-network`, selects sites A and B, then loads up `/update-network/:networkId`, they shouldn't see A and B selected on that page. Then, if they select C and D on `/update-network/:networkId`, only to return to `/create-network`, they should only see A and B selected, not C and D.

In order to accomplish this, let's define the `<update-network-page>`'s query to pass a `networkId` argument to the client-side selected field

```graphql
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

This query lets us combine a view of all Sites with their relationship to a particular Network.

Let's define a `FieldPolicy` for `Site`'s `selected` field which lets us handle both cases: the create page and the update page

```ts
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

With this type policy, any time the `selected` field is read without any args, or with no `networkId` arg, it will simply return the previous known value - in other words, a simple flag on the site object.
But if the field is queried with a `networkId` arg, as in the update-network page, instead of returning the 'global' value (`prev`), it will return the value stored at `storage[args.networkId]`, which is a `Record<string, boolean>`.