import type {
  ApolloClient,
  FetchPolicy,
  FetchResult,
  Observable,
  NormalizedCacheObject,
} from '@apollo/client/core';

import { fixture, html, expect, oneEvent } from '@open-wc/testing';

import './apollo-subscription';
import { client } from '../test-helpers/client';

import { PolymerApolloSubscription } from './apollo-subscription';
import { DocumentNode, GraphQLError } from 'graphql';
import { assertType, isApolloError } from '@apollo-elements/test-helpers';

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends PolymerApolloSubscription<TypeCheckData, TypeCheckVars> {
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

    // ApolloSubscriptionInterface
    assertType<DocumentNode>                          (this.subscription);
    assertType<TypeCheckVars>                         (this.variables);
    assertType<FetchPolicy>                           (this.fetchPolicy);
    assertType<string>                                (this.fetchPolicy);
    assertType<boolean>                               (this.notifyOnNetworkStatusChange);
    assertType<number>                                (this.pollInterval);
    assertType<boolean>                               (this.skip);
    assertType<boolean>                               (this.noAutoSubscribe);
    assertType<Observable<FetchResult<TypeCheckData>>>(this.observable);
    assertType<ZenObservable.Subscription>            (this.observableSubscription);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

describe('[polymer] <apollo-subscription>', function() {
  it('caches observed properties', async function() {
    const el = await fixture<PolymerApolloSubscription<unknown, unknown>>(html`
      <apollo-subscription
      ></apollo-subscription>
    `);

    const err = new Error('error');

    el.data = 'data';
    expect(el.data, 'data').to.equal('data');

    el.error = err;
    expect(el.error, 'error').to.equal(err);

    el.loading = true;
    expect(el.loading, 'loading').to.equal(true);
  });

  it('notifies on data change', async function() {
    const el = await fixture<PolymerApolloSubscription<unknown, unknown>>(html`
      <apollo-subscription
          .client="${client}"
      ></apollo-subscription>
    `);

    const data = { messages: ['hi'] };
    setTimeout(() => el.data = data);
    const { detail: { value } } = await oneEvent(el, 'data-changed');
    expect(value).to.deep.equal(data);
  });

  it('notifies on error change', async function() {
    const el = await fixture<PolymerApolloSubscription<unknown, unknown>>(html`
      <apollo-subscription
          .client="${client}"
      ></apollo-subscription>
    `);

    const err = new Error('error');
    setTimeout(() => el.error = err);
    const { detail: { value } } = await oneEvent(el, 'error-changed');
    expect(value).to.equal(err);
  });

  it('notifies on errors change', async function() {
    const el = await fixture<PolymerApolloSubscription<unknown, unknown>>(html`
      <apollo-subscription
          .client="${client}"
      ></apollo-subscription>
    `);

    const errs = [new GraphQLError('error')];
    setTimeout(() => el.errors = errs);
    const { detail: { value } } = await oneEvent(el, 'errors-changed');
    expect(value).to.equal(errs);
  });

  it('notifies on loading change', async function() {
    const el = await fixture<PolymerApolloSubscription<unknown, unknown>>(html`
      <apollo-subscription
          .client="${client}"
      ></apollo-subscription>
    `);

    setTimeout(() => el.loading = true);
    const { detail: { value } } = await oneEvent(el, 'loading-changed');
    expect(value).to.be.true;
  });
});
