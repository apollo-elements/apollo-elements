import '@apollo-elements/components/apollo-mutation';
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
    <apollo-mutation .mutation="${UpdateProfileMutation}" input-key="input">
      <fast-text-field data-variable="name>Name</fast-text-field>
      <fast-text-field data-variable="picture>Picture (URL)</fast-text-field>
      <fast-text-field data-variable="birthday" type="date">Birthday</fast-text-field>
      <fast-button trigger>Save</fast-button>
    </apollo-mutation>
  </form>
`;

@customElement({ name: 'profile-page', template })
export class ProfilePage extends FASTElement {
  query = new ApolloQueryBehavior(this, ProfileQuery);
}
