import '@apollo-elements/components/apollo-mutation';
import { useQuery, useMutation, useState, c } from '@apollo-elements/atomico';

import { ProfileQuery } from './Profile.query.graphql';
import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

function ProfilePage() {
  const { data, loading } = useQuery(ProfileQuery);
  const [updateProfile, result] = useMutation(UpdateProfileMutation);
  const [input, setInput] = useState({})

  const onVariableInput = e => setInput({ ...input, [e.target.id]: e.target.value });

  return (
    <host shadowDom>
      <h2>Profile</h2>
      <dl hidden={loading || !data}>
        <dt>Name</dt>
        <dd>${data?.name}</dd>
        <dt>Picture</dt>
        <dd><img src={data?.picture}/></dd>
        <dt>Birthday</dt>
        <dd>${data?.birthday}</dd>
      </dl>
      <form hidden={!data?.isMe}>
        <h3>Edit</h3>
        <label>Name <input id="name" oninput={onVariableInput}></label>
        <label>Picture (URL) <input id="picture" oninput={onVariableInput}></label>
        <label>Birthday <input id="birthday" oninput={onVariableInput} type="date"/></label>
        <button onclick={() => updateProfile({ variables: { input } })}>Save</button>
      </form>
    </host>
  );

}

customElements.define('profile-page', c(ProfilePage));
