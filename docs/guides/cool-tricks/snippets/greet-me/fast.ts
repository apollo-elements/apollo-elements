import { customElement, html } from '@microsoft/fast-element';
import { ApolloQuery } from '@apollo-elements/fast/bases/apollo-query';
import { GraphQLScriptChildMixin } from '@apollo-elements/mixins';

@customElement({ name: 'greet-me', template: html`
  <p>
    ${x => x.data?.greeting ?? 'Hello'},
    ${x => x.data?.name ?? 'friend'}
  </p>
` })
export class GreetMe extends GraphQLScriptChildMixin(ApolloQuery)<typeof HelloQuery> { }
