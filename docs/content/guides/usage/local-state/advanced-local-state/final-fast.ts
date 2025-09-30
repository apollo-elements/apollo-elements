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
