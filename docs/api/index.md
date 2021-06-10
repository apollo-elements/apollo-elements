# API || 20

Apollo Elements consists of multiple web-component packages, a core of shared interfaces, ready-made components, and some library helpers.

## Libraries

Whatever your preference for how to build web components, there's a flavour of Apollo Elements for you and your team. You can even mix-and-match in the same project, thanks to the common interface of HTML and the DOM.

- [Class Mixins](./libraries/mixins/): Vanilla JS class mixins
- [Lit](./libraries/lit-apollo/): Perhaps the most popular web-component library
- [FAST](./libraries/fast/): Microsoft's new entry into the field
- [Haunted](./libraries/haunted/): The React hooks API, but web components
- [Hybrids](./libraries/hybrids/): A unique chimera of object-oriented and functional styles
- [Gluon](./libraries/gluon/): A breath more than vanilla, for the minimalists in the crowd
- [Polymer](./libraries/polymer/): The original web-components library

## Interfaces

Each of the web component library packages provides lets you build GraphQL apps differently, depending on the paradigm represented by the base package, they all share the same common interfaces

That is to say, whether you create a query element with `lit-apollo`, `haunted`, or vanilla JS mixins, once they connect to the DOM, they all behave the same vis-a-vis GraphQL.

<figure aria-label="Inheritance diagram">

  <svg width="100%" xmlns="http://www.w3.org/2000/svg" viewBox="-20 -20 542.75 390">
    <defs>
      <marker id="extensionStart" class="extension" refX="0" refY="7" markerWidth="190" markerHeight="240" orient="auto"><path d="M1 7l17 6V1z"/></marker>
    </defs>
    <defs>
      <marker id="extensionEnd" refX="19" refY="7" markerWidth="20" markerHeight="28" orient="auto"><path d="M1 1v12l17-6z"/></marker>
    </defs>
    <defs>
      <marker id="compositionStart" class="extension" refX="0" refY="7" markerWidth="190" markerHeight="240" orient="auto"><path d="M18 7l-9 6-8-6 8-6z"/></marker>
    </defs>
    <defs>
      <marker id="compositionEnd" refX="19" refY="7" markerWidth="20" markerHeight="28" orient="auto"><path d="M18 7l-9 6-8-6 8-6z"/></marker>
    </defs>
    <defs>
      <marker id="aggregationStart" class="extension" refX="0" refY="7" markerWidth="190" markerHeight="240" orient="auto"><path d="M18 7l-9 6-8-6 8-6z"/></marker>
    </defs>
    <defs>
      <marker id="aggregationEnd" refX="19" refY="7" markerWidth="20" markerHeight="28" orient="auto"><path d="M18 7l-9 6-8-6 8-6z"/></marker>
    </defs>
    <defs>
      <marker id="dependencyStart" class="extension" refX="0" refY="7" markerWidth="190" markerHeight="240" orient="auto"><path d="M5 7l4 6-8-6 8-6z"/></marker>
    </defs>
    <defs>
      <marker id="dependencyEnd" refX="19" refY="7" markerWidth="20" markerHeight="28" orient="auto"><path d="M18 7l-9 6 5-6-5-6z"/></marker>
    </defs>
    <g class="classGroup">
      <path d="M0 0h75.533v31.5H0z" transform="translate(198.85)"/>
      <text y="15" transform="translate(196)">
        <tspan class="title" x="5.5">HTMLElement</tspan>
      </text>
      <path d="M0 22h75.533M0 27h75.533" transform="translate(198.85)"/>
    </g>
    <g class="classGroup">
      <path d="M0 0h135.55v41.5H0z" transform="translate(168.842 81.5)"/>
      <text y="15" transform="translate(168.842 81.5)">
        <tspan x="42.075">«Interface»</tspan>
        <tspan class="title" dy="10" x="31.2">CustomElement</tspan>
      </text>
      <path d="M0 32h135.55M0 37h135.55" transform="translate(168.842 81.5)"/>
    </g>
    <g class="classGroup">
      <path d="M0 0h130.4v63.5H0z" transform="translate(171.417 173)"/>
      <text y="15" transform="translate(171.417 173)">
        <tspan x="39.5">«Interface»</tspan>
        <tspan class="title" dy="10" x="31.2">
          <a href="./interfaces/element/">ApolloElement</a>
        </tspan>
      </text>
      <path d="M0 32h130.4" transform="translate(171.417 173)"/>
      <text x="5" y="42" class="classText" transform="translate(171.417 173)">
        <tspan x="5">data: Data</tspan>
        <tspan x="5" dy="10">variables: Vars</tspan>
      </text>
      <path d="M0 59h130.4" transform="translate(171.417 173)"/>
    </g>
    <g class="classGroup">
      <path d="M0 0h120.133v63.5H0z" transform="translate(0 286.5)"/>
      <text y="15" transform="translate(0 286.5)">
        <tspan x="34.367">«Interface»</tspan>
        <tspan class="title" dy="10" x="31.2">
          <a href="./interfaces/query/">ApolloQuery</a>
        </tspan>
      </text>
      <path d="M0 32h120.133" transform="translate(0 286.5)"/>
      <text x="5" y="42" class="classText" transform="translate(0 286.5)">
        <tspan x="5">query: DocumentNode</tspan>
        <tspan x="5" dy="10">...</tspan>
      </text>
      <path d="M0 59h120.133" transform="translate(0 286.5)"/>
    </g>
    <g class="classGroup">
      <path d="M0 0h132.967v63.5H0z" transform="translate(170.133 286.5)"/>
      <text y="15" transform="translate(170.133 286.5)">
        <tspan x="40.783">«Interface»</tspan>
        <tspan class="title" dy="10" x="31.2">
          <a href="./interfaces/mutation/">ApolloMutation</a>
        </tspan>
      </text>
      <path d="M0 32h132.967" transform="translate(170.133 286.5)"/>
      <text x="5" y="42" class="classText" transform="translate(170.133 286.5)">
        <tspan x="5">mutation: DocumentNode</tspan>
        <tspan x="5" dy="10">...</tspan>
      </text>
      <path d="M0 59h132.967" transform="translate(170.133 286.5)"/>
    </g>
    <g class="classGroup">
      <path d="M0 0h149.65v63.5H0z" transform="translate(353.1 286.5)"/>
      <text y="15" transform="translate(353.1 286.5)">
        <tspan x="49.125">«Interface»</tspan>
        <tspan class="title" dy="10" x="31.2">
          <a href="./interfaces/subscription/">ApolloSubscription</a>
        </tspan>
      </text>
      <path d="M0 32h149.65" transform="translate(353.1 286.5)"/>
      <text x="5" y="42" class="classText" transform="translate(353.1 286.5)">
        <tspan x="5">subscription: DocumentNode</tspan>
        <tspan x="5" dy="10">...</tspan>
      </text>
      <path d="M0 59h149.65" transform="translate(353.1 286.5)"/>
    </g>
    <path d="M236.617 31.5v50" id="edge1418" class="relation" marker-start="url(#extensionStart)"/>
    <path d="M236.617 123v50" id="edge1419" class="relation" marker-start="url(#extensionStart)"/>
    <path d="M171.417 225.708l-18.559 5.965c-18.558 5.966-55.675 17.896-74.233 28.028-18.558 10.132-18.558 18.466-18.558 22.632v4.167" id="edge1420" class="relation" marker-start="url(#extensionStart)"/>
    <path d="M236.617 236.5v50" id="edge1421" class="relation" marker-start="url(#extensionStart)"/>
    <path d="M301.817 224.091l21.018 6.235c21.018 6.235 63.054 18.704 84.072 29.106 21.018 10.401 21.018 18.735 21.018 22.901v4.167" id="edge1422" class="relation" marker-start="url(#extensionStart)"/>
  </svg>

  <figcaption class="visually-hidden">

  Class inheritance diagram of Apollo Elements, showing

  1. `ApolloQuery`, `ApolloMutation`, and `ApolloSubscription` inheriting from `ApolloElement`
  2. `ApolloElement` inheriting from `CustomElement`
  2. `CustomElement` inheriting from `HTMLElement`

  </figcaption>
</figure>

## Components

- [`<apollo-client>`](./components/apollo-client/): Scope a subtree of ApolloElements to a specific client instance
- [`<apollo-mutation>`](./components/apollo-mutation/): Declaratively add mutations to your app

## Packages

- [Generator](./create/): Quickly scaffold a GraphQL app
