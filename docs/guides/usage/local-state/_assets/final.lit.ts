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
