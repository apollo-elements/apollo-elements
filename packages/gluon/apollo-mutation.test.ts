import type {
  ApolloClient,
  ApolloError,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';

import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import type { GraphQLError } from '@apollo-elements/interfaces';

import type { MutationElement } from '@apollo-elements/test-helpers/mutation.test';

import { ApolloMutation } from './apollo-mutation';

import { assertType, isApolloError } from '@apollo-elements/test-helpers';
import { describeMutation, setupMutationClass } from '@apollo-elements/test-helpers/mutation.test';
import { html } from 'lit-html';
import { nextFrame } from '@open-wc/testing';
import { GluonElement } from '@gluon/gluon';

class TestableApolloMutation<D, V> extends ApolloMutation<D, V> implements MutationElement<D, V> {
  declare shadowRoot: ShadowRoot;

  get template() {
    return html`
      <output id="called">${this.stringify(this.called)}</output>
      <output id="data">${this.stringify(this.data)}</output>
      <output id="error">${this.stringify(this.error)}</output>
      <output id="errors">${this.stringify(this.errors)}</output>
      <output id="loading">${this.stringify(this.loading)}</output>
    `;
  }

  stringify(x: unknown) {
    return JSON.stringify(x, null, 2);
  }

  async hasRendered(): Promise<this> {
    await this.render();
    await nextFrame();
    return this;
  }
}

describe('[gluon] ApolloMutation', function() {
  describeMutation({
    class: TestableApolloMutation,
    setupFunction: setupMutationClass(TestableApolloMutation),
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloMutation<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                                   (this);
    assertType<GluonElement>                                  (this);

    // ApolloElementInterface
    assertType<ApolloClient<NormalizedCacheObject>|null>      (this.client);
    assertType<Record<string, unknown>|undefined>             (this.context);
    assertType<boolean>                                       (this.loading);
    assertType<DocumentNode|null>                             (this.document);
    assertType<Error|ApolloError|null>                        (this.error);
    assertType<readonly GraphQLError[]|null>                  (this.errors);
    assertType<TypeCheckData|null>                            (this.data);
    assertType<string>                                        (this.error!.message);
    assertType<'a'>                                           (this.data!.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                           (this.data.b);
    if (isApolloError(this.error!))
      assertType<readonly GraphQLError[]>                     (this.error.graphQLErrors);

    // ApolloMutationInterface
    assertType<DocumentNode|null>                             (this.mutation);
    assertType<TypeCheckVars|null>                            (this.variables);
    assertType<boolean>                                       (this.called);
    assertType<boolean>                                       (this.ignoreResults);
    assertType<boolean|undefined>                             (this.awaitRefetchQueries);
    assertType<number>                                        (this.mostRecentMutationId);
    assertType<ErrorPolicy|undefined>                         (this.errorPolicy);
    assertType<string|undefined>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                                        (this.errorPolicy);
    assertType<string|undefined>                              (this.fetchPolicy);
    assertType<Extract<FetchPolicy, 'no-cache'>|undefined>    (this.fetchPolicy);

    if (typeof this.refetchQueries === 'function')
      assertType<(result: FetchResult<TypeCheckData>) => RefetchQueryDescription>(this.refetchQueries);
    else
      assertType<RefetchQueryDescription|null|undefined>(this.refetchQueries);

    if (typeof this.optimisticResponse !== 'function')
      assertType<TypeCheckData|undefined>(this.optimisticResponse);
    else
      assertType<(vars: TypeCheckVars) => TypeCheckData>(this.optimisticResponse);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TypeCheckTDN extends ApolloMutation<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
