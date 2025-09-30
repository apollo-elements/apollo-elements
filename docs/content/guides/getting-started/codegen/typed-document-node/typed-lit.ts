import { LitElement, PropertyValues } from 'lit';
import { ApolloQueryController } from '@apollo-elements/core';
import { TypedQuery } from './Typed.query.graphql';

class TypedQueryElement extends LitElement {
  query = new ApolloQueryController(this, TypedQuery, {
    onData: (data) => {
      if (data)
        console.assert(typeof this.query.data.name === 'string');
    }
  });
}
