import { useEffect, useQuery, component, html } from '@apollo-elements/haunted';
import { GraphQLScriptChildMixin } from '@apollo-elements/mixins';

function GreetMe(hostElement) {
  // NOTE: must pass `hostElement: this` to use `<apollo-client>`
  const query = useQuery(null, { hostElement });

  // When GraphQLScriptChildMixin resolves the query and variables,
  // set them on the query controller to start the query
  useEffect(() => { query.variables = hostElement.variables }, [hostElement.variables]);
  useEffect(() => { query.query = hostElement.document }, [hostElement.document]);

  return html`
    <p>
      ${query.data?.greeting ?? 'Hello'},
      ${query.data?.name ?? 'friend'}
    </p>
  `;
}

customElements.define('greet-me', GraphQLScriptChildMixin(component(GreetMe)));
