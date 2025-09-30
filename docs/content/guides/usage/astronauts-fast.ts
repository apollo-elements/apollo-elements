import { gql, type TypedDocumentNode } from '@apollo/client';

import { FASTElement, customElement, html, repeat } from '@microsoft/fast-element';
import { ApolloQueryBehavior } from '@apollo-elements/fast';

const AstronautsQuery: TypedDocumentNode<{
  users: {
    id: string; name: string; picture: string
  }
}> = gql`
  query Users {
    users {
      id
      name
      picture
    }
  }
`;

@customElement({
  name: 'astro-nauts',
  template: html`
    <h2>Astronauts</h2>
    ${repeat(x => x.query.data?.users ?? [], html`
      <astro-naut id="${x => x.id}" name="${x => x.name}">
        <img src="${x => x.picture}"
             alt="Portrait of ${x => x.name}">
      </astro-naut>
    `)}
  `,
})
class Astronauts extends FASTElement {
  query = new ApolloQueryBehavior(this, AstronautsQuery);
}
