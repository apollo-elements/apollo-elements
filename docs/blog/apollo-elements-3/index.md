---
title: Take GraphQL into Orbit with Apollo Elements 3
published: true
description: Build performant, data-driven apps with Apollo Client and Web Components
date: 2020-09-24
updated: Last Modified
tags:
  - graphql
  - webcomponents
  - opensource
cover_image: https://dev-to-uploads.s3.amazonaws.com/i/r3qwfsz9gy2nlndy89gj.png
socialMediaImage: https://dev-to-uploads.s3.amazonaws.com/i/r3qwfsz9gy2nlndy89gj.png
---

Apollo Elements 3 launches into orbit today with tonnes of new features. There's a [brand new docs site](https://apolloelements.dev) complete with guides, full TypeScript support, app/component generators, and more.

Use Apollo Elements to write GraphQL-based apps using web components as the view layer. Apollo Elements supports [lit-element](https://lit-element.polymer-project.org), [hybrids](https://hybrids.js.org), and gluon out of the box, or you can use the custom-element mixins to add support to any custom-element base class.

Apollo Elements 3 supports the new Apollo Client 3 with all it's enhancements to developer experience.

```ts
import { ApolloQuery } from '@apollo-elements/lit-apollo';
import { customElement, html } from 'lit-element';
import { gql } from '@apollo/client/core';

interface Data {
  name: string;
  greeting: string;
}

interface Variables {
  name?: string;
}

@customElement('hello-query')
class HelloQuery extends ApolloElement<Data, Variables> {
  query = gql`
    query HelloQuery($name: String) {
      name
      greeting
    }
  `;

  render() {
    return html`
      <p>
        ${this.data?.greeting ?? 'Hello'},
        ${this.data?.name ?? 'Friend'}
      </p>
    `;
  }
}
```

## Examples

Check out these example apps:

- [leeway](https://leeway.apolloelements.dev) is a simple chat app that uses [GraphQL subscriptions](https://apolloelements.dev/guides/building-apps/subscriptions/) for real-time updates
- [launchctl](https://launchctl.apolloelements.dev) shows you information about SpaceX launches using the unofficial [spacex.land](https://api.spacex.land/graphql) API

## App Generator

Want to get started writing your GraphQL app in a snap? Try our new app generator

```
npm init @apollo-elements
```

So strap into your crash couch and feel that juice coming on, it's time for a hard burn past the GraphQL gate with [Apollo Elements](https://apolloelements.dev)
