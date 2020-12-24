| Option | Description |
| ------ | ----------- |
| client | <pre class="language-ts"><code class="language-ts">ApolloClient</code></pre> | ApolloClient instance for the subscription. |
| fetchPolicy | <pre class="language-ts"><code class="language-ts">FetchPolicy</code></pre> | See [fetchPolicy](/api/interfaces/subscription#fetchpolicy) |
| noAutoSubscribe | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | If set, the component will not subscribe until called explicitly. See [noAutoSubscribe](/api/interfaces/subscription#noautosubscribe) |
| onSubscriptionComplete | Callback that fires when the subscription ends. See [onSubscriptionComplete](/api/interfaces/subscription#onsubscriptioncomplete) |
| onSubscriptionData | Callback for when subscription produces new data. See [onSubscriptionData](/api/interfaces/subscription#onsubscriptiondata) |
| shouldResubscribe | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | Determines if your subscription should be unsubscribed and subscribed again |
| shouldSubscribe | Predicate which determines whether to automatically subscribe. See [shouldSubscribe](/api/interfaces/subscription#shouldsubscribe) |
| skip | <pre class="language-ts"><code class="language-ts">boolean</code></pre> | When true, the subscription will not fetch at all. |
| subscription | <pre class="language-ts"><code class="language-ts">DocumentNode <span class="token operator">&vert;</span> TypedDocumentNode</code></pre> | Subscription GraphQL Document |
| variables | <pre class="language-ts"><code class="language-ts">Variables<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token punctuation">,</span> <span class="token constant">V</span><span class="token operator">&gt;</span> </code></pre> | Subscription variables |
