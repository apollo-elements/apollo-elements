import { ApolloQueryMixin } from '@apollo-elements/mixins';
import { TypedQuery } from './Typed.query.graphql';

class TypedQueryElement
extends ApolloQueryMixin(HTMLElement)<typeof TypedQuery> {
  query = TypedQuery;

  #data: this['data'];

  get data(): this['data'] { return this.#data; }

  set data(value: this['data']) {
    this.#data = value;
    if (data !== null)
      console.assert(typeof this.#data.name === 'string');
    return this.#data;
  }
}
