import { useSubscription, useState, c, html, css } from '@apollo-elements/atomico';

import { client } from './client.js';

import { UserAddedSubscription } from './UserAdded.subscription.graphql.js';

import '@material/mwc-snackbar';

function UserAdded() {
  const [last, setLast] = useState('');

  const [opened, setOpened] = useState(false);

  const { data } = useSubscription(UserAddedSubscription, {
    client,
    onData({ subscriptionData }) {
      setLast(subscriptionData.data.userAdded.name);
      setOpened(true);
    },
  });

  return html`
    <host shadowDom>
      <mwc-snackbar
          labeltext="${data?.name} Joined!"
          open=${opened}
      ></mwc-snackbar>
    </host>
  `;
};

UserAdded.styles = css`
  :host {
    display: block;
  }
`;

customElements.define('user-added', c(UserAdded));
