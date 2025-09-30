import { FASTElement, customElement, html } from '@microsoft/fast-element';
import { ApolloQueryBehavior } from '@apollo-elements/fast';
import { TypedQuery } from './Typed.query.graphql';

@customElement({ name: 'typed-element' })
class TypedQueryElement extends FASTElement {
  query = new ApolloQueryBehavior(this, TypedQuery, {
    onData(data) {
      if (newValue !== null)
        console.assert(typeof newValue.name === 'string');
    }
  });
}
