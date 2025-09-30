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
