---
layout: layout-deck
title: GraphQL in HTML with Apollo Elements
description: Declarative Data that Uses the Platform
socialMediaImage: https://apolloelements.dev/graphql-in-html/images/poster.png
cover_image: https://apolloelements.dev/graphql-in-html/images/poster.png
templateEngineOverride: njk,md
unbind: true
---

<link data-helmet
      rel="stylesheet"
      href="{{ '/decks/graphql-in-html/style.css' | asset | url }}"/>
<link data-helmet
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.50/dist/themes/dark.css">
<script data-helmet type="module"
        src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.50/dist/shoelace.js"></script>

<script type="module">
const deck = document.querySelector('slidem-deck');
const dp = document.getElementById('apollo-query-example');
await customElements.whenDefined('docs-playground');
await customElements.whenDefined('playground-ide');
await dp.updateComplete;
const pi = dp.shadowRoot.querySelector('playground-ide');
document.body.addEventListener('keydown', event => {
  if (event.defaultPrevented || event.composedPath().includes(pi))
    return;
  switch (event.key) {
    case 'f':
      else if (document.fullscreen)
        document.exitFullscreen();
      else
        document.body.requestFullscreen();
      return true;
    case 'j':
    case 'l':
    case 'RightArrow':
      deck.$.forward.click();
      return true;
    case 'h':
    case 'k':
    case 'LeftArrow':
      deck.$.backward.click();
      return true;
    case 'p':
      deck.$.presenterToggle.click();
      deck.$.timerToggle.click();
      return true;
    default:
      return true;
  }
});

pi.shadowRoot.getElementById('lhs').part = 'lhs';
pi.shadowRoot.getElementById('rhs').part = 'rhs';
dp.show();
pi.blur();
</script>
