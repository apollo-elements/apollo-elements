import type { ApolloQueryElement } from '@apollo-elements/components';

import { TypedQuery } from './Typed.query.graphql';

import '@apollo-elements/components';

type TypedHTMLQueryElement = ApolloQueryElement<typeof TypedQuery>;

const typedHTMLQueryElement =
  document.querySelector<TypedHTMLQueryElement>('apollo-query');

typedHTMLQueryElement.query = TypedQuery;

type DataType = (typeof typedHTMLQueryElement)['data'];
