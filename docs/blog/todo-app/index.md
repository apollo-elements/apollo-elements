---
description: Learn how to write a To-Do list app with Apollo Elements and GraphQL. Use declarative, standards-based components to write maintainable, future-proof code.
tags:
  - graphql
  - webcomponents
  - todo
  - mutations
  - custom elements
published: true
generateSocialImage: true
date: 2021-01-15
updated: Last Modified
---

# Writing a To-Do App with GraphQL and Web Components

To-Do apps are *de rigueur* when it comes to demonstrating web app tech stacks. Writing one lets you see how the stack handles <abbr title="create, read, update, delete">CRUD</abbr> operations, giving you a feel for how it would handle larger, more complex apps. In this post, we'll learn how to write a to-do app using [Apollo Elements](https://apolloelements.dev), the GraphQL web component library.

## The Plan

The typical to-do app has a backend which contains the authoritative database of to-dos, and a frontend which displays the list and exposes UI for operations like adding, editing, or deleting to-dos. We'll build our frontend out of a single GraphQL query and some GraphQL mutations, and our backend using Apollo server and Koa, with an in-memory "database" consisting of a javascript object.

We'll use [Shoelace](https://shoelace.style) for our UI components, and [Lit](https://lit.dev) as our web component base, so if you want to catch up or take a refresher, check out my [blog post](https://dev.to/bennypowers/lets-build-web-components-part-5-litelement-906).

### Non-Goals
For the purposes of this blog post, we're focusing solely on the frontend side, so a proper backend server and database is out of scope. Instead, we'll implement a backend server that plugs in to [web dev server](https://modern-web.dev/guides/dev-server/getting-started/). We're still going to write GraphQL resolver functions though, so we could copy parts of our mock backend into a NodeJS server and with some small modifications it would still work.

We also won't be doing any fancy footwork like pagination or advanced cache management. We're assuming a short todo list that fits on one screen.

## App Boilerplate

Let's use the [Apollo Elements generator](/api/create/app/) to scaffold an app template:

```bash copy
mkdir todo-apollo
cd todo-apollo
npm init @apollo-elements -- \
  app \
  --uri /graphql \
  --install \
  --overwrite \
  --package-defaults
```

Once that's done, let's install our dependencies.

```bash copy
npm i -S apollo-server-koa urlpattern-polyfill
```

And let's add shoelace UI's styles and scripts to `/index.html`:

```html copy
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.48/dist/themes/base.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.48/dist/shoelace.js"></script>
```

And some initial styles in `/style.css`:

<details open><summary><code>/style.css</code></summary>

```css
html {
  font-family: var(--sl-font-sans);
}

main {
  display: flex;
  place-content: start center;
}

apollo-app {
  width: clamp(400px, 90vw, 90vw);
}
```

</details>

With our boilerplate ready, we're ready to start on our mock backend.

## The Backend

Let's define our backend first, starting with the GraphQL schema.

### The Schema

GraphQL apps resolve around their [*schema*](https://graphql.org/learn/schema/), so let's define that now. We'll need a type to represent each to-do, and a corresponding input type for mutations. We'll also define our operations, or all the actions our app's users can perform. Those actions are:

1. Reading the list of to-dos
2. Creating a new to-do
3. Editing an existing to-do
4. Deleting an existing to-do


```graphql copy
type Todo {
  id: ID
  name: String
  complete: Boolean
}

input TodoInput {
  todoId: ID
  name: String
  complete: Boolean
}

type Query {
  todos: [Todo]
  todo(todoId: ID): Todo
}

type Mutation {
  createTodo(input: TodoInput!): Todo
  updateTodo(input: TodoInput!): Todo
  toggleTodo(todoId: ID!): Todo
  deleteTodo(input: TodoInput!): [Todo]
}
```

In a larger app we might have defined different input types to get stronger input validation for each operation. For the sake of this demo though, a single input with no required fields does the trick.

Copy the above snippets in to `/schema.graphql`.

### The Database

Next, we need a database to store our todos and some initial content. For demo purposes, we'll store the todo list in-memory. We're going to cut a few corners for the sake of brevity, so don't take this as an example of inspired database design.

We do try to hide our shame somewhat though by keeping our four <abbr>CRUD</abbr> operations in the server's context. We'll call those functions to perform our DB operations in our GraphQL resolvers. We also will simulate network lag, delaying reponses some random number of milliseconds.

<inline-notification type="warning">

Our purpose here isn't to write the most efficient backend code, so don't take lessons from these mocks.

</inline-notification>

Create a file `/server.js` and copy the following snippet in.

<details>
  <summary><code>/server.js</code></summary>

  ```ts copy
  /* eslint-env node */
  /* eslint-disable no-console */

  import { ApolloServer } from 'apollo-server-koa';

  import { readFileSync } from 'fs';

  let TODOS;

  const INITIAL_TODOS = [
    { id: '0', name: 'Get Milk', complete: false },
    { id: '1', name: 'Get Bread', complete: false },
    { id: '2', name: 'Try to Take Over the World', complete: false },
  ];

  function initTodos() {
    TODOS = [...INITIAL_TODOS];
  }

  function byId(id) {
    return x => x.id === id;
  }

  function getNextId() {
    const last = TODOS.map(x => x.id).sort().pop();
    return (parseInt(last ?? '-1') + 1).toString();
  }

  async function randomSleep(max = 800) {
    await new Promise(r => setTimeout(r, Math.random() * max));
  }

  initTodos();

  const server = new ApolloServer({
    typeDefs: readFileSync(new URL('schema.graphql', import.meta.url), 'utf-8'),
    context: {
      getTodo(id) {
        const todo = TODOS.find(byId(id));
        if (!todo)
          throw new Error(`TODO ${id} not found`);
        return todo;
      },

      async getTodos() {
        await randomSleep();
        return TODOS;
      },

      async addTodo({ name, complete }) {
        await randomSleep();
        const todo = { id: getNextId(), name, complete };
        TODOS.push(todo);
        return todo;
      },

      async updateTodo({ id, name, complete }) {
        await randomSleep();
        const todo = server.context.getTodo(id);
        todo.name = name ?? todo.name;
        todo.complete = complete ?? todo.complete;
        return todo;
      },

      async deleteTodo(id) {
        await randomSleep();
        server.context.getTodo(id);
        TODOS = TODOS.filter(x => x.id !== id);
        return TODOS;
      },
    },
    resolvers: {
    },
  });

  /** Attaches the Apollo server to web dev server */
  export function graphqlTodoPlugin() {
    return {
      name: 'graphql-todo-plugin',
      async serverStart({ app, config }) {
        await server.start();
        server.applyMiddleware({ app });
        console.log(`🚀 GraphQL Dev Server ready at http://localhost:${config.port}${server.graphqlPath}`);
      },
    };
  }
  ```

</details>

### The Resolvers

With that accomplished, our next task is to define resolvers for each of the operations in our schema: `todos`, `createTodo`, `updateTodo`, and `deleteTodo`.

Ccopy the following snippet into the `resolvers` block of `server.js`:

```ts copy
Query: {
  async todo(_, { todoId }, context) {
    await randomSleep();
    return todoId ? context.getTodo(todoId) : null;
  },
  async todos(_, __, context) {
    return context.getTodos();
  },
},
Mutation: {
  async createTodo(_, { input: { name, complete = false } }, context) {
    return context.addTodo({ name, complete });
  },
  async updateTodo(_, { input: { todoId, name, complete } }, context) {
    return context.updateTodo({ id: todoId, name, complete });
  },
  async toggleTodo(_, { todoId }, context) {
    const todo = await context.getTodo(todoId)
    return context.updateTodo({ ...todo, complete: !todo.complete });
  },
  async deleteTodo(_, { input: { todoId } }, context) {
    await context.deleteTodo(todoId);
    return context.getTodos();
  },
},
```

Since we're relying on the `context` functions we defined earlier, our resolvers can stay simple.

### The Server

Our backend code is almost ready to go, all we have to do is hook it up to our frontend via the dev server. We need to add two custom dev server plugins:

1. `graphqlTodoPlugin`, which loads our graphql server code on the `/graphql` route, and
1. `resolveCodegenPlugin` to make sure the dev server loads graphql operations from the code-generated typescript files instead of their graphql sources. `@apollo-elements/create/helpers.js` exports this one for your convenience.

Replace the contents of `web-dev-server.config.js` with the following snippet:

```js copy
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import { graphqlTodoPlugin } from './server.js';
import { resolveCodegenPlugin } from '@apollo-elements/create/helpers.js';

import _litcss from 'rollup-plugin-lit-css';

const litcss = fromRollup(_litcss);

export default {
  nodeResolve: true,
  port: 8004,
  appIndex: 'index.html',
  rootDir: '.',
  mimeTypes: {
    'src/components/**/*.css': 'js',
  },
  plugins: [
    esbuildPlugin({ ts: true }),
    resolveCodegenPlugin({ ts: true }),
    graphqlTodoPlugin(),
    litcss({
      include: 'src/components/**/*.css',
      exclude: 'src/style.css',
    }),
  ],
};
```

## The Apollo Client

Our Apollo Client uses [`HttpLink`](https://www.apollographql.com/docs/react/networking/advanced-http-networking/#the-httplink-object) to connect to the backend server.

To make sure the todo-list renders the latest data, define a [type policy](https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicy-fields) which replaces the entire cached todo list every time the `todos` query updates. Replace the `typePolicies` config object with:

```ts copy
typePolicies: {
  Query: {
    fields: {
      location(): Location {
        return locationVar();
      },
      todos: {
        /** overwrite previous array when updating todos. */
        merge(_, next) {
          return next;
        },
      },
    },
  },
},
```

## The App Shell
Next we'll use the [`URLPattern` proposal](https://github.com/WICG/urlpattern/blob/main/explainer.md#urlpattern) polyfill to set up some client-side routing. Open up `src/router.ts` and paste in the following.

```ts copy
import { makeVar } from '@apollo/client/core';
import { installRouter } from 'pwa-helpers/router';
import { URLPattern } from 'urlpattern-polyfill';

const pattern = new URLPattern({
  pathname: '/todos/:todoId',
});

function makeLocation(location = window.location) {
  const { assign, reload, replace, toString, valueOf, ...rest } = location;
  return {
    __typename: 'Location',
    ...rest,
    todoId: pattern.exec(new URL(rest.href))?.pathname?.groups?.todoId ?? null,
  };
}

function update(location = window.location) {
  locationVar(makeLocation(location));
}

export const locationVar = makeVar(makeLocation());

export async function go(path: string): Promise<void> {
  history.pushState(null, 'next', new URL(path, location.origin).toString());
  await new Promise(r => requestAnimationFrame(r));
  update();
}

installRouter(update);
```

Now we're ready to start writing our UI components.

## Reading Todos

Let's define a [query](/guides/usage/queries/) to display our list. Edit `/src/components/app/App.query.graphql` so that our app shell gets the list of todos:

```graphql copy
query AppQuery {
  location @client { pathname }
  todos {
    id
    name
    complete
  }
}
```

Our next step is to add the query operation to our app shell component and render it's data.
Next let's define the component's template in `src/components/list/list.ts`,

```ts copy
render(): TemplateResult {
  const todos = this.query.data?.todos ?? [];
  return html`
  <sl-card>
    <h2 slot="header">To-Do List</h2>
    <ol>${todos.map(({ name, id, complete }) => html`
      <li>
        <sl-icon name="${complete ? 'check-square' : 'square'}"></sl-icon>
        <a href="/todos/${id}">${name}</a>
      </li>`)}
    </ol>
  </sl-card>
  `;
}
```

add some styles in `src/components/app/app.css`,

<details><summary<code>src/components/app/app.css</code></summary>

```css copy
:host {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, auto));
  gap: 12px;
}

ol {
  width: 100%;
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 4px;
}

sl-card {
  width: 100%;
}

sl-card, sl-card::part(base) {
  height: 100%;
}

sl-card::part(header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

</details>

And don't forget to load the module in `src/main.ts`.

```ts copy
import './components/list';
```

We've fulfilled the first of our requirements: we can read the list of todos!

1. [x] Display todo-list
2. [ ] Add new todos
3. [ ] Edit todos
4. [ ] Delete todos

Now we'll move on to the next step by adding a mutation operation to our component.

## Adding Todos

Let's define our operation in `src/components/app/CreateTodo.mutation.graphql`. The `createTodo` operation takes a `TodoInput` object and returns a `Todo`.

```graphql copy
mutation CreateTodo($input: TodoInput!) {
  createTodo(input: $input) {
    id
    name
    complete
  }
}
```

Add that mutation to our component by importing and instantiating an `ApolloMutationController` with an `update` function that appends the new todo to the cached list. For the UI, let's add an icon-button to the header of our main card, and have it toggle a dialog with a form for the new item.


```ts copy
@query('sl-input') input: HTMLInputElement;
@query('#new-dialog') newDialog: SLDialog;

query = new ApolloQueryController(this, AppQuery);

mutation = new ApolloMutationController(this, CreateTodo, {
  update: (cache, result) => {
    const cached = cache.readQuery({ query: AppQuery, returnPartialData: true });
    cache.writeQuery({
      query: AppQuery,
      data: {
        ...cached,
        todos: [
          ...cached.todos,
          result.data.createTodo,
        ],
      },
    });
  },
});

render(): TemplateResult {
  const todos = this.query.data?.todos ?? [];
  return html`
  <sl-card>
    <h2 slot="header">To-Do List</h2>
    <sl-tooltip slot="header" content="Add Todo">
      <sl-icon-button name="plus-circle"
                      label="Add Todo"
                      @click="${() => this.newDialog.show()}"></sl-icon-button>
    </sl-tooltip>
    <ol>${todos.map(({ name, id, complete }) => html`
      <li>
        <sl-icon name="${complete ? 'check-square' : 'square'}"></sl-icon>
        <a href="/todos/${id}">${name}</a>
      </li>`)}
    </ol>
  </sl-card>

  <sl-dialog id="new-dialog" label="New To-Do Item">
    <sl-input ?disabled="${this.mutation.loading}"></sl-input>
    <sl-button slot="footer" @click="${this.addTodo}">Add Todo</sl-button>
  </sl-dialog>
  `;
}

private async addTodo() {
  try {
    await this.mutation.mutate({
      variables: { input: { name: this.input.value } },
    });
    this.input.value = '';
    this.input.blur();
    this.newDialog.hide();
  } catch (e) {
    console.error(e);
  }
}
```

Nice! Two requirements down, two to go:

1. [x] Display todo-list
2. [x] Add new todos
3. [ ] Edit todos
4. [ ] Delete todos

## Toggling Todos

Our todo-list will have two different ways to update a todo, toggling it's `complete` status, and editing it's content. For the toggle operation, let's create and import `ToggleTodo.mutation.graphql`:

```graphql copy
mutation ToggleTodo($todoId: ID!) {
  toggleTodo(todoId: $todoId) {
    id
    name
    complete
  }
}
```

And for the UI, let's import `@apollo-elements/components/apollo-mutation` for a quick one-off. This component will sit in place of the complete icon in our app's template. We'll add a `data-todo-id` attribute on `<apollo-mutation>` to define a single `todoId` variable for the element, and we'll set `refetch-queries` and `await-refetch-queries` attributes to tell Apollo client to update the list of Todos after mutating, and to keep `loading` true until that request resolves. We could do without those, but this way the user gets a nicer experience. `refetch-queries` is a declarative alternative to a mutation update function. See the finished code for an example using `updater`.
The `trigger` attribute on the slotted button tells `<apollo-mutation>` to execute when the user clicks, the element will also manage the `disabled` state of the button for you. Check out the [`<apollo-mutation>` docs](https://apolloelements.dev/api/components/apollo-mutation/) for more info.

```html copy
<li>
  <apollo-mutation data-todo-id="${id}"
                  .mutation="${ToggleTodo}"
                  .optimisticResponse={{ toggleTodo: { __typename: 'Todo', complete: !complete, id, name } }}>
    <sl-icon-button trigger name="${complete ? 'check-square' : 'square'}"></sl-icon-button>
  </apollo-mutation>
  <a href="/todos/${id}">${name}</a>
</li>
```

## Editing Todos

So far we've been adding on to the app shell component for each new feature. At this point our `app.ts` file is over 100 lines long. Not terrible, but starting to approach the area we'd want to break it up. For our editing feature, let's define a new `<todo-edit>` element with its own mutation operation. We'll fire up the good old generator to scaffold the files:

```bash copy
npm init @apollo-elements -- \
    component \
  --name todo-edit \
  --type mutation \
  --operation-name UpdateTodo
  --subdir '' \
  --overwrite \
```

At the editor prompt, paste in the following:

```graphql copy
mutation UpdateTodo($input: TodoInput!) {
  updateTodo(input: $input) {
    id
    name
    complete
  }
}
```

Just like before, we'll define the template and styles. The component features an input field for the text of the todo with a checkbox to indicate the todo's status. Hitting the enter key on or blurring the input, or toggling the checkbox initiates the mutation.

```ts copy
@property({ attribute: 'data-id' }) todoId?: string;
@property({ attribute: 'data-name' }) todoName?: string;
@property({ attribute: 'data-complete', type: Boolean }) complete?: boolean;

@query('sl-input') input: HTMLInputElement;
@query('sl-checkbox') checkbox: HTMLInputElement;

render(): TemplateResult {
  return html`
    <sl-input label="To-Do Item"
              value="${this.todoName}"
              @keyup="${event => event.key === 'Enter' && this.mutate()}"
              ?disabled="${this.mutation.loading}"></sl-input>
    <sl-checkbox ?checked="${this.complete}"
                 ?disabled="${this.mutation.loading}"
                 @click="${this.mutate}">Complete</sl-checkbox>
  `;
}

mutate(): void {
  this.mutation.mutate({
    variables: {
      input: {
        todoId: this.todoId,
        name: this.input.value,
        complete: this.checkbox.checked,
      },
    },
  });
}
```

```css copy
:host {
  display: grid;
  gap: 12px;
}
```

We opted to pass our todo item's properties as attributes into the component in this case, but note that we could have just as well passed the todo object as a DOM property in the app shell's template. Both approaches have their pros and cons.

Let's take a moment to write an update function for our mutation, like the one we wrote for `ToggleTodo`. In this case, if we wrote our updater function with `readQuery` and `writeQuery`, we'd have to manage the entire `todos` array ourselves, which would be error-prone and poorly performing. let's use `writeFragment` instead. Create a new file at `src/components/edit/todo.fragment.graphql` and give it the following content:

```graphql copy
fragment todo on Todo {
  id
  name
  complete
}
```

[GraphQL fragments](https://graphql.org/learn/queries/#fragments) are pretty much just what they sound like, bits of a larger document. The `on` clause of the document declaration tells GraphQL which type this fragment belongs to. If we wanted, we could use fancy footwork like importing that `todo` fragment into our other operation files, but that's beyond the scope of this tutorial.

Import the fragment into `edit.ts` and add this `update` function to the mutation controller.

```ts copy
mutation = new ApolloMutationController(this, UpdateTodo, {
  update: (cache, result) =>
    cache.writeFragment({
      fragment: todoFragmentDoc,
      id: cache.identify({ __typename: 'Todo', id: this.todoId }),
      data: result.data.updateTodo,
    }),
});
```

<inline-notification type="tip" title="this reference">

Be sure to define the `update` option as an arrow function, so that the `this` binding refers to the element, not the options object.

</inline-notification>

Ok, we've defined our component but we can't _use_ it yet. To view the edit component, we'll put our client-side router to work in the app shell. Open up `src/components/app/app.ts` then add an `onData` callback to the query controller that sets a `view` property and lazy-loads the edit component.

```ts copy
@state() view = '';

query = new ApolloQueryController(this, AppQuery, {
  onData: data => {
    this.view = data?.location?.todoId ? 'edit' : 'list';
    if (this.view === 'edit')
      import('../edit');
  },
});
```

`onData` gets called whenever the data changes, with the new data as it's argument. Like above, make sure to use an arrow function so we can access the app shell's state on `this`.

We'll also add a second `<sl-card>` to display the editor, as a sibling to the first card.

```html copy
<sl-card ?hidden="${this.view !== 'edit'}">
  <h2 slot="header">Edit Todo</h2>
  <sl-icon-button slot="header" name="x" label="Close" href="/"></sl-icon-button>
  <todo-edit data-id="${this.query.data?.todo?.id}"
             data-name="${this.query.data?.todo?.name}"
             ?data-complete="${this.query.data?.todo?.complete}"
             ?hidden="${this.view !== 'edit'}"></todo-edit>
</sl-card>
```

The way our client-side routing works is simple but effective. Whenever the route changes, we lazy-load the desired view component, and we hide the edit card in our template unless the route matches.

By this point, you should be able to add an edit todos, which brings us 3/4 of the way there.

1. [x] Display todo-list
2. [x] Add new todos
3. [x] Edit todos
4. [ ] Delete todos

## Deleting Todos

For our last component let's change things up a little bit. Rather than adding a controller or an `<apollo-mutation>` element, we'll call the Apollo client's `mutate` method directly.

First, create `src/components/edit/DeleteTodo.mutation.graphql` with the following contents, and be sure to import it into `edit.ts`.

```graphql copy
mutation DeleteTodo($input: TodoInput) {
  deleteTodo(input: $input) {
    id
    name
    complete
  }
}
```

Add the following to the `<todo-edit>` template:

```html copy
<sl-button type="danger" @click="${this.deleteTodo}">Delete Todo</sl-button>
```

When the user clicks the "Delete Todo" button, four things need to happen in sequence:
1. Update the `loading` state of the form. We can accomplish this either by calling `requestUpdate` imperatively or by defining a state property on the element and having the template check if that _or_ the mutation controller's loading property is set.
2. Borrow a reference to the Apollo client from the existing mutation controller and call `mutate()` it, passing the `DeleteTodo` document and variables.
3. Update the cache to remove the deleted todo and update the list of todos.
4. Navigate back to the todo list, which causes the "Edit Todo" card to hide.

Let's do all four of those in the `deleteTodo` method, importing the `go` helper from `router.ts`.

```ts copy
private async deleteTodo(): Promise<void> {
  const { todoId } = this;
  // 1: set loading state
  this.loading = true;
  try {
    // 2: call the mutation imperatively
    await this.mutation.client.mutate({
      mutation: DeleteTodo,
      variables: { input: { todoId } },
      /**
       * 3: The mutation returns the updated list of todos.
       * Overwriting the todos array causes the cache GC
       * To remove the missing entry.
       */
      update(cache, result) {
        const query = AppQuery;
        const variables = { todoId };
        cache.writeQuery({
          query,
          variables,
          data: {
            ...cache.readQuery({ query, variables }),
            todos: result.data.deleteTodo,
          },
        });
      },
    });
    // 4: navigate back to the list
    await go('/');
  } finally {
    // clean up loading state.
    this.loading = false;
  }
}
```

1. [x] Display todo-list
2. [x] Add new todos
3. [x] Edit todos
4. [x] Delete todos

> git commit && git push

## The End Result

```html wcd ZoRKu4Jq8HyUVB7kT6qX www/index.html
<body>
  <main>

    <apollo-client id="client">
      <p-card>
        <h2 slot="heading">To-Do List</h2>

        <todo-todos></todo-todos>
        <todo-add id="add" refetch-queries="Todos"></todo-add>
        <mwc-button id="submit" slot="actions">Add Todo</mwc-button>

      </p-card>
    </apollo-client>

  </main>
</body>
```

The final product gives us:
- *Create*, *Update*, and *Delete* operations via GraphQL mutations
- *Read* operation via GraphQL query
- Declarative, maintainable code

Code reviewers (or future us) or will be able to get an at-a-glance perspective on what our code does by reading our GraphQL operation documents. Since we used web components for the UI, we'll be able to incrementally update or swap out our front-end framework with ease (or get rid of it altogether in favour of imperative vanilla JS).

Along the way we learned how to:
- Generate components with `npm init @apollo-elements`
- Render a query using the element's `data` property
- Fire a mutation to change the data in our graph
- Compose mutation components with queries three ways
  1. By adding an `ApolloMutationController` to the host element
  2. By using the `<apollo-mutation>` component.
  3. By imperatively calling `client.mutate()`
- Update the client side state following a mutation two ways:
  1. with `refetchQueries`
  2. with `updater`

I hope you enjoyed reading and look forward to chatting with you about GraphQL and Web Components on our discord, telegram, or slack channels.
