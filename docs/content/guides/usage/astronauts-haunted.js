function Astronauts() {
  const { data } = useQuery(gql`
    query Users {
        users {
          id
          name
          picture
        }
      }
  `);

  return html`
    <h2>Astronauts</h2>
    ${(data?.users ?? []).map(user => html`
    <astro-naut id="${user.id}" name="${user.name}">
      <img src="${user.picture}"
           alt="Portrait of ${user.name}">
    </astro-naut>
    `)}
  `;
}
