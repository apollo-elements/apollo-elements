import type { Binding, ViewTemplate } from '@microsoft/fast-element';

import { ApolloMutationBehavior } from '@apollo-elements/fast';

import { FASTElement, customElement, html } from '@microsoft/fast-element';

import { AddUserMutation } from './AddUser.mutation.graphql';

@customElement({
  name: 'add-user',
  template: html`
    <fast-card>
      <h2>Add User</h2>

      <dl ?hidden="${x => !x.mutation.data}">
        <dt>Name</dt>  <dd>${x => x.mutation.data?.name ?? ''}</dd>
        <dt>Added</dt> <dd>${x => x.mutation.data ? new Date(x.mutation.data.timestamp).toDateString() : ''}</dd>
      </dl>

      <fast-text-field @input="${(x, { target: { value: name } }) => { x.mutation.variables = { name }; }}">User Name</fast-text-field>
      <fast-button @input="${x => x.mutation.mutate()}">Add User</fast-button>
    </fast-card>
  `,
})
export class AddUserElement extends FASTElement {
  mutation = new ApolloMutationBehavior(this, AddUserMutation);
}
