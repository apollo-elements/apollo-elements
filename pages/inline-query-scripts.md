<meta name="description" content="How to use Apollo Elements to write declarative GraphQL-aware components in HTML"/>

You can provide a GraphQL query string in your markup by appending a
GraphQL script element to your connected element.

Say you had a `<greet-me>` element which extends `ApolloQuery`.

<code-tabs>
<code-tab library="mixins">

```ts
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

interface Data {
  name: string;
  greeting: string;
}


const template = document.createElement('template');
template.innerHTML = `<p></p>`;

template.content.querySelector('p').append(new Text('Hello'));
template.content.querySelector('p').append(new Text(', '));
template.content.querySelector('p').append(new Text('friend'));

class GreetMe extends ApolloQueryMixin(HTMLElement)<Data, null> {
  #data: Data = null;

  get data() {
    return this.#data;
  }

  set data(value: Data) {
    this.#data = value;
    this.render();
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
  }

  render() {
    const [greetingNode, , nameNode] =
      this.shadowRoot.querySelector('p').childNodes;
    greetingNode.data = this.data?.greeting ?? 'Hello';
    nameNode.data = this.data?.name ?? 'friend';
  }
}

customElements.define('greet-me', GreetMe);
```

</code-tab>

<code-tab library="lit-apollo">

```ts
import { ApolloQuery, customElement, html } from '@apollo-elements/lit-apollo';

interface Data {
  name: string;
  greeting: string;
}

@customElement('greet-me')
class GreetMe extends ApolloQuery<Data, null> {
  render() {
    return html`
      <p>
        ${this.data?.greeting ?? 'Hello'},
        ${this.data?.name ?? 'friend'}
      </p>
    `;
  }
}
```

</code-tab>

<code-tab library="fast">

```ts
import { ApolloQuery, customElement, html } from '@apollo-elements/fast';

interface Data {
  name: string;
  greeting: string;
}

@customElement({ name, 'greet-me', template: html<GreetMe>`
  <p>
    ${x => x.data?.greeting ?? 'Hello'},
    ${x => x.data?.name ?? 'friend'}
  </p>
` })
class GreetMe extends ApolloQuery<Data, null> { }
```

</code-tab>

<code-tab library="hybrids">

```ts
import { client, query, define, html } from '@apollo-elements/hybrids';

define('greet-me', {
  client: client(window.__APOLLO_CLIENT__),
  query: query(null),
  render: ({ data }) => html`
    <p>
      ${data?.greeting ?? 'Hello'},
      ${data?.name ?? 'friend'}
    </p>
  `
})
```

</code-tab>
</code-tabs>

You can add it to your page like so, and it will start querying.

<code-copy>

```html
<greet-me>
  <script type="application/graphql">
    query Greeting {
      greeting {
        name
        greeting
      }
    }
  </script>
</greet-me>
```

</code-copy>

## No Base Class

You can use Apollo Elements without subclassing. Import [`@apollo-elements/polymer/apollo-query`](https://apolloelements.dev/modules/_apollo_elements_polymer.html) and add an `<apollo-query>` element to your page with a `<script type="application/graphql">` as its first child. The element will query as soon as it upgrades, and will fire `data-changed` or `error-changed` events. If your query has arguments, assign them to the `<apollo-query>` element's `variables` property.

Despite the name, these components don't import from the Polymer library, rather they extend HTMLElement, so they won't unduly affect your bundle sizes.

<code-copy>

```html
<apollo-query id="hello">
  <script type="application/graphql">
  query HelloQuery {
    helloWorld {
      name
      greeting
    }
  }
  </script>
</apollo-query>

<output id="output"></output>

<script type="module">
  import "@apollo-elements/polymer/apollo-query";
  hello.addEventListener('data-changed', ({ detail: { value } }) => {
    if (!value || !value.helloWorld) return;
    const greeting = value.helloWorld.greeting || 'Hello';
    const name = value.helloWorld.name || 'Friend';
    output.textContent = `${greeting}, ${name}!`;
  });
</script>
```

</code-copy>
