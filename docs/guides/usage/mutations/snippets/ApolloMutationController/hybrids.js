import '@apollo-elements/components/apollo-mutation';
import { query, mutation, define, html } from '@apollo-elements/hybrids';

import { ProfileQuery } from './Profile.query.graphql';
import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

const onVariableInput = (host, e) => {
  host.mutation.variables = {
    input: {
      ...host.mutation.variables?.input,
      [e.target.id]: e.target.value,
    },
  };
}

define('profile-page', {
  query: query(ProfileQuery),
  mutation: mutation(UpdateProfileMutation),
  render: ({ query: { data, loading } }) => html`
    <h2>Profile</h2>

    <dl hidden="${loading || !data}">
      <dt>Name</dt>
      <dd>${data?.name}</dd>

      <dt>Picture</dt>
      <dd><img src="${data?.picture ?? null}"/></dd>

      <dt>Birthday</dt>
      <dd>${data?.birthday}</dd>
    </dl>

    <form hidden="${!data?.isMe}">
      <h3>Edit</h3>
      <label>Name <input id="name" oninput="${onVariableInput}"></label>
      <label>Picture (URL) <input id="picture" oninput="${onVariableInput}"></label>
      <label>Birthday <input id="birthd oninput="${onVariableInput}"ay" type="date"/></label>
      <button onclick="${() => host.mutation.mutate()}">Save</button>
    </form>
  `,
});
