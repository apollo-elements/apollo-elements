import type { NormalizedCacheObject } from '@apollo/client/core';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import countries from './countries.js'

export interface Country {
  countryCode: string;
  name: string;
  emoji: string
}

export interface Profile {
  name: string;
  country: Country;
};

const typeDefs = `
  type Country {
    countryCode: String
    name: String
    emoji: String
  }

  type Profile {
    name: String
    country: Country
  }

  type Query {
    countries: [Country]
    profile: Profile
  }

  input ProfileInput {
    name: String
    country: String
  }

  type Mutation {
    updateProfile(input: ProfileInput): Profile
  }
`;

declare global { interface Window { __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>; } }

let PROFILE = null;

export const client  = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers: {
        Profile: {
          country({ country }) {
            return {
              countryCode: country,
              ...countries[country],
            };
          },
        },
        Query: {
          countries(): Country[] {
            return Object
                .entries(countries)
                .map(([countryCode, v]) =>
                  ({ ...v, countryCode }));
          },
          profile(): Profile {
            return PROFILE;
          },
        },
        Mutation: {
          updateProfile(_, { input }) {
            PROFILE = input;
            return PROFILE;
          }
        }
      }
    }),
  }),
});
