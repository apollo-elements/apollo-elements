import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

import UserSessionQuery from './UserSession.query.graphql';

import type {
  UserSessionQueryData as Data,
  UserSessionQueryVariables as Variables,
} from '../schema';

import { getClient } from './client';
import { formatDistance } from 'date-fns/esm';

const template = document.createElement('template');
template.innerHTML = `
  <h1>👋 </h1>
  <p>
    <span>Your last activity was</span>
    <time></time>
  </p>
`;

template.content.querySelector('h1').append(new Text(''));
template.content.querySelector('h1').append(new Text('!'));
template.content.querySelector('time').append(new Text(''));

class AsyncElement extends ApolloQueryMixin(HTMLElement)<Data, Variables> {
  noAutoSubscribe = true;

  query = UserSessionQuery;

  get data() {
    return this.#data;
  }

  set data(value: Data) {
    this.#data = value;
    this.render();
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
  }

  async connectedCallback() {
    super.connectedCallback();
    // asynchronously get a reference to the client
    this.client = await getClient();
    // only then start fetching data
    this.subscribe();
  }

  render() {
    const lastActive = this.data?.userSession.lastActive;

    const [waveNode, nameNode] =
      this.shadowRoot.querySelector('h1').childNodes;
    const [timeNode] =
      this.shadowRoot.querySelector('time').childNodes;

    nameNode.data = this.data?.userSession.name ?? '';
    timeNode.data =
      !lastActive ? '' : formatDistance(lastActive, Date.now(), { addSuffix: true });
  }
};

customElements.define('async-element', AsyncElement);
