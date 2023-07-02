import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { PostQuery } from './Post.query.graphql';
import { routeVar } from '../variables';

class BlogPost extends ApolloQueryMixin(HTMLElement)<Data, Variables> {
  query = PostQuery;

  shouldSubscribe() {
    return !!(routeVar().params?.postId)
  }
}

customElements.define('blog-post', BlogPost);
