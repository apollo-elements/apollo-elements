---
socialMediaImage: https://res.cloudinary.com/apolloelements/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/w_600,c_fit,co_rgb:eee,g_south_west,x_60,y_200,l_text:open sans_128_bold:Components/w_1200,h_630,c_fill,q_auto,f_auto/w_600,c_fit,co_rgb:eee,g_south_west,x_60,y_100,l_text:open sans_78:Apollo Elements/social-template.svg
---
# Components || 30

Utility components that help you factor your graphql-based app.

<code-tabs collection="package-managers">

```bash tab npm
npm i -S @apollo-elements/components
```

```bash tab yarn
yarn add @apollo-elements/components
```

```bash tab pnpm
pnpm add @apollo-elements/components
```

</code-tabs>

- [`<apollo-client>`](./apollo-client/) provides all it's children (even across open shadow roots) with a client instance.
- [`<apollo-mutation>`](./apollo-mutation/) lets you write declarative mutation components without subclassing.

```html copy
<apollo-client uri="/graphql">
  <apollo-query>
    <script type="application/graphql">
      query QuoteQuery($name: String) {
        quote name
      }
    </script>
    <script type="application/json">
      {
        "name": "Neil Armstrong"
      }
    </script>
  </apollo-query>

  <apollo-mutation data-type="Quote">
    <script type="application/graphql">
      mutation QuoteMutation($name: String, $quote: String) {
        addQuote(name: $name, quote: $quote) {
          name
          quote
        }
      }
    </script>

    <label for="name">Name</label>
    <label for="comment">Comment</label>

    <input id="name"
           slot="variable"
           data-variable="name"
           value="Neil"/>
    <textarea id="comment"
              slot="variable"
              data-variable="quote"
              value="That's one small step..."></textarea>

    <button slot="trigger">OK</button>

  </apollo-mutation>
</apollo-client>
```
