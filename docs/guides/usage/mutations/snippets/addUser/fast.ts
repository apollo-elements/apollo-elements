import type { Binding, ViewTemplate } from '@microsoft/fast-element';

import { ApolloMutationBehavior } from '@apollo-elements/fast';

import { FASTElement, customElement, html } from '@microsoft/fast-element';

import { AddUserMutation } from './AddUser.mutation.graphql';

const getName: Binding<AddUserElement> =
   x =>
     x.mutation.data?.name ?? ''

const getTimestamp: Binding<AddUserElement> =
  x =>
    x.mutation.data ? new Date(x.mutation.data.timestamp).toDateString() : '';

const setVariables: Binding<AddUserElement) =
  (x, { target: { value: name } }) => {
    x.mutation.variables = { name };
  }

const template: ViewTemplate<AddUserElement> = html`
  <fast-card>
    <h2>Add User</h2>

    <dl ?hidden="${x => !x.mutation.data}">
      <dt>Name</dt>  <dd>${getName}</dd>
      <dt>Added</dt> <dd>${getTimestamp}</dd>
    </dl>

    <fast-text-field @input="${setVariables}">User Name</fast-text-field>
    <fast-button @input="${x => x.mutation.mutate()}">Add User</fast-button>
  </fast-card>
`;
@customElement({ name: 'add-user' template })
export class AddUserElement extends FASTElement {
  mutation = new ApolloMutationBehavior(this, AddUserMutation);
}
