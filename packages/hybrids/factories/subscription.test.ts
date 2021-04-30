import type { SinonSpy, SinonStub } from 'sinon';

import type { DocumentNode, TypedDocumentNode } from '@apollo/client/core';

import type { SetupOptions, SetupResult } from '@apollo-elements/test';

import { assertType, setupSpies, setupStubs, stringify } from '@apollo-elements/test';
import { define, html, RenderFunction, Hybrids } from 'hybrids';
import { nextFrame, aTimeout } from '@open-wc/testing';
import { subscription, SubscriptionHybridsFactoryOptions } from './subscription';
import { __testing_escape_hatch__ } from '../helpers/accessors';

import {
  SubscriptionElement,
  describeSubscription,
} from '@apollo-elements/test/subscription.test';

let counter = 0;

function getTagName(): string {
  const tagName = `subscription-element-${counter}`;
  counter++;
  return tagName;
}

type TestableApolloSubscriptionHybrid<T, U> = Hybrids<SubscriptionElement<T, U> & {
  stringify(x: unknown): string;
  hasRendered(): Promise<SubscriptionElement<T, U>>;
  render?: RenderFunction<SubscriptionElement<T, U>>;
}>

const testSubscription = <T, U>(
  doc?: DocumentNode | TypedDocumentNode<T, U> | null,
  opts?: SubscriptionHybridsFactoryOptions<T, U>
): TestableApolloSubscriptionHybrid<T, U> => ({
    ...subscription<T, U>(doc, opts),
    stringify: () => stringify,
    hasRendered: host => async () => {
      await aTimeout(0);
      host.render?.(host);
      await aTimeout(0);
      return host;
    },
  });

describe('[hybrids] ApolloSubscription', function() {
  describeSubscription({
    async setupFunction<T extends SubscriptionElement>(
      opts?: SetupOptions<T>
    ): Promise<SetupResult<T>> {
      const { attributes, properties, innerHTML = '' } = opts ?? {};

      const tag = getTagName();

      define<SubscriptionElement>(tag, {
        ...testSubscription(),
        render: ({ data, error, loading, stringify }) => html`
          <output id="data">${stringify(data)}</output>
          <output id="error">${stringify(error)}</output>
          <output id="loading">${stringify(loading)}</output>
        `,
      });

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

function TDNTypeCheck() {
  type TypeCheckData = { a: 'a'; b: number };
  type TypeCheckVars = { c: 'c'; d: number };

  const TDN = {} as TypedDocumentNode<TypeCheckData, TypeCheckVars>;

  const Class = define('typed-subscription', {
    ...subscription(TDN),
  });

  const instance = new Class();

  assertType<TypeCheckData>(instance.data!);
  assertType<TypeCheckVars>(instance.variables!);
}
