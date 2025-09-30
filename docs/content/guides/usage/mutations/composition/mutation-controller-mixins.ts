import { ControllerHostMixin } from '@apollo-elements/mixins';
import { ApolloQueryController, ApolloMutationController } from '@apollo-elements/core';

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
    <label>Name <input id="name"></label>
    <label>Picture (URL) <input id="picture"></label>
    <label>Birthday <input id="birthday" type="date"/></label>
    <button>Save</button>
  </form>
`;

export class ProfilePage extends ControllerHostMixin(HTMLElement) {
  query = new ApolloQueryController(this, ProfileQuery);
  mutation = new ApolloQueryController(this, UpdateProfileMutation);

  $ = selector => this.shadowRoot.querySelector(selector);
  $$ = selector => this.shadowRoot.querySelectorAll(selector);

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true));
    this.$('button').addEventListener(e => this.mutation.mutate({
      variables: {
        // collect the inputs and flatten them in to a variables object
        input: Object.fromEntries(Array.from(this.$$('input'), el => [el.id, el.value]))
      }
    }));
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
