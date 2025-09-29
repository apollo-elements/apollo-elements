import { expect, fixture } from '@open-wc/testing';
import { FASTControllerHost } from './fast-controller-host';
import { FASTElement, customElement } from '@microsoft/fast-element';
import { ApolloQueryBehavior } from './apollo-query-behavior';

describe('[FAST] FASTControllerHost', function() {
  it('reuses instances', async function() {
    @customElement({ name: 'a-l' })
    class A extends FASTElement {
      b = new ApolloQueryBehavior(this);
      c = new ApolloQueryBehavior(this);
    }

    const el = await fixture<A>('<a-l></a-l>');
    (expect(el.b.host)
      .to.equal(el.c.host) as any)
      .and.to.be.an.instanceof(FASTControllerHost);
  });
});
