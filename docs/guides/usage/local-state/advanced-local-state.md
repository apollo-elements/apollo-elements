# Usage >> Local State >> Advanced Local State || 20

<meta name="description" data-helmett
      content="Advanced recipes for Apollo Elements to manage local state" />

Say your app has Networks and Sites. Each network has a list of sites which belongs to it, so you define the field `isInNetwork` on `Site` which takes a network ID as a field argument. You want to develop <dfn><abbr title="Create, Read, Update, Delete">CRUD</abbr></dfn> operations for networks, and have those operations relate to the list of sites as well.

## The Setup - Query Component

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
```

Let's start by querying for all existing sites

```graphql copy
query AllSites {
  sites {
    id
    name
    selected @client
  }
}
```

Then we'll define a component `all-sites` which fetches and displays the list of sites. The rendered shadow DOM for the component will look like this, using a hypothetical `<select-list>` element:

```html
<select-list>
  <select-item item-id="1" item-name="Site 1" selected></select-item>
  <select-item item-id="2" item-name="Site 2"></select-item>
  <select-item item-id="3" item-name="Site 3"></select-item>
</select-list>
```

## Managing the UI State Locally

The `<select-list>` element (hypothetically) fires a `select` event whenever the selected item changes, so we'll attach a listener to keep each site's local state in sync. When our user clicks on the checkboxes in the list of `<select-item>`s, we'll update that `Site`'s client-side `selected @client` field, which in turn will be read to determine whether a site's corresponding `<select-item>` component will be marked selected.

```js
const fragment = gql`
  fragment siteSelected on Site {
    selected @client
  }
`;

function onSelectedChanged(event) {
  const selectListEl = event.target;
  const itemId = selectListEl.selected.itemId;
  client.writeFragment({
    id: `Site:${itemId}`,
    fragment,
    data: {
      selected: event.detail.selected
    }
  })
}
```

## Create Mutation Component

To create the Network, the user selects some Sites and then clicks a button which issues the `createNetwork` mutation, so let's implement that mutation now.

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

This mutation requires an input which is a list of site IDs, which we'll get from the cached local state we prepared above.

<figure aria-label="Sequence Diagram for one-way data flow">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -10 669 361">
    <title>Sequence Diagram</title>
    <path class="actor-line" stroke-width=".5" d="M75 5v345"/>
    <rect width="150" height="65" rx="3" ry="3" class="actor"/>
    <text x="75" y="32.5" dominant-baseline="central" alignment-baseline="central" class="actor" text-anchor="middle">
      <tspan x="75" dy="0">Apollo Cache</tspan>
    </text>
    <path class="actor-line" stroke-width=".5" d="M275 5v345"/>
    <rect x="200" width="150" height="65" rx="3" ry="3" class="actor"/>
    <text x="275" y="32.5" dominant-baseline="central" alignment-baseline="central" class="actor" text-anchor="middle">
      <tspan x="275" dy="0">&lt;all-sites&gt;</tspan>
    </text>
    <path class="actor-line" stroke-width=".5" d="M494 5v345"/>
    <rect x="419" width="150" height="65" rx="3" ry="3" class="actor"/>
    <text x="494" y="32.5" dominant-baseline="central" alignment-baseline="central" class="actor" text-anchor="middle">
      <tspan x="494" dy="0">&lt;select-item&gt;</tspan>
    </text>
    <defs>
      <marker id="arrowhead" refX="5" refY="2" markerWidth="6" markerHeight="4" orient="auto">
        <path d="M0 0v4l6-2z"/>
      </marker>
    </defs>
    <defs>
      <marker id="crosshead" markerWidth="15" markerHeight="8" orient="auto" refX="16" refY="4">
        <path d="M9 2v4l7-2z" stroke-dasharray="0,0"/>
        <path d="M0 1l6 6m0-6L0 7" stroke-dasharray="0,0"/>
      </marker>
    </defs>
    <defs>
      <marker id="sequencenumber" refX="15" refY="15" markerWidth="60" markerHeight="40" orient="auto" fill="#333">
      <circle cx="15" cy="15" r="6"/>
    </marker>
    </defs>
    <text x="175" y="80" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="messageText" dy="1em">AllSitesQuery</text>
    <path class="messageLine0" stroke-width="2" marker-end="url(#arrowhead)" fill="none" d="M75 115h200"/>
    <text x="385" y="130" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="messageText" dy="1em"> Property Assignment</text>
    <path class="messageLine1" stroke-width="2" marker-end="url(#arrowhead)" stroke-dasharray="3px,3px" fill="none" d="M275 165h219"/>
    <text x="385" y="180" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="messageText" dy="1em">MouseEvent</text>
    <path class="messageLine0" stroke-width="2" marker-end="url(#arrowhead)" fill="none" d="M494 215H275"/>
    <text x="175" y="230" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="messageText" dy="1em">writeFragment</text>
    <path class="messageLine1" stroke-width="2" marker-end="url(#arrowhead)" stroke-dasharray="3px,3px" fill="none" d="M275 265H75"/>
    <g>
      <rect y="285" width="150" height="65" rx="3" ry="3" class="actor"/>
      <text x="75" y="317.5" dominant-baseline="central" alignment-baseline="central" class="actor" text-anchor="middle">
        <tspan x="75" dy="0">Apollo Cache</tspan>
      </text>
    </g>
    <g>
      <rect x="200" y="285" width="150" height="65" rx="3" ry="3" class="actor"/>
      <text x="275" y="317.5" dominant-baseline="central" alignment-baseline="central" class="actor" text-anchor="middle">
        <tspan x="275" dy="0">&lt;all-sites&gt;</tspan>
      </text>
    </g>
    <g>
      <rect x="419" y="285" width="150" height="65" rx="3" ry="3" class="actor"/>
      <text x="494" y="317.5" dominant-baseline="central" alignment-baseline="central" class="actor" text-anchor="middle">
      <tspan x="494" dy="0">
      &lt;select-item&gt;</tspan>
      </text>
      </g>
  </svg>

  <figcaption class="visually-hidden">

  Sequence diagram showing one-way data flow.

  1. from Apollo Cache, to all-sites element via AllSitesQuery
  2. from all-sites element to select-item element via Property Assignment
  3. then from select-item element back to all-sites element via MouseEvent
  4. then from all-sites element back to Apollo Cache via writeFragment

  </figcaption>
</figure>

Then, when the user is ready to create the Network, she clicks the `Create` button, and the component issues the mutation over the network with variables based on the currently selected sites.

```js
function onWillMutate(event) {
  event.target.variables = {
    sites: allSites
      .filter(x => x.selected)
      .map(x => x.id); // string[]
  }
}
```

## Final Result

<code-tabs collection="libraries" default-tab="lit">

  ```html tab html
  <apollo-query id="all-sites">
    <script type="application/graphql">
      query AllSites {
        sites {
          id
          name
          selected @client
        }
      }
    </script>
    <template>
      <select-list @change="{%raw%}{{ onSelectedChanged }}{%endraw%}">
        <template type="repeat" repeat="{%raw%}{{ data.sites }}{%endraw%}">
          <select-item
              item-id="{%raw%}{{ item.id }}{%endraw%}"
              item-name="{%raw%}{{ item.name }}{%endraw%}"
              ?selected="{%raw%}{{ item.selected }}{%endraw%}"
          ></select-item>
        </template>
      </select-list>

      <apollo-mutation @will-mutate="{%raw%}{{ onWillMutate }}{%endraw%}">
        <script type="application/graphql">
          mutation CreateNetworkMutation($sites: Site[]) {
            createNetwork(sites: $sites)
          }
        </script>
        <button trigger>Create</button>
      </apollo-mutation>
    </template>
  </apollo-query>

  <script type="module">
    const allSites = document.querySelector('#all-sites');

    allSites.extras = {
      onSelectedChanged(event) {
        const selectListEl = event.target;
        const itemId = selectListEl.selected.itemId;
        client.writeFragment({
          id: `Site:${itemId}`,
          fragment,
          data: {
            selected: event.detail.selected
          }
        })
      },
      onWillMutate(event) {
        event.target.variables = {
          sites: allSites.data.sites
            .filter(x => x.selected)
            .map(x => x.id);
        }
      }
    }
  </script>
  ```

  ```ts tab mixins
  import type { WillMutateEvent } from '@apollo-elements/components';
  import type {
    SitesQueryData as Data,
    SitesQueryVariables as Variables
  } from '../../schema';

  import '@apollo-elements/components/apollo-mutation';

  import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

  interface ItemDetail {
    itemId: string;
    selected: boolean;
  }

  type CreateNetworkMutator =
    ApolloMutation<CreateNetworkMutationData, CreateNetworkMutationVariables>;

  const template = document.createElement('template');
  template.innerHTML = `
    <select-list></select-list>
    <apollo-mutation>
      <script type="application/graphql">
        mutation CreateNetworkMutation($sites: Site[]) {
          createNetwork(sites: $sites)
        }
      </script>
    </apollo-mutation>
  `;

  const itemTemplate = document.createElement('template');
  itemTemplate.innerHTML = '<select-item></select-item>';

  class SitesElement extends ApolloQueryMixin(HTMLElement)<Data, Variables> {
    query = SitesQuery;

    #data: Data = null;
    get data() { return this.#data; }
    set data(value: Data) {
      this.#data = value;
      this.render;
    }

    constructor() {
      super();
      this
        .attachShadow({ mode: 'open' })
        .append(template.content.cloneNode());
      this
        .shadowRoot
        .querySelector('apollo-mutation')
        .addEventListener('will-mutate', this.onWillMutate.bind(this));
    }

    render() {
      const sites = this.data.sites ?? [];
      sites.forEach(site => {
        const existing = this.shadowRoot.querySelector(`[item-id="${site.id}"]`);
        if (existing) {
          if (site.selected)
            existing.setAttribute('selected', '');
          else
            existing.removeAttribute('selected');
        } else {
          const item = itemTemplate.content.cloneNode();
          item.setAttribute('item-id', site.id);
          item.setAttribute('item-name', site.name);
          item.addEventListener('select', this.onSelectedChanged.bind(this));
          this.shadowRoot.querySelector('select-list').append(item);
        }
      });
    }

    onSelectedChanged(event: CustomEvent<ItemDetail>) {
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

    onWillMutate(event: WillMutateEvent & { target: CreateNetworkMutator }) {
      event.target.variables = {
        sites: this.data.sites
          .filter(x => x.selected)
          .map(x => x.id); // string[]
      }
    }
  }

  customElements.define('all-sites', SitesElement);
  ```

  ```ts tab lit
  import type { WillMutateEvent } from '@apollo-elements/components';
  import type {
    SitesQueryData as Data,
    SitesQueryVariables as Variables
  } from '../../schema';

  import { ApolloQuery, customElement, html } from '@apollo-elements/lit-apollo';

  import '@apollo-elements/components/apollo-mutation';

  import CreateNetworkMutation from './CreateNetwork.mutation.graphql';

  interface ItemDetail {
    itemId: string;
    selected: boolean;
  }

  type CreateNetworkMutator =
    ApolloMutation<CreateNetworkMutationData, CreateNetworkMutationVariables>;

  @customElement('all-sites')
  class SitesElement extends ApolloQuery<Data, Variables> {
    query = SitesQuery;

    render() {
      return html`
        <select-list>
          ${this.data.sites.map(site => html`
          <select-item
              item-id="${site.id}"
              item-name="${site.name}"
              ?selected="${site.selected}"
              @select="${this.onSelectedChanged}"
          ></select-item>
          `)}
        </select-list>

        <apollo-mutation
            .mutation="${CreateNetworkMutation}"
            @will-mutate="${this.onWillMutate}">
          <button slot="trigger">Create</button>
        </apollo-mutation>
      `;
    }

    onSelectedChanged(event: CustomEvent<ItemDetail>) {
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

    onWillMutate(event: WillMutateEvent & { target: CreateNetworkMutator }) {
      event.target.variables = {
        sites: this.data.sites
          .filter(x => x.selected)
          .map(x => x.id); // string[]
      }
    }
  ```

  ```ts tab fast
  import type { WillMutateEvent } from '@apollo-elements/components';
  import type {
    SitesQueryData as Data,
    SitesQueryVariables as Variables
  } from '../../schema';

  import { ApolloQuery, customElement, html } from '@apollo-elements/fast';

  import '@apollo-elements/components/apollo-mutation';

  import CreateNetworkMutation from './CreateNetwork.mutation.graphql';

  type CreateNetworkMutator =
    ApolloMutation<CreateNetworkMutationData, CreateNetworkMutationVariables>;

  interface ItemDetail {
    itemId: string;
    selected: boolean;
  }

  @customElement({
    name: 'all-sites',
    template: html<SitesElement>`
      <select-list>
        ${x => data.sites.map(site => html<SitesElement>`
        <select-item
            item-id="${site.id}"
            item-name="${site.name}"
            ?selected="${site.selected}"
            @select="${(x, { event }) => x.onSelectedChanged(event)}"
        ></select-item>
        `)}
      </select-list>

      <apollo-mutation
          .mutation="${CreateNetworkMutation}"
          @will-mutate="${(x, { event }) => x.onWillMutate(event)}">
        <button slot="trigger">Create</button>
      </apollo-mutation>
    `,
  })
  class SitesElement extends ApolloQuery<Data, Variables> {
    query = SitesQuery;

    onSelectedChanged(event: CustomEvent<ItemDetail>) {
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

    onWillMutate(event: WillMutateEvent & { target: CreateNetworkMutator }) {
      event.target.variables = {
        sites: this.data.sites
          .filter(x => x.selected)
          .map(x => x.id); // string[]
      }
    }
  }
  ```

  ```ts tab haunted
  import type { ApolloMutationElement, WillMutateEvent } from '@apollo-elements/components';

  import '@apollo-elements/components/apollo-mutation';

  import { useQuery, component, html } from '@apollo-elements/haunted';

  import { CreateNetworkMutation } from './CreateNetwork.mutation.graphql';
  import { SitesQuery } from './Sites.query.graphql';

  type CreateNetworkMutator =
    ApolloMutationElement<typeof CreateNetworkMutation>;

  interface ItemDetail {
    itemId: string;
    selected: boolean;
  }

  function AllSites() {
    const { data, client } = useQuery(SitesQuery);

    function onSelectedChanged(event: CustomEvent<ItemDetail>) {
      client.writeFragment({
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

    function onWillMutate(event: WillMutateEvent & { target: CreateNetworkMutator }) {
      event.target.variables = {
        sites: this.data.sites
          .filter(x => x.selected)
          .map(x => x.id); // string[]
      }
    }

    return html`
      <select-list>
        ${data.sites.map(site => html`
        <select-item
            item-id="${site.id}"
            item-name="${site.name}"
            ?selected="${site.selected}"
            @select="${onSelectedChanged}"
        ></select-item>
        `)}
      </select-list>

      <apollo-mutation
          .mutation="${CreateNetworkMutation}"
          @will-mutate="${this.onWillMutate}">
        <button slot="trigger">Create</button>
      </apollo-mutation>
    `,
  }

  customElements.define('all-sites', component(AllSites));
  ```

  ```ts tab hybrids
  import type { ApolloQueryController } from '@apollo-elements/core';
  import type { ApolloMutation } from '@apollo-elements/components';
  import type { WillMutateEvent } from '@apollo-elements/components';
  import type {
    SitesQueryData as Data,
    SitesQueryVariables as Variables
  } from '../../schema';

  import { query, define, html } from '@apollo-elements/hybrids';

  import '@apollo-elements/components/apollo-mutation';

  import CreateNetworkMutation from './CreateNetwork.mutation.graphql';

  type CreateNetworkMutator =
    ApolloMutation<CreateNetworkMutationData, CreateNetworkMutationVariables>;

  type QueryElement = HTMLElement & { query: ApolloQueryController<Data, Variables>> };

  function onSelectedChanged(
    host: QueryElement,
    event: CustomEvent<{ itemId: string, selected: boolean }>
  ) {
    host.query.client.writeFragment({
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

  function onWillMutate(
    host: QueryElement,
    event: WillMutateEvent & { target: CreateNetworkMutator }
  ) {
    event.target.variables = {
      sites: host.data.sites
        .filter(x => x.selected)
        .map(x => x.id); // string[]
    }
  }

  define('all-sites', {
    query: query<Data, Variables>(SitesQuery),
    render: ({ query: { data } }) => html`
      <select-list>
        ${(data?.sites??[]).map(site => html`
        <select-item
            item-id="${site.id}"
            item-name="${site.name}"
            selected="${site.selected}"
            onselect="${onSelectedChanged}"
        ></select-item>
        `)}
      </select-list>

      <apollo-mutation
          .mutation="${CreateNetworkMutation}"
          @will-mutate="${onWillMutate}">
        <button slot="trigger">Create</button>
      </apollo-mutation>
    `,
  });
  ```

</code-tabs>

## Update Mutation Component

This is great for the `/create-network` page, but things get tricker when we want to implement the `updateNetwork` mutation on page `/update-network/:networkId`. Now we have to show the same `<select-list>` of Sites, but the `selected` property of each one has to relate only to the specific page the user is viewing it on.

In other words, if a user loads up `/create-network`, selects sites A and B, then loads up `/update-network/:networkId`, they shouldn't see A and B selected on that page. Then, if they select C and D on `/update-network/:networkId`, only to return to `/create-network`, they should only see A and B selected, not C and D.

To do this, let's define the `<update-network-page>`'s query to pass a `networkId` argument to the client-side selected field

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
