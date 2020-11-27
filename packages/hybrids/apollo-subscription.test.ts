import type { SinonSpy, SinonStub } from 'sinon';
import {
  SetupOptions,
  SetupResult,
  setupSpies,
  setupStubs,
  stringify,
} from '@apollo-elements/test-helpers';

import { aTimeout, nextFrame } from '@open-wc/testing';

import 'sinon-chai';

import {
  SubscriptionElement,
  describeSubscription,
} from '@apollo-elements/test-helpers/subscription.test';

import { define, html, Hybrids } from 'hybrids';

import { ApolloSubscription } from './apollo-subscription';
import { __testing_escape_hatch__ } from './helpers/accessors';

let counter = 0;

function getTagName(): string {
  const tagName = `subscription-element-${counter}`;
  counter++;
  return tagName;
}

function render<D = unknown, V = unknown>(
  host: SubscriptionElement<D, V>
): ReturnType<typeof html> {
  return html`
    <output id="data">${host.stringify(host.data)}</output>
    <output id="error">${host.stringify(host.error)}</output>
    <output id="loading">${host.stringify(host.loading)}</output>
  `;
}

describe('[hybrids] ApolloSubscription', function() {
  describeSubscription({
    async setupFunction<T extends SubscriptionElement>(
      opts?: SetupOptions<T>
    ): Promise<SetupResult<T>> {
      const { attributes, properties, innerHTML = '' } = opts ?? {};

      const tag = getTagName();

      const hasRendered =
        (host: T) => async () => { await aTimeout(50); return host; };

      define<T>(tag, {
        ...ApolloSubscription,
        stringify: () => stringify,
        hasRendered,
        render,
      } as Hybrids<T>);

      const attrs = attributes ? ` ${attributes}` : '';

      const template = document.createElement('template');

      template.innerHTML = `<${tag}${attrs}>${innerHTML}</${tag}>`;

      const [element] =
        (template.content.cloneNode(true) as DocumentFragment)
          .children as HTMLCollectionOf<T>;

      let spies: Record<string | keyof T, SinonSpy> = {} as Record<string | keyof T, SinonSpy>;

      let stubs: Record<string|keyof T, SinonStub> = {} as Record<string|keyof T, SinonStub>;

      // @ts-expect-error: it's for testing
      element[__testing_escape_hatch__] = function(el: T) {
        spies = setupSpies(opts?.spy, el);
        stubs = setupStubs(opts?.stub, el);
      };

      document.body.append(element);

      for (const [key, val] of Object.entries(properties ?? {}))
        // @ts-expect-error: it's for testing
        element[key] = val;

      await nextFrame();

      return { element, spies, stubs };
    },
  });
});
