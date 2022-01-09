import type * as C from '@apollo/client/core';
import type * as I from '@apollo-elements/core/types';

import { ApolloMutation } from './apollo-mutation';

import { assertType, isApolloError, stringify, TestableElement } from '@apollo-elements/test';
import { describeMutation, setupMutationClass } from '@apollo-elements/test/mutation.test';
import { html } from 'lit-html';
import { nextFrame } from '@open-wc/testing';
import { GluonElement } from '@gluon/gluon';

class TestableApolloMutation<D, V = I.VariablesOf<D>>
  extends ApolloMutation<D, V>
  implements TestableElement {
  declare shadowRoot: ShadowRoot;

  get template() {
    return html`
      <output id="called">${stringify(this.called)}</output>
      <output id="data">${stringify(this.data)}</output>
      <output id="error">${stringify(this.error)}</output>
      <output id="errors">${stringify(this.errors)}</output>
      <output id="loading">${stringify(this.loading)}</output>
    `;
  }

  async hasRendered(): Promise<this> {
    await this.render();
    await nextFrame();
    return this;
  }

  $(id: keyof this) { return this.shadowRoot.getElementById(id as string); }
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
    assertType<C.ApolloClient<C.NormalizedCacheObject>|null>  (this.client);
    assertType<Record<string, unknown>>                       (this.context!);
    assertType<boolean>                                       (this.loading);
    assertType<C.DocumentNode|null>                           (this.document);
    assertType<Error|C.ApolloError|null>                      (this.error);
    assertType<readonly I.GraphQLError[]|null>                (this.errors);
    assertType<TypeCheckData|null>                            (this.data);
    assertType<string>                                        (this.error!.message);
    assertType<'a'>                                           (this.data!.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                           (this.data.b);
    if (isApolloError(this.error!))
      assertType<readonly I.GraphQLError[]>                   (this.error.graphQLErrors);

    // ApolloMutationInterface
    assertType<C.DocumentNode|null>                           (this.mutation);
    assertType<TypeCheckVars|null>                            (this.variables);
    assertType<boolean>                                       (this.called);
    assertType<boolean>                                       (this.ignoreResults!);
    assertType<boolean>                                       (this.awaitRefetchQueries!);
    assertType<C.ErrorPolicy>                                 (this.errorPolicy!);
    assertType<string>                                        (this.errorPolicy!);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                                        (this.errorPolicy);
    assertType<string>                                        (this.fetchPolicy!);
    assertType<Extract<C.FetchPolicy, 'no-cache'>>            (this.fetchPolicy);

    if (typeof this.refetchQueries === 'function')
      assertType<(result: C.FetchResult<TypeCheckData>) => I.RefetchQueriesType>(this.refetchQueries);
    else
      assertType<I.RefetchQueriesType<TypeCheckData>|null>    (this.refetchQueries);

    if (typeof this.optimisticResponse !== 'function')
      assertType<TypeCheckData>                               (this.optimisticResponse!);
    else
      assertType<(vars: TypeCheckVars) => TypeCheckData>      (this.optimisticResponse);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = C.TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TypeCheckTDN extends ApolloMutation<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
