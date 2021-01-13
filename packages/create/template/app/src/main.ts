import '@apollo-elements/components/apollo-client';
import { ApolloClientElement } from '@apollo-elements/components/apollo-client';

import { client } from './client';

import './components/app';

const clientWrapper = document.getElementById('client') as ApolloClientElement;

clientWrapper.client = client;

customElements.whenDefined('apollo-app')
  .then(() => document.body.removeAttribute('unresolved'));
