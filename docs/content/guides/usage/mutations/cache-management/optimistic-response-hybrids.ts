define(name, {
  mutation: mutation(BlogPostMutation, {
    optimisticResponse: variables => ({
      postBlogPost: {
        __typename: 'BlogPost',
        url: '#',
        // implementation left as an exercise to the reader
        summary: summarize(variables.content),
      },
    }),
  }),
});
