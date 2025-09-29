import { ApolloClient, DocumentNode, ErrorPolicy, FetchPolicy, FetchResult, NetworkStatus, NormalizedCacheObject, TypedDocumentNode, WatchQueryFetchPolicy, WatchQueryOptions } from '@apollo/client';
import * as S from './schema';

import { gql } from '@apollo/client';
import * as C from '@apollo-elements/core';
import { useQuery, useMutation, useSubscription } from '@apollo-elements/haunted';
import { LitElement } from 'lit';

import { assertType, isApolloError } from '@apollo-elements/test';

import * as Mixins from '@apollo-elements/mixins';

import * as FAST from '@apollo-elements/fast';
import { FASTElement } from '@microsoft/fast-element';

import * as Gluon from '@apollo-elements/gluon';
import { GluonElement } from '@gluon/gluon';

import * as Polymer from '@apollo-elements/polymer';

interface User {
  id: number;
  name: string;
  picture?: string;
}

type Data = { a: 'a', b: number };
type Vars = { d: 'd', e: number };
type TDN = TypedDocumentNode<Data, Vars>;

const client = window.__APOLLO_CLIENT__!;

export const UserQuery: TypedDocumentNode<{ users: User[] }, { name: string }> = gql``;
export const UserMutation: TypedDocumentNode<{ addUser: User }, { name: string }> = gql``;
export const UserSubscription: TypedDocumentNode<{ userJoined: User }, { name: string }> = gql``;

export class X extends LitElement {
  userQ = new C.ApolloQueryController(this, UserQuery, {
    // @ts-expect-error: name is required
    variables: {},
    shouldSubscribe(options) {
      return options?.variables?.name === 'hi';
    },
  });

  userQUntyped = new C.ApolloQueryController<{ users: User[] }, { name: string }>(this, gql``, {
    // @ts-expect-error: name is required
    variables: {},
    shouldSubscribe(options) {
      return options?.variables?.name === 'hi';
    },
  });

  userQCheck() {
    this.userQ.variables!.name = 'hello';
    this.userQUntyped.variables!.name = 'hello';
  }

  nullQ = new C.ApolloQueryController(this, S.NullableParamQuery, {
    variables: { nullable: 'nullable' },
    shouldSubscribe({ variables } = {}) {
      return variables?.nullable === 'nullable';
    },
  });

  nullQCheck() {
    // @ts-expect-error: nullable should be string
    this.nullQ.variables = { nullable: 1 };
    this.nullQ.variables = { nullable: 'nullable' };
  }

  userM = new C.ApolloMutationController(this, UserMutation, {
    // @ts-expect-error: name is required
    variables: {},
    optimisticResponse: x => {
      x.name === 'hi';
      return {
        addUser: {
          id: 0,
          name: 'hi',
        },
      };
    },
    update(_cache, result) {
      // @ts-expect-error: id should be a number
      result.data?.addUser.id === 'hi';
    },
    onCompleted(result) {
      // @ts-expect-error: name should be a string
      result?.addUser.name === 0;
    },
  });

  async userMCheck() {
    const r = await this.userM.mutate({
      variables: {
        // @ts-expect-error: name should be a string
        name: 0,
      },
    });
    r.data?.addUser.id === 1;
    r.data?.addUser.name === 'string';
  }

  userS = new C.ApolloSubscriptionController(this, UserSubscription, {
    // @ts-expect-error: name is required
    variables: {},
    shouldSubscribe({ variables } = {}) {
      return variables?.name === 'name';
    },
  });

  userSCheck() {
    this.userS.variables = { name: 'hi' };
  }
}

export function HauntedCheck() {
  const hauntedQuery = useQuery(UserQuery);
  hauntedQuery.data?.users.map(x => {
    x.id - 1;
    x.name.toLowerCase();
  });

  const [hMutate, hauntedMutation] = useMutation(UserMutation);
  hauntedMutation.data!.addUser.id - 1;
  hauntedMutation.data?.addUser.name.toLowerCase();
  hMutate({ variables: { name: 'hello' } });

  const hauntedSubscription = useSubscription(UserSubscription);
  hauntedSubscription.data!.userJoined.id - 1;
  hauntedSubscription.data!.userJoined.name.toLowerCase();

  // ----- UNTYPED VARIANT

  const untypedQuery = useQuery<{ users: User[] }, { name: string }>(gql``);
  untypedQuery.data?.users.map(x => {
    x.id - 1;
    x.name.toLowerCase();
  });

  const [uMutate, untypedMutation] = useMutation<{ addUser: User }, { name: string }>(gql``);
  untypedMutation.data!.addUser.id - 1;
  untypedMutation.data?.addUser.name.toLowerCase();
  uMutate({ variables: { name: 'hello' } });

  const untypedSubscription = useSubscription<{ userJoined: User }, { name: string }>(gql``);
  untypedSubscription.data!.userJoined.id - 1;
  untypedSubscription.data!.userJoined.name.toLowerCase();
}

export class TypeCheckFASTQueryonClient extends Mixins.ApolloClientMixin(
  client,
  FAST.ApolloQuery
)<TDN> {
  check() {
    assertType<FASTElement>(this);
    assertType<FAST.ApolloQuery<TDN>>(this);
    assertType<Data>(this.data!);
    assertType<Vars>(this.variables!);
  }
}

export class TypeCheckGluonQueryOnClientManual extends Mixins.ApolloClientMixin(client, Gluon.ApolloQuery)<Data, Vars> {
  check() {
    assertType<GluonElement>(this);
    assertType<Gluon.ApolloQuery<Data, Vars>>(this);
    assertType<Data>(this.data!);
    assertType<Vars>(this.variables!);
  }
}

export class TypeCheckPolymerMutationManual extends Polymer.PolymerApolloMutation<Data, Vars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    // ApolloElementInterface
    assertType<ApolloClient (this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly C.GraphQLError[]>           (this.errors!);
    assertType<Data>                                (this.data!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly C.GraphQLError[]>         (this.error.graphQLErrors);

    // ApolloMutationInterface
    assertType<DocumentNode>                        (this.mutation!);
    assertType<Vars>                                (this.variables!);
    assertType<boolean>                             (this.called);
    assertType<boolean>                             (this.ignoreResults!);
    assertType<boolean>                             (this.awaitRefetchQueries!);
    assertType<ErrorPolicy>                         (this.errorPolicy!);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<string>                              (this.fetchPolicy!);
    assertType<Extract<FetchPolicy, 'no-cache'>>    (this.fetchPolicy);

    if (typeof this.refetchQueries === 'function')
      assertType<(result: FetchResult<Data>) => C.RefetchQueriesType>(this.refetchQueries);
    else
      assertType<C.RefetchQueriesType>(this.refetchQueries!);

    if (typeof this.optimisticResponse !== 'function')
      assertType<Data>(this.optimisticResponse!);
    else
      assertType<(vars: Vars) => Data>(this.optimisticResponse);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

export class PolymerQueryTypeCheck extends Polymer.PolymerApolloMutation<TDN> {
  typeCheck() {
    assertType<Data>(this.data!);
    assertType<Vars>(this.variables!);
  }
}

export class PolymerMutationManuallyTypedTypeCheck extends Polymer.PolymerApolloSubscription<Data, Vars> {
  typeCheck(): void {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */
    assertType<HTMLElement>                         (this);

    // ApolloElementInterface
    assertType<ApolloClient (this.client);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly C.GraphQLError[]>           (this.errors!);
    assertType<Data>                                (this.data!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly C.GraphQLError[]>         (this.error.graphQLErrors);

    // ApolloSubscriptionInterface
    assertType<DocumentNode>                        (this.subscription!);
    assertType<Vars>                                (this.variables!);
    assertType<FetchPolicy>                         (this.fetchPolicy!);
    assertType<string>                              (this.fetchPolicy);
    assertType<boolean>                             (this.notifyOnNetworkStatusChange!);
    assertType<number>                              (this.pollInterval!);
    assertType<boolean>                             (this.skip);
    assertType<boolean>                             (this.noAutoSubscribe);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

export class PolymerSubscriptionTypeCheck extends Polymer.PolymerApolloSubscription<TDN> {
  typeCheck(): void {
    assertType<Data>(this.data!);
    assertType<Vars>(this.variables!);
  }
}

export class PolymerQueryManuallyTypedCheck extends Polymer.PolymerApolloQuery<Data, Vars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    // ApolloElementInterface
    assertType<ApolloClient (this.client);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly C.GraphQLError[]>           (this.errors!);
    assertType<Data>                                (this.data!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly C.GraphQLError[]>         (this.error.graphQLErrors);

    // ApolloQueryInterface
    assertType<DocumentNode>                        (this.query!);
    assertType<Vars>                                (this.variables!);
    assertType<ErrorPolicy>                         (this.errorPolicy!);
    assertType<string>                              (this.errorPolicy!);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<WatchQueryFetchPolicy>               (this.fetchPolicy!);
    assertType<string>                              (this.fetchPolicy);
    if (typeof this.nextFetchPolicy !== 'function')
      assertType<WatchQueryFetchPolicy>             (this.nextFetchPolicy!);
    assertType<NetworkStatus>                       (this.networkStatus);
    assertType<number>                              (this.networkStatus);
    // @ts-expect-error: NetworkStatus is not a string
    assertType<string>                              (this.networkStatus);
    assertType<boolean>                             (this.notifyOnNetworkStatusChange!);
    assertType<number>                              (this.pollInterval!);
    assertType<boolean>                             (this.partial!);
    assertType<boolean>                             (this.partialRefetch!);
    assertType<boolean>                             (this.returnPartialData!);
    assertType<boolean>                             (this.noAutoSubscribe);
    assertType<Partial<WatchQueryOptions<Vars, Data>>>(this.options!);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

export class PolymerQueryCheck extends Polymer.PolymerApolloQuery<TDN> {
  typeCheck() {
    assertType<Data>(this.data!);
    assertType<Vars>(this.variables!);
  }
}
