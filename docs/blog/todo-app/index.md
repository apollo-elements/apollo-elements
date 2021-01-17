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

The typical to-do app has a backend which contains the authoritative database of to-dos, and a frontend which displays the list and exposes UI for operations like adding, editing, or deleting to-dos. We'll build our 'frontend' out of a single GraphQL query and some GraphQL mutations.

### Non-Goals
For the purposes of this blog post, we're focusing solely on the frontend side, so a proper backend server and database is out of scope. Instead, we'll implement a fake 'backend' that uses localStorage to persist our todo list. We're still going to write GraphQL resolver functions, though, so we could copy parts of our mocked backend into a server running on NodeJS and with some small modifications it would still work.

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
  --yes
```

After installing via `npm` the app will launch on localhost. The generator prepares a typical SPA with a router and an app-root component. We won't be needing those, so go ahead and delete `src/router.ts` and `src/components/app`.

```bash copy
rm src/router.ts
rm -rf src/components/app
```

Copy in our page CSS.

<details>
  <summary><code>style.css</code></summary>

  ```css copy
  :root {
    --mdc-theme-primary: #81D4FA;
    --mdc-theme-secondary: #80CBC4;
    --mdc-theme-text-primary-on-background: white;
    --mdc-checkbox-unchecked-color: white;
    --mdc-checkbox-ink-color: var(--p-card-background-elevation1);
    --mdc-text-field-ink-color: white;
    --mdc-text-field-outlined-idle-border-color: white;
    --mdc-text-field-label-ink-color: white;
    --mdc-text-field-outlined-hover-border-color: #ddd;
    --p-card-background-elevation1: #222;
    --p-card-divider: #333;
  }

  body {
    background-color: #111;
    color: white;
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
    place-items: center center;
    height: 100vh;
  }

  a {
    color: var(--mdc-theme-primary);
  }

  a:visited {
    color: var(--mdc-theme-secondary);
  }

  p-card::part(content) {
    display: grid;
    gap: 8px;
  }

  h3,
  #how,
  todo-list {
    grid-column: 1 / -1;
  }
  ```

</details>

Also, remove the line `import './components/app'` from `main.ts`. Then, in `index.html`, remove the `<apollo-app>` element.

```html copy
<body>
  <main>
    <apollo-client id="client">
    </apollo-client>
  </main>
</body>
```

Keep the [`<apollo-client>`](/api/components/apollo-client/) element, though, it will propagate our client instance to our query and mutation elements across shadow roots.

Last, install some UI components and dependencies. We'll go with material.

```bash copy
npm i -S \
  @power-elements/card \
  @material/mwc-button \
  @material/mwc-icon-button \
  @material/mwc-checkbox \
  @material/mwc-textfield \
  @material/mwc-formfield
```

With our boilerplate ready, we're ready to start on our mock backend.

## The 'Backend'

Let's define our backend first, starting with the GraphQL schema.

### The Schema

GraphQL apps resolve around their [*schema*](https://graphql.org/learn/schema/), so let's define that now. We'll need a type to represent each to-do, and a corresponding input type for mutations.

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
```

We'll also define our operations, or all the actions our app's users can perform. Those actions are:

1. Reading the list of to-dos
2. Creating a new to-do
3. Editing an existing to-do
4. Deleting an existing to-do

```graphql copy
type Query {
  todos: [Todo]
}

type Mutation {
  createTodo(input: TodoInput): Todo
  updateTodo(input: TodoInput): Todo
  deleteTodo(input: TodoInput): [Todo]
}
```

In a larger app we might have defined different input types to get stronger input validation for each operation. For the sake of this demo though, a single input with no required fields does the trick.

Copy both of the above snippets in to `src/client.schema.graphql`.

### The Database

Next, we need a database to store our todos and some initial content. We'll use browser local storage as an *ad hoc* database. We're going to cut a few corners for the sake of brevity, so don't take this as an example of inspired database design.

We do try to hide our shame somewhat though by exporting only four `async` functions, corresponding to our four <abbr>CRUD</abbr> operations. We'll call those functions to perform our DB operations in our GraphQL resolvers. Asides from ferrying JSON in and out of local storage, our mocked database also simulated network lag by delaying reponses by some random number of milliseconds.

<inline-notification type="warning">

Our purpose here isn't to write the most efficient backend code, so don't take lessons from these mocks.

</inline-notification>

Create a file `src/context.ts` and copy the following snippet in.

<details>
  <summary><code>src/context.ts</code></summary>

  ```ts copy
  export interface Todo {
    id: string;
    name: string;
    complete: boolean;
  }

  let TODOS: Todo[];

  const LS_KEY = 'apollo-elements-todo-list';

  const INITIAL_TODOS: Todo[] = [
    { id: '0', name: 'Get Milk', complete: false },
    { id: '1', name: 'Get Bread', complete: false },
    { id: '2', name: 'Try to Take Over the World', complete: false },
  ];

  function initTodos(): void {
    const stored = localStorage.getItem(LS_KEY);
    TODOS = stored ? JSON.parse(stored) : [...INITIAL_TODOS];
  }

  initTodos();

  function byId(id: string): <T extends { id: string }>(x: T) => boolean {
    return x => x.id === id;
  }

  function updateStorage(): void {
    localStorage.setItem(LS_KEY, JSON.stringify(TODOS));
  }

  function getNextId(): string {
    const last = TODOS.map(x => x.id).sort().pop();
    return (parseInt(last) + 1).toString();
  }

  function getTodo(id: string): Todo {
    const todo = TODOS.find(byId(id));
    if (!todo)
      throw new Error(`TODO ${id} not found`);
    return todo;
  }

  async function randomSleep() {
    await new Promise(r => setTimeout(r, Math.random() * 1000));
  }

  export async function getTodos(): Promise<Todo[]> {
    await randomSleep();
    return TODOS;
  }

  export async function addTodo({ name, complete }: Omit<Todo, 'id'>): Promise<Todo> {
    await randomSleep();
    const todo = { id: getNextId(), name, complete };
    TODOS.push(todo);
    updateStorage();
    return todo;
  }

  export async function updateTodo({ id, name, complete }: Todo): Promise<Todo> {
    await randomSleep();
    const todo = getTodo(id);
    todo.name = name ?? todo.name;
    todo.complete = complete ?? todo.complete;
    updateStorage();
    return todo;
  }

  export async function deleteTodo(id: string): Promise<Todo[]> {
    await randomSleep();
    getTodo(id);
    TODOS = TODOS.filter(x => x.id !== id);
    updateStorage();
    return TODOS;
  }
  ```

</details>

### The Resolvers

With that accomplished, our next task is to define resolvers for each of the operations in our schema: `todos`, `createTodo`, `updateTodo`, and `deleteTodo`. Let's import the `makeExecutableSchema` helper from [`graphql-tools`](https://graphql-tools.com). This function takes our schema as a `typeDefs` string, and an object called `resolvers` which deeply maps from operation name to GraphQL type in the schema.

Create a file called `src/resolvers.ts` and copy in this snippet:

```ts copy
import { makeExecutableSchema } from '@graphql-tools/schema';

import Schema from './client.schema.graphql';

import type * as context from './context';

export const schema = makeExecutableSchema<typeof context>({
  typeDefs: Schema.loc.source.body,
  resolvers: {
    Query: {
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
      async deleteTodo(_, { input: { todoId } }, context) {
        await context.deleteTodo(todoId);
        return context.getTodos();
      },
    },
  },
});
```

Since we're relying on the `context` functions we defined earlier, our resolvers can stay simple. Assuming the signature of the context stays the same, you could copy the `resolvers` object verbatim into a GraphQL server running on NodeJS.

Our 'backend' code is almost ready to go, all we have to do is hook it up to our frontend.

## The Apollo Client

In a normal GraphQL app, the apollo client would use [`HttpLink`](https://www.apollographql.com/docs/react/networking/advanced-http-networking/#the-httplink-object) to connect to the backend server. Since our app doesn't have a backend, we won't bring in `HttpLink`, but use [`SchemaLink`](https://www.apollographql.com/docs/react/api/link/apollo-link-schema/) instead, to simulate a GraphQL server.

<inline-notification type="danger">

`SchemaLink` is meant for server-side use, not client-side. It imports the entire full-fat `graphql` library, adding **>180kb** of JavaScript. If you copy this snippet into production code, replace `SchemaLink` with `HttpLink`, and implement your schema in a proper GraphQL server.

</inline-notification>

Replace the contents of `src/client.ts` with the following snippet, which creates an Apollo client using `SchemaLink`, and defines a [type policy](https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicy-fields) which replaces the entire cached todo list every time the `todos` query updates:

```ts copy
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';

import { schema } from './resolvers';
import * as context from './context';

export const client = new ApolloClient<NormalizedCacheObject>({
  link: new SchemaLink({ schema, context }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          todos: {
            /** overwrite previous array when updating todos. */
            merge(_prev, next) {
              return next;
            },
          },
        },
      },
    },
  }),
});
```

<inline-notification type="tip">

Note how we're passing in the `context` object from our mocked backend. This is what lets the resolvers in our executable schema call our database functions. You'd do something similar to set up an [Apollo Server](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#context), for example.

</inline-notification>

Now we're ready to start writing our UI components.

## Reading Todos

Let's define a [query component](/guides/building-apps/queries/) to display our list. We'll use lit-element as our web component base, so if you want to catch up or take a refresher, check out my [blog post](https://dev.to/bennypowers/lets-build-web-components-part-5-litelement-906).

Use the [Apollo Elements generator](/api/create/component/) to scaffold a component:

```bash copy
npm init @apollo-elements -- \
    component \
  --name todo-list \
  --type query \
  --operation-name Todos \
  --fields 'todos\ \{\ id\ name\ complete\ \}' \
  --subdir '' \
  --yes
```

<inline-notification type="tip">

Commands here are escaped for the Bash shell. `fish` users can remove the backslashes.

</inline-notification>

Next let's define the component's template in `src/components/todos/todos.ts`,

```ts copy
render(): TemplateResult {
  const todos = this.data?.todos ?? [];
  return html`
    <ol>
      ${todos.map(({ name, id, complete }) => html`
      <li data-id="${id}">
        <todo-edit todo-id="${id}" ?complete="${complete}">
          ${name}
        </todo-edit>
      </li>
      `)}
    </ol>
  `;
}
```

add some styles in `src/components/todos/todos.css`,

```css copy
:host {
  display: block;
}

ol {
  width: 100%;
  list-style-type: none;
  padding: 0;
}
```

And don't forget to load the module in `src/main.ts`.

```ts copy
import './components/todos';
```

Now, if we add `<todo-todos>` to our HTML, we should be able to see the todo items on screen.

```html copy
<body>
  <main>
    <apollo-client id="client">
      <todo-todos></todo-todos>
    </apollo-client>
  </main>
</body>
```

We've fulfilled the first of our requirements: we can read the list of todos!

1. [x] Display todo-list
2. [ ] Add new todos
3. [ ] Edit todos
4. [ ] Delete todos

Now we'll move on to the next step and implement our first mutation in the `<todo-add>` component.

## Adding Todos

Our first mutation component will be `<todo-add>`, which lets the user add a new item to the list. Fire up the old component generator to scaffold the files.

```bash copy
npm init @apollo-elements -- \
    component \
  --name todo-add \
  --type mutation \
  --operation-name CreateTodo \
  --variables '\$input\:\ TodoInput!' \
  --fields 'createTodo\(input:\ $input\)\ \{\ id\ name\ complete\ \}' \
  --subdir '' \
  --yes
```

And like before, set up the template, in this case a single input element:

```ts copy
render(): TemplateResult {
  return html`
    <mwc-textfield outlined
        ?disabled="${this.loading}"
        label="New To-Do Item"
        @input="${this.setVariables}"
        @keyup="${this.onKeyup}"></mwc-textfield>
  `;
}
```

This component has some private methods and properties we'll need to implement. Add `query` to the imports from lit-element's decorators. It gives us easy references to shadow DOM elements, which we'll need to get the user's input.

```ts copy
import { customElement, query } from 'lit-element/lib/decorators';
import type { TextField } from '@material/mwc-textfield';
```

Then we'll implement `setVariables`, which will update the element's `variables` property on each keypress; and `onCompleted`, a [mutation component lifecycle callback](/guides/building-apps/mutations/lifecycle/) which fires whenever a mutation completes, which we'll use to clear the input.

```ts copy
@query('mwc-textfield') private input: TextField;

private setVariables(): void {
  this.variables = {
    input: {
      name: this.input.value,
    },
  };
}

private onKeyup(event: KeyboardEvent) {
  this.setVariables();
  if (event.key === 'Enter')
    this.mutate();
}

onCompleted(): void {
  this.input.value = '';
}
```

`setVariables` calculates the `variables` object and sets it. Why not use a getter? In a JS project, that works fine, but overriding with a getter will produce TypeScript errors, so we're doing it imperatively here.

Don't forget to import our dependencies, including the new component, in `src/main.ts`:

```ts copy
import '@material/mwc-button';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';
import '@material/mwc-textfield';
import '@power-elements/card';

import './components/add';
import './components/todos';
```

and add some style:

```css copy
:host {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

mwc-textfield {
  flex: 1 0 auto;
}

mwc-formfield {
  flex: 1 1 auto;
}
```

We didn't add a `submit` button to the element's shadow root because we're going to slot it into a parent card component's actions footer. So instead, we'll write a few bytes of JS in `src/main.ts` to link them up:

```js copy
import '@power-elements/card';

document.getElementById('submit')
  .addEventListener('click', () =>
    document.querySelector('todo-add').mutate());
```

While we're at it, let's go ahead and add that card component, the submit button, and our new `<todo-add>` element to our HTML.

```html copy
<body>
  <main>
    <apollo-client id="client">
      <p-card>
        <h2 slot="heading">To-Do List</h2>
        <todo-todos></todo-todos>
        <todo-add refetch-queries="Todos"></todo-add>
        <mwc-button id="submit" slot="actions" label="Add Todo"></mwc-button>
      </p-card>
    </apollo-client>
  </main>
</body>
```

That `refetch-queries` attribute instructs Apollo to refetch the `Todos` query every time `CreateTodo` resolves.

Nice! Two requirements down, two to go:

1. [x] Display todo-list
2. [x] Add new todos
3. [ ] Edit todos
4. [ ] Delete todos

## Editing Todos

The `<todo-edit>` element will do most of the heavy lifting in our app, so it will be the most involved of all our components, both in terms of it's template and it's methods. By now you should know the drill: fire up the good old generator to scaffold the files:

```bash copy
npm init @apollo-elements -- \
    component \
  --name todo-edit \
  --type mutation \
  --operation-name UpdateTodo \
  --variables '\$input\:\ TodoInput!' \
  --fields 'updateTodo\(input:\ $input\)\ \{\ id\ name\ complete\ \}' \
  --subdir '' \
  --yes
```

Just like before, we'll define the template and styles. The component features an input field for the text of the todo with a toggle button that shows or hides the input, and a checkbox to indicate the todo's status.

```ts copy
render() {
  const name = this.textContent.trim();
  return html`
    <mwc-textfield
        label="Edit"
        value="${name}"
        outlined
        @input="${this.onChange}"
        @keyup="${this.onKeyup}"></mwc-textfield>

    <mwc-formfield label="${name}">
      <mwc-checkbox
          ?checked="${this.complete}"
          @change="${this.onChange}"></mwc-checkbox>
    </mwc-formfield>

    <mwc-icon-button
        icon="edit"
        label="Edit"
        @click="${this.toggleEditing}"></mwc-icon-button>
  `;
}
```

```css copy
:host {
  display: flex;
  align-items: center;
  min-height: 56px;
  gap: 12px;
  min-width: 292px;
  width: 100%;
}

:host([editing]) mwc-textfield {
  display: inline;
}

:host([editing]) mwc-formfield {
  display: none;
}

mwc-icon-button {
  margin-inline-start: auto;
}

mwc-textfield {
  flex: 1;
  display: none;
}
```

See those `:host([editing])` selectors? That's selecting for the host element when it has an `editing` boolean attribute. State management in CSS! Lit-element decorators make defining that attribute a snap:

```ts copy
@property({ type: Boolean }) complete = false;

@property({ type: Boolean, reflect: true }) editing = false;

@property({ type: Number, attribute: 'todo-id' }) todoId: number;

@query('mwc-textfield') input: TextField;

@query('mwc-checkbox') checkbox: Checkbox;
```

We opted to pass our todo item's properties as attributes into the component in this case, but note that we could have just as well passed the todo object as a DOM property in the `<todo-todos>` template. Both approaches have their pros and cons.

Now let's hook up the element's behaviours with some methods:

```ts copy
private async toggleEditing() {
  this.editing = !this.editing;
  await this.input.updateComplete;
  if (this.editing)
    this.input.focus();
  else
    this.input.blur();
}

private setVariables() {
  this.variables = {
    input: {
      name: this.input.value,
      complete: this.checkbox.checked,
      todoId: this.todoId,
    },
  };
}

private onKeyup(event: KeyboardEvent) {
  this.setVariables();
  if (!(event instanceof KeyboardEvent)) return;
  switch (event.key) {
    case 'Enter':
    case 'Escape': this.editing = false; break;
    default: return;
  }
}

private onChange() {
  this.setVariables();
  this.mutate();
}
```

<inline-notification type="warning">

When coding against a server, consider debouncing the mutation calls.

</inline-notification>

Import your component in `src/main.ts`

```ts copy
import './components/edit';
```

And don't forget to add imports to the top of the file

<details>
<summary><code>src/components/edit/edit.ts</code></summary>

```ts copy
import type { ApolloCache, FetchResult } from '@apollo/client/core';
import type { TextField } from '@material/mwc-textfield';
import type { Checkbox } from '@material/mwc-checkbox';
import type {
  UpdateTodoMutationData as Data,
  UpdateTodoMutationVariables as Variables,
} from '../../schema';

import '@material/mwc-icon-button';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';
import '@material/mwc-textfield';

import { ApolloMutation } from '@apollo-elements/lit-apollo';
import { html, css } from 'lit-element';
import { customElement, property, query } from 'lit-element/lib/decorators';

import UpdateTodoMutation from './UpdateTodo.mutation.graphql';
```

</details>

By this point, you should be able to add an edit todos, which brings us 3/4 of the way there.

1. [x] Display todo-list
2. [x] Add new todos
3. [x] Edit todos
4. [ ] Delete todos

## Deleting Todos

For our last component let's change things up a little bit. Rather than generating a new component that `extends ApolloMutation`, let's use the `<apollo-mutation>` element to declaratively build our delete mutation in HTML.

First, create `src/components/edit/DeleteTodo.mutation.graphql` with the following contents, and add `DeleteTodoMutationData` to the type imports from the code-generated schema.

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
<apollo-mutation
    input-key="input"
    data-todo-id="${this.todoId}"
    .mutation="${DeleteTodoMutation}"
    .updater="${this.deleteUpdater}">
  <mwc-icon-button slot="trigger" icon="delete" label="delete"></mwc-icon-button>
</apollo-mutation>
```

`<apollo-mutation>` is robust enough to handle even some quite advanced cases, and it pairs well with query components when you want to compose operations together in your DOM templates. See the [composing mutations](/guides/building-apps/mutations/composition/) docs for more info.

Now import the dependencies:

```ts copy
import '@apollo-elements/components/apollo-mutation';

import TodosQuery from '../todos/Todos.query.graphql';
import DeleteTodoMutation from './DeleteTodo.mutation.graphql';
```

Last but not least, let's define that `deleteUpdater` method, which will make sure to remove the deleted todo from the list. In our case, this amounts to replacing the list with the result of the `deleteTodo` operation. See [the apollo docs](https://www.apollographql.com/docs/react/caching/garbage-collection/#cacheevict) for a more advanced approach.

```ts copy
deleteUpdater(
  cache: ApolloCache<any>,
  result: FetchResult<DeleteTodoMutationData>
): void {
  cache.writeQuery({
    query: TodosQuery,
    data: {
      todos: result.data.deleteTodo,
    }
  })
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
- An upgrade path to implementing a GraphQL server

Code reviewers (or future us) or will be able to get an at-a-glance perspective on what our code does by reading our GraphQL operation documents. Since we used web components for the UI, we'll be able to incrementally update or swap out our front-end framework with ease (or get rid of it altogether in favour of imperative vanilla JS).

Along the way we learned how to:
- Generate components with `npm init @apollo-elements`
- Render a query using the element's `data` property
- Fire a mutation to change the data in our graph
- Use boolean attributes to handle some UI state in CSS
- Compose mutation components with queries two ways
  1. By extending from `ApolloMutation`
  2. By using the `<apollo-mutation>` component.
- Update the client side state following a mutation two ways:
  1. with `refetchQueries`
  2. with `updater`

I hope you enjoyed reading and look forward to chatting with you about GraphQL and Web Components on our discord, telegram, or slack channels.
