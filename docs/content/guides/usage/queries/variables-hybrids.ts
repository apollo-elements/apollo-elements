define('hello-query', {
  query: query(HelloQuery, {
    variables: {
      greeting: "How's it going",
      name: 'Dude'
    }
  }),
});
