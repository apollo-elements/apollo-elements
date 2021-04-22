---
description: Apollo Elements lets you write reusable and interoperable GraphQL components once, then use them in any frontend framework or none. Share your work across teams or publish your company's web components for others to use.
tags:
  - graphql
  - webcomponents
  - interop
  - custom elements
published: true
generateSocialImage: true
date: 2021-01-01
updated: Last Modified
---

# GraphQL Components that Work in Every Framework

You know how it goes. You hear about the hot new framework everyone's posting about. Sooner or later the shine fades on your lame old app's front-end stack. You start dreaming about the next project, how you'll do things differently. Or maybe you commit to The Big Rewrite™️, but it doesn't go as planned. Despairing, despondent, dejected, you wonder if there's any way to get off this churning treadmill.

Friend, let me tell you - there's a solution looking your right in the face. In fact that solution comes built in to the browser you're reading this post with. You can escape the hype cycle for good with web components.

## Framework Interoperability

One of the main advantages to web components is that they are just HTML DOM objects. That means they interface with each other and the rest of the app primarily via standards like HTML attributes, DOM properties, and Events. So imagine you had a `<spicy-input>` element that fires a `spicy-change` event every time the user types a word that's for grown-ups only. If, down the line, you refactor `<spicy-input>` by writing it with a different custom-element base class (e.g. swapping `LitElement` for `FASTElement`) as long as the external API (attributes, properties, named slots, css custom properties or shadow parts, and events) stays the same, you don't have to change any other files.

<small>If reading this gave you a sudden urge to implement that `<spicy-input>` element, then you're the hero we're waiting for, so get on it.</small>

> With web components, the library or framework you build them with is an implementation detail, and you can swap them out piecemeal without changing the rest of your app.

This also means that you can use web components inside your old-school framework, or with other web-component libraries.

<code-tabs collection="frameworks" default-tab="preact">

```html tab angular
<spicy-input (spicy-change)="onSpicyChange($event)" [value]="spicyValue"></spicy-input>
```

```jsx tab preact
return <spicy-input onspicy-change={onSpicyChange} value={spicyValue}></spicy-input>;
```

```jsx tab react
const spicyInputRef = createRef(null);
const onSpicyChange = e => setSpicyValue(e.target.value);
const [spicyValue, setSpicyValue] = useState('');
useEffect(() => spicyInputRef.current.addEventListener('spicy-change', onSpicyChange));
useEffect(() => (spicyInputRef.current.value = spicyValue), [spicyValue]);
return <spicy-input ref={spicyInputRef}></spicy-input>
```

```html tab svelte
<spicy-input on:spicy-change={onSpicyChange} value={spicyValue}></spicy-input>
```

```html tab vue
<spicy-input @spicy-change="onSpicyChange" :value="spicyValue"></spicy-input>
```

</code-tabs>

{% assign react_footnote = "Why all the extra code for React? As of this writing, [React has the poorest HTML and DOM support of any framework](https://custom-elements-everywhere.com/#react). Hopefully this will change soon. In the meantime there are a few [wrapper](https://www.npmjs.com/package/reactify-wc) libraries that make it easier to use web components in React by handling all this boilerplate for you." | markdown | replace: "<p>" , "" | replace: "</p>" , "" %}

> TL;DR: web components work in {% footnoteref "react" react_footnote %}all frameworks{% endfootnoteref %}, or none, since they're just HTML and the DOM.

## GraphQL Meets Web Components

So interop takes the pressure off "The Big Rewrite™️" and helps us share our work across teams and apps, but web components have another super power which helps us get the job done: *encapsulation*.

A well-written web component keeps its insides in and its outsides out. By that, I mean that the internal implementation of the component is kept hidden while the external APIs remain stable and accessible.

In the world of GraphQL, that can mean associating a query with a component so that it's data and it's DOM structure are tightly linked. Apollo Elements lets us define query components that render their data to their private shadow DOM.

```ts copy
import { useQuery, html, component } from '@apollo-elements/haunted';
import { gql, TypedDocumentNode } from '@apollo/client/core';
import { PostsQuery } from './Posts.query.graphql';

function Posts({ limit, sort }) {
  const { data } = useQuery(PostsQuery, { variables: { limit, sort } });

  const posts = data?.posts ?? [];

  function onLike() {
    const { id } = event.target.closest('li');
    this.dispatchEvent(new CustomEvent('like-post', { detail: { id } }));
  }

  return html`
    <h2>Posts</h2>
    <ol>
      ${posts.map(({ id, coverImage, summary, title, url, liked }) => html`
      <li id="${id}">
        <a href="${url}"><img src="${coverImage}" role="presentation"/> ${title}</a>
        <p>${summary}</p>
        <button role="switch"
            aria-checked="${liked}"
            aria-label="toggle liked"
            @click="${onLike}">
          ${liked ? '💔' : '💓'}
        </button>
      </li>
      `)}
    </ol>
  `;
}

Posts.observedAttributes = ['limit', 'sort'];

customElements.define('posts-list', component(Posts));
```

In this code snippet, the `<posts-list>` component renders a list of post summaries, where each list-item bears the `id` of it's post. Ordinarily, we'd be reticent to use element IDs so dynamically, but with Shadow DOM, the internals of `<posts-list>` are isolated from the rest of the document, so we as the author have complete control of the shadow root and can do what we like there without worrying about whether it might negatively affect the rest of the page.

And since that internal DOM is so strongly encapsulated, our colleagues on the Angular team can import it into their app with confidence that indeed nothing will go wrong, even if down the line we change the internal structure of the component.

<code-tabs collection="frameworks" default-tab="preact">

```html tab angular
<label>Posts per page
  <input type="number" step="10" [(ngModel)]="limit"/>
</label>

<label>Sort
  <select [(ngModel)]="sort">
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
  </select>
</label>

<posts-list
    [limit]="limit"
    [sort]="sort"
    (like-post)="onLikePost($event)"
></posts-list>
```

```tsx tab preact
function PostContainer() {
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState('asc');
  return (
    <label>Posts per page
      <input
          type="number"
          step="10"
          value={limit}
          onInput={e => setLimit(e.target.value)}/>
    </label>

    <label>Sort
      <select onInput={e => setSort(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </label>

    <posts-list
        limit={limit}
        sort={sort}
        onlike-post={onLikePost}
    ></posts-list>
  );
}
```

```tsx tab react
function PostContainer() {
  const postsListRef = createRef(null);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState('asc');
  useEffect(() => postsListRef.current.addEventListener('like-post', onLikePost));
  useEffect(() => postsListRef.current.limit = limit, [limit]);
  useEffect(() => postsListRef.current.sort = sort, [sort]);

  return (
    <label>Posts per page
      <input
          type="number"
          step="10"
          value={limit}
          onInput={e => setLimit(e.target.value)}/>
    </label>

    <label>Sort
      <select onInput={e => setSort(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </label>

    <posts-list ref={postsListRef}></posts-list>
  );
}
```

```html tab svelte
<label>Posts per page
  <input type="number" step="10" bind:value={limit}/>
</label>

<label>Sort
  <select bind:value={sort}>
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
  </select>
</label>

<posts-list limit={limit} sort={sort} on:like-post={onLikePost}></posts-list>
```

```html tab vue
<label>Posts per page
  <input type="number" step="10" v-model="limit"/>
</label>

<label>Sort
  <select v-model="sort">
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
  </select>
</label>

<posts-list limit="limit" sort="sort" @like-post="onLikePost"></posts-list>
```

</code-tabs>

You can write complex single-page apps with just Apollo Elements. Each component manages it's own internal state while using a templating system like `lit-html` or an old-school JavaScript framework to hook up properties and events, and the Apollo cache for [managing client-side state](https://apolloelements.dev/guides/usage/local-state/) more generally.

## Learn More
Interested to learn more? Read our [getting started guide](https://apolloelements.dev/guides/) to find out how your team can bring GraphQL to your web app one web component at a time. Or if you've already started, check out the [API docs](https://apolloelements.dev/api/) for the low-down on how components work using your favourite web component library.

So dive in, start building GraphQL and web components into your app today!
