export class HelloQueryElement extends ApolloQueryMixin(HTMLElement)<Data, Variables> {
  query = HelloQuery;

  variables = {
    greeting: "How's it going",
    name: 'Dude'
  };
}
