import { define, query } from '@apollo-elements/hybrids';
import { HelloQuery } from './Hello.query.graphql';

define('hello-world', {
  query: query(HelloQuery),
});
