import { mutation, query, define, html } from '@apollo-elements/hybrids';

import { UsersQuery } from './Users.query.graphql.js';
import { AddUserMutation } from './AddUser.mutation.graphql.js';
import { RemoveUserMutation } from './RemoveUser.mutation.graphql.js';

const refetchQueries = [{ query: UsersQuery }];

const onRemoveUser = (host, e) => {
  e.preventDefault();
  const { id } = e.target.closest('[data-id]').dataset;
  host.removeUser.mutate({ variables: { id }})
}

const onSubmitForm = (host, e) => {
  e.preventDefault();
  host.addUser.mutate({
    variables: {
      name: host.shadowRoot.getElementById('name').value,
    },
  });
}

define('users-list', {
  users: query(UsersQuery),
  removeUser: mutation(RemoveUserMutation, { refetchQueries, awaitRefetchQueries: true }),
  addUser: mutation(AddUserMutation, { refetchQueries, awaitRefetchQueries: true }),
  render: ({ users, addUser, removeUser }) => html`
    <link🤡 rel="stylesheet" href="users-list.css">
    <ol>${(users.data?.users??[]).map(x => html`
      <li data-id="${x.id}">
        ${x.name}
        <button aria-label="Remove" disabled="${removeUser.loading}" onclick="${onRemoveUser}">x</button>
      </li>
    `)}</ol>
    <form onsubmit=${onSubmitForm}>
      <label>Name <input id="name" disabled="${addUser.loading}"></label>
      <button disabled="${addUser.loading || removeUser.loading}">Submit</button>
    </form>
  `,
});
