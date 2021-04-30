import type { GraphQLError } from '@apollo-elements/interfaces';

import type { ApolloClient, DocumentNode, NormalizedCacheObject } from '@apollo/client/core';

import { html, unsafeStatic } from 'lit/static-html.js';

import { expect } from '@open-wc/testing';

import { defineCE, fixture } from '@open-wc/testing';

import { ApolloElementMixin } from './apollo-element-mixin';
import { client, assertType, isApolloError } from '@apollo-elements/test';

import NoParamQuery from '@apollo-elements/test/graphql/NoParam.query.graphql';

class XL extends HTMLElement {}
class Test extends ApolloElementMixin(XL) {
  declare data: unknown | null;

  declare variables: unknown | null;
}

describe('[mixins] ApolloElementMixin', function describeApolloElementMixin() {
  it('returns an instance of the superclass', async function returnsClass() {
    const tag = unsafeStatic(defineCE(class extends Test {}));
    const element = await fixture<Test>(html`<${tag}></${tag}>`);
    expect(element).to.be.an.instanceOf(XL);
  });

  describe('when super has a connectedCallback', function() {
    let calls = 0;
    let element: Test;
    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(ApolloElementMixin(class extends HTMLElement {
        data: any;

        variables: any;

        connectedCallback(): void {
          calls++;
        }
      })));

      element = await fixture<Test>(html`<${tag}></${tag}>`);
    });

    it('calls super.connectedCallback', async function() {
      expect(element).to.be.an.instanceOf(HTMLElement);
      expect(calls).to.be.greaterThan(0);
    });
  });

  describe('when super has no connectedCallback', function() {
    let element: Test;
    beforeEach(function() {
      const tag = defineCE(ApolloElementMixin(class extends HTMLElement { }));
      element = document.createElement(tag) as Test;
    });

    it('does not throw when connected', function() {
      expect(() => document.body.appendChild(element)).to.not.throw;
      expect(() => element.remove()).to.not.throw;
    });
  });

  describe('when super has a disconnectedCallback', function() {
    let calls = 0;
    let element: Test;
    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(ApolloElementMixin(class extends HTMLElement {
        disconnectedCallback(): void {
          calls++;
        }
      })));

      element = await fixture<Test>(html`<${tag}></${tag}>`);

      element.remove();
    });

    it('calls super.disconnectedCallback', async function() {
      expect(element).to.be.an.instanceOf(HTMLElement);
      expect(calls).to.be.greaterThan(0);
    });
  });

  describe('when super has no disconnectedCallback', function() {
    let element: Test;
    beforeEach(function() {
      const tag = defineCE(ApolloElementMixin(class extends HTMLElement { }));
      element = document.createElement(tag) as Test;
    });

    it('does not throw when disconnected', function() {
      expect(() => element.remove()).to.not.throw;
    });
  });

  describe('when super has an attributeChangedCallback that includes "error-policy"', function() {
    class Test extends ApolloElementMixin(class extends HTMLElement {
      declare data: unknown | null;

      declare variables: unknown | null;

      static readonly observedAttributes: string[] = ['savlanut', 'error-policy'];

      errorPolicy = '';

      savlanut = '';

      attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        if (name === 'error-policy')
          this.errorPolicy = `_${newVal}`;
        this[name as keyof this] = newVal as unknown as this[keyof this];
      }
    }) {}

    let element: Test;

    beforeEach(function() {
      const tag = defineCE(class extends Test {});
      element = document.createElement(tag) as Test;
    });

    describe('when setting an attribute observed by the subclass', function() {
      beforeEach(function() {
        element.setAttribute('savlanut', 'savlanut');
      });

      it('applies subclass behaviour', function() {
        expect(element.savlanut).to.equal('savlanut');
      });
    });

    describe('when setting the error-policy attribute', function() {
      beforeEach(function() {
        element.setAttribute('error-policy', 'all');
      });

      it('applies superclass behaviour', function() {
        expect(element.errorPolicy).to.equal('_all');
      });
    });

    describe('when setting the fetch-policy attribute', function() {
      beforeEach(function() {
        element.setAttribute('fetch-policy', 'no-cache');
      });

      it('applies mixin behaviour', function() {
        expect(element.fetchPolicy).to.equal('no-cache');
      });
    });
  });

  describe('when super has no attributeChangedCallback', function() {
    let element: Test;

    beforeEach(function() {
      const tag = defineCE(ApolloElementMixin(class extends HTMLElement {}));
      element = document.createElement(tag) as Test;
    });

    describe('when setting the error-policy attribute', function() {
      beforeEach(function() {
        element.setAttribute('error-policy', 'all');
      });

      it('applies mixin behaviour', function() {
        expect(element.errorPolicy).to.equal('all');
      });
    });

    describe('when setting the fetch-policy attribute', function() {
      beforeEach(function() {
        element.setAttribute('fetch-policy', 'no-cache');
      });

      it('applies mixin behaviour', function() {
        expect(element.fetchPolicy).to.equal('no-cache');
      });
    });
  });

  it('sets default properties', async function setsDefaultProperties() {
    window.__APOLLO_CLIENT__ = client;

    const tag = unsafeStatic(defineCE(class extends Test {}));

    const element = await fixture<Test>(html`<${tag}></${tag}>`);

    expect(element.client, 'client').to.equal(client);
    expect(element.context, 'context').to.be.undefined;
    expect(element.document, 'document').to.be.null;
    expect(element.variables, 'variables').to.be.null;
    expect(element.data, 'data').to.be.null;
    expect(element.error, 'error').to.be.null;
    expect(element.errors, 'errors').to.be.null;
    expect(element.loading, 'loading').to.be.false;
  });

  describe('with document property set', function() {
    let element: Test;

    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test { }));

      element = await fixture<Test>(html`
        <${tag} .document="${NoParamQuery}"></${tag}>
      `);
    });

    it('sets the document property', function() {
      expect(element.document).to.deep.equal(NoParamQuery);
    });
  });
});

class TypeCheck extends Test {
  typeCheck(): void {
    /* eslint-disable func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);

    // ApolloElementInterface
    assertType<ApolloClient<NormalizedCacheObject>> (this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly GraphQLError[]>             (this.errors!);
    assertType<string>                              (this.error.message);
    if (isApolloError(this.error))
      assertType<readonly GraphQLError[]>           (this.error.graphQLErrors);

    /* eslint-enable func-call-spacing, no-multi-spaces */
  }
}
