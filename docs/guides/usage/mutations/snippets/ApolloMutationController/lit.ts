import { ApolloQueryController, ApolloMutationController } from '@apollo-elements/core';
import { LitElement, html } from 'lit';
import { customElement, queryAll } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ProfileQuery } from './Profile.query.graphql';
import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

@customElement('profile-page')
export class ProfilePage extends LitElement {
  query = new ApolloQueryController(this, ProfileQuery);
  mutation = new ApolloQueryController(this, UpdateProfileMutation);

  @queryAll('input') inputs: NodeListOf<HTMLInputElement>;

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
        <label>Name <input ?disabled="${this.mutation.loading}" id="name"></label>
        <label>Picture (URL) <input ?disabled="${this.mutation.loading}" id="picture"></label>
        <label>Birthday <input ?disabled="${this.mutation.loading}" id="birthday" type="date"/></label>
        <button ?disabled="${this.mutation.loading}" @click="${this.onSave}">Save</button>
      </form>
    `;
  }

  onSave() {
    this.mutation.mutate({
      variables: {
        // collect the inputs and flatten them in to a variables object
        input: Object.fromEntries(Array.from(this.inputs, el => [el.id, el.value]))
      }
    }
  });
}
