import type {
  ApolloClient,
  FetchPolicy,
  FetchResult,
  Observable,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type { DocumentNode, GraphQLError } from 'graphql';

import { unsafeStatic, fixture, expect, html as fhtml } from '@open-wc/testing';

import { ApolloSubscription } from './apollo-subscription';
import { FASTElement, customElement } from '@microsoft/fast-element';
import { assertType, isApolloError } from '@apollo-elements/test-helpers';

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloSubscription<TypeCheckData, TypeCheckVars> {
  render() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);

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

class Test extends ApolloSubscription<unknown, unknown> {
  set thing(v: unknown) {
    // Check for FASTElement interface
    this.$emit('thing', v);
    // Check for HTMLElement interface
    this.dispatchEvent(new CustomEvent('thing', { detail: { thing: v } }));
  }
}

describe('[fast] ApolloSubscription', function describeApolloSubscription() {
  it('is an instance of FASTElement', async function() {
    const name = 'is-an-instance-of-f-a-s-t-element';
    @customElement({ name }) class Klass extends Test {}
    const tag = unsafeStatic(name);
    const el = await fixture<Klass>(fhtml`<${tag}></${tag}>`);
    expect(el).to.be.an.instanceOf(FASTElement);
  });

  it('defines default properties', async function definesObserveProperties() {
    const name = 'defines-default-properties';
    const tag = unsafeStatic(name);
    @customElement({ name }) class Klass extends Test {}
    const el = await fixture<Klass>(fhtml`<${tag}></${tag}>`);
    expect(el.data, 'data').to.be.null;
    expect(el.error, 'error').to.be.null;
    expect(el.errors, 'error').to.be.null;
    expect(el.loading, 'loading').to.be.false;
    expect(el.subscription, 'subscription').to.be.null;
    expect(el.client, 'client').to.equal(window.__APOLLO_CLIENT__);
  });
});
