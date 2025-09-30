import { query, define, html } from '@apollo-elements/hybrids';

import { UsersQuery } from './Users.query.graphql.js';

define('users-list', {
  users: query(UsersQuery),
  render: ({ users }) => html`
    <link rel="stylesheet" href="users-list.css">
    <ol>${(users.data?.users??[]).map(x => html`
      <li data-id="${x.id}">${x.name}</li>`)}
    </ol>
  `,
});
