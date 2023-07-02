import type { ResultOf } from '@graphql-typed-document-node/core';
/**
 * update function which reads a cached query result, merges
 * it with the mutation result, and then writes it back to the cache.
 */
function update(
  cache: ApolloCache<NormalizedCacheObject>,
  result: FetchResult<ResultOf<typeof BlogPostMutation>>
) {
  // 1: Read the cache synchronously to get the current list of posts
  const query = LatestPostsQuery;
  const cached = cache.readQuery({ query: LatestPostsQuery });

  // 2: Calculate the expected result of LatestPostsQuery,
  //    considering the mutation result
  const data = { posts: [result.data.postBlogPost, ...cached.posts] }

  // 3: Perform the cache update by calling `writeQuery`
  cache.writeQuery({ query, data });
}

function BlogPost() {
  const [content, setContent] = useState('');

  const [addBlogPost, { data, loading }] =
    useMutation(BlogPostMutation, {
      onCompleted: () => setContent(''),
      update,
    });

  return html`...`;
}
