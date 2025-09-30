import { gql } from '@apollo/client/core';

export const IntrospectionQueriesQuery = gql` {
  __type(name: "Query") {
    fields {
      name
      description
    }
  }
}`;
