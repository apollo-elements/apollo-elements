export class HelloQueryElement extends LitElement {
  query = new ApolloQueryController(this, HelloQuery, {
    variables: {
      greeting: "How's it going",
      name: 'Dude'
    },
  });
}
