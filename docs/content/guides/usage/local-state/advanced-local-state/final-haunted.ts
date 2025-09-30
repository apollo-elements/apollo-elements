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
