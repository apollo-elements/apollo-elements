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

  return (
    <host shadowDom>
      <h2>Astronauts</h2>
      {(data?.users ?? []).map(({ id, name, picture }) => (
      <astro-naut id={id} name={nam }>
        <img src={picture}
             alt="Portrait of {name}"/>
      </astro-naut>
      ))}
    </host>
  );
}
