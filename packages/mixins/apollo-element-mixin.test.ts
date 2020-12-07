import type { GraphQLError } from 'graphql';

import type {
  ApolloClient,
  DocumentNode,
  NormalizedCacheObject,
  OperationVariables,
  TypedDocumentNode,
} from '@apollo/client/core';

import { gql } from '@apollo/client/core';

import { expect, html as fhtml } from '@open-wc/testing';
import { defineCE, fixture, nextFrame, unsafeStatic } from '@open-wc/testing-helpers';
import 'sinon-chai';

import { ApolloElementMixin } from './apollo-element-mixin';
import { client, assertType, isApolloError } from '@apollo-elements/test-helpers';
import NoParamQuery from '@apollo-elements/test-helpers/graphql/NoParam.query.graphql';

class XL extends HTMLElement {}
class Test<D = unknown, V = OperationVariables> extends ApolloElementMixin(XL)<D, V> { }

describe('[mixins] ApolloElementMixin', function describeApolloElementMixin() {
  it('returns an instance of the superclass', async function returnsClass() {
    const tag = unsafeStatic(defineCE(class extends Test {}));
    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    expect(element).to.be.an.instanceOf(XL);
  });

  describe('when super has a connectedCallback', function() {
    let calls = 0;
    let element: Test;
    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test {
        connectedCallback(): void {
          calls++;
        }
      }));

      element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    });

    it('calls super.connectedCallback', async function() {
      expect(element).to.be.an.instanceOf(HTMLElement);
      expect(calls).to.be.greaterThan(0);
    });
  });

  describe('when super has a connectedCallback', function() {
    let calls = 0;
    let element: Test;
    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test {
        disconnectedCallback(): void {
          calls++;
        }
      }));

      element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      element.remove();
    });

    it('calls super.disconnectedCallback', async function() {
      expect(element).to.be.an.instanceOf(HTMLElement);
      expect(calls).to.be.greaterThan(0);
    });
  });

  describe('when super has no connectedCallback', function() {
    let element: Test;
    beforeEach(function() {
      const tag = defineCE(class extends Test { });
      element = document.createElement(tag) as Test;
    });

    it('does not throw when connected', function() {
      expect(() => document.body.appendChild(element)).to.not.throw;
      expect(() => element.remove()).to.not.throw;
    });
  });

  describe('when super has no disconnectedCallback', function() {
    let element: Test;
    beforeEach(function() {
      const tag = defineCE(class extends Test { });
      element = document.createElement(tag) as Test;
    });

    it('does not throw when disconnected', function() {
      expect(() => element.remove()).to.not.throw;
    });
  });

  it('sets default properties', async function setsDefaultProperties() {
    window.__APOLLO_CLIENT__ = client;

    const tag = unsafeStatic(defineCE(class extends Test {}));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

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

      element = await fixture<Test>(fhtml`
        <${tag} .document="${NoParamQuery}"></${tag}>
      `);
    });

    it('sets the document property', function() {
      expect(element.document).to.deep.equal(NoParamQuery);
    });

    describe('adding a script child', function() {
      beforeEach(function() {
        element.innerHTML = `
          <script type="application/graphql">
            query foo {
              bar
            }
          </script>
        `;
      });

      it('has no effect', function() {
        expect(element.document).to.deep.equal(NoParamQuery);
      });
    });

    describe('if document is then nullified', function() {
      beforeEach(function() {
        element.document = null;
      });
      describe('adding a script child', function() {
        beforeEach(function() {
          element.innerHTML = `
          <script type="application/graphql">
            query foo {
              bar
            }
          </script>
        `;
        });

        it('sets the document from DOM', function() {
          expect(element.document).to.deep.equal(gql`query foo { bar }`);
        });
      });
    });
  });

  describe('with query script child', function() {
    let element: Test;

    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test {}));

      element = await fixture<Test>(fhtml`
        <${tag}>
          <script type="application/graphql">
            query foo {
              bar
            }
          </script>
        </${tag}>
      `);
    });

    it('sets document based on DOM', async function() {
      expect(element.document).to.deep.equal(gql` query foo { bar } `);
    });

    describe('changing script text content', function() {
      beforeEach(function() {
        element.querySelector('script')!.innerText = 'query bar { foo }';
      });

      beforeEach(nextFrame);

      it('gets document based on DOM', function() {
        expect(element.document).to.deep.equal(gql` query bar { foo } `);
      });
    });
  });

  describe('with empty query script child', function() {
    let element: Test;

    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test { }));

      element = await fixture<Test>(fhtml`
        <${tag}>
          <script type="application/graphql"></script>
        </${tag}>
      `);
    });

    it('has null document', function() {
      expect(element.document).to.be.null;
    });
  });

  describe('with invalid query script child', function() {
    let element: Test;

    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test { }));

      element = await fixture<Test>(fhtml`
        <${tag}>
          <script type="application/graphql">haha</script>
        </${tag}>
      `);
    });

    it('has null document', function() {
      expect(element.document).to.be.null;
    });
  });

  describe('without query script child', function() {
    let element: Test;

    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test {}));
      element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    });

    it('has no document', function() {
      expect(element.document).to.be.null;
    });

    describe('then appending script child', function() {
      describe('when script is valid query', function() {
        beforeEach(function() {
          element.innerHTML = `<script type="application/graphql">query newQuery { new }</script>`;
        });

        beforeEach(nextFrame);

        it('sets document', function() {
          expect(element.document).to.deep.equal(gql`query newQuery { new }`);
        });
      });

      describe('when script is invalid', function() {
        beforeEach(function() {
          element.innerHTML = `<script>query newQuery { new }</script>`;
        });

        beforeEach(nextFrame);

        it('does not set document', async function() {
          expect(element.document).to.be.null;
        });
      });
    });
  });

  describe('with no variables script child', function() {
    let element: Test;

    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test {}));
      element = await fixture<Test>(fhtml`
        <${tag}></${tag}>
      `);
    });

    it('does not set variables', function() {
      expect(element.variables).to.be.null;
    });
  });

  describe('with empty variables script child', function() {
    let element: Test;

    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test {}));
      element = await fixture<Test>(fhtml`
        <${tag}><script type="application/json"></script></${tag}>
      `);
    });

    it('does not set variables', function() {
      expect(element.variables).to.be.null;
    });
  });

  describe('with invalid variables script child', function() {
    let element: Test;

    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test {}));
      element = await fixture<Test>(fhtml`
        <${tag}><script type="application/json">haha</script></${tag}>
      `);
    });

    it('does not set variables', function() {
      expect(element.variables).to.be.null;
    });
  });

  describe('with parsable variables script child', function() {
    let element: Test;

    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test {}));
      element = await fixture<Test>(fhtml`
        <${tag}><script type="application/json">{"foo":"bar"}</script></${tag}>
      `);
    });

    it('sets variables', function() {
      expect(element.variables).to.deep.equal({ foo: 'bar' });
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { c: 'c', d: number };
class TypeCheck extends Test<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);

    // ApolloElementInterface
    assertType<ApolloClient<NormalizedCacheObject>> (this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly GraphQLError[]>             (this.errors!);
    assertType<TypeCheckData>                       (this.data!);
    assertType<TypeCheckVars>                  (this.variables!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data!.a);
    assertType<number>                              (this.data!.b);
    if (isApolloError(this.error))
      assertType<readonly GraphQLError[]>           (this.error.graphQLErrors);

    /* eslint-enable func-call-spacing, no-multi-spaces */
  }
}

type TDN = TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends Test<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
