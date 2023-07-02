import { FASTElement, customElement } from '@microsoft/fast-element';
import { ApolloQueryBehavior } from '@apollo-elements/fast';
import { PostQuery } from './Post.query.graphql';
import { routeVar } from '../variables';

@customElement({ name: 'blog-post' })
class BlogPost extends FASTElement {
  query = new ApolloQueryBehavior(this, PostQuery, {
    shouldSubscribe() {
      return !!(routeVar().params?.postId)
    }
  });
}
