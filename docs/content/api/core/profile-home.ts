import {
  ApolloMutationController,
  ApolloQueryController,
  ApolloSubscriptionController
} from '@apollo-elements/core';

import { customElement, state, query } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { ProfileQuery } from './Profile.query.graphql.js';
import { UpdateProfileMutation } from './UpdateProfile.mutation.graphql.js';
import { FriendCameOnlineSubscription } from './FriendCameOnline.subscription.graphql.js';

import { Snackbar } from '@material/mwc-snackbar';
import '@material/mwc-textfield';

@customElement('profile-home')
class ProfileHome extends LitElement {
  profile = new ApolloQueryController(this, ProfileQuery);

  updateProfile = new ApolloMutationController(this, UpdateProfileMutation, {
    refetchQueries: [{ query: ProfileQuery }],
    awaitRefetchQueries: true,
  });

  friendCameOnline = new ApolloSubscriptionController(this, FriendCameOnlineSubscription, {
    onData: () => this.snackbar.show(),
  });

  @query('mwc-snackbar') snackbar: Snackbar;

  render() {
    return html`
      <mwc-snackbar labeltext="${this.friendCameOnline.data?.nick} came online"></mwc-snackbar>
      <header class=${classMap({ loading: this.profile.loading })}>
        <h1>Welcome, ${this.profile.data?.profile?.nick}</h1>
        <mwc-textfield
            label="Edit Nick"
            value=${this.profile.data?.profile?.nick}
            @change=${this.onChange}
        ></mwc-textfield>
      </header>
    `;
  }

  onChange(event) {
    const nick = event.target.value
    this.updateProfile.mutate({ variables: { nick } });
  }
}
