import '@apollo-elements/components';
import '@material/mwc-textfield';
import '@material/mwc-linear-progress';
import '@material/mwc-list';
import '@material/mwc-button';

import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

// The JS down here is to simulate a GraphQL server,
// You could just as easily set the `uri` attr on
// the `<apollo-client>` element

async function randomDelay(range = 2000) {
  await new Promise(r => setTimeout(r, Math.floor(Math.random() * range)));
}

const USERS = [
  { id: 1, name: 'Neil', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Neil_Armstrong_pose.jpg/1024px-Neil_Armstrong_pose.jpg?1623601441968' },
  { id: 2, name: 'Buzz', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Buzz_Aldrin.jpg/1024px-Buzz_Aldrin.jpg?1623601483170' },
  { id: 3, name: 'Michael', picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Michael_Collins_%28S69-31742%2C_restoration%29.jpg/1024px-Michael_Collins_%28S69-31742%2C_restoration%29.jpg?1623601522599' },
];

const nextID = () => (Math.max(...USERS.map(x => x.id)) ?? 0) + 1;

document.querySelector('apollo-client').client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({
    schema: makeExecutableSchema({
      resolvers: {
        User: {
          async picture({ name, picture }) {
            return picture ?? await fetch(`https://ui-avatars.com/api/?background=random&name=${name.replace(/\s/g, '+')}`).then(r => r.url)
          }
        },
        Query: {
          async users() {
            await randomDelay();
            return USERS;
          },
        },
        Mutation: {
          async addUser(_, { name }) {
            const user = { name, id: nextID() };
            USERS.push(user);
            await randomDelay();
            return user;
          },
        },
      },
      typeDefs: `
        type User {
          id: ID!
          name: String!
          picture: String
        }

        type Query {
          users: [User]
        }

        type Mutation {
          addUser(name: String!): User
        }
      `
    }),
  }),
});
