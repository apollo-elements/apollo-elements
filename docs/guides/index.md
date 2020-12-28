---
socialMediaImage: https://res.cloudinary.com/apolloelements/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/w_600,c_fit,co_rgb:eee,g_south_west,x_60,y_200,l_text:open sans_128_bold:Guides/w_1200,h_630,c_fill,q_auto,f_auto/w_600,c_fit,co_rgb:eee,g_south_west,x_60,y_100,l_text:open sans_78:Apollo Elements/social-template.svg
---
# Guides || 10

Apollo Elements helps you build full-scale, high-performance GraphQL frontends with state-of-the-art web technologies. Use your favourite web components base library like [lit-element](../api/libraries/lit-apollo/) or [FAST](../api/libraries/fast/); or write your components with [vanilla JS](../api/libraries/mixins/). If you're starting from scratch, use the app generator to bootstrap a project.

<code-tabs collection="package-managers" default-tab="npm">

```bash tab npm
npm init @apollo-elements
```

```bash tab yarn
npm init @apollo-elements -- app --pkg-manager yarn
```

```bash tab pnpm
pnpm init @apollo-elements
```

</code-tabs>

Read the [getting started](./getting-started/) guide for a more detailed breakdown of how to set up your projects, including an introduction to GraphQL, the Apollo Client, [buildless development](./getting-started/buildless-development/) workflows, and [production optimizations](./getting-started/building-for-production/). When you're ready to start building your app component, the [building apps](./building-apps/) guide shows you how to write, [query](./building-apps/queries/), [mutation](./building-apps/mutations/), and [subscription](./building-apps/subscriptions/) components, and how to manage [local state](./building-apps/local-state/).

Learn about advanced techniques like [operation variable validation](./cool-tricks/validating-variables/) and [code splitting](./cool-tricks/code-splitting/) in the [cool tricks](./cool-tricks/) section. Use our [pre-made components](../api/components/) to streamline your workflow. Dive into the [API documentation](../api/) for details on how each component class works.

<style>
  #moon-landing {
    display: block;
    fill: currentColor;
    opacity: 0.75;
    width: 60%;
    margin: 0 auto;
  }
</style>
<svg id="moon-landing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" aria-label="Moon landing">
  <circle cx="22" cy="16.5" r="1"/>
  <circle cx="44" cy="19.5" r="1"/>
  <circle cx="40" cy="35.5" r="1"/>
  <circle cx="34" cy="8.5" r="1"/>
  <path d="M59 39.5h-3.96a26.485 26.485 0 001.674-9.286C56.714 15.483 44.73 3.5 30 3.5a26.57 26.57 0 00-16.231 5.517l-.024-.027-.748.619a26.54 26.54 0 00-2.76 2.649l-.004.004a27.12 27.12 0 00-.738.852l-.162.194c-.208.255-.411.514-.61.776-.077.102-.154.203-.229.306-.182.247-.36.497-.534.75-.08.116-.157.233-.235.35a25.72 25.72 0 00-.493.769c-.07.114-.137.229-.205.344-.16.27-.318.54-.469.815-.057.105-.111.212-.167.317-.12.227-.246.451-.359.681l-.43.87.026.014a26.544 26.544 0 00-2.34 10.913c0 3.192.564 6.309 1.674 9.286H1a1 1 0 100 2h58a1 1 0 100-1.999zM14 14a4.505 4.505 0 01-5.67 4.346c.05-.09.103-.178.154-.268a25.7 25.7 0 01.751-1.24c.082-.127.161-.257.246-.383.302-.45.624-.886.955-1.316a25.032 25.032 0 011.357-1.617 27.2 27.2 0 011.262-1.274c.134-.127.267-.255.404-.379.352.652.541 1.383.541 2.131zM7.103 39.5a24.504 24.504 0 01-1.816-9.286c0-3.583.773-6.987 2.15-10.063.664.223 1.36.349 2.063.349 3.584 0 6.5-2.916 6.5-6.5a6.47 6.47 0 00-.987-3.419A24.581 24.581 0 0130 5.5c13.627 0 24.714 11.087 24.714 24.714 0 2.11-.271 4.184-.797 6.202-.311.05-.619.084-.917.084-3.309 0-6-2.691-6-6a1 1 0 10-2 0c0 4.411 3.589 8 8 8 .093 0 .19-.015.284-.018-.122.341-.249.681-.386 1.018H7.103zM54 44.5H6a1 1 0 100 2h48a1 1 0 100-2zM49 49.5H11a1 1 0 100 2h38a1 1 0 100-2zM45 54.5H15a1 1 0 100 2h30a1 1 0 100-2z"/>
  <path d="M31 32.086V20.5h-2v11.586l-5.293-5.293-1.414 1.414L30 35.914l7.707-7.707-1.414-1.414zM14 27.5c-2.206 0-4 1.794-4 4a1 1 0 102 0c0-1.103.897-2 2-2s2 .897 2 2-.897 2-2 2a1 1 0 100 2c2.206 0 4-1.794 4-4s-1.794-4-4-4z"/>
</svg>
