---
title: Announcing Apollo Elements
published: true
date: 2019-01-16
updated: Last Modified
description: Create web components that leverage the power of Apollo GraphQL.
tags:
  - webcomponents
  - graphql
  - apollo
  - opensource
cover_image: https://thepracticaldev.s3.amazonaws.com/i/rk6u6o9jibsv4vo3cpgb.png
socialMediaImage: https://thepracticaldev.s3.amazonaws.com/i/rk6u6o9jibsv4vo3cpgb.png
---

<sup dir="rtl"><abbr title="בסייעתא דשמייא">בס״ד</abbr></sup>

Today I published version 0.0.1 of `apollo-elements`, a collection of packages that help you create web components connected to Apollo GraphQL<sup><a href="#note-1">1</a></sup>.

{% github apollo-elements/apollo-elements %}

Apollo Elements handles the plumbing between web components libraries like `lit-element` or `hybrids` and Apollo Client, so you can concentrate on building your app.

If you're new to web components, take a <abbr title="peek">👀</abbr> at my "Let's Build Web Components" series to get up to speed:

{% link https://dev.to/bennypowers/lets-build-web-components-part-1-the-standards-3e85 %}

## Connected Components

In a component-based app, each component can derive its state from some separate state storage. For example, you can create components which connect to a Redux or MobX store and subscribe to changes to their piece of the state puzzle.

GraphQL's flexible and extensible syntax is a natural fit for component based design, and Apollo's powerful implementation lets us easily make the connection between GraphQL data and our components. Using `apollo-link-state`, you can even get rid of client-side state containers like redux altogether and *query your entire component state from the apollo cache*.

```graphql
query UserProfilePage($userId: ID) {
  session @client {
    token
    expiresAt
    id
  }

  user(id: $id) {
    name
    avatar
    friends {
      name
      id
    }
  }
}
```

## Show Me The Code
Now, with Apollo Elements, you can get up and running building connected components. You provide a GraphQL document and a custom element class[<sup>2</sup>](#note-2) that handles templating, and you're good to go.

```js
import { ApolloQuery, html } from '@apollo-elements/lit-apollo';

// A component that uses ApolloSubscription to update
// when users go on or offline.
import './user-online-status.js';
import './loading-spinner.js';

/**
 * `<user-profile-page>` Shows a user's profile, as well as a list
 * of their friends which display's each one's online status via a
 * GraphQL subscription.
 * @extends ApolloQuery
 */
class UserProfilePage extends ApolloQuery {
  render() {
    const { loading, data } = this;
    return (
      (loading || !data) ? html`<loading-spinner></loading-spinner>`
      !data.user ? : html`<login-form></login-form>`
    : html`
        <h1>Hello, ${data.user.name}</h1>
        <profile-image src="${data.user.avatar}"></profile-image>
        <h2>Who's Online?</h2>
        <dl>${data.user.friends.map(({id, name}) => html`
          <dt>${name}</dt>
          <dd><user-online-status id="${id}"></user-online-status></dd>
        `)}</dl>
      `
    );
  }

  updated() {
    // get the currently logged-in user's id from the `@client` query.
    const { id } = this.id;
    // setting variables updates the query.
    if (id) this.variables = { id };
  }
}

customElements.define('user-profile-page', UserProfilePage);
```

Once you've added your elements to the page, set their `query` property to a GraphQL document and you're set.


### Inline GraphQL Scripts

You can even do neat little optional tricks like defining your queries declaratively in HTML with inline GraphQL:

```html
<user-profile-page>
  <script type="application/graphql">
    query UserProfilePage($userId: ID) {
      session @client {
        token
        expiresAt
        id
      }

      user(id: $id) {
        name
        avatar
        friends {
          name
          id
        }
      }
    }
  </script>
</user-profile-page>
```

Cute, right?

## Support for Multiple Web Component Libraries

Apollo Elements grew out of `lit-apollo`, but I wasn't content with supporting a single component class. Version 0 shipped, renamed and rebranded, with support for [`lit-element`](https://dev.to/bennypowers/lets-build-web-components-part-5-litelement-906), [`GluonElement`](https://dev.to/bennypowers/lets-build-web-components-part-6-gluon-27ll), and [`hybrids`](https://dev.to/bennypowers/lets-build-web-components-part-7-hybrids-187l). It also's got some [Polymer](https://dev.to/bennypowers/lets-build-web-components-part-4-polymer-library-4dk2)-style two-way binding elements so you can expose the apollo state in your templates with `{{data}}` syntax.

But the goal here was to give you, the developer, more options. If none of the above are what you're looking for, Apollo Elements also provides [class mixins](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/) that let you get up and running with any vanilla-like component class, or even good-old-fashioned `HTMLElement`, if you really wanted.

```js
import { ApolloMutationMixin } from '@apollo-elements/mixins';
import gql from 'graphql-tag';

const mutation = gql`
  mutation SendMessage($message: String!) {
    sendMessage(message: $message) {
      message
      date
    }
  }
`;

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host([error]) #input {
      border: 1px solid red;
    }

    details {
      display: none;
    }

    :host([error]) details {
      display: block;
    }
  </style>
  <label>Message<input id="input"/></label>
  <details>
    <summary>Error!</summary>
    <span id="error"></span>
  </details>
`;

class ChatInput extends ApolloMutationMixin(HTMLElement) {
  get input() {
    return this.shadowRoot && this.shadowRoot.getElementById('input');
  }

  constructor() {
    super();
    this.mutation = mutation;
    this.onKeyup = this.onKeyup.bind(this);
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.input.addEventListener('keyup', this.onKeyup)
  }

  onKeyup({ key, target: { value: message } }) {
    if (key !== 'Enter') return;
    this.variables = { message };
    this.mutate();
  }

  // Override implementation of `onCompleted` if desired.
  // Alternatively, use a setter.
  onCompleted({ message, date }) {
    this.input.value = '';
  }

  // Override implementation of `onError` if desired.
  // Alternatively, use a setter.
  onError(error) {
    this.setAttribute('error', error);
    this.shadowRoot.getElementById('error').textContent =
      `Error when sending message: ${ error }`;
  }
}
```
Plans are in the works to support even more web component libraries and frameworks in the future, so watch the repo for releases.

So go ahead - install the package which fits your project best:
- [`@apollo-elements/mixins`](https://npmjs.org/package/@apollo-elements/mixins) for class mixins
- [`@apollo-elements/lit-apollo`](https://npmjs.org/package/@apollo-elements/lit-apollo) for lit-element
- [`@apollo-elements/hybrids`](https://npmjs.org/package/@apollo-elements/hybrids) for Hybrids
- [`@apollo-elements/gluon`](https://npmjs.org/package/@apollo-elements/gluon) for Gluon
- [`@apollo-elements/polymer`](https://npmjs.org/package/@apollo-elements/polymer) for Polymer-style notifying elements

## Demo
Want to see it in action? I built a simple chat app demo that uses GraphQL subscriptions and renders it's components using lit-element.

[`#leeway`](https://lit-apollo-subscriptions.herokuapp.com) is a progressive web app that uses `lit-apollo` to make it easier for you to avoid doing actual work. Check out the [source repo](https://gitlab.com/bennyp/demo-lit-apollo-subscriptions) for an example of how to build apps with Apollo Elements. The demo includes:

- <abbr title="server side rendering">SSR</abbr>
- Code Splitting
- Aggressive minification, including `lit-html` template literals
- CSS-in-CSS ( e.g. `import shared from '../shared-styles.css';`)
- GQL-in-GQL ( e.g. `import query from './my-component-query.graphql';`)
- GraphQL Subscriptions over websocket

[![Lighthouse Scores: 98 (performance), 100 (accessibility), 93 (best practises), 100 (SEO), 12/12 (PWA)](https://user-images.githubusercontent.com/1466420/52176144-5c25f280-27b7-11e9-8e14-290651f98e36.png)](https://github.com/apollo-elements/apollo-elements/files/2825459/lit-apollo-subscriptions.herokuapp.com-20190203T132249.zip)

So try out `apollo-elements` today!

##### Footnotes
- <a name="note-1"><sup>1</sup></a><small>Apollo Elements is a community project maintained by myself, it's not affiliated with Meteor.</small>
- <a name="note-2"><sup>2</sup></a><small>Or in the case of hybrids, all you need is a render function.</small>
