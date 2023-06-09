---
layout: sidebar.webc
permalink: /guides/index.html
templateEngineOverride: webc,md
eleventyNavigation:
  order: 10
  key: guides
installationSnippets:
  - pm: npm
    label: NPM
    snippet: npm init @apollo-elements
  - pm: yarn
    label: Yarn
    snippet: npm init @apollo-elements -- app --pkg-manager yarn
  - pm: pnpm
    label: PNPM
    snippet: pnpm init @apollo-elements
---

<style>
  .icon.moon-landing {
    display: block;
    opacity: 0.75;
    width: 60%;
    margin: 0 auto;
  }
</style>

# Guides

Apollo Elements helps you build full-scale, high-performance GraphQL frontends 
with state-of-the-art web technologies. Use your favourite web components base 
library like [lit](../api/libraries/lit-apollo/) or 
[FAST](../api/libraries/fast/); or write your components with [vanilla 
JS](../api/libraries/mixins/). If you're starting from scratch, use the app 
generator to bootstrap a project.

<code-tabs collection="package-managers" default-tab="npm" align="end">
  <code-tab webc:for="s of installationSnippets"
      :data-id="`${s.pm}`"
      :data-label="`${s.label}`"
      :data-icon-href="`/assets/icons/${s.pm}.svg`">
    <template webc:type="11ty"
              11ty:type="njk"
              :@snippet="s.snippet">{% highlight 'bash' %}{{ snippet }}{% endhighlight %}</template>
  </code-tab>
</code-tabs>

Read the [getting started](./getting-started/) guide for a more detailed 
breakdown of how to set up your projects, including an introduction to GraphQL, 
the Apollo Client, [buildless 
development](./getting-started/buildless-development/) workflows, and 
[production optimizations](./getting-started/building-for-production/). When 
you're ready to start building your app component, the [usage](./usage/) guide 
shows you how to write, [query](./usage/queries/), 
[mutation](./usage/mutations/), and [subscription](./usage/subscriptions/) 
components, and how to manage [local state](./usage/local-state/).

Learn about advanced techniques like [operation variable 
validation](./cool-tricks/validating-variables/) and [code 
splitting](./cool-tricks/code-splitting/) in the [cool tricks](./cool-tricks/) 
section. Use our [pre-made components](../api/components/) to streamline your 
workflow. Dive into the [API documentation](../api/) for details on how each 
component class works.

<sprite-icon name="moon-landing"></sprite-icon>

## Next Steps

- Learn how to set up your app in the [getting started guide](./getting-started/).
- Learn how to build an app with Apollo elements in the [usage guide](./usage/).
- Check out some of the [cool tricks](./cool-tricks/) you can do to enhance your app.
