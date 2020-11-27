import type { DocumentNode, GraphQLError } from 'graphql';
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';

import { expect, defineCE, fixture, unsafeStatic, html as fhtml } from '@open-wc/testing';

import { ApolloElement } from './apollo-element';

import { TemplateResult, html, LitElement } from 'lit-element';

import {
  assertType,
  isApolloError,
  setupClient,
  teardownClient,
} from '@apollo-elements/test-helpers';

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { var: string };
class TypeCheck extends ApolloElement<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);
    assertType<LitElement>                          (this);

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

describe('[lit-apollo] ApolloElement', function describeApolloElement() {
  describe('with a global client', function() {
    let element: ApolloElement;
    beforeEach(setupClient);
    afterEach(teardownClient);
    beforeEach(async function() {
      const tag = defineCE(class Test extends ApolloElement { });
      element = await fixture(`<${tag}></${tag}>`);
    });

    afterEach(function() {
      element.remove();
      // @ts-expect-error: fixture
      element = undefined;
    });

    it('uses global client', function() {
      expect(element.client).to.equal(window.__APOLLO_CLIENT__);
    });
  });

  describe('with no global client', function() {
    let element: ApolloElement;
    beforeEach(async function() {
      const tag = defineCE(class Test extends ApolloElement { });
      element = await fixture(`<${tag}></${tag}>`);
    });

    afterEach(function() {
      element.remove();
      // @ts-expect-error: fixture
      element = undefined;
    });

    it('uses global client', function() {
      expect(element.client).to.be.null;
    });

    describe('setting client', function() {
      const mock = {} as ApolloClient<NormalizedCacheObject>;
      beforeEach(function() {
        element.client = mock;
      });

      it('sets client', function() {
        expect(element.client).to.equal(mock);
      });

      describe('then unsetting client', function() {
        beforeEach(function() {
          element.client = null;
        });

        it('sets client', function() {
          expect(element.client).to.be.null;
        });
      });
    });
  });

  it('is an instance of LitElement', async function() {
    class Test extends ApolloElement {
      set thing(v: unknown) {
        this.requestUpdate('thing', v);
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    expect(element).to.be.an.instanceOf(LitElement);
  });

  it('renders when client is set', async function rendersOnClient() {
    class Test extends ApolloElement {
      declare shadowRoot: ShadowRoot;

      render(): TemplateResult {
        // @ts-expect-error: just testing assignment and rendering
        return html`${this.client?.test ?? 'FAIL'}`;
      }
    }
    const tag = unsafeStatic(defineCE(Test));
    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    // @ts-expect-error: just testing assignment and rendering
    element.client = { test: 'CLIENT' };
    await element.updateComplete;
    expect(element.shadowRoot.textContent).to.equal('CLIENT');
  });

  it('renders when data is set', async function rendersOnData() {
    class Test extends ApolloElement<{ foo: string }> {
      render(): TemplateResult {
        return html`${this.data?.foo ?? 'FAIL'}`;
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fhtml`<${tag} .data="${{ foo: 'bar' }}"></${tag}>`);
    expect(element).shadowDom.to.equal('bar');
  });

  it('renders when error is set', async function rendersOnError() {
    class Test extends ApolloElement {
      render(): TemplateResult { return html`${this.error ?? 'FAIL'}`; }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fhtml`<${tag} .error="${'error'}"></${tag}>`);
    expect(element).shadowDom.to.equal('error');
  });

  it('renders when loading is set', async function rendersOnLoading() {
    class Test extends ApolloElement {
      render(): TemplateResult { return html`${this.loading ?? false ? 'LOADING' : 'FAIL'}`; }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fhtml`<${tag} .loading="${true}"></${tag}>`);
    expect(element).shadowDom.to.equal('LOADING');
  });
});
