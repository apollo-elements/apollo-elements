# Cool Tricks >> Inline GraphQL Scripts || 30

<meta name="description" data-helmett
      content="Use Apollo Elements to write declarative GraphQL components in HTML" />

You can provide a GraphQL document string in your markup. The declarative query, mutation, and subscription components all come with this built in.
By appending or updating a GraphQL script child, the Apollo element will read it's query document.

Add it to your custom components via the `graphql-script-child-mixin`.

## Example
Say you had a `<greet-me>` element which extends `ApolloQuery`.

<code-tabs collection="libraries" default-tab="lit">

  ```html tab html
  <apollo-query>
    <script type="application/graphql">
      query Greeting {
        greeting {
          name
          greeting
        }
      }
    </script>
    <template>
      <p>
        {%raw%}{{ data.greeting || 'Hello' }}{%endraw%},
        {%raw%}{{ data.name || 'friend' }}{%endraw%}
      </p>
    </template>
  </apollo-query>
  ```

  ```ts tab mixins
  import { ApolloQueryMixin, GraphQLScriptChildMixin } from '@apollo-elements/mixins';

  interface Data {
    name: string;
    greeting: string;
  }


  const template = document.createElement('template');
  template.innerHTML = `<p></p>`;

  template.content.querySelector('p').append(new Text('Hello'));
  template.content.querySelector('p').append(new Text(', '));
  template.content.querySelector('p').append(new Text('friend'));

  class GreetMe extends GraphQLScriptChildMixin(ApolloQueryMixin(HTMLElement))<Data, null> {
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

  ```ts tab lit
  import { ApolloQuery, customElement, html } from '@apollo-elements/lit-apollo';
  import { GraphQLScriptChildMixin } from '@apollo-elements/mixins';

  interface Data {
    name: string;
    greeting: string;
  }

  @customElement('greet-me')
  class GreetMe extends GraphQLScriptChildMixin(ApolloQuery)<typeof HelloQuery> {
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

  ```ts tab fast
  import { customElement, html, ViewTemplate } from '@microsoft/fast-element';
  import { ApolloQuery } from '@apollo-elements/fast/bases/apollo-query';
  import { GraphQLScriptChildMixin } from '@apollo-elements/mixins';

  const template: ViewTemplate<GreetMe> = html`
    <p>
      ${x => x.data?.greeting ?? 'Hello'},
      ${x => x.data?.name ?? 'friend'}
    </p>
  `;
  @customElement({ name, 'greet-me', template })
  class GreetMe extends GraphQLScriptChildMixin(ApolloQuery)<typeof HelloQuery> { }
  ```

  ```ts tab haunted
  import { useEffect, useQuery, component, html } from '@apollo-elements/haunted';
  import { GraphQLScriptChildMixin } from '@apollo-elements/mixins';

  function GreetMe(hostElement) {
    // NOTE: must pass `hostElement: this` to use `<apollo-client>`
    const query = useQuery(null, { hostElement });

    // When GraphQLScriptChildMixin resolves the query and variables,
    // set them on the query controller to start the query
    useEffect(() => { query.variables = hostElement.variables }, [hostElement.variables]);
    useEffect(() => { query.query = hostElement.document }, [hostElement.document]);

    return html`
      <p>
        ${query.data?.greeting ?? 'Hello'},
        ${query.data?.name ?? 'friend'}
      </p>
    `;
  }

  customElements.define('greet-me', GraphQLScriptChildMixin(component(GreetMe)));
  ```

  ```tsx tab atomico
  import { useEffect, useQuery, useHost, c } from '@apollo-elements/atomico';
  import { GraphQLScriptChildMixin } from '@apollo-elements/mixins';

  function GreetMe(props) {
    const ref = useHost();
    // NOTE: must pass `hostElement` to use `<apollo-client>`
    const query = useQuery(null, { hostElement: ref.current });

    // When GraphQLScriptChildMixin resolves the query and variables,
    // set them on the query controller to start the query
    useEffect(() => { query.variables = props.variables }, [props.variables]);
    useEffect(() => { query.query = props.document }, [props.document]);

    return (
      <host shadowDom>
        <p>
          {query.data?.greeting ?? 'Hello'},
          {query.data?.name ?? 'friend'}
        </p>
      </host>
    );
  }

  customElements.define('greet-me', GraphQLScriptChildMixin(c(GreetMe)));
  ```

  ```ts tab hybrids
  // while you can't use the mixin, you can roll your own
  import { query, define, html } from '@apollo-elements/hybrids';
  import { gql } from '@apollo/client/core';

  function matchNode(host, node) {
    if (!(node instanceof HTMLScriptElement))
      return; /* c8 ignore next */ // it's covered
    if (node.matches('[type="application/graphql"]'))
      host.query.document = gql(node.textContent);
    if (node.matches('[type="application/json"]'))
      host.query.variables = JSON.parse(node.textContent);
  }

  define('greet-me', {
    query: query(HelloQuery),
    _domQuery: {
      connect(host) {
        const mo = new MutationObserver(records => {
          for (const { target: node, addedNodes = [] } of records) {
            matchNode(host, node);
            for (const added of addedNodes)
              matchNode(host, added);
          }
        });

        mo.observe(host, { characterData: true, childList: true, subtree: true });

        return () => mo.disconnect();
      }
    }
    render: ({ query }) => html`
      <p>${query.data?.greeting ?? 'Hello'}, ${query.data?.name ?? 'friend'}</p>
    `
  })
  ```

</code-tabs>

You can add it to your page like so, and it will start querying.

```html copy
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
