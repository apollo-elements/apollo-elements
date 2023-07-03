import type { Country } from './client.js';
import type { TypedDocumentNode } from '@apollo/client/core';
import { gql } from '@apollo/client/core';

export const CountriesQuery: TypedDocumentNode<{ countries: Country[] }> = gql`
  query CountriesQuery {
    countries { countryCode name emoji }
  }
`;
