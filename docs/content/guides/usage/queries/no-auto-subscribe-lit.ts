export class HelloQueryElement extends LitElement {
  query = new ApolloQueryController(this, HelloQuery, {
    noAutoSubscribe: true,
    variables: {
      greeting: "How's it going",
      name: 'Dude'
    },
  });
}
