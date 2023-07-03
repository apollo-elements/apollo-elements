import { useSubscription, useState, component, html } from '@apollo-elements/hybrids';

import { UserAddedSubscription } from './UserAdded.subscription.graphql.js';

import '@material/mwc-snackbar';

function UserAdded() {
  const [last, setLast] = useState('');

  const [opened, setOpened] = useState(false);

  const { data } = useSubscription(UserAddedSubscription, {
    onData({ subscriptionData }) {
      setLast(subscriptionData.data.userAdded.name);
    }
  });

  return html`
    <link rel="stylesheet" href="user-added.css">
    <mwc-snackbar
        labeltext="${data?.name} Joined!"
        open="${opened}"
        @MDCSnackbar:closed="${() => setOpened(false)}"
        @MDCSnackbar:opened="${() => setOpened(true)}"
    ></mwc-snackbar>
  `,
};

customElements.define('user-added', component(UserAdded));
