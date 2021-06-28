---
layout: layout-deck
title: What is Apollo Elements?
description: Declarative Data that Uses the Platform
socialMediaImage: https://apolloelements.dev/graphql-berlin-slides/images/poster.png
cover_image: https://apolloelements.dev/graphql-berlin-slides/images/poster.png
templateEngineOverride: njk,md
---

<link data-helmet rel="preconnect" href="https://i.imgflip.com">
<link data-helmet rel="preconnect" href="https://media.giphy.com">
<link data-helmet rel="preconnect" href="https://codesandbox.io">
<link data-helmet rel="preload" as="image" href="https://i.imgflip.com/41sc82.jpg"/>
<link data-helmet rel="preload" as="image" href="https://media.giphy.com/media/Utu9EoKlfEyVF082Ks/giphy.gif"/>
<link data-helmet rel="preload" as="image" href="https://media.giphy.com/media/JsJfghwzAP8St2JcfG/giphy.gif"/>

<style data-helmet>
[name=thanks]:not([active]) {
  opacity: 0;
}

h1 code {
  --wght: inherit;
  --casl: 0.5;
}

#demos {
  --code-tabs-min-height: 505px;
  transform: scale(calc(1 / 0.682861));
  width: 68%;
  top: 20vh;
  left: 20vw;
}

#demos #default-tab {
  display: grid;
  grid-template-columns: min-content max-content;
  justify-content: center;
  height: var(--code-tabs-min-height);
  gap: 20px;
  align-items: center;
}

#demos #default-tab svg {
  fill: currentColor;
  width: 100px;
  transform: rotate(30deg);
}

#demos #default-tab p {
  font-size: 48px;
}

#demos code-tab[selected] {
  height: var(--code-tabs-min-height, 505px);
  display: flex;
  align-items: center;
  justify-content: center;
}

codesandbox-button[show-demo] {
  flex: 1;
}
</style>

<script type="module">
  document.getElementById('deck')
    .shadowRoot
    .appendChild(document.createElement('style'))
    .innerHTML = `
      #progress {
        height: 30px;
      }
    `;

  document
    .getElementById('demos')
    .addEventListener('select', function loadDemo() {
      const sandbox = document.querySelector('#demos [selected] > *');
      sandbox.theme =
        document.body.getAttribute('theme') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      sandbox.showDemo = true;
    });
</script>
