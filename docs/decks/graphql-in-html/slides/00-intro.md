---
name: intro
attrs: slide-out center
---

<header id="intro-header" flex center wrap>

  ![''](/logo.svg)

  <h1 id="h1" flex column>
    <span id="h1-graphql">GraphQL</span>
    <span id="h1-in-html">in <code id="h1-html">HTML</code></span>
  </h1>

  ::p[Data-Driven Web Apps that Use the Platform]{center fullwidth}
</header>

<small id="keys-legend" center>

  (Space, <kbd>H</kbd><kbd>J</kbd><kbd>K</kbd><kbd>L</kbd> or <kbd>→</kbd><kbd>←</kbd> Keys to Navigate)

  (<kbd>F</kbd> for Fullscreen)

</small>

<style data-helmet>
[name="intro"]::part(content) {
  display: grid;
  gap: 2em;
  grid-template:
    'main' 4fr
    'foot' 1fr;
}

#intro-header {
  margin-block-start: 4em;
}

#keys-legend {
  font-size: 3vw;
  text-align: center;
}

#h1 {
  font-size: 20vw;
}

#h1-graphql {
  --wght: 650;
  color: var(--secondary);
  line-height: 0.6;
}

#h1-in-html {
  --wght: 100;

  font-size: 18vw;
  margin-inline-start: 0.3em;
}

#h1-html {
  --slnt:-12;
  --wght: 900;
  --casl: 0;

  color:var(--primary);
  font-size: 20vw;
}
</style>
