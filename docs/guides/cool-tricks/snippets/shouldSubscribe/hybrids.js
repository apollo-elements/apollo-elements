import { define, query } from '@apollo-elements/hybrids';
import { PostQuery } from './Post.query.graphql';
import { routeVar } from '../variables';

function shouldSubscribe() {
  return !!(routeVar().params?.postId)
}

define('blog-post', {
  query: query(PostQuery, { shouldSubscribe }),
});
