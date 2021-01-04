import type {
  ApolloClient,
  DocumentNode,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';

import type { GraphQLError } from '@apollo-elements/interfaces';

import { expect, fixture, unsafeStatic, html as fhtml } from '@open-wc/testing';

import { ApolloElement } from './apollo-element';
import { customElement, DOM, FASTElement, html } from '@microsoft/fast-element';
import { assertType, isApolloError } from '@apollo-elements/test-helpers';

describe('[fast] ApolloElement', function describeApolloElement() {
  it('is an instance of FASTElement', async function() {
    type Data = { hi: 'bye' }; // that was fast :wink:
    const name = 'is-an-instance-of-f-a-s-t-element';
    @customElement({ name })
    class Test extends ApolloElement<Data> {
      declare shadowRoot: ShadowRoot;

      dataChanged(oldVal: Data, newVal: Data): void {
        oldVal; newVal;
      }
    }

    const tag = unsafeStatic(name);
    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    expect(element).to.be.an.instanceOf(FASTElement);
  });

  it('renders when client is set', async function rendersOnClient() {
    const name = 'renders-when-client-is-set';
    // @ts-expect-error: just testing assignment and rendering
    const template = html<Test>`${x => x.client?.test ?? 'FAIL'}`;
    @customElement({ name, template }) class Test extends ApolloElement {
      declare shadowRoot: ShadowRoot;
    }
    const tag = unsafeStatic(name);
    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    // @ts-expect-error: just testing assignment and rendering
    element.client = { test: 'CLIENT' };
    await DOM.nextUpdate();
    expect(element.shadowRoot.textContent).to.equal('CLIENT');
  });

  it('renders when data is set', async function rendersOnData() {
    const name = 'renders-when-data-is-set';
    const template = html<Test>`${x => x.data?.foo ?? 'FAIL'}`;
    @customElement({ name, template }) class Test extends ApolloElement<{ foo: string }> { }
    const tag = unsafeStatic(name);
    const element = await fixture<Test>(fhtml`<${tag} .data="${{ foo: 'bar' }}"></${tag}>`);
    expect(element).shadowDom.to.equal('bar');
  });

  it('renders when error is set', async function rendersOnError() {
    const name = 'renders-when-error-is-set';
    const template = html<Test>`${x => x.error ?? 'FAIL'}`;
    @customElement({ name, template }) class Test extends ApolloElement { }
    const tag = unsafeStatic(name);
    const element = await fixture<Test>(fhtml`<${tag} .error="${'error'}"></${tag}>`);
    expect(element).shadowDom.to.equal('error');
  });

  it('renders when loading is set', async function rendersOnLoading() {
    const name = 'renders-when-loading-is-set';
    const template = html`${x => x.loading ?? false ? 'LOADING' : 'FAIL'}`;
    @customElement({ name, template }) class Test extends ApolloElement { }
    const tag = unsafeStatic(name);
    const element = await fixture<Test>(fhtml`<${tag} .loading="${true}"></${tag}>`);
    expect(element).shadowDom.to.equal('LOADING');
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { c: 'c', d: number };
class TypeCheck extends ApolloElement<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);
    assertType<FASTElement>                         (this);

    // ApolloElementInterface
    assertType<ApolloClient<NormalizedCacheObject>> (this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly GraphQLError[]>             (this.errors!);
    assertType<TypeCheckData>                       (this.data!);
    assertType<TypeCheckVars>                       (this.variables!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly GraphQLError[]>           (this.error.graphQLErrors);

    /* eslint-enable func-call-spacing, no-multi-spaces */
  }
}

type TDN = TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends ApolloElement<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
