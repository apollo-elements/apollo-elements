import { ApolloQueryController } from '@apollo-elements/core/apollo-query-controller';

class Astronauts extends ApolloQuery {
  query = new ApolloQueryController(this, gql`
    query Users {
      users {
        id
        name
        picture
      }
    }
  `);

  render() {
    return html`
      <h2>Astronauts</h2>
      ${(this.query.data?.users ?? []).map(user => html`
      <astro-naut id="${user.id}" name="${user.name}">
        <img src="${user.picture}"
             alt="Portrait of ${user.name}">
      </astro-naut>
      `)}
    `;
  }
}
