---
name: Glue
attrs: spaced
templateEngineOverride: njk,md
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

  - lib: atomico
    name: Atomico
    logo: atomico

  - lib: hybrids
    name: Hybrids
    logo: hybrids

  - lib: polymer
    name: Polymer
    logo: polymer

---

Apollo Elements binds GraphQL to web components.

There are **two** main ways to use it:

<div reveal>

1. Premade HTML elements like `<apollo-query>`
2. Custom GraphQL elements using one or more web component libraries

<ul fit flex center>
{%- for library in libraries -%}
  {%- set path = '../../../_assets/brand-logos/' + library.logo + '.svg' -%}
  <li aria-label="{{ library.name }}">
    <a href="/api/libraries/{{ library.lib }}/"
       class="library {{ library.lib }}">{%- include path -%}</a>
  </li>
{%- endfor -%}
</ul>

Mix-and-match libraries and elements on the same page.

</div>
