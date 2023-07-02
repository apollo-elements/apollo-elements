import '@apollo-elements/components/apollo-mutation';
import { query, define, html } from '@apollo-elements/hybrids';

import { ProfileQuery } from './Profile.query.graphql';
import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

define('profile-page', {
  query: query(ProfileQuery),
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
      <apollo-mutation mutation="${UpdateProfileMutation}" input-key="input">
        <label>Name <input data-variable="name"></label>
        <label>Picture (URL) <input data-variable="picture"></label>
        <label>Birthday <input data-variable="birthday" type="date"/></label>
        <button trigger>Save</button>
      </apollo-mutation>
    </form>
  `,
});
