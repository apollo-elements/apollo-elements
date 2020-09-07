import type { ApolloClient, ErrorPolicy, FetchPolicy, FetchResult, NormalizedCacheObject } from '@apollo/client/core';
import type { DocumentNode } from 'graphql';
import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import { fixture, html, expect, oneEvent } from '@open-wc/testing';

import gql from 'graphql-tag';

import { stub } from 'sinon';

import { assertType, client, isApolloError } from '@apollo-elements/test-helpers';

import { GraphQLError } from 'graphql';

import './apollo-mutation';

import { PolymerApolloMutation } from './apollo-mutation';

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends PolymerApolloMutation<TypeCheckData, TypeCheckVars> {
  render() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    // ApolloElementInterface
    assertType<ApolloClient<NormalizedCacheObject>> (this.client);
    assertType<Record<string, unknown>>             (this.context);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document);
    assertType<Error>                               (this.error);
    assertType<readonly GraphQLError[]>             (this.errors);
    assertType<TypeCheckData>                       (this.data);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly GraphQLError[]>           (this.error.graphQLErrors);

    // ApolloMutationInterface
    assertType<DocumentNode>                        (this.mutation);
    assertType<TypeCheckVars>                       (this.variables);
    assertType<boolean>                             (this.called);
    assertType<boolean>                             (this.ignoreResults);
    assertType<boolean>                             (this.awaitRefetchQueries);
    assertType<number>                              (this.mostRecentMutationId);
    assertType<ErrorPolicy>                         (this.errorPolicy);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<string>                              (this.fetchPolicy);
    assertType<Extract<FetchPolicy, 'no-cache'>>    (this.fetchPolicy);

    if (typeof this.refetchQueries === 'function')
      assertType<(result: FetchResult<TypeCheckData>) => RefetchQueryDescription>(this.refetchQueries);
    else
      assertType<RefetchQueryDescription>(this.refetchQueries);

    if (typeof this.optimisticResponse !== 'function')
      assertType<TypeCheckData>(this.optimisticResponse);
    else
      assertType<(vars: TypeCheckVars) => TypeCheckData>(this.optimisticResponse);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

describe('[polymer] <apollo-mutation>', function() {
  it('caches observed properties', async function() {
    const err = new Error('error');
    const el = await fixture<PolymerApolloMutation<unknown, unknown>>(html`
      <apollo-mutation></apollo-mutation>
    `);

    el.called = true;
    expect(el.called, 'called').to.equal(true);

    el.data = 'data';
    expect(el.data, 'data').to.equal('data');

    el.error = err;
    expect(el.error, 'error').to.equal(err);

    el.loading = true;
    expect(el.loading, 'loading').to.equal(true);
  });

  it('notifies on data change', async function() {
    const mutationStub = stub(client, 'mutate');

    mutationStub.resolves({ data: { messages: ['hi'] } });

    const mutation = gql`mutation { messages }`;

    const el = await fixture<PolymerApolloMutation<{ messages: string[] }, unknown>>(html`
      <apollo-mutation
          .client="${client}"
          .mutation="${mutation}"
      ></apollo-mutation>
    `);

    el.mutate();

    const { detail: { value } } = await oneEvent(el, 'data-changed');

    expect(value).to.deep.equal({ messages: ['hi'] });
    mutationStub.restore();
  });

  it('notifies on error change', async function() {
    const el = await fixture<PolymerApolloMutation<unknown, unknown>>(html`
      <apollo-mutation
          .client="${client}"
      ></apollo-mutation>
    `);

    const err = new Error('error');
    setTimeout(() => el.error = err);
    const { detail: { value } } = await oneEvent(el, 'error-changed');
    expect(value).to.equal(err);
  });

  it('notifies on errors change', async function() {
    const el = await fixture<PolymerApolloMutation<unknown, unknown>>(html`
      <apollo-mutation
          .client="${client}"
      ></apollo-mutation>
    `);

    const errs = [new GraphQLError('error')];
    setTimeout(() => el.errors = errs);
    const { detail: { value } } = await oneEvent(el, 'errors-changed');
    expect(value).to.equal(errs);
  });

  it('notifies on loading change', async function() {
    const el = await fixture<PolymerApolloMutation<unknown, unknown>>(html`
      <apollo-mutation
          .client="${client}"
      ></apollo-mutation>
    `);

    setTimeout(() => el.loading = true);
    const { detail: { value } } = await oneEvent(el, 'loading-changed');
    expect(value).to.be.true;
  });

  it('notifies on called change', async function() {
    const el = await fixture<PolymerApolloMutation<unknown, unknown>>(html`
      <apollo-mutation
          .client="${client}"
      ></apollo-mutation>
    `);

    setTimeout(() => el.called = true);
    const { detail: { value } } = await oneEvent(el, 'called-changed');
    expect(value).to.be.true;
  });
});
