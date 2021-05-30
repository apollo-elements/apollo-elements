import type * as I from '@apollo-elements/interfaces';
import type { SetupOptions, TestableElement } from '@apollo-elements/test';

import { nextFrame } from '@open-wc/testing';
import { describeMutation, MutationElement } from '@apollo-elements/test/mutation.test';
import { define, html, Hybrids } from 'hybrids';
import { setupSpies, setupStubs, stringify } from '@apollo-elements/test';

import { ApolloMutation, ApolloMutationElement } from './apollo-mutation';

let counter = 0;

function getTagName(): string {
  const tagName = `mutation-element-${counter}`;
  counter++;
  return tagName;
}

describe('[hybrids] ApolloMutation', function() {
  describeMutation({
    async setupFunction<T extends MutationElement>(options: SetupOptions<T> = {}) {
      const { attributes, innerHTML = '', properties } = options;

      const tag = getTagName();

      define(tag, {
        ...ApolloMutation,
        $: (host: ApolloMutationElement & TestableElement) =>
          (id: string) => host.shadowRoot!.getElementById(id),
        hasRendered: host => async () => {
          await nextFrame();
          await host.controller.host.updateComplete;
          return host;
        },
        render: host => {
          return html`
            <output id="called">${stringify(host.called)}</output>
            <output id="data">${stringify(host.data)}</output>
            <output id="error">${stringify(host.error)}</output>
            <output id="errors">${stringify(host.errors)}</output>
            <output id="loading">${stringify(host.loading)}</output>
          `;
        },
      } as Hybrids<ApolloMutationElement & TestableElement>);

      const attrs = attributes ? ` ${attributes}` : '';

      const template = document.createElement('template');

      template.innerHTML = `<${tag}${attrs}></${tag}>`;

      const [element] =
        (template.content.cloneNode(true) as DocumentFragment)
          .children as HTMLCollectionOf<T>;

      if (properties?.onCompleted)
        element.onCompleted = properties.onCompleted as T['onCompleted'];

      if (properties?.onError)
        element.onError = properties.onCompleted as T['onError'];

      document.body.append(element);

      for (const [key, val] of Object.entries(properties ?? {}) as I.Entries<T>)
        (element[key] = val);

      const spies = setupSpies(options?.spy ?? [], element);
      const stubs = setupStubs(options?.stub ?? [], element);

      await nextFrame();

      element.innerHTML = innerHTML;

      await nextFrame();

      return { element, spies, stubs };
    },
  });
});
