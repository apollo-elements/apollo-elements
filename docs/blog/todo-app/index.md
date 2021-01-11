---
title: Writing a To-Do App with GraphQL and Web Components
description: Learn how to write a To-Do list app with Apollo Elements and GraphQL. Use declarative HTML and JavaScript components and built-in web platform standards.
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

To-Do apps are *de rigueur* when it comes to evaluating a tech stack for web apps. Writing one lets you see how the stack handles <abbr title="create, read, update, delete">CRUD</abbr> operations, giving you a feel for how it would handle larger, more complex apps. In this post, we'll learn how to write a to-do app using [Apollo Elements](https://apolloelements.dev), the GraphQL web component library.

## The Plan

The typical to-do app has a backend which contains the authoritative database of to-dos, and a frontend which displays the list and exposes UI for operations like adding, editing, or deleting to-dos. We'll build our 'frontend' out of a single GraphQL query and some GraphQL mutations.

### Non-Goals
For the purposes of this blog post, we're evaluating the frontend side only, so a proper backend server and database is out of scope. Instead, we'll implement a fake 'backend' that uses localStorage to persist our todo list. Bear in mind that we could copy our fake 'backend' code into a real GraphQL server running on NodeJS and with some small modifications it would still work.

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

Also, remove the line `import './components/app'` from `main.ts`. Then, in `index.html`, remove the `<apollo-app>` element.

```html copy
<body>
  <main>
    <apollo-client id="client">
    </apollo-client>
  </main>
</body>
```

The [`<apollo-client>`](/api/components/apollo-client/) element will propagate our client instance to our query and mutation elements.

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

```ts copy
interface Todo {
  id: number;
  name: string;
  complete: boolean;
}

let TODOS: Todo[];

const LS_KEY = 'apollo-elements-todo-list';

const INITIAL_TODOS: Todo[] = [
  { id: 0, name: 'Get Milk', complete: false },
  { id: 1, name: 'Get Bread', complete: false },
  { id: 2, name: 'Try to Take Over the World', complete: false },
];

function updateTodos(todos: Todo[]): void {
  localStorage.setItem(LS_KEY, JSON.stringify(todos));
}

function initTodos(): void {
  const stored = localStorage.getItem(LS_KEY);
  TODOS = stored ? JSON.parse(stored) : [...INITIAL_TODOS];
}

initTodos();
```

Create a file `src/mock-db.ts` and copy the above snippet in.

### The Resolvers

With that accomplished, our next task is to define resolvers for each of the operations in our schema: `todos`, `createTodo`, `updateTodo`, and `deleteTodo`. Let's import the `makeExecutableSchema` helper from [`graphql-tools`](https://graphql-tools.com). This function takes our schema as a `typeDefs` string, and an object called `resolvers` which deeply maps from operation name to GraphQL type in the schema.

```ts copy
import { makeExecutableSchema } from '@graphql-tools/schema';

export const schema = makeExecutableSchema({
  typeDefs: `...`, // our schema
  resolvers: {
    Query: {
      todos() { /* ... */ },
    },
    Mutation: {
      createTodo(_, { input }) { /*...*/ },
      updateTodo(_, { input }) { /*...*/ },
      deleteTodo(_, { input }) { /*...*/ },
    }
  }
});
```

Our implementations here are as naive and scrappy as our 'database'. Rather than spending time on them here, take a look at the [final code](https://webcomponents.dev/edit/ZoRKu4Jq8HyUVB7kT6qX?file=src/mock-db.ts) if you want to see how the sausage gets made, and if you're following along at home, copy the contents of that file into `src/mock-db.ts`.

Our 'backend' code is now ready to go, so let's get started on the frontend.

## The Apollo Client

In a normal GraphQL app, the apollo client would use [`HttpLink`](https://www.apollographql.com/docs/react/networking/advanced-http-networking/#the-httplink-object) to connect to the backend server. Since our app doesn't have a backend, we won't bring in `HttpLink`, but use [`SchemaLink`](https://www.apollographql.com/docs/react/api/link/apollo-link-schema/) instead, to simulate a GraphQL server.

<inline-notification type="danger">

`SchemaLink` is intended for server-side use, and imports the entire full-fat `graphql` library, adding **>180kb** of JavaScript. If you copy this snippet into production code, replace `SchemaLink` with `HttpLink`, and implement your schema in a proper GraphQL server.

</inline-notification>

Replace the contents of `src/client.ts` with the following snippet, which creates an Apollo client using SchemaLink, and defines a [type policy](https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicy-fields) which replaces the entire cached todo list every time the `todos` query updates:

```ts copy
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';

import { schema } from './schema';

export const client = new ApolloClient<NormalizedCacheObject>({
  link: new SchemaLink({ schema }),
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

Now we're ready to start writing our UI components.

## The UI - Query

Let's define a [query component](/guides/building-apps/queries/) to display our list. We'll use lit-element as our web component base, and some material design components for the UI.

Use the [Apollo Elements generator](/api/create/component/) to scaffold a component:

```bash copy
npm init @apollo-elements -- \
    component \
  --type query \
  --name todo-list \
  --operation-name Todos \
  --fields 'todos { id name complete }' \
  --subdir '' \
  --yes
```

Next let's define the component's template in `src/components/todos/todos.ts`

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

And add some styles in `src/components/todos/todos.css`.

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

And don't forget to load the module in `src/main.ts`

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

- [x] Display todo-list
- [ ] Add new todos
- [ ] Edit todos
- [ ] Delete todos

Now we'll move on to the next step and implement our first mutation in the `<todo-add>` component.

## The UI - Adding Todos

Our first mutation component will be `<todo-add>`, which lets the user add a new item to the list. Fire up the old component generator to scaffold the files.

```bash copy
npm init @apollo-elements -- \
    component \
  --type mutation \
  --operation-name CreateTodo \
  --variables "\$input: TodoInput!" \
  --fields 'createTodo(input: $input) { id name complete }' \
  --name todo-add \
  --subdir '' \
  --yes
```

```html copy
<mwc-textfield label="New To-Do Item" outlined @input="${this.setVariables}"></mwc-textfield>
<mwc-formfield label="Completed">
  <mwc-checkbox @change="${this.setVariables}"></mwc-checkbox>
</mwc-formfield>
```

We didn't add a `submit` button to the element's shadow root because we wanted to slot it into a parent card component's actions footer. Instead, we'll add that 'submit' button to the document-level HTML and write a few bytes of JS to link them up:

```js copy
document.getElementById('submit')
  .addEventListener('click', () =>
    document.querySelector('todo-add').mutate());
```

## The UI - Editing Todos

The `<todo-edit>` element will do most of the heavy lifting in our app. Let's define it's template and stub out some important methods. The component features an input field for the text of the todo with a toggle button that shows or hides the input, a checkbox to indicate the todo's status, and a delete button to remove the todo from the list.

```ts copy
@customElement('todo-edit')
export class TodoEditElement extends ApolloMutation<typeof UpdateTodoMutation> {
  static readonly styles = css`...`;

  @property({ type: Number, attribute: 'todo-id' }) todoId: number;

  @property({ type: String }) name = '';

  @property({ type: Boolean }) complete = false;

  @property({ type: Boolean, reflect: true }) editing = false;

  @query('mwc-textfield') input: TextField;

  @query('mwc-checkbox') checkbox: Checkbox;

  mutation = UpdateTodoMutation;

  render() {
    return html`
      <mwc-textfield outlined
          label="Edit"
          value="${this.name}"
          @input="${this.onChange}"></mwc-textfield>

      <mwc-formfield label="${this.name}">
        <mwc-checkbox
            ?checked="${this.complete}"
            @change="${this.onChange}"></mwc-checkbox>
      </mwc-formfield>

      <mwc-icon-button
          icon="edit"
          label="Edit"
          @click="${this.toggleEditing}"></mwc-icon-button>

      <apollo-mutation
          input-key="input"
          data-todo-id="${this.todoId}"
          .mutation="${DeleteTodoMutation}"
          .updater="${(cache: ApolloCache<any>, result: FetchResult<ResultOf<typeof DeleteTodoMutation>>) =>
            cache.writeQuery({
              query: TodosQuery,
              data: {
                todos: result.data.deleteTodo,
              }
            })}">
        <mwc-icon-button slot="trigger" icon="delete" label="delete"></mwc-icon-button>
      </apollo-mutation>
    `;
  }

  private toggleEditing() { /* ... */ }

  private setVariables() { /* ... */ }

  private onChange() {
    this.setVariables();
    this.doMutate();
  }

  @debounce(500)
  private doMutate() {
    this.mutate();
  }
}
```

We opted to pass our todo item's properties as attributes into the component in this case, but note that we could have just as well passed the todo object as a DOM property in the `<todo-todos>` template. Both approaches have their pros and cons. Another few things to point out here:

- We debounce the actual `mutate` call, but update the components' variables immediately
- The `editing` property reflects to an attribute. This is how we toggle the textfield's visibility in CSS.
- `setVariables` calculates the `variables` object and sets it. Why not use a getter? In a JS project, that works fine, but overriding with a getter will produce TypeScript errors, so we're doing it imperatively here.
- You might have noticed that our mutation component itself contains another mutation component. `<apollo-mutation>` is robust enough to handle even some quite advanced cases, and it pairs well with query components when you want to compose operations together in your DOM templates. See the [composing mutations](/guides/building-apps/mutations/composition/) docs for more info.


## The End Result

The final product gives us:
- *Create*, *Update*, and *Delete* operations via GraphQL mutations
- *Read* operation via GraphQL query
- Optimistic UI
- Declarative, maintainable code

```html wcd ZoRKu4Jq8HyUVB7kT6qX www/index.html
<apollo-client id="client">
  <p-card>
    <h2 slot="heading">To-Do List</h2>

    <todo-todos></todo-todos>
    <todo-add id="add" refetch-queries="Todos"></todo-add>
    <mwc-button id="submit" slot="actions">Add Todo</mwc-button>

  </p-card>
</apollo-client>
```

Future us or code reviewers will be able to read our GraphQL operation documents for an at-a-glance perspective on what our code does. Since we used web components for the UI, we'll be able to incrementally update or swap out our front-end framework with ease (or get rid of it altogether in favour of imperative vanilla JS).

I hope you enjoyed reading and look forward to chatting with you about GraphQL and Web Components on our discord, telegram, or slack channels.
