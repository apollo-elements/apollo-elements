import '@apollo-elements/components/apollo-mutation';
import { useQuery, component, html } from '@apollo-elements/haunted';

import { ProfileQuery } from './Profile.query.graphql';
import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

function ProfilePage() {
  const { data, loading } = useQuery(ProfileQuery);

  return html`
    <h2>Profile</h2>

    <dl ?hidden="${loading || !data}">
      <dt>Name</dt>
      <dd>${data?.name}</dd>

      <dt>Picture</dt>
      <dd><img src="${ifDefined(data?.picture)}"/></dd>

      <dt>Birthday</dt>
      <dd>${data?.birthday}</dd>
    </dl>

    <form ?hidden="${!data?.isMe}">
      <h3>Edit</h3>
      <apollo-mutation .mutation="${UpdateProfileMutation}" input-key="input">
        <label>Name <input data-variable="name"></label>
        <label>Picture (URL) <input data-variable="picture"></label>
        <label>Birthday <input data-variable="birthday" type="date"/></label>
        <button trigger>Save</button>
      </apollo-mutation>
    </form>
  `;

}

customElements.define('profile-page', component(ProfilePage));
