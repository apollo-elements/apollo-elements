@customElement({ name: 'hello-query', template })
export class HelloQueryElement extends FASTElement {
  query = new ApolloQueryBehavior(this, HelloQuery, {
    variables: {
      greeting: "How's it going",
      name: 'Dude'
    },
  });
}
