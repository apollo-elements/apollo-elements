<meta name="description" content="How to use Apollo Elements to write declarative web components that query their data from you Apollo Client cache."/>

GraphQL queries are how you read data from the graph. You can think of them as roughly analogous to HTTP `GET` requests or SQL `READ` statements.

## Query Components

Query components read data from the GraphQL and expose them on the component's `data` property. Each query component takes a `query` property which is a GraphQL `DocumentNode`. You can create that object using the `gql` template literal tag, or via `@apollo-elements/rollup-plugin-graphql`, etc.

<code-copy>

  ```graphql
  query HelloQuery($name: String) {
    name
    greeting
  }
  ```

</code-copy>

Apollo client ensures that the component always has the latest data by _subscribing_ to the query. Query components will automatically subscribe to their queries whenever the `query` property is set, like in this example which sets the `query` class field.

<code-tabs>

<code-tab library="mixins">

  ```ts
  import { ApolloQueryMixins } from '@apollo-elements/mixins/apollo-query-mixin';

  import HelloQuery from './Hello.query.graphql';

  const template = document.createElement('template');
  template.innerHTML = '<p></p>';
  template.content.querySelector('p').append(new Text('Hello'));
  template.content.querySelector('p').append(new Text(', '));
  template.content.querySelector('p').append(new Text('Friend'));
  template.content.querySelector('p').append(new Text('!'));

  export class HelloQuery extends
  ApolloQueryMixin(HTMLElement)<Data, Variables> {
    query = HelloQuery;

    #data: Data = null;
    get data() { return this.#data; }
    set data(value: Data) {
      this.#data = value;
      this.render();
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(template.content.cloneNode(true));
      this.render();
    }

    render() {
      const [greetingNode, , nameNode] =
        this.shadowRoot.querySelector('p').childNodes;
      greetingNode.data = this.data?.greeting ?? 'Hello';
      nameNode.data = this.data?.name ?? 'Friend';
    }
  }

  customElements.define('hello-query', HelloQuery);
  ```

</code-tab>

<code-tab library="lit-apollo">

  ```ts
  import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';
  import HelloQuery from './Hello.query.graphql';

  @customElement('hello-query')
  export class HelloQuery extends ApolloQuery<Data, Variables> {
    query = HelloQuery;

    render() {
      const greeting = this.data?.greeting ?? 'Hello';
      const name = this.data?.name ?? 'Friend';
      return html`
        <p>${greeting}, ${name}!</p>
      `;
    }
  }
  ```

</code-tab>

<code-tab library="fast">

  ```ts
  import { ApolloQuery, customElement } from '@apollo-elements/fast';
  import HelloQuery from './Hello.query.graphql';

  const template = html<HelloQuery>`
    <p>${x => x.data?.greeting ?? 'Hello'}, ${x => x.data?.name ?? 'Friend'}!</p>
  `;

  @customElement({ name: 'hello-query', template })
  export class HelloQuery extends ApolloQuery<Data, Variables> {
    query = HelloQuery;
  }
  ```

</code-tab>

<code-tab library="haunted">

  ```ts
  import { useQuery, component, html } from '@apollo-elements/hybrids';
  import HelloQuery from './Hello.query.graphql';

  function Hello() {
    const { data } = useQuery(HelloQuery);

    const greeting = data?.greeting ?? 'Hello';
    const name = data?.name ?? 'Friend';

    return html`
      <p>${greeting}, ${name}!</p>
    `;
  }

  customElements.define('hello-query', component(Hello));
  ```

</code-tab>

<code-tab library="hybrids">

  ```ts
  import { client, query, define, html } from '@apollo-elements/hybrids';
  import HelloQuery from './Hello.query.graphql';

  const render = ({ data }) => html`
    <p>${data?.greeting ?? 'Hello'}, ${data?.name ?? 'Friend'}!</p>
  `;

  define('hello-query', {
    client: client(window.__APOLLO_CLIENT__),
    query: query(HelloQuery),
    render,
  });
  ```

</code-tab>

</code-tabs>

You can also use the DOM to set the query property

<code-copy>

  ```js
  document.querySelector('hello-query').query = gql`...`;
  ```

</code-copy>

Or set it directly from HTML with an `application/graphql` script child.

<code-copy>

  ```html
  <hello-query>
    <script type="application/graphql">
      query HelloQuery($name: String) {
        name
        greeting
      }
    </script>
  </hello-query>
  ```

</code-copy>

## Setting Query Variables

If your query has variables, you can define them by setting the `variables` property on your component.

<code-copy>

  ```graphql
  query HelloQuery($name: String, $greeting: String) {
    helloWorld(name: $name, greeting: $greeting) {
      name
      greeting
    }
  }
  ```

</code-copy>

Any apollo query element can take it's variables via the by simply setting the `variables` property on the element.

<code-copy>

  ```js
  root.querySelector('hello-query').variables = {
    greeting: "How's it going",
    name: 'Dude'
  };
  ```

</code-copy>

For class-based components (e.g. `lit-apollo` or vanilla query components), you can define them in the `variables` class field.

<code-tabs>
<code-tab library="mixins">

  ```ts
  export class HelloQuery extends ApolloQueryMixin(HTMLElement)<Data, Variables> {
    query = HelloQuery;

    variables = {
      greeting: "How's it going",
      name: 'Dude'
    };
  }
  ```

</code-tab>
<code-tab library="lit">

  ```ts
  export class HelloQuery extends ApolloQuery<Data, Variables> {
    query = HelloQuery;

    variables = {
      greeting: "How's it going",
      name: 'Dude'
    };
  }
  ```

</code-tab>
<code-tab library="fast">

  ```ts
  @customElement({ name: 'hello-query', template })
  export class HelloQuery extends ApolloQuery<Data, Variables> {
    query = HelloQuery;

    variables = {
      greeting: "How's it going",
      name: 'Dude'
    };
  }
  ```

</code-tab>
<code-tab library="haunted">

  ```ts
  const variables = {
    greeting: "How's it going",
    name: 'Dude'
  };

  function Hello() {
    const { data } = useQuery(HelloQuery, { variables });

    const greeting = data?.greeting ?? 'Hello';
    const name = data?.name ?? 'Friend';

    return html`
      <p>${greeting}, ${name}!</p>
    `;
  }
  ```

</code-tab>
<code-tab library="hybrids">

  ```ts
  define('hello-query', {
    client: client(window.__APOLLO_CLIENT__),
    query: query(HelloQuery),
    variables: property({
      greeting: "How's it going",
      name: 'Dude'
    }),
  });
  ```

</code-tab>
</code-tabs>

or by appending a `<script type="application/json">` child

<code-copy>

  ```html
  <hello-query>
    <script type="application/json">
      {
        "greeting": "How's it going",
        "name": "Dude"
      }
    </script>
  </hello-query>
  ```

</code-copy>

## Preventing Automatic Subscription
If you want your component to not subscribe at all until you call the `subscribe()` method, you can opt out of the default behaviour by setting the `noAutoSubscribe` property.

<code-tabs>
<code-tab library="mixins">

  ```ts
  class LazyGreeting extends HelloQuery {
    noAutoSubscribe = true;
  }
  ```

</code-tab>

<code-tab library="lit-apollo">

  ```ts
  class LazyGreeting extends HelloQuery {
    noAutoSubscribe = true;
  }
  ```

</code-tab>

<code-tab library="fast">

  ```ts
  class LazyGreeting extends HelloQuery {
    noAutoSubscribe = true;
  }
  ```

</code-tab>

<code-tab library="haunted">

  ```ts
  function Hello() {
    const { data } = useQuery(HelloQuery, { noAutoSubscribe: true });

    const greeting = data?.greeting ?? 'Hello';
    const name = data?.name ?? 'Friend';

    return html`
      <p>${greeting}, ${name}!</p>
    `;
  }
  ```

</code-tab>

<code-tab library="hybrids">

  ```ts
  define('lazy-hello-world', {
    noAutoSubscribe: true,
    ...HelloWorld,
  });
  ```

</code-tab>

</code-tabs>

In that case, call the element's `subscribe` method to start listening for changes:

<code-copy>

  ```js
  const element = document.querySelector('hello-query')
  element.subscribe();
  ```

</code-copy>

Alternatively, you can set the boolean `no-auto-subscribe` attribute to the element instance. Bear in mind that `no-auto-subscribe` is a boolean attribute, so it's presence indicates truthiness, and its absence indicates falsiness.

> NOTE, for hybrids, if you explicitly define a `noAutoSubscribe` property in the descriptor, this attribute may not set the associated property.

<code-copy>

  ```html
  <!-- This one eagerly subscribes -->
  <hello-query></hello-query>
  <!-- This one will not subscribe until called -->
  <hello-query no-auto-subscribe></hello-query>
  <!-- Neither will this one -->
  <hello-query no-auto-subscribe="false"></hello-query>
  ```

</code-copy>

In addition to `data`, elements can also access `loading`, `error` and `errors` properties.

<code-tabs>
<code-tab library="mixins">

  ```ts
  // snip
  template.innerHTML = `
    <article class="skeleton">
      <p class="error" hidden></p>
      <p></p>
    </article>
  `;

  template.content.querySelector('p:last-of-type').append(new Text('Hello'));
  template.content.querySelector('p:last-of-type').append(new Text(', '));
  template.content.querySelector('p:last-of-type').append(new Text('Friend'));

  export class HelloQuery extends
  ApolloQueryMixin(HTMLElement)<Data, Variables> {
    // snip

    #loading = false;
    get loading() { return this.#loading; }
    set loading(value: boolean) {
      this.#loading = value;
      this.render();
    }

    #error = false;
    get error() { return this.#error; }
    set error(value: ApolloError) {
      this.#error = value;
      this.render();
    }

    $(selector) { return this.shadowRoot.querySelector(selector); }

    render() {
      if (this.loading)
        this.$('article').classList.add('skeleton');
      else
        this.$('article').classList.remove('skeleton');

      if (this.error) {
        this.$('p:first-of-type').hidden = false;
        this.$('p:first-of-type').textContent = this.error.message;
      } else {
        this.$('p:first-of-type').hidden = true;
        const [greetingNode, , nameNode] =
          this.$('p:last-of-type').childNodes;
        greetingNode.data = this.data?.greeting ?? 'Hello';
        nameNode.data = this.data?.name ?? 'Friend';
      }
    }
  }
  ```

</code-tab>

<code-tab library="lit-apollo">

  ```ts
  render() {
    return html`
      <article class="${classMap({ skeleton: this.loading })}">
        <p class="error" ?hidden="${!this.error}">${this.error?.message}</p>
        <p>
          ${this.data?.greeting ?? 'Hello'},
          ${this.data?.name ?? 'Friend'}
        </p>
      </article>
    `;
  }
  ```

</code-tab>

<code-tab library="fast">

  ```ts
  const template = html<HelloQuery>`
    <article class="${x => x.loading ? 'skeleton' : ''})}">
      <p class="error" ?hidden="${!x => x.error}">${x => x.error?.message}</p>
      <p>
        ${x => x.data?.greeting ?? 'Hello'},
        ${x => x.data?.name ?? 'Friend'}
      </p>
    </article>
  `;
  ```

</code-tab>

<code-tab library="haunted">

  ```ts
  import { classMap } from 'lit-html/directives/class-map';

  function Hello() {
    const { data, loading, error } = useQuery(HelloQuery, { noAutoSubscribe: true });

    const greeting = data?.greeting ?? 'Hello';
    const name = data?.name ?? 'Friend';

    return html`
      <article class="${classMap({ loading })})}">
        <p class="error" ?hidden="${!error}">${error?.message}</p>
        <p>${greeting}, ${name}!</p>
      </article>
    `;
  }
  ```

</code-tab>

<code-tab library="hybrids">

  ```ts
  const render = ({ data, error, loading }) => html`
    <article class="${loading ? 'skeleton' : ''})}">
      <p class="error" ?hidden="${!error}">${error?.message}</p>
      <p>
        ${data?.greeting ?? 'Hello'},
        ${data?.name ?? 'Friend'}
      </p>
    </article>
  `;
  ```

</code-tab>
</code-tabs>

Queries that have non-nullable variables (i.e. required variables) will still attempt to subscribe even if their required variables are not set. To prevent this (and the resulting GraphQL error from the server), override the `shouldSubscribe` method of your query component, returning `true` if your variables' dependencies are defined.

<code-tabs>
<code-tab library="mixins">

  ```ts
  shouldSubscribe() {
    return !!(new URL(window.location).searchParams.get('userId'))
  }
  ```

</code-tab>

<code-tab library="lit-apollo">

  ```ts
  shouldSubscribe() {
    return !!(new URL(window.location).searchParams.get('userId'))
  }
  ```

</code-tab>

<code-tab library="fast">

  ```ts
  shouldSubscribe() {
    return !!(new URL(window.location).searchParams.get('userId'))
  }
  ```

</code-tab>
<code-tab library="haunted">

  ```ts
  import { classMap } from 'lit-html/directives/class-map';
  import type { SubscriptionOptions } from '@apollo/client/core';

  function shouldSubscribe(options?: Partial<SubscriptionOptions>): boolean {
    return !!(new URL(window.location).searchParams.get('userId'))
  }

  function Hello() {
    const { data } = useQuery(HelloQuery, { shouldSubscribe });

    const greeting = data?.greeting ?? 'Hello';
    const name = data?.name ?? 'Friend';

    return html`
      <p>${greeting}, ${name}!</p>
    `;
  }
```

</code-tab>
<code-tab library="hybrids">

  ```ts
  define('lazy-hello-world', {
    ...HelloWorld,
    shouldSubscribe: {
      get() {
        return function shouldSubscribe() {
          return !!(new URL(window.location).searchParams.get('userId'))
        };
      }
    },
  });
  ```

</code-tab>
</code-tabs>

Alternatively, you can implement an [`ApolloLink`](https://www.apollographql.com/docs/react/api/link/introduction/)
which prevents operations from continuing when required variables are missing:

<code-copy>

  ```ts
  import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache
  } from '@apollo/client/core';

  import { hasAllVariables } from '@apollo-elements/lib/has-all-variables';

  const uri =
    '/graphql';

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      new ApolloLink((operation, forward) =>
        hasAllVariables(operation) && forward(operation)),
      new HttpLink({ uri }),
    ])
  });
  ```

</code-copy>

Both the `<apollo-client>` component and the `createApolloClient` helper automatically apply such a link.