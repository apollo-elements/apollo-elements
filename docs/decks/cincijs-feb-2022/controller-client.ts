import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

const PROFILE = { name: 'CinciJS' };

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({
    schema: makeExecutableSchema({
      typeDefs: `
        type User { name: String }
        type Query { profile: User }
        input UserInput { name: String }
        type Mutation { updateProfile(user: UserInput): User }
      `,
      resolvers: {
        Query: {
          async profile() {
            await new Promise(r => setTimeout(r, Math.random() * 5000));
            return PROFILE;
          },
        },
        Mutation: {
          async updateProfile(_, args) {
            await new Promise(r => setTimeout(r, Math.random() * 5000));
            Object.assign(PROFILE, args.user);
            return PROFILE;
          }
        }
      },
    }),
  }),
});
