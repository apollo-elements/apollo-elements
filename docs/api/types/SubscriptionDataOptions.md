| Option | Type | Description |
| ------ | ---- | ----------- |
| client | <pre class="language-ts"><code class="language-ts">ApolloClient</code></pre> | Apollo Client to use for the subscription. |
| fetchPolicy | <pre class="language-ts"><code class="language-ts">FetchPolicy</code></pre> | See [fetchPolicy](/api/interfaces/subscription#fetchpolicy) |
| shouldResubscribe | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | Boolean, or a predicate function of `SubscriptionDataOptions` that determines if your subscription should be unsubscribed and subscribed again |
| skip | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | If skip is true, the subscription will be skipped entirely. |
| subscription | <pre class="language-ts"><code class="language-ts">DocumentNode <span class="token operator">&vert;</span> TypedDocumentNode</code></pre> | GraphQL document with a single subscription. |
| variables | <pre class="language-ts"><code class="language-ts">Variables<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token punctuation">,</span> <span class="token constant">V</span><span class="token operator">&gt;</span> </code></pre> | An object containing all of the variables your subscription needs to execute. |
