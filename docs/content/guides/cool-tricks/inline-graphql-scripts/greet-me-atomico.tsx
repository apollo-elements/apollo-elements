import { useEffect, useQuery, useHost, c } from '@apollo-elements/atomico';
import { GraphQLScriptChildMixin } from '@apollo-elements/mixins';

function GreetMe(props) {
  const ref = useHost();
  // NOTE: must pass `hostElement` to use `<apollo-client>`
  const query = useQuery(null, { hostElement: ref.current });

  // When GraphQLScriptChildMixin resolves the query and variables,
  // set them on the query controller to start the query
  useEffect(() => { query.variables = props.variables }, [props.variables]);
  useEffect(() => { query.query = props.document }, [props.document]);

  return (
    <host shadowDom>
      <p>
        {query.data?.greeting ?? 'Hello'},
        {query.data?.name ?? 'friend'}
      </p>
    </host>
  );
}

customElements.define('greet-me', GraphQLScriptChildMixin(c(GreetMe)));
