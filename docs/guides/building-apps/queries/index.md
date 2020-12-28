---
description: Use Apollo Elements to write high-performance GraphQL query components
---

# Building Apps >> Queries || 10

> TL;DR: query components read data from the graph. By default, query elements automatically fetch data once you set their `query` and/or `variables` properties or class fields. Render your component's local DOM with the component's `data`, `loading`, and `error` properties.

> Here for the [query component API docs](/api/interfaces/query/)?

GraphQL queries are how you read data from the graph. You can think of them as roughly analogous to HTTP `GET` requests or SQL `READ` statements. A query can have variables, e.g. "user, by user ID" or "posts, sorted by last modified"; or it might not, e.g. "all users".

## Query Elements

Query components read data from the GraphQL and expose them on the element's `data` property. Each query element has a `query` property which is a GraphQL `DocumentNode`. You can create that object using the `gql` template literal tag, or via `@apollo-elements/rollup-plugin-graphql`, etc. See the [buildless development](/guides/getting-started/buildless-development/) guide for more info.

```graphql copy
query HelloQuery {
  hello { name greeting }
}
```

To initiate a query, set your element's query property or class field, or add an `application/graphql` script in your element's HTML.

```js copy
document.querySelector('hello-query').query = HelloQuery;
```

```html copy
<hello-query>
  <script type="application/graphql">
    query HelloQuery {
      hello { name greeting }
    }
  </script>
</hello-query>
```

Apollo client ensures that the component always has the latest data by {% footnoteref "observablequery" "This is different from <a href='/guides/building-apps/subscriptions/'>GraphQL subscriptions</a>, which are realtime persistent streams, typically over websockets. Rather, `ObservableQueries` update the client-side state whenever the query's data changes, either because the user executed the query operation, a mutation updated the query's fields, or the Apollo cache's local state changed." %}_subscribing_{% endfootnoteref %} to the query using an [`ObservableQuery`](https://www.apollographql.com/docs/react/api/core/ObservableQuery/) object. As long as an element has access to an `ApolloClient` instance, whenever its `query` or `variables` property changes, it will automatically subscribe to (or update) its `ObservableQuery`.

When the `ObservableQuery` subscription produces new data (e.g. on response from the GraphQL server, or if local state changes), it sets the element's `data`, `loading` and `error` properties (as well as `errors` if `returnPartialData` property is true). The following example shows how a simple query element written with different component libraries (or none) renders it's state.

<code-tabs collection="libraries" default-tab="lit">

  ```ts tab mixins
  import { ApolloQueryMixins } from '@apollo-elements/mixins/apollo-query-mixin';

  import HelloQuery from './Hello.query.graphql';

  const template = document.createElement('template');
  template.innerHTML = `
    <article class="skeleton">
      <p id="error" hidden></p>
      <p id="data"></p>
    </article>
  `;

  template.content.querySelector('#data').append(new Text('Hello'));
  template.content.querySelector('#data').append(new Text(', '));
  template.content.querySelector('#data').append(new Text('Friend'));
  template.content.querySelector('#data').append(new Text('!'));

  export class HelloQueryElement extends
  ApolloQueryMixin(HTMLElement)<Data, Variables> {
    query = HelloQuery;

    constructor() {
      super();
      this.attachShadow({ mode: 'open' })
        .append(template.content.cloneNode(true));
      this.render();
    }

    $(selector) { return this.shadowRoot.querySelector(selector); }

    #data: Data = null;
    get data() { return this.#data; }
    set data(value: Data) { this.#data = value; this.render(); }

    #loading = false;
    get loading() { return this.#loading; }
    set loading(value: boolean) { this.#loading = value; this.render(); }

    #error: Error | ApolloError = null;
    get error() { return this.#error; }
    set error(value: ApolloError) { this.#error = value; this.render(); }

    render() {
      if (this.loading)
        this.$('article').classList.add('skeleton');
      else
        this.$('article').classList.remove('skeleton');

      if (this.error) {
        this.$('#error').hidden = false;
        this.$('#error').textContent = this.error.message;
      } else {
        this.$('#error').hidden = true;
        const [greetingNode, , nameNode] = this.$('#data').childNodes;
        greetingNode.data = this.data?.hello?.greeting ?? 'Hello';
        nameNode.data = this.data?.hello?.name ?? 'Friend';
      }
    }
  }

  customElements.define('hello-query', HelloQueryElement);
  ```

  ```ts tab lit
  import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';
  import { HelloQuery } from './Hello.query.graphql';

  @customElement('hello-query')
  export class HelloQueryElement extends ApolloQuery<Data, Variables> {
    query = HelloQuery;

    render() {
      const greeting = this.data?.greeting ?? 'Hello';
      const name = this.data?.name ?? 'Friend';
      return html`
        <article class="${classMap({ skeleton: this.loading })}">
          <p id="error" ?hidden="${!this.error}">${this.error?.message}</p>
          <p>
            ${this.data?.greeting ?? 'Hello'},
            ${this.data?.name ?? 'Friend'}
          </p>
        </article>
      `;
    }
  }
  ```

  ```ts tab fast
  import { ApolloQuery, customElement } from '@apollo-elements/fast';
  import HelloQuery from './Hello.query.graphql';

  const template = html<HelloQueryElement>`
    <article class="${x => x.loading ? 'skeleton' : ''})}">
      <p id="error" ?hidden="${!x => x.error}">${x => x.error?.message}</p>
      <p>
        ${x => x.data?.hello?.greeting ?? 'Hello'},
        ${x => x.data?.hello?.name ?? 'Friend'}
      </p>
    </article>
  `;

  @customElement({ name: 'hello-query', template })
  export class HelloQueryElement extends ApolloQuery<Data, Variables> {
    query = HelloQuery;
  }
  ```

  ```ts tab haunted
  import { useQuery, component, html } from '@apollo-elements/haunted';
  import { classMap } from 'lit-html/directives/class-map';
  import { HelloQuery } from './Hello.query.graphql';

  function Hello() {
    const { data, loading, error } = useQuery(HelloQuery, { noAutoSubscribe: true });

    const greeting = data?.hello?.greeting ?? 'Hello';
    const name = data?.hello?.name ?? 'Friend';

    return html`
      <article class="${classMap({ loading })})}">
        <p id="error" ?hidden="${!error}">${error?.message}</p>
        <p>${greeting}, ${name}!</p>
      </article>
    `;
  }

  customElements.define('hello-query', component(Hello));
  ```

  ```ts tab hybrids
  import { client, query, define, html } from '@apollo-elements/hybrids';
  import { HelloQuery } from './Hello.query.graphql';

  define('hello-query', {
    client: client(),
    query: query(HelloQuery),
    render: ({ data, error, loading }) => html`
      <article class="${loading ? 'skeleton' : ''})}">
        <p id="error" ?hidden="${!error}">${error?.message}</p>
        <p>
          ${data?.hello?.greeting ?? 'Hello'},
          ${data?.hello?.name ?? 'Friend'}
        </p>
      </article>
    `,
  });
  ```

</code-tabs>

## Query Variables

Some queries have variables, which you can use to customize the response from the GraphQL server:

```graphql copy
query HelloQuery($name: String, $greeting: String) {
  helloWorld(name: $name, greeting: $greeting) {
    name
    greeting
  }
}
```

To apply variables to your query element, set its [`variables` property](/api/interfaces/query/#variables). For the above example, which has two string parameters, `name` and `greeting`, set your element's `variables` property to an object with keys `name` and `greeting` and values representing the query arguments:

```js copy
root.querySelector('hello-query').variables = {
  greeting: "How's it going",
  name: 'Dude'
};
```

If your variables are static, you can even do this by adding a <abbr title="JavaScript Object Notation">JSON</abbr> script to your element's HTML.

```html copy
<apollo-query>
  <script type="application/graphql">
    query HelloQuery($name: String, $greeting: String) {
      helloWorld(name: $name, greeting: $greeting) {
        name
        greeting
      }
    }
  </script>
  <script type="application/json">
    {
      "greeting": "How's it going",
      "name": "Dude"
    }
  </script>
</apollo-query>
```

For class-based components (e.g. vanilla, `lit-apollo`, or `FAST`), you can apply arguments by setting the `variables` class field, while the [`useQuery` haunted hook](/api/libraries/haunted/useQuery/) and [`query` hybrids factory](/api/libraries/hybrids/query/) take a second options parameter with a `variables` property.

<code-tabs collection="libraries" default-tab="lit">

  ```ts tab mixins
  export class HelloQueryElement extends ApolloQueryMixin(HTMLElement)<Data, Variables> {
    query = HelloQuery;

    variables = {
      greeting: "How's it going",
      name: 'Dude'
    };
  }
  ```

  ```ts tab lit
  export class HelloQueryElement extends ApolloQuery<Data, Variables> {
    query = HelloQuery;

    variables = {
      greeting: "How's it going",
      name: 'Dude'
    };
  }
  ```

  ```ts tab fast
  @customElement({ name: 'hello-query', template })
  export class HelloQueryElement extends ApolloQuery<Data, Variables> {
    query = HelloQuery;

    variables = {
      greeting: "How's it going",
      name: 'Dude'
    };
  }
  ```

  ```ts tab haunted
  function Hello() {
    const { data } = useQuery(HelloQuery, {
      variables: {
        greeting: "How's it going",
        name: 'Dude'
      }
    });
  }
  ```

  ```ts tab hybrids
  define('hello-query', {
    client: client(),
    query: query(HelloQuery, {
      variables: {
        greeting: "How's it going",
        name: 'Dude'
      }
    }),
  });
  ```

</code-tabs>

Variables can be non-nullable i.e. required. To prevent your element from fetching until it has all it's required variables, see [validating variables](/guides/cool-tricks/validating-variables/).

## Reacting to Updates
As we've seen query elements set their `data` property whenever the query resolves. For vanilla components, you should define a data setter that renders your DOM, and for each library (`lit-element`, `FAST`, `hybrids`, etc.), their differing reactivity systems ensure that your element renders when the data changes.

If you want to run other side effects, here are some options:

- use your library's reactivity system, e.g. `updated` for LitElement or `dataChanged` for FAST
- define [`onData`](./lifecycle/#onData) callback
- listen for the `apollo-query-result` and `apollo-error` [events](./lifecycle/#events)
- call the [`executeQuery`](/api/interfaces/query/#executequery) method and `await` it's result.

For more information, see [query element lifecycle](./lifecycle/)

## Preventing Automatic Subscription

If you want to keep your element from automatically subscribing, you can opt out of the default behaviour by setting the `noAutoSubscribe` property.

<code-tabs collection="libraries" default-tab="lit">

  ```ts tab mixins
  class LazyGreeting extends HelloQueryElement {
    noAutoSubscribe = true;
  }
  ```

  ```ts tab lit
  class LazyGreeting extends HelloQueryElement {
    noAutoSubscribe = true;
  }
  ```

  ```ts tab fast
  class LazyGreeting extends HelloQueryElement {
    noAutoSubscribe = true;
  }
  ```

  ```ts tab haunted
  function Hello() {
    const { data } = useQuery(HelloQuery, { noAutoSubscribe: true });

    const greeting = data?.greeting ?? 'Hello';
    const name = data?.name ?? 'Friend';

    return html`
      <p>${greeting}, ${name}!</p>
    `;
  }
  ```

  ```ts tab hybrids
  define('lazy-hello-world', {
    noAutoSubscribe: true,
    client: client(),
    query: query(HelloQuery),
  });
  ```

</code-tabs>

Once you do, the element won't fetch any data unless you call its [`subscribe()`](/api/interfaces/query/#subscribe) or [`executeQuery()`](/api/interfaces/query/#executeQuery) methods.

```js copy
const element = document.querySelector('hello-query')
element.subscribe();
```

You can also set the boolean `no-auto-subscribe` attribute to the element instance. Bear in mind that `no-auto-subscribe` is a boolean attribute, so it's presence indicates truthiness, and its absence indicates falsiness.

> NOTE, for hybrids, if you explicitly define a `noAutoSubscribe` property in the descriptor, this attribute may not set the associated property.

```html copy
<!-- This one subscribes immediately -->
<hello-query></hello-query>
<!-- This one will not subscribe until called -->
<hello-query no-auto-subscribe></hello-query>
<!-- Neither will this one -->
<hello-query no-auto-subscribe="false"></hello-query>
```

If you want your component to automatically subscribe, but only if its required variables are present, see [Validating Variables](/guides/cool-tricks/validating-variables/).

{% footnotes %}
