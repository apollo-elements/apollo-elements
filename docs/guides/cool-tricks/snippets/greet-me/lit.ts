import { ApolloQuery, customElement, html } from '@apollo-elements/lit-apollo';
import { GraphQLScriptChildMixin } from '@apollo-elements/mixins';

interface Data {
  name: string;
  greeting: string;
}

@customElement('greet-me')
export class GreetMe extends GraphQLScriptChildMixin(ApolloQuery)<typeof HelloQuery> {
  render() {
    return html`
      <p>
        ${this.data?.greeting ?? 'Hello'},
        ${this.data?.name ?? 'friend'}
      </p>
    `;
  }
}
