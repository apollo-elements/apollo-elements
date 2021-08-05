import { gql, TypedDocumentNode } from '@apollo/client/core';

interface siteSelectedFragment {
  __typename?: 'Site';
  selected: boolean;
}

export const selectedSite: TypedDocumentNode<siteSelectedFragment, null> =
gql`
  fragment siteSelected on Site {
    selected @client
  }
`;
