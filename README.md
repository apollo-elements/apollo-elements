# lit-apollo
[![Published on npm](https://img.shields.io/npm/v/lit-apollo.svg)](https://www.npmjs.com/package/lit-apollo)

🚀 A set of custom element base classes that connect to your Apollo cache.

## Usage

```html
<script type="module">
  import gql from 'graphql-tag';
  import ApolloQuery from '@lit-apollo/lit-apollo/apollo-query';

  class MyConnectedElement extends ApolloQuery {
    _render({ data: { helloWorld }, loading, error, networkStatus }) {
      return (
          loading ? html`
            <what-spin></what-spin>`
        : error ? html`
            <h1>😢 Such sad, very error!</h1>
            <div>${error.message}</div>`
        : html`
            <div>${helloWorld.greeting}, ${helloWorld.name}</div>`
      );
     }

     constructor() {
       super();
       this.query = gql`query { helloWorld { name, greeting } }`;
     }
  };
  customElements.define('connected-element', MyConnectedElement)
</script>
```

### Inline Query Scripts
You can also provide a graphql query string in your markup by appending a
graphql script to your element like so:

```html
<connected-element>
  <script type="application/graphql">
    query {
      helloWorld {
        name
        greeting
      }
    }
  </script>
</connected-element>
```

# Cool Tricks

## Use in a Polymer Template
You can define an `<apollo-query>` element which will subscribe to a query and notify on change:
```js
customElements.define("apollo-query", class ApolloQueryEl extends ApolloQuery {
 fire(type, detail) {
   this.dispatchEvent(new CustomEvent(type, {
       bubbles: true,
       composed: true,
       detail,
     })
   );
 }

 _propertiesChanged(props, changedProps, oldProps) {
    super._propertiesChanged(props, changedProps, oldProps);
    const {data, error, loading, networkStatus} = changedProps;
    (data) && this.fire("data-changed", { value: data });
    (error) && this.fire("error-changed", { value: error });
    (loading) && this.fire("loading-changed", { value: loading });
    (networkStatus) && this.fire("network-status-changed", { value: networkStatus });
 }
});
```

You could then use your new `<apollo-query>` element inside a polymer template:
```html
<apollo-query data="{{data}}" variables="[[variables]]">
  <script type="application/graphql">
    query User($id: ID!)
      user(id: $id) {
        name
        picture
      }
    }
  </script>
</apollo-query>

<paper-icon-item>
  <iron-image slot="item-icon">[[data.user.picture]]</iron-image>
  [[data.user.name]]
</paper-icon-item>
```

In such a case, make sure that any required variables (e.g. `id` here) are defined in `variables` before adding your query element, or else an error will be thrown.
