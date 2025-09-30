import { useQuery, component } from '@apollo-elements/haunted';
import { PostQuery } from './Post.query.graphql';
import { routeVar } from '../variables';

function BlogPost() {
  const { data } = useQuery(PostQuery, {
    shouldSubscribe() {
      return !!(routeVar().params?.postId)
    },
  });
}

customElements.define('blog-post', component(BlogPost));