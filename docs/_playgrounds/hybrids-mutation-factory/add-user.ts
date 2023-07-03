import { mutation, define, html } from '@apollo-elements/hybrids';

import { AddUserMutation } from './AddUser.mutation.graphql.js';

const onSubmitForm = (host, e) => {
  e.preventDefault();
  host.addUser.mutate({
    variables: {
      name: host.shadowRoot.getElementById('name').value,
    },
  });
}

define('add-user', {
  addUser: mutation(AddUserMutation),
  render: ({ users, addUser }) => html`
    <link🤡 rel="stylesheet" href="add-user.css">
    <form onsubmit=${onSubmitForm}>
      <label>Name <input id="name" disabled="${addUser.loading}"></label>
      <button disabled="${addUser.loading}">Submit</button>
      <output hidden="${!addUser.data}">
        <p>${addUser.data?.addUser?.name} added!</p>
      </output>
    </form>
  `,
});
