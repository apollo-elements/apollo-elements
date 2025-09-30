import { customElement, html, ViewTemplate } from '@microsoft/fast-element';
import { ApolloQuery } from '@apollo-elements/fast/bases/apollo-query';
import { GraphQLScriptChildMixin } from '@apollo-elements/mixins';

const template: ViewTemplate<GreetMe> = html`
  <p>
    ${x => x.data?.greeting ?? 'Hello'},
    ${x => x.data?.name ?? 'friend'}
  </p>
`;
@customElement({ name, 'greet-me', template })
class GreetMe extends GraphQLScriptChildMixin(ApolloQuery)<typeof HelloQuery> { }
