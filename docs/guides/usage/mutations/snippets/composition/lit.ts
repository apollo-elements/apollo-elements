import '@apollo-elements/components/apollo-mutation';
import { ApolloQueryController } from '@apollo-elements/core';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ProfileQuery } from './Profile.query.graphql';
import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

@customElement('profile-page')
export class ProfilePage extends LitElement {
  query = new ApolloQueryController(this, ProfileQuery);

  render() {
    const { data, loading } = this.query;
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
}
