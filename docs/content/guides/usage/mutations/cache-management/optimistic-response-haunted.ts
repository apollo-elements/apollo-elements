function BlogPost() {
  const [datePosted, setDatePosted] = useState(new Date().toISOString());
  const [content, setContent] = useState('');

  const [addBlogPost, { data, loading }] =
    useMutation<Data, Variables>(BlogPostMutation, {
      onCompleted: () => setContent(''),
      update,
      optimisticResponse: variables => ({
        postBlogPost: {
          __typename: 'BlogPost',
          url: '#',
          // implementation left as an exercise to the reader
          summary: summarize(variables.content),
          datePosted,
          content,
        },
      }),
    });

  const variables = { content };

  return html`
    <loading-overlay ?active="${loading}"></loading-overlay>

    <label>New Post textarea @input="${e => setContent(e.target.value)}"</textarea></label>

    <button
        ?hidden="${!!data}"
        @click="${() => {
          setDatePosted(new Date().toISOString());
          addBlogPost({ variables });
        }}"
    >Post!</button>

    <article ?hidden="${!data}">
      <strong>Post Succeeded!</strong>
      <p>${data?.summary}</p>
    </article>
  `;
}
