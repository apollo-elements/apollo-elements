---
name: apollo-elements-mixins
libraries:
  - lib: mixins
    name: Vanilla
    logo: html5

  - lib: lit-apollo
    name: Lit
    logo: lit

  - lib: fast
    name: FAST
    logo: fast

  - lib: haunted
    name: Haunted
    logo: haunted

  - lib: hybrids
    name: Hybrids
    logo: hybrids

  - lib: polymer
    name: Polymer
    logo: polymer
templateEngineOverride: njk,md
---

## Use Different Web Component Libraries
<ul id="libraries">
{% for library in libraries %}
  <li>
    <figure>
      <img src="/_merged_assets/library-logos/{{ library.logo }}.svg" alt="" width="150px" height="150px"/>
      <figcaption>{{ library.name }}</figcaption>
    </figure>
  </li>
{% endfor %}
</ul>

<style data-helmett>
#libraries {
  display: grid;
  grid-template-columns: repeat(3, 150px);
  grid-template-rows: repeat(2, min-content);
  gap: 100px 130px;
  list-style-type: none;
  place-content: center;
}

#libraries li,
#libraries {
  margin: 0;
  padding: 0;
}

#libraries li {
  display: contents;
}

#libraries a {
  color: inherit;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.9;
  padding: 20px;
  display: flex;
  text-decoration: none;
  border-radius: 100%;
  transition: background 0.2s ease-in-out;
  height: 100%;
  outline: none;
}

#libraries figure {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

#libraries figcaption {
  text-align: center;
}

#libraries img {
  width: 150px;
}

#libraries a:hover figcaption,
#libraries a:focus figcaption {
  color: var(--primary-color-lighter);
  text-shadow: 2px 2px 2px var(--footer-background);
}

@media (prefers-color-scheme: dark) {
  #libraries a:hover figcaption,
  #libraries a:focus figcaption {
    text-shadow: 2px 2px 2px var(--primary-color-darker);
  }
}

</style>
