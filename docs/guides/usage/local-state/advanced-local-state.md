---
title: Advanced Local State
eleventyNavigation:
  order: 20
templateEngineOverride: webc,md
description: Advanced recipes for Apollo Elements to manage local state
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

Say your app deals with Networks and Sites. Each network has a list of sites 
which belongs to it, so you define the field `isInNetwork` on `Site` which takes 
a network ID as a field argument. You want to develop <dfn><abbr title="Create, 
  Read, Update, Delete">CRUD</abbr></dfn> operations for networks, and have 
those operations relate to the list of sites as well.

## The Plan - One Way Data Flow

We'll develop an Apollo element which queries the entire list of sites and 
displays them in a multi-select dropdown. Clicking a button will issue a 
mutation to create a new network with the selected sites.

The mutation will take a list of string site IDs as its input. In order to get 
that list of selected sites, we'll define a `selected` client-side state 
property on the `Site` object. Whenever the user selects a site in the list, 
we'll update the local state using `writeFragment`, then when the user clicks 
the *Create Network* button, we'll filter the list of all sites, taking only the 
ids of those sites which are selected.

<figure aria-label="Sequence Diagram for one-way data flow">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -10 669 416">
    <title>Sequence Diagram</title>
    <line id="actor0" x1="75" y1="5" x2="75" y2="405" class="actor-line" stroke-width="0.5px"></line>
    <rect x="0" y="0" width="150" height="65" rx="3" ry="3" class="actor"></rect>
    <text x="75" y="32.5" dominant-baseline="central" alignment-baseline="central" class="actor" text-anchor="middle">
      <tspan x="75" dy="0">Apollo Cache</tspan>
    </text>
    <line id="actor1" x1="275" y1="5" x2="275" y2="405" class="actor-line" stroke-width="0.5px"></line>
    <rect x="200" y="0" width="150" height="65" rx="3" ry="3" class="actor"></rect>
    <text x="275" y="32.5" dominant-baseline="central" alignment-baseline="central" class="actor" text-anchor="middle">
      <tspan x="275" dy="0">&lt;create-network&gt;</tspan>
    </text>
    <line id="actor2" x1="494" y1="5" x2="494" y2="405" class="actor-line" stroke-width="0.5px"></line>
    <rect x="419" y="0" width="150" height="65" rx="3" ry="3" class="actor"></rect>
    <text x="494" y="32.5" dominant-baseline="central" alignment-baseline="central" class="actor" text-anchor="middle">
      <tspan x="494" dy="0">&lt;select-item&gt;</tspan>
    </text>
    <defs>
      <marker id="arrowhead" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z"></path>
      </marker>
    </defs>
    <defs>
      <marker id="crosshead" markerWidth="15" markerHeight="8" orient="auto" refX="16" refY="4">
        <path style="stroke-dasharray: 0px, 0px;" stroke-width="1px" d="M 9,2 V 6 L16,4 Z"></path>
        <path style="stroke-dasharray: 0px, 0px;" stroke-width="1px" d="M 0,1 L 6,7 M 6,1 L 0,7"></path>
      </marker>
    </defs>
    <defs>
      <marker id="filled-head" refX="18" refY="7" markerWidth="20" markerHeight="28" orient="auto">
        <path d="M 18,7 L9,13 L14,7 L9,1 Z"></path>
      </marker>
    </defs>
    <defs>
      <marker id="sequencenumber" refX="15" refY="15" markerWidth="60" markerHeight="40" orient="auto">
        <circle cx="15" cy="15" r="6"></circle>
      </marker>
    </defs>
    <text x="175" y="125" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="messageText" dy="1em">AllSitesQuery</text>
    <line x1="75" y1="160" x2="275" y2="160" class="messageLine0" stroke-width="2" stroke="none" style="fill: none;" marker-end="url(#arrowhead)"></line>
    <text x="385" y="175" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="messageText" dy="1em">Property Assignment</text>
    <line x1="275" y1="210" x2="494" y2="210" style="stroke-dasharray: 3px, 3px; fill: none;" class="messageLine1" stroke-width="2" stroke="none" marker-end="url(#arrowhead)"></line>
    <text x="385" y="225" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="messageText" dy="1em">Select Event</text>
    <line x1="494" y1="260" x2="275" y2="260" class="messageLine0" stroke-width="2" stroke="none" style="fill: none;" marker-end="url(#arrowhead)"></line>
    <text x="175" y="275" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="messageText" dy="1em">writeFragment</text>
    <line x1="275" y1="310" x2="75" y2="310" style="stroke-dasharray: 3px, 3px; fill: none;" class="messageLine1" stroke-width="2" stroke="none" marker-end="url(#arrowhead)"></line>
    <line x1="65" y1="75" x2="504" y2="75" class="loopLine"></line>
    <line x1="504" y1="75" x2="504" y2="320" class="loopLine"></line>
    <line x1="65" y1="320" x2="504" y2="320" class="loopLine"></line>
    <line x1="65" y1="75" x2="65" y2="320" class="loopLine"></line>
    <polygon points="65,75 115,75 115,88 106.6,95 65,95" class="labelBox"></polygon>
    <text x="90" y="88" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" class="labelText">loop</text>
    <text x="309.5" y="93" text-anchor="middle" class="loopText">
      <tspan x="309.5">[One-Way Data Flow]</tspan>
    </text>
    <g>
      <rect x="0" y="340" width="150" height="65" rx="3" ry="3" class="actor"></rect>
      <text x="75" y="372.5" dominant-baseline="central" alignment-baseline="central" class="actor" text-anchor="middle">
        <tspan x="75" dy="0">Apollo Cache</tspan>
      </text>
    </g>
    <g>
      <rect x="200" y="340" width="150" height="65" rx="3" ry="3" class="actor"></rect>
      <text x="275" y="372.5" dominant-baseline="central" alignment-baseline="central" class="actor" text-anchor="middle">
        <tspan x="275" dy="0">&lt;create-network&gt;</tspan>
      </text>
    </g>
    <g>
      <rect x="419" y="340" width="150" height="65" rx="3" ry="3" class="actor"></rect>
      <text x="494" y="372.5" dominant-baseline="central" alignment-baseline="central" class="actor" text-anchor="middle">
        <tspan x="494" dy="0">&lt;select-item&gt;</tspan>
      </text>
    </g>
  </svg>

  <figcaption class="visually-hidden">

  Sequence diagram showing one-way data flow.

  1. from Apollo Cache, to create-network element via AllSitesQuery
  2. from create-network element to select-item element via Property Assignment
  3. then from select-item element back to create-network element via MouseEvent
  4. then from create-network element back to Apollo Cache via writeFragment

  </figcaption>
</figure>

Let's define a schema for our app. We'll need `Site` and `Network` types, as 
well as their associated operations.

<figure>
  <figcaption>schema.graphql</figcaption>
  <code-copy>

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

  type Query {
    sites: [Site]
  }

  type Mutation {
    createNetwork(sites: [ID]!): Network
  }
  ```

  </code-copy>
</figure>

<inline-notification type="tip" title="GraphQL Codegen">

The rest of this page assumes we're working in a project that uses [GraphQL code 
generator](https://www.graphql-code-generator.com/docs/presets/near-operation-file) 
to convert `.graphql` files to TypeScript sources.

</inline-notification>

We'll also need a query document for the list of sites and a mutation document 
for the "create network" operation.

<figure>
  <figcaption>Sites.query.graphql</figcaption>
  <code-copy>

  ```graphql
  query Sites {
    sites {
      id
      name
      selected @client
    }
  }
  ```

  </code-copy>
</figure>

<figure>
  <figcaption>CreateNetwork.mutation.graphql</figcaption>
  <code-copy>

  ```graphql
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

  </code-copy>
</figure>

Then we'll define a component `create-network` which fetches and displays the 
list of sites. The rendered shadow DOM for the component will look something 
like this, using a hypothetical `<select-list>` element:

```html
<select-list>
  <select-item item-id="1" item-name="Site 1" selected></select-item>
  <select-item item-id="2" item-name="Site 2"></select-item>
  <select-item item-id="3" item-name="Site 3"></select-item>
</select-list>
```

The `<select-list>` element (hypothetically) fires a `select` event whenever the 
selected item changes, so we'll attach a listener to keep each site's local 
state in sync. When our user clicks on the checkboxes in the list of 
`<select-item>`s, we'll update that `Site`'s client-side `selected @client` 
field, which in turn will be read to determine whether a site's corresponding 
`<select-item>` component will be marked selected.

<figure>
<figcaption>selectedSite.fragment.graphql</figcaption>

  <code-copy>

  ```graphql
  fragment siteSelected on Site {
    selected @client
  }
  ```

  </code-copy>

</figure>

Our UI component will use that fragment to update the specific sites selected.

## Create Mutation Component

To create the Network, the user selects some Sites and then clicks a button 
which issues the `createNetwork` mutation, so let's implement that mutation now.

This mutation requires an input which is a list of site IDs, which we'll get 
from the cached local state we prepared above.

Then, when the user is ready to create the Network, she clicks the `Create` 
button, and the component issues the mutation over the network with variables 
based on the currently selected sites.

<code-tabs collection="libraries" default-tab="lit">
  <code-tab :@tab="$data.codeTabs.html">

  ```html
  <apollo-query id="create-network">
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
    const createNetwork = document.querySelector('#create-network');

    createNetwork.onSelectedChanged = function onSelectedChanged(event) {
      const selectListEl = event.target;
      const itemId = selectListEl.selected.itemId;
      client.writeFragment({
        id: `Site:${itemId}`,
        fragment,
        data: {
          selected: event.detail.selected
        },
      });
    };

    createNetwork.onWillMutate = function onWillMutate(event) {
      const sites = createNetwork.data.sites
        .filter(x => x.selected)
        .map(x => x.id);
      event.target.variables = { sites };
    };
  </script>
  ```

  </code-tab>
  <code-tab :@tab="$data.codeTabs.mixins">

  ```ts
  import type { WillMutateEvent } from '@apollo-elements/components/events';
  import type { ResultOf } from '@graphql-typed-document-node/core';
  import type { ApolloMutationElement } from '@apollo-elements/components/apollo-mutation';
  import type { SelectItem } from '../components/select';

  import { gql } from '@apollo/client/core';

  import { selectedSite } from './selectedSite.fragment.graphql';
  import { SitesQuery } from './Sites.query.graphql';
  import { CreateNetworkMutation } from './CreateNetwork.mutation.graphql';

  import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

  import '@apollo-elements/components/apollo-mutation';

  interface ItemDetail {
    itemId: string;
    selected: boolean;
  }

  type CreateNetworkMutator = ApolloMutationElement<typeof CreateNetworkMutation>;

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

  class CreateNetworkElement extends ApolloQueryMixin(HTMLElement)<typeof SitesQuery> {
    query = SitesQuery;

    @renders data: ResultOf<typeof SitesQuery> = null;

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
          const item = itemTemplate.content.cloneNode() as SelectItem;
          item.setAttribute('item-id', site.id);
          item.setAttribute('item-name', site.name);
          item.addEventListener('select', this.onSelectedChanged.bind(this));
          this.shadowRoot.querySelector('select-list').append(item);
        }
      });
    }

    onSelectedChanged(event: CustomEvent<ItemDetail>) {
      const { itemId, selected } = event.detail;
      this.client.writeFragment({
        id: `Site:${itemId}`,
        fragment: selectedSite,
        data: { selected },
      });
    }

    onWillMutate(event: WillMutateEvent & { target: CreateNetworkMutator }) {
      const sites = this.data.sites
        .filter(x => x.selected)
        .map(x => x.id); // string[]
      event.target.variables = { sites };
    }
  }

  customElements.define('create-network', CreateNetworkElement);

  function renders(proto: CreateNetworkElement, key: string) {
    Object.defineProperty(proto, key, {
      get() {
        return this[`__${key}`];
      },
      set(value) {
        this[`__${key}`] = value;
        this.render();
      }
    })
  }
  ```

  </code-tab>
  <code-tab :@tab="$data.codeTabs.lit">

  ```ts
  import type { Select } from '@material/mwc-select';

  import { ApolloQueryController, ApolloMutationController } from '@apollo-elements/core';
  import { LitElement, html } from 'lit';
  import { customElement } from 'lit/decorators.js';

  import { SitesQuery } from './Sites.query.graphql';
  import { CreateNetworkMutation } from './CreateNetwork.mutation.graphql';
  import { selectedSite } from './selectedSite.fragment.graphql';

  @customElement('create-network')
  class CreateNetworkElement extends LitElement {
    query = new ApolloQueryController(this, SitesQuery);

    mutation = new ApolloMutationController(this, CreateNetworkMutation);

    render() {
      const sites = this.query.data?.sites ?? [];
      return html`
        <mwc-menu open multi @selected="${this.onSelectedChanged}">${sites.map(site => html`
          <mwc-list-item value="${site.id}" ?selected="${site.selected}" graphic="icon">
            <mwc-icon slot="graphic" ?hidden="${!site.selected}">check</mwc-icon>
            <span>${site.name}</span>
          </mwc-list-item>`)}
        </mwc-menu>

        <button @click="${this.onClick}">Create</button>
      `;
    }

    onSelectedChanged(event: CustomEvent<{ diff: { added: number[]; removed: number[]} }>) {
      for (const index of event.detail.diff.added)
        this.updateItem(index, true);
      for (const index of event.detail.diff.removed)
        this.updateItem(index, false);
    }

    updateItem(index: number, selected: boolean) {
      this.query.client.writeFragment({
        id: `Site:${this.query.data.sites[index]}`,
        data: { selected },
        fragment: selectedSite,
      })
    }

    onClick() {
      if (!this.query.data?.sites) return;
      const sites = this.query.data.sites
        .filter(x => x.selected)
        .map(x => x.id); // string[]
      this.mutation.mutate({ variables: { sites } });
    }
  }
  ```

  </code-tab>
  <code-tab :@tab="$data.codeTabs.fast">

  ```ts
  import type { Binding, ViewTemplate } from '@microsoft/fast-element';
  import type { Select } from '@microsoft/fast-components';
  import type { ResultOf } from '@graphql-typed-document-node/core';
         type Site = ResultOf<typeof SitesQuery>['sites'][number];

  import { FASTElement, customElement, html, repeat } from '@microsoft/fast-element';
  import { ApolloMutationBehavior, ApolloQueryBehavior } from '@apollo-elements/fast';

  import { selectedSite } from './selectedSite.fragment.graphql';
  import { SitesQuery } from './Sites.query.graphql';
  import { CreateNetworkMutation } from './CreateNetwork.mutation.graphql';

  const onClick: Binding<CreateNetworkElement> = x => x.onClick();
  const onChange: Binding<CreateNetworkElement> = (x, { event }) => x.onSelectedChanged(event);

  const template: ViewTemplate<CreateNetworkElement> = html`
    <fast-select @change="${onChange}">${repeat(x => x.query.data.sites, html`
      <fast-option value="${s => s.id}">${s => s.name}</fast-option>` as ViewTemplate<Site>)}
    </fast-select>
    <fast-button @click="${onClick}">Create</fast-button>
  `;

  @customElement({ name: 'create-network', template })
  class CreateNetworkElement extends FASTElement {
    query = new ApolloQueryBehavior(this, SitesQuery);

    mutation = new ApolloMutationBehavior(this, CreateNetworkMutation);

    onSelectedChanged(event: Event) {
      const target = event.target as Select;
      const [{ selected }] = target.selectedOptions;
      this.query.client.writeFragment({
        id: `Site:${target.value}`,
        data: { selected },
        fragment: selectedSite,
      })
    }

    onClick() {
      this.mutation.variables = {
        sites: this.query.data.sites
          .filter(x => x.selected)
          .map(x => x.id), // string[]
      }
    }
  }
  ```

  </code-tab>
  <code-tab :@tab="$data.codeTabs.haunted">

  ```ts
  import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';

  import { useQuery, useMutation, component, html } from '@apollo-elements/haunted';

  import { CreateNetworkMutation } from './CreateNetwork.mutation.graphql';
  import { SitesQuery } from './Sites.query.graphql';
  import { selectedSite } from './selectedSite.fragment.graphql';

  interface ItemDetail {
    itemId: string;
    selected: boolean;
  }

  function onSelectedChanged(
    client: ApolloClient<NormalizedCacheObject>,
    event: CustomEvent<ItemDetail>
  ) {
    client.writeFragment({
      id: `Site:${event.detail.itemId}`,
      fragment: selectedSite,
      data: {
        selected: event.detail.selected
      }
    })
  }

  function CreateNetwork() {
    const { data, client } = useQuery(SitesQuery);
    const [mutate] = useMutation(CreateNetworkMutation);
    const onClick = () => mutate({
      variables: {
        sites: data.sites
          .filter(x => x.selected)
          .map(x => x.id)
      }
    });

    return html`
      <select-list>${data.sites.map(site => html`
        <select-item
            item-id="${site.id}"
            item-name="${site.name}"
            ?selected="${site.selected}"
            @select="${onSelectedChanged.bind(null, client)}"
        ></select-item>`)}
      </select-list>

      <button @click="${onClick}">Create</button>
    `;
  }

  customElements.define('create-network', component(CreateNetwork));
  ```

  </code-tab>
  <code-tab :@tab="$data.codeTabs.atomico">

  ```tsx
  import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';

  import { useQuery, useMutation, c } from '@apollo-elements/atomico';
  import { CreateNetworkMutation } from './CreateNetwork.mutation.graphql';
  import { SitesQuery } from './Sites.query.graphql';
  import { selectedSite } from './selectedSite.fragment.graphql';

  interface ItemDetail {
    itemId: string;
    selected: boolean;
  }

  function onSelectedChanged(
    client: ApolloClient<NormalizedCacheObject>,
    event: CustomEvent<ItemDetail>
  ) {
    client.writeFragment({
      id: `Site:${event.detail.itemId}`,
      fragment: selectedSite,
      data: {
        selected: event.detail.selected
      }
    })
  }

  function CreateNetwork() {
    const { data, client } = useQuery(SitesQuery);
    const [mutate] = useMutation(CreateNetworkMutation);
    const onClick = () => mutate({
      variables: {
        sites: data.sites
          .filter(x => x.selected)
          .map(x => x.id)
      }
    });

    return (
      <host shadowDom>
        <select-list>{data.sites.map(site => (
          <select-item
              item-id={site.id}
              item-name={site.name}
              selected={site.selected}
              onselect={onSelectedChanged.bind(null, client)}
          ></select-item>))}
        </select-list>
        <button onClick={onClick}>Create</button>
      </host>
    );
  }

  customElements.define('create-network', c(CreateNetwork));
  ```

  </code-tab>
  <code-tab :@tab="$data.codeTabs.hybrids">

  ```ts
  import type { ApolloQueryController, ApolloMutationController } from '@apollo-elements/core';

  import { query, mutation, define, html } from '@apollo-elements/hybrids';

  import { SitesQuery } from './Sites.query.graphql';
  import { CreateNetworkMutation } from './CreateNetwork.mutation.graphql';
  import { selectedSite } from './selectedSite.fragment.graphql';

  interface CreateNetworkElement extends HTMLElement {
    query: ApolloQueryController<typeof SitesQuery>
    mutation: ApolloMutationController<typeof CreateNetworkMutation>
  };

  function onSelectedChanged(
    host: CreateNetworkElement,
    event: CustomEvent<{ itemId: string, selected: boolean }>
  ) {
    host.query.client.writeFragment({
      id: `Site:${event.detail.itemId}`,
      fragment: selectedSite,
      data: {
        selected: event.detail.selected
      }
    })
  }

  function onClick(
    host: CreateNetworkElement,
    event: MouseEvent & { target: CreateNetworkElement },
  ) {
    const sites = host.query.data.sites
      .filter(x => x.selected)
      .map(x => x.id); // string[]
    event.target.mutation.mutate({ variables: { sites } });
  }

  define<CreateNetworkElement>('create-network', {
    query: query(SitesQuery),
    mutation: mutation(CreateNetworkMutation),
    render: ({ query: { data } }) => html`
      <select-list>${(data?.sites??[]).map(site => html`
        <select-item
            item-id="${site.id}"
            item-name="${site.name}"
            selected="${site.selected}"
            onselect="${onSelectedChanged}"
        ></select-item>`)}
      </select-list>

      <button onclick="${onClick}">Create</button>
    `,
  });
  ```

  </code-tab>
</code-tabs>

## Update Network Component

This is great for the `/create-network` page, but now we want to implement an 
'update network' mutation component at a `update-network/:networkId` route. Now 
we have to show the same `<select-list>` of Sites, but the `selected` property 
of each one has to relate only to the specific page the user is viewing it on.

In other words, if a user loads up `/create-network`, selects sites A and B, 
then loads up `/update-network/:networkId`, they shouldn't see A and B selected 
on that page, since they're on the page of a specific site. Then, if they select 
C and D on `/update-network/:networkId` then return to `/create-network`, they 
should only see A and B selected, not C and D.

To do this, let's define the `<update-network-page>`'s query to pass a 
`networkId` argument to the client-side selected field

<figure>
<figcaption>UpdateNetwork.mutation.graphql</figcaption>
  <code-copy>

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

  </code-copy>
</figure>

This query lets us combine a view of all Sites with their relationship to a 
particular Network.

## The Type Policies

Let's define a `FieldPolicy` for `Site`'s `selected` field which lets us handle 
both cases: the create page and the update page

<code-copy>

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

</code-copy>

With this type policy, any time the `selected` field gets accessed without any 
args, or with no `networkId` arg, the caller gets the previous known value - a 
boolean flag on the site object.
But if the field is queried with a `networkId` arg, as in the update-network 
page, instead of returning the 'global' value (`prev`), it will return the value 
stored at `storage[args.networkId]`, which is a `Record<string, boolean>`.
