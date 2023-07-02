import { useQuery, c } from '@apollo-elements/atomico';
import { PostQuery } from './Post.query.graphql';
import { routeVar } from '../variables';

function BlogPost() {
  const { data } = useQuery(PostQuery, {
    shouldSubscribe() {
      return !!(routeVar().params?.postId)
    },
  });
  return <host>...</host>;
}

customElements.define('blog-post', c(BlogPost));
