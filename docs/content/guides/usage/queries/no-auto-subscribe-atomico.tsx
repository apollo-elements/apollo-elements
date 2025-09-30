function Hello() {
  const { data } = useQuery(HelloQuery, { noAutoSubscribe: true });

  const greeting = data?.greeting ?? 'Hello';
  const name = data?.name ?? 'Friend';

  return <host><p>{greeting}, {name}!</p></host>;
}
