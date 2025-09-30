import '@apollo-elements/components/apollo-mutation';
import { useQuery, useMutation, useState, component, html } from '@apollo-elements/haunted';

import { ProfileQuery } from './Profile.query.graphql';
import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

function ProfilePage() {
  const { data, loading } = useQuery(ProfileQuery);
  const [updateProfile, result] = useMutation(UpdateProfileMutation);
  const [input, setInput] = useState({})

  const onVariableInput = e => setInput({ ...input, [e.target.id]: e.target.value });

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
      <label>Name <input id="name" @input="${onVariableInput}"></label>
      <label>Picture (URL) <input id="picture" @input="${onVariableInput}"></label>
      <label>Birthday <input id="birthday" @input="${onVariableInput}" type="date"/></label>
      <button @click="${() => updateProfile({ variables: { input } })}">Save</button>
    </form>
  `;

}

customElements.define('profile-page', component(ProfilePage));
