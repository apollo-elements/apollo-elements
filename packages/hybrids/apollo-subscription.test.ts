import type * as I from '@apollo-elements/interfaces';

import type { SetupOptions, SetupResult } from '@apollo-elements/test';

import { setupSpies, setupStubs, stringify, TestableElement } from '@apollo-elements/test';
import { define, html, Hybrids } from 'hybrids';
import { nextFrame } from '@open-wc/testing';
import { ApolloSubscription, ApolloSubscriptionElement } from './apollo-subscription';

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

describe('[hybrids] ApolloSubscription', function() {
  describeSubscription({
    async setupFunction<T extends SubscriptionElement & TestableElement>(
      opts?: SetupOptions<T>
    ): Promise<SetupResult<T>> {
      const { attributes, properties, innerHTML = '' } = opts ?? {};

      const tag = getTagName();

      define(tag, {
        ...ApolloSubscription,
        $: (host: ApolloSubscriptionElement & TestableElement) =>
          (id: string) => host.shadowRoot!.getElementById(id),
        hasRendered: host => async () => {
          await nextFrame();
          await host.controller.host.updateComplete;
          return host;
        },
        render: host => {
          return html`
            <output id="data">${stringify(host.data)}</output>
            <output id="error">${stringify(host.error)}</output>
            <output id="loading">${stringify(host.loading)}</output>
          `;
        },
      } as Hybrids<ApolloSubscriptionElement & TestableElement>);


      const attrs = attributes ? ` ${attributes}` : '';

      const template = document.createElement('template');

      template.innerHTML = `<${tag}${attrs}>${innerHTML}</${tag}>`;

      const [element] =
        (template.content.cloneNode(true) as DocumentFragment)
          .children as HTMLCollectionOf<T>;

      document.body.append(element);

      const spies = setupSpies(opts?.spy, element);
      const stubs = setupStubs(opts?.stub, element);

      for (const [key, val] of Object.entries(properties ?? {}) as I.Entries<typeof element>)
        element[key] = val;

      await nextFrame();

      return { element, spies, stubs };
    },
  });
});
