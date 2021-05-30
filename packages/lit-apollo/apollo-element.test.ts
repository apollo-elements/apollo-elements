import type * as I from '@apollo-elements/interfaces';
import type * as C from '@apollo/client/core';

import { expect, defineCE, fixture } from '@open-wc/testing';

import { html as h, unsafeStatic } from 'lit/static-html.js';

import { ApolloElement } from './apollo-element';

import { html, LitElement, TemplateResult } from 'lit';

import {
  assertType,
  isApolloError,
  setupClient,
  teardownClient,
} from '@apollo-elements/test';

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
      const mock = {} as C.ApolloClient<C.NormalizedCacheObject>;
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

    const tag = defineCE(Test);
    const element = await fixture<Test>(`<${tag}></${tag}>`);
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
    const element = await fixture<Test>(h`<${tag}></${tag}>`);
    // @ts-expect-error: just testing assignment and rendering
    element.client = { test: 'CLIENT' };
    await element.updateComplete;
    expect(element).shadowDom.to.equal('CLIENT');
  });

  it('renders when error is set', async function rendersOnError() {
    class Test extends ApolloElement {
      render(): TemplateResult { return html`${this.error ?? 'FAIL'}`; }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(h`<${tag} .error="${'error'}"></${tag}>`);
    expect(element).shadowDom.to.equal('error');
  });

  it('renders when loading is set', async function rendersOnLoading() {
    class Test extends ApolloElement {
      render(): TemplateResult { return html`${this.loading ?? false ? 'LOADING' : 'FAIL'}`; }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(h`<${tag} .loading="${true}"></${tag}>`);
    expect(element).shadowDom.to.equal('LOADING');
  });
});

class TypeCheck extends ApolloElement {
  typeCheck() {
    /* eslint-disable func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);
    assertType<LitElement>                          (this);

    // ApolloElementInterface
    assertType<C.ApolloClient<C.NormalizedCacheObject>>(this.client!);
    assertType<boolean>                             (this.loading);
    assertType<C.DocumentNode>                      (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly I.GraphQLError[]>           (this.errors!);
    assertType<string>                              (this.error.message);
    if (isApolloError(this.error))
      assertType<readonly I.GraphQLError[]>         (this.error.graphQLErrors);

    /* eslint-enable func-call-spacing, no-multi-spaces */
  }
}
