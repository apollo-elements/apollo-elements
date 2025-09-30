import { FASTElement, customElement, html, ViewTemplate } from '@microsoft/fast-element';
import { ApolloQueryBehavior } from '@apollo-elements/fast';

import { ProfileQuery } from './Profile.query.graphql';
import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

const template: ViewTemplate<ProfilePage> = html`
  <h2>Profile</h2>

  dl ?hidden="${x => x.query.loading || !x.query.data}"
    <dt>Name</dt>
    <dd>${x => x.query.data?.name}</dd>

    <dt>Picture</dt>
    <dd><img src="${x => x.query.data?.picture ?? null}"/></dd>

    <dt>Birthday</dt>
    <dd>${x => x.query.data?.birthday}</dd>
  </dl>

  <form ?hidden="${!x => x.query.data?.isMe}">
    <h3>Edit</h3>
    <label>Name <input ?disabled="${x => x.mutation.loading}" id="name"></label>
    <label>Picture (URL) <input ?disabled="${x => x.mutation.loading}" id="picture"></label>
    <label>Birthday <input ?disabled="${x => x.mutation.loading}" id="birthday" type="date"/></label>
    <button ?disabled="${x => x.mutation.loading}" @click="${(x, { event }) => x.onSave(event)}">Save</button>
  </form>
`;

@customElement({ name: 'profile-page', template })
export class ProfilePage extends FASTElement {
  query = new ApolloQueryBehavior(this, ProfileQuery);
  mutation = new ApolloQueryBehavior(this, UpdateProfileMutation);

  onSave() {
    const inputs = this.shadowRoot.querySelectorAll('input');
    this.mutation.mutate({
      variables: {
        // collect the inputs and flatten them in to a variables object
        input: Object.fromEntries(Array.from(inputs, el => [el.id, el.value]))
      }
    });
  }
}
