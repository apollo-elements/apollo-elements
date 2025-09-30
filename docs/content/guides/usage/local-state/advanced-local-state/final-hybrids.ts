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
