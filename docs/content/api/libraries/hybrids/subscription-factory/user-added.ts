import { subscription, define, html } from '@apollo-elements/hybrids';

import { UserAddedSubscription } from './UserAdded.subscription.graphql.js';

import '@material/mwc-snackbar';

define('user-added', {
  userAdded: subscription(UserAddedSubscription),
  opened: false,
  render: host => html`
    <link rel="stylesheet" href="user-added.css">
    <mwc-snackbar
        labeltext="${host.userAdded.data?.name} Joined!"
        open="${host.last !== host.userAdded.data?.name}"
        onMDCSnackbar:closed="${() => host.opened = false}"
        onMDCSnackbar:opened="${() => {
          host.opened = true;
          host.last = host.userAdded.data?.name;
        }}"
    ></mwc-snackbar>
  `,
});
