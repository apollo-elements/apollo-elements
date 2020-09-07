import type {
  ApolloClient,
  FetchPolicy,
  FetchResult,
  Observable,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type { DocumentNode, GraphQLError } from 'graphql';

import { defineCE, unsafeStatic, fixture, expect, html } from '@open-wc/testing';

import { ApolloSubscription } from './apollo-subscription';
import { LitElement, TemplateResult } from 'lit-element';
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
    // Check for LitElement interface
    this.requestUpdate('thing', v);
    // Check for HTMLElement interface
    this.dispatchEvent(new CustomEvent('thing', { detail: { thing: v } }));
  }

  render(): TemplateResult {
    return html`
      ${this.thing}
      ${this.error}
      ${this.errors?.map(x => x.source)}
    `;
  }
}

describe('[lit-apollo] ApolloSubscription', function describeApolloSubscription() {
  it('is an instance of LitElement', async function() {
    const tag = unsafeStatic(defineCE(class extends Test {}));
    const el = await fixture(html`<${tag}></${tag}>`);
    expect(el).to.be.an.instanceOf(LitElement);
  });

  it('defines default properties', async function definesObserveProperties() {
    const tag = unsafeStatic(defineCE(class extends Test {}));
    const el = await fixture<Test>(html`<${tag}></${tag}>`);
    expect(el.data, 'data').to.be.null;
    expect(el.error, 'error').to.be.null;
    expect(el.errors, 'error').to.be.null;
    expect(el.loading, 'loading').to.be.false;
    expect(el.subscription, 'subscription').to.be.null;
    expect(el.client, 'client').to.equal(window.__APOLLO_CLIENT__);
  });
});
