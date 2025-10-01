import type {
  ApolloClient,
  DocumentNode,
} from '@apollo/client';

import type { GraphQLError } from '@apollo-elements/core/types';

import { expect, fixture } from '@open-wc/testing';
import { unsafeStatic, html as h } from 'lit/static-html.js';

import { ApolloElement } from './apollo-element';
import { customElement, DOM, FASTElement, html } from '@microsoft/fast-element';
import { assertType, isApolloError } from '@apollo-elements/test';

describe('[fast] ApolloElement', function describeApolloElement() {
  it('is an instance of FASTElement', async function() {
    const name = 'is-an-instance-of-f-a-s-t-element';
    @customElement({ name })
    class Test extends ApolloElement {
      declare shadowRoot: ShadowRoot;

      dataChanged(oldVal: this['data'], newVal: this['data']): void {
        oldVal; newVal;
      }
    }

    const tag = unsafeStatic(name);
    const element = await fixture<Test>(h`<${tag}></${tag}>`);
    expect(element).to.be.an.instanceOf(FASTElement);
  });

  it('renders when client is set', async function rendersOnClient() {
    const name = 'renders-when-client-is-set';
    // @ts-expect-error: just testing assignment and rendering
    const template = html<Test>`${x => x.client?.test ?? 'FAIL'}`;
    @customElement({ name, template })
    class Test extends ApolloElement { declare shadowRoot: ShadowRoot; }
    const tag = unsafeStatic(name);
    const element = await fixture<Test>(h`<${tag}></${tag}>`);
    // @ts-expect-error: just testing assignment and rendering
    element.client = { test: 'CLIENT' };
    await DOM.nextUpdate();
    expect(element.shadowRoot.textContent).to.equal('CLIENT');
  });

  it('renders when error is set', async function rendersOnError() {
    const name = 'renders-when-error-is-set';
    const template = html<Test>`${x => x.error ?? 'FAIL'}`;
    @customElement({ name, template }) class Test extends ApolloElement { }
    const tag = unsafeStatic(name);
    const element = await fixture<Test>(h`<${tag} .error="${'error'}"></${tag}>`);
    expect(element).shadowDom.to.equal('error');
  });

  it('renders when loading is set', async function rendersOnLoading() {
    const name = 'renders-when-loading-is-set';
    const template = html`${x => x.loading ?? false ? 'LOADING' : 'FAIL'}`;
    @customElement({ name, template }) class Test extends ApolloElement { }
    const tag = unsafeStatic(name);
    const element = await fixture<Test>(h`<${tag} .loading="${true}"></${tag}>`);
    expect(element).shadowDom.to.equal('LOADING');
  });
});

class TypeCheck extends ApolloElement {
  typeCheck() {


    assertType<HTMLElement>                         (this);
    assertType<FASTElement>                         (this);

    // ApolloElementInterface
    assertType<ApolloClient>(this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly GraphQLError[]>             (this.errors!);
    assertType<string>                              (this.error.message);
    if (isApolloError(this.error)) {
      // In Apollo Client v4, graphQLErrors are handled differently
      // and are not directly available on Error objects
    }


  }
}
