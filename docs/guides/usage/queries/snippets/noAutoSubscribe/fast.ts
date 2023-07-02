class LazyGreeting extends FASTElement {
  query = new ApolloQueryController(this, HelloQuery, {
    noAutoSubscribe: true,
    variables: {
      greeting: "How's it going",
      name: 'Dude'
    },
  });
}
