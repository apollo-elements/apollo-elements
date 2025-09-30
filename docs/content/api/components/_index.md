---
title: Components
weight: 20
sidebar: api
---

Utility components that help you factor your graphql-based app.

<code-tabs collection="package-managers" default-tab="npm">
  <code-tab data-id="npm" data-label="npm" data-icon-href="/brand-logos/npm.svg">
    {{< highlight bash "linenos=false" >}}npm i -S @apollo-elements/components{{< /highlight >}}
  </code-tab>
  <code-tab data-id="yarn" data-label="yarn" data-icon-href="/brand-logos/yarn.svg">
    {{< highlight bash "linenos=false" >}}yarn add @apollo-elements/components{{< /highlight >}}
  </code-tab>
  <code-tab data-id="pnpm" data-label="pnpm" data-icon-href="/brand-logos/pnpm.svg">
    {{< highlight bash "linenos=false" >}}pnpm add @apollo-elements/components{{< /highlight >}}
  </code-tab>
</code-tabs>

- [`<apollo-client>`](./apollo-client/) provides all it's children (even across open shadow roots) with a client instance.
- [`<apollo-mutation>`](./apollo-mutation/) lets you write declarative mutation components without subclassing.
- [`<apollo-query>`](./apollo-query/) lets you write dynamic query templates in HTML
- [`<apollo-subscription>`](./apollo-subscription/) updates your HTML page in real time via GraphQL

-----

```html copy
<apollo-client uri="/graphql">
  <apollo-query>
    <script type="application/graphql" src="QuoteQuery.graphql"></script>
    <script type="application/json">
      { "name": "Neil Armstrong" }
    </script>
    <template>
      <figure ?hidden="{{ !data }}">
        <blockquote>{{ data.quote }}</blockquote>
        <figcaption>—{{ data.name }}</figcaption>
      </figure>
    </template>
  </apollo-query>

  <apollo-subscription>
    <script type="application/graphql" src="TMinus.subscription.graphql"></script>
    <template>
      <p ?hidden="{{ !data }}">
        T-Minus <time datetime="{{ data.datetime }}">{{ data.countdown }}</time>
      </p>
    </template>
  </apollo-subscription>

  <apollo-mutation data-type="Quote">
    <script type="application/graphql" src="QuoteMutation.graphql"></script>

    <label for="name">Name</label>
    <label for="comment">Comment</label>

    <input id="name" data-variable="name" value="Neil"/>
    <textarea id="comment" data-variable="quote" value="That's one small step..."></textarea>

    <button trigger>OK</button>
  </apollo-mutation>
</apollo-client>
```
