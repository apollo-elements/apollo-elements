function Hello() {
  const { data } = useQuery(HelloQuery, {
    variables: {
      greeting: "How's it going",
      name: 'Dude'
    }
  });
  return <host>...</host>;
}
