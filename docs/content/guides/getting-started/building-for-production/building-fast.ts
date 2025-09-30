import { FASTElement, customElement } from '@microsoft/fast-element';
import { ApolloQueryBehavior } from '@apollo-elements/fast';
import { HelloQuery } from './Hello.query.graphql';

@customElement({ name: 'hello-world' })
class HelloWorld extends FASTElement {
  query = new ApolloQueryBehavior(this, HelloQuery);
}
