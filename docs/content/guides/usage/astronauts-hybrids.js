import { query } from '@apollo-elements/hybrids/factories/query';

define('astro-nauts', {
  query: query(gql`
    query Users {
        users {
          id
          name
          picture
        }
      }
  `),
  render: host => html`
    <h2>Astronauts</h2>
    ${(host.query.data?.users ?? []).map(user => html`
    <astro-naut id="${user.id}" name="${user.name}">
      <img src="${user.picture}"
           alt="Portrait of ${user.name}">
    </astro-naut>
    `)}
  `,
});
