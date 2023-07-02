import '@apollo-elements/components/apollo-mutation';
import { ControllerHostMixin } from '@apollo-elements/mixins';
import { ApolloQueryController } from '@apollo-elements/core';

import { ProfileQuery } from './Profile.query.graphql';
import { UpdateProfileMutation } from 'UpdateProfile.mutation.graphql';

const template = document.createElement('template');
template.innerHTML = `
  <h2>Profile</h2>

  <dl>
    <dt>Name</dt>
    <dd></dd>

    <dt>Picture</dt>
    <dd><img role="presentation"/></dd>

    <dt>Birthday</dt>
    <dd></dd>
  </dl>

  <form hidden>
    <h3>Edit</h3>
    <apollo-mutation input-key="input">
      <label>Name <input data-variable="name"></label>
      <label>Picture (URL) <input data-variable="picture"></label>
      <label>Birthday <input data-variable="birthday" type="date"/></label>
      <button trigger>Save</button>
    </apollo-mutation>
  </form>
`;

export class ProfilePage extends ControllerHostMixin(HTMLElement) {
  query = new ApolloQueryController(this, ProfileQuery);

  $ = selector => this.shadowRoot.querySelector(selector);

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true));
    this.$('apollo-mutation').mutation = UpdateProfileMutation;
    this.requestUpdate();
  }

  update() {
    const { data, loading } = this.query;
    this.$('dl').hidden = loading || !data;
    this.$('dd:nth-of-type(0)').textContent = data?.name;
    if (data?.picture)
      this.$('dd img').src = data.picture;
    this.$('dd:nth-of-type(2)').textContent = data?.birthday;
    this.$('form').hidden = !data?.isMe;
    super.update();
  }
}

customElements.define('profile-page', ProfilePage);
