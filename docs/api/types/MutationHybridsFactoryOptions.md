| Option | Type | Description |
| ------ | ---- | ----------- |
| client | <pre class="language-ts"><code class="language-ts">ApolloClient</code></pre> | ApolloClient instance use to make the call. |
| mutation | <pre class="language-ts"><code class="language-ts">DocumentNode <span class="token operator">&vert;</span> TypedDocumentNode</code></pre> | A specific mutation document. See [`mutation`](/api/interfaces/mutation#mutation). |
| variables | <pre class="language-ts"><code class="language-ts">Variables<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token punctuation">,</span> <span class="token constant">V</span><span class="token operator">&gt;</span> </code></pre> | Operation variables. See [`variables`](/api/interfaces/mutation#variables). |
| optimisticResponse | | See [optimisticResponse](/api/interfaces/mutation#optimisticresponse) in ApolloMutationInterface |
| context | <pre class="language-ts"><code class="language-ts">Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">&gt;</span></code></pre> | Context object passed through the link execution chain. |
| errorPolicy | <pre class="language-ts"><code class="language-ts">ErrorPolicy</code></pre> | Error policy to use for the mutation. See [`errorPolicy`](/api/interfaces/mutation#errorpolicy) |
| fetchPolicy | <pre class="language-ts"><code class="language-ts">FetchPolicy</code></pre> | See [`fetchPolicy`](/api/interfaces/mutation#fetchpolicy) |
| refetchQueries | See [`refetchQueries`](/api/interfaces/mutation#refetchQueries) | |
| awaitRefetchQueries | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | See [awaitRefetchQueries](#awaitrefetchqueries) |
| updater | See [`updater`](/api/interfaces/mutation#updater) | Function used to update the client cache following the mutation. |
