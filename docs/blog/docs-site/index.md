---
title: Launching a Stellar Docs Site with Rocket
published: true
description: How I brought Apollo Element's documentation into the space age with 11ty and the Rocket meta-framework for web components.
date: Created
updated: Last Modified
tags:
  - graphql
  - webcomponents
  - rocket
  - documentation
  - 11ty
socialMediaImage: https://res.cloudinary.com/apolloelements/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/w_600,c_fit,co_rgb:eee,g_west,x_100,l_text:open sans_64_bold:Launching a Stellar Docs Site with Rocket/w_600,c_fit,co_rgb:ddd,g_south_west,x_100,y_100,l_text:open sans_48:Apollo Elements/social-template.svg
cover_image: https://res.cloudinary.com/apolloelements/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/w_600,c_fit,co_rgb:eee,g_west,x_100,l_text:open sans_64_bold:Launching a Stellar Docs Site with Rocket/w_600,c_fit,co_rgb:ddd,g_south_west,x_100,y_100,l_text:open sans_48:Apollo Elements/social-template.svg
---

Apollo Elements' new docs site launches aboard the [Modern Web Rocket](https://wip-rocket.netlify.app/). It's a ground-up rewrite that puts users first and presents the best of what Apollo Elements has to offer. The new site has [live code demos](#live-demos-via-webcomponentsdev), [API tables](/api/) generated from custom elements manifest files, a new light theme, [customizable snippet browser](#code-tabs), comprehensive component lifecycle documentation for [query](/guides/building-apps/queries/lifecycle/), [mutation](/guides/building-apps/mutations/lifecycle/), and [subscription](/guides/building-apps/subscriptions/lifecycle/) elements, and more.

Read on to learn a little how the site was made, or just [dive in to the docs](https://apolloelements.dev)

## Live Demos via [webcomponents.dev](https://webcomponents.dev)

The new site comes packed with live demos of query and mutation components. You'll find them in the guides pages and on the API docs, and even showing off framework interop on the front page. The &lt;div>Riots team were incredibly helpful and accomodating. If you haven't tried out their stuff, give it a shot soon, it's quality software. One note, I have a lot of plans in this regard, so stay in touch.

```ts wcd LO2h5x8jgucn83YKGNeB src/Hello.ts
import { useQuery, component, html } from '@apollo-elements/haunted';

import { HelloQuery } from './Hello.query.graphql';

function HelloQueryElement() {
  const { data } = useQuery(HelloQuery, {
    variables: {
      name: 'Partner',
      greeting: 'Howdy',
    }
  });

  const greeting = data?.hello?.greeting ?? 'hello';
  const name = data?.hello?.name ?? 'world';

  return html`
    <span id="hello">
      ${greeting}, ${name}!
    </span>
  `;
}

customElements.define('hello-query', component(HelloQueryElement));
```

## Progressively Enhanced Code Snippets

### Code Copy

Let's face it, when you come to a docs site, 90% of the time you're looking to copy a code snippet 😉. I get it, "great artists steal", etc. At first I wrapped markdown content in custom elements, and this did the trick.

`````markdown
<code-copy>

```html
<p>Hello, World!</p>
```

</code-copy>
`````

The "copy code" buttons sprinkled throughout the site are just that, content wrapped in custom elements.

The only downside to this approach was for me the author, since it added a bunch of noise to the markdown source. Using a technique called mdjs pioneered by my colleague Thomas Allmer, the founder of [Open Web Components](https://open-wc.org), I kept the custom elements but simplified the DX:

`````markdown
```html copy
<p>Hello, World!</p>
```
`````

This produces the exact same HTML output as above, but with a much cleaner source format. The plugin which enables this lets me define arbitrary code mods for fenced code blocks, which I did for the code tabs and live demos.

### Code Tabs

One of the guiding philosophies in this project is to give users more options. Want to create vanilla HTML elements? Use the [mixins](/api/libraries/mixins/)! Don't want to use a global apollo client? Try the [`<apollo-client>`](/api/components/apollo-client/). I wanted the docs site to reflect that, letting the user choose how they want to view the code examples.

Inspired by sites like the [Stripe API Docs](https://stripe.com/docs/api/authentication?lang=php), which let you choose which SDK to view snippets for, I developed the `<code-tabs>` web component. When users pick a library (e.g. `lit-apollo` or `haunted`), every other instance of `<code-tabs>` on the page updates and their preference is stored in localStorage.

`````markdown
<code-tabs collection="web-langs">

```html tab markup
<title-crawl>Hello, World</title-crawl>
```

```css tab style
title-crawl { color: rebeccapurple; }
```

```js tab behaviour
import './title-crawl.js';
```

</code-tabs>
`````

Authors just specify which tab collection the element represents, and a Rocket/11ty plugin translates that to HTML. Specifically, each of those fenced code blocks gets translated to something like this HTML:

```html
<code-tab tab="html"
    data-item-index="0"
    data-id="markup"
    data-label="Markup"
    data-icon-href="/html-logo.svg"
    data-synonyms="html,structure"
    selected>
  <pre class="language-html"><!-- parsed markdown snippet --></pre>
</code-tab>
```

## Where We've Come From

The original docs site was a simple affair composed of hand-written HTML, markdown code blocks, and API sheets generated by the good-old Polymer analyzer.

While it did the job, the tooling was growing rapidly out of date, so earlier in the year I upgraded the site [TypeDoc Pages](https://mipatterson.github.io/typedoc-plugin-pages/index.html) plugin for guides. The TypeDoc version of the site came with a bevy of new content: getting started guides, info about managing local state, considerations for building and bundling, etc. It was a major step forward for content, and the authoring experience with markdown and TypeDoc was great, but there were some major drawbacks.

Build times were slow - sometimes five minutes - due to some {% footnoteref 'typedoc-hacks' 'I wrote some <a href="https://github.com/apollo-elements/apollo-elements/blob/5de7f7b7d2db6476675f304d6748c5af047ad1c2/scripts/fix-typedoc.ts#L74" target="_blank" rel="noopener noreferrer"><code>JSDOM</code> hacks</a> to remove the <code>HTMLElement</code> interface from the TypeScript declarations, since at the moment the TypeScript compiler insists on flattening mixin declarations.' %}hacks{% endfootnoteref %} for cleaning up the final output. Worse was that users found it difficult to navigate, and ultimately the site failed to do what it set out to do - explain what Apollo Elements is and how to use it.

| Original | TypeDoc |
| -------- | ------- |
| ![Screenshot of original docs site](./images/orig-site.png) | ![Screenshot of typedoc site](./images/typedoc-site.png) |

I was pleased to get some specific and actionable feedback from several users. That spurred me on to take the next step. Fortunately, the tools I needed to do the job emerged just at that time.

## 11ty and Rocket
Throughout this period, my colleagues at [Open Web Components](https://open-wc.org) were working on an alpha version of an 11ty meta-framework called [Rocket](https://wip-rocket.netlify.app/) for publishing multipage sites, geared especially (though not exclusively) towards web component authors. I decided to take a look.

If you've never heard of [11ty](https://www.11ty.dev/) go check it out, it's been generating quite the buzz, and for good reason. It's superlative, astounding, ebullient fun. On more than one occasion while building this site I had to tear myself away to get other projects done. I also got to know [nunjucks](https://mozilla.github.io/nunjucks/), an HTML templating language with a silly name made by Mozilla. How cool!

<svg id="rocket-graphic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Rocket">
  <path d="M509.051 12.6a10.81 10.81 0 00-9.649-9.649c-3.955-.405-97.571-9.75-159.711 7.073l-.007.001c-19.392 5.247-34.113 12.7-43.766 22.153-37.728 30.969-77.654 74.49-112.163 121.418-54.979-8.142-111 7.438-151.058 47.495a167.016 167.016 0 00-29.26 39.477 10.808 10.808 0 0013.355 15.203c28.725-10.851 66.919-4.869 105.09 14.363.058.062.112.127.173.187l31.772 31.77c-32.675 37.338-41.09 82.954-41.454 85.002a10.81 10.81 0 0012.531 12.532c2.048-.363 47.668-8.78 85.005-41.457l31.769 31.767c.055.055.115.1.171.155 19.244 38.182 25.23 76.386 14.377 105.118a10.81 10.81 0 0015.203 13.355 167.016 167.016 0 0039.477-29.26c34.228-34.227 51.806-80.924 49.501-131.49a194.558 194.558 0 00-1.903-19.65c46.882-34.484 90.358-74.375 121.306-112.08 9.457-9.654 16.909-24.379 22.154-43.778l.001-.003c16.834-62.142 7.491-155.748 7.086-159.702zM141.645 217.34c-6.008 10.259-11.567 20.426-16.604 30.35-6.504-3.029-13.053-5.741-19.63-8.088-20.125-7.183-39.401-10.787-57.208-10.787-3.987 0-7.902.181-11.735.543a145.49 145.49 0 0111.517-12.979c32.368-32.368 76.745-46.397 121.485-42.699-9.939 14.445-19.289 29.082-27.823 43.661l-.002-.001zm1.154 43.151a524.428 524.428 0 0110.549-20.025l33.323 33.323c-5.885 3.843-11.772 8.189-17.48 13.091l-26.392-26.389zm59.199 75.498c-20.808 20.807-46.822 32.08-63.637 37.65 5.571-16.819 16.843-42.83 37.65-63.637 20.807-20.807 46.821-32.079 63.637-37.65-5.571 16.819-16.843 42.83-37.65 63.637zm49.513 33.205l-26.389-26.387c4.902-5.707 9.247-11.593 13.089-17.478l33.318 33.318a521.158 521.158 0 01-20.018 10.547zm44.111 94.822a145.49 145.49 0 01-12.979 11.517c1.978-20.947-1.454-44.313-10.247-68.943-2.349-6.578-5.061-13.13-8.091-19.635 9.926-5.035 20.089-10.596 30.339-16.605l.002-.001c14.607-8.549 29.272-17.917 43.745-27.875.175 2.102.326 4.209.423 6.322 2.026 44.423-13.313 85.341-43.192 115.22zm174.336-270.208c-.118-.13-.228-.266-.353-.391l-29.897-29.897c-4.221-4.221-11.065-4.221-15.287 0-4.221 4.221-4.221 11.065 0 15.286l29.897 29.897a10.845 10.845 0 002.084 1.615c-41.794 48.514-103.757 99.884-165.512 137.118l-41.584-41.584c12.25-24.785 16.085-45.582 16.327-46.95a10.81 10.81 0 00-12.531-12.532c-1.368.243-22.165 4.077-46.95 16.327l-41.593-41.593c37.191-61.668 88.466-123.539 136.909-165.327.223.27.457.533.709.785l63.519 63.519a10.774 10.774 0 007.643 3.166c2.766 0 5.533-1.056 7.643-3.166 4.221-4.221 4.221-11.065 0-15.286l-62.771-62.771c5.569-3.563 12.642-6.706 21.179-9.395l69.995 69.995 69.979 69.979c-2.691 8.548-5.838 15.632-9.406 21.205zm15.233-45.952L364.139 26.804c45.772-7.881 102.569-4.745 124.166-3.104 1.644 21.593 4.784 78.362-3.114 124.156z"/>
  <path d="M394.713 133.812c-4.221 4.221-4.221 11.065 0 15.286l1.081 1.081c2.111 2.111 4.877 3.166 7.643 3.166s5.533-1.055 7.643-3.166c4.221-4.221 4.221-11.065 0-15.286l-1.081-1.081c-4.221-4.222-11.065-4.222-15.286 0zM320.269 132.282c-15.88 0-30.809 6.184-42.037 17.412-23.179 23.179-23.179 60.895 0 84.074 11.228 11.228 26.158 17.412 42.037 17.412 15.88 0 30.809-6.184 42.037-17.412 11.229-11.228 17.412-26.158 17.412-42.037 0-15.879-6.184-30.809-17.412-42.037-11.228-11.228-26.157-17.412-42.037-17.412zm26.751 86.201c-7.146 7.146-16.646 11.08-26.751 11.08s-19.605-3.936-26.751-11.08c-14.75-14.75-14.75-38.751 0-53.501 7.145-7.146 16.646-11.08 26.751-11.08s19.605 3.934 26.751 11.08c7.145 7.146 11.08 16.646 11.08 26.751.001 10.104-3.935 19.604-11.08 26.75zM10.809 420.282c2.766 0 5.533-1.055 7.643-3.166l74.471-74.471c4.221-4.221 4.221-11.065 0-15.286s-11.065-4.221-15.287 0L3.166 401.83c-4.221 4.221-4.221 11.065 0 15.286a10.779 10.779 0 007.643 3.166zM169.355 419.076l-74.472 74.472c-4.221 4.221-4.221 11.065 0 15.286a10.774 10.774 0 007.643 3.166c2.766 0 5.533-1.056 7.643-3.166l74.472-74.472c4.221-4.221 4.221-11.065 0-15.286-4.22-4.221-11.064-4.221-15.286 0zM95.031 416.969c-4.221-4.221-11.065-4.221-15.287 0L4.248 492.465c-4.221 4.221-4.221 11.065 0 15.286 2.111 2.111 4.877 3.166 7.643 3.166s5.533-1.055 7.643-3.166l75.495-75.496c4.222-4.22 4.222-11.065.002-15.286z"/>
</svg>

Rocket is a modular system with overridable templates, which means you can pick and choose features you want a la carte, then customize them to suit your needs. And customize I did! As well as the code mods mentioned above, I added an 11ty filter to automatically [import web component definitions](https://github.com/jdvivar/eleventy-plugin-add-web-component-definitions/pull/5) whenever they're used in a page's HTML, and another filter to [automatically link type names](https://github.com/apollo-elements/apollo-elements/blob/master/rocket-plugins/link-to-type.mjs) in TypeScript code blocks to their external API docs. All of those were good fun, but the secret sauce that makes this site useful, are the [API docs](/api/).

## Custom Elements Manifest

The new site's API docs are based on the new v1 specification for [custom elements manifests](https://github.com/webcomponents/custom-elements-manifest), aka `custom-elements.json`, rather than direct introspection of classes à la TypeDoc. This means the docs are much more user-oriented, as they document the public methods and properties that users are most interested in, cutting out the noise of class heirarchies and overly-detailed type relationships.

There's strong tooling support for the previous v0 custom-elements.json format. While efforts are underway to develop an analyzer that outputs the new spec, I hand-wrote the manifests for this site, along with some automated transforms to express inheritance.

<svg id="robot-graphic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999" aria-label="robot">
  <path d="M80 359.998c-30.878 0-56 25.122-56 56.001C24 446.878 49.122 472 80 472c30.879 0 56.001-25.121 56.001-56.001S110.879 359.998 80 359.998zm0 96.001c-22.055 0-39.998-17.943-39.998-39.999-.001-22.057 17.943-40 39.998-40 22.056 0 39.999 17.943 39.999 39.999 0 22.057-17.943 40-39.999 40zM256 359.998c-30.879 0-56.001 25.122-56.001 56.001C199.999 446.878 225.121 472 256 472c30.879 0 56.001-25.121 56.001-56.001S286.879 359.998 256 359.998zm0 96.001c-22.057 0-40-17.943-40-39.999 0-22.057 17.943-40 40-40 22.056 0 39.999 17.943 39.999 39.999 0 22.057-17.942 40-39.999 40zM432 359.998c-30.879 0-56.001 25.122-56.001 56.001C375.999 446.878 401.12 472 432 472c30.878 0 56-25.121 56-56.001s-25.123-56.001-56-56.001zm0 96.001c-22.056 0-39.999-17.943-39.999-39.999 0-22.057 17.943-40 39.999-40 22.055 0 39.998 17.943 39.998 39.999.001 22.057-17.943 40-39.998 40z"/>
  <path d="M88 391.998H72v16H56.001v16.001H72v16h16v-16h16v-16.001H88zM264.001 391.998h-16.002v16h-16v16.001h16v16h16.002v-16H280v-16.001h-15.999zM440 391.998h-16.001v16H408v16.001h15.999v16H440v-16h15.999v-16.001H440zM96.005 303.998h31.999v16.001H96.005zM143.997 303.998h32v16.001h-32zM192 303.998h32v16.001h-32zM240.002 303.998h31.999v16.001h-31.999zM287.995 303.998h32v16.001h-32zM335.997 303.998h32v16.001h-32zM384 303.998h31.999v16.001H384zM247.999 136h136v-24h23.999v16H424V24h-16.001v72H384V72H248c-17.645 0-31.999 14.356-31.999 32-.001 17.644 14.354 32 31.998 32zM296 87.999h72v31.999h-72V87.999zm-31.999 0H280v31.999h-15.999V87.999zm-16.002 0v31.999c-8.823 0-15.999-7.177-15.999-16s7.177-15.999 15.999-15.999zM32 152c0-8.823 7.177-16 16-16s16 7.177 16 16v31.999h16V152c0-14.883-10.214-27.426-24-30.987v-9.012H39.999v9.012c-13.786 3.562-24 16.104-24 30.987v31.999H32V152z"/>
  <path d="M39.999 62.625V104H56V62.625A24.115 24.115 0 0070.624 48h74.752A24.115 24.115 0 00160 62.625v153.374h-16V232h48v-16.001h-16V62.625c9.312-3.304 16.001-12.195 16.001-22.625 0-13.233-10.767-24-24.001-24-10.429 0-19.321 6.689-22.624 16H70.624C67.32 22.689 58.429 16 48 16c-13.233 0-24 10.767-24 24 0 10.429 6.689 19.321 15.999 22.625zM168 32c4.411 0 8 3.589 8 7.999 0 4.411-3.589 8-8 8-4.41 0-7.999-3.589-7.999-8S163.589 32 168 32zM48 32c4.411 0 8 3.588 8 7.999s-3.589 8-7.999 8-7.999-3.589-7.999-8C40 35.588 43.589 32 48 32z"/>
  <path d="M472 346.762v-66.763h-20.688L411.314 240H368v-80h16v-16.001h-48V160h16v79.999H100.686l-39.998 39.999H39.999v66.763C16.113 360.616 0 386.453 0 415.999 0 460.111 35.887 496 80 496c41.412 0 75.573-31.632 79.599-72.001h16.802C180.428 464.368 214.588 496 255.999 496c41.412 0 75.571-31.632 79.598-72.001H352.4C356.427 464.368 390.588 496 431.999 496c44.112 0 80-35.888 80-80.001.001-29.546-16.112-55.383-39.999-69.237zm-364.687-90.763H216v16h16.001v-16h15.998v16H264v-16h16v16h16.001v-16h108.687l24 23.999H83.313l24-23.999zM80 479.998c-35.289 0-63.999-28.71-63.999-64C16.001 380.709 44.71 352 80 352s64 28.709 64 63.999c-.001 35.289-28.711 63.999-64 63.999zm176 0c-35.289 0-63.999-28.71-63.999-64C192.001 380.709 220.71 352 256 352c35.289 0 63.999 28.709 63.999 63.999-.001 35.289-28.71 63.999-63.999 63.999zm79.598-72c-4.027-40.369-38.187-72-79.598-72-41.412 0-75.572 31.63-79.598 72H159.6c-4.027-40.369-38.188-72-79.599-72a79.74 79.74 0 00-23.999 3.682V320H80v-16.001H56.001V296H456v7.999h-24V320h23.999v19.681A79.74 79.74 0 00432 335.999c-41.412 0-75.573 31.63-79.599 72h-16.803zm96.402 72c-35.289 0-64-28.71-64-64s28.71-63.999 64-63.999 63.999 28.709 63.999 63.999-28.709 64-63.999 64z"/>
</svg>

Because Apollo Elements is a collection of packages that all implement the same interfaces, the data flow for custom elements manifests was mostly top-down. The hand-written `packages/interfaces/custom-elements-manifest.json`, is the primary source-of-truth. I copy it into the library packages, applying transforms that preserve inheritance and account for library-specific quirks to `docs/_data/@apollo-elements/*/custom-elements-manifest.json`.

There are some features of the docs which aren't specified by custom-elements-manifest, like ['named parameters'](https://2ality.com/2011/11/keyword-parameters.html). For those, I relied on the TypeScript type of the parameter, writing a transform which scans for param and return types, inserting a markdown document as the object's `description` field in the manifest. So far those references are by type name, and I maintain a single flat list of typenames, held as markdown documents in a directory. If I run into name collisions down the line, I'll have to rethink that.

From there, I created a self-contained Rocket preset containing njk templates, 11ty filters, and custom elements. The preset turns the manifest data into progressively-enhanced HTML, based on the markdown file structure in your 11ty directory. I hope to publish this preset soon, so other web component authors can use it on their sites.

Some major remaining hurdles:
- 🎨 Customizing / hooking in to 11ty's layout phase from the markdown content (e.g. "put this markdown content inside this layout block" or "render that layout block at this point in the markdown" or "use the layout content when building the page nav")
- 📪 When tools catch up to the new spec, it seems to me that i'll still need to do some post processing in order to build in those markdown tables. The use case here is documenting 'named parameters' or return types which are 'property bags'
- 🚩 Some missing or unspecified flags on entities in the manifest spec (e.g. async, readonly) - issues opened (edited)
- 📦 The structure of the API docs pages assumes one export per file and packages with index.js entrypoints. This doesn't cover every use case and will need to be reconsidered before publishing a generalized version.

If you want to get involved, join the [web components community group](https://github.com/w3c/webcomponents-cg).

## Challenges and Awful Hacks

Along the way I met with some challenges. The `<type-doc>` web component I developed for the API docs produced a <abbr title="flash of unstyled content">FOUC</abbr> when the page loaded, before the custom element upgraded. To prevent this, I set its opacity to 0 until it became `:defined`, but this harmed `<noscript>` users. My solution was to add a special noscript stylesheet. Some more [work is needed on the platform side](https://gist.github.com/bkardell/5583179826456ff799433c50b09410f1) to address this issue all the way, but this is a decent workaround in the mean time.

While I sorta dunked on TypeDoc a few paragraphs back for requiring hacks, they don't deserve it. TypeDoc is a great project and they're making really nice software, it just didn't exactly fit my use. And what's more, there were plenty of awful hacks needed on the 11ty side, to render the navigation menu using headings from the nunjucks layouts (i.e. not only from markdown content), and to copy in the custom element manifests on write. On the whole though, I found the workarounds I needed to employ with Rocket and 11ty to be fewer and less cringe-worthy, so 👍 to them!

## The Future
There's still more work to do. Rocket is still in pre-release, and the work done here on Custom Elements manifests is preliminary as well. I'll need to publish and integrate the `<code-copy>` and `<code-tabs>` components into rocket, and gather some more use cases and insights around API docs, especially when it comes to mapping a single custom elements manifest to one-or-more docs pages.

## Acknowledgements
A number of people provided invaluable feedback on the site while it was under development, among them [Justin Fagnani](https://twitter.com/justinfagnani) from the Polymer team, [Peter Siska](https://github.com/peschee) from [Inventage](https://inventage.com/), and Vignesh from [Timecampus](https://twitter.com/timecampus) provided invaluable feedback. Check out Vignesh' [blog series on GraphQL](https://medium.com/timecampus/graphql-diving-deep-c7c0abe608b2). Uri and Dotan at [The Guild](https://the-guild.dev/) provided encouragement and resources. If you're working with GraphQL, give The Guild a glance, you'll be glad you did. My collegues on the [Open Web Components](https://open-wc.org) team were instrumental, as always, to everything I accomplished here.

<style>
#rocket-graphic {
  float: right;
  width: 150px;
  fill: currentColor;
  opacity: 0.75;
}

#robot-graphic {
  width: 200px;
  fill: currentColor;
  opacity: 0.75;
  float: left;
  display: block;
  margin: 10px;
}
</style>
