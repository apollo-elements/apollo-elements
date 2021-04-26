import type { DocumentNode, TypedDocumentNode } from '@apollo/client/core';
import type { ApolloElementElement } from '../apollo-element';
import type { DataOf, VariablesOf } from '@apollo-elements/interfaces';

import { getDescriptor } from '@apollo-elements/lib/prototypes';

export const __testing_escape_hatch__ = Symbol('__testing_escape_hatch__');

const VALUES = new WeakMap<ApolloElementElement, DocumentNode|null|undefined>();

interface Options<T extends ApolloElementElement> {
  host: T,
  document?: DocumentNode | TypedDocumentNode<DataOf<T>, VariablesOf<T>> | null,
  // can't be helped as hybrids' types are set
  // eslint-disable-next-line @typescript-eslint/ban-types
  invalidate: Function,
  defaults?: Partial<Record<keyof T, T[keyof T]>>
}

// Allow any permutation of ApolloElement, as the data and variables types are irrelevant here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function initDocument<T extends ApolloElementElement<any, any>>(
  options: Options<T>
): () => void {
  const { host, document, invalidate } = options;

  // @ts-expect-error: it's just for tests
  host?.[__testing_escape_hatch__]?.(host);

  const mo = new MutationObserver(() => invalidate());

  mo.observe(host, { characterData: true, childList: true, subtree: true });

  const hasPreviousValue = !host.document && !!VALUES.get(host);

  // If we don't do this, `parentNode.append(host)` will not preserve the value of `document`
  host.document ??= VALUES.get(host) ?? document ?? null;

  if (hasPreviousValue) // @ts-expect-error: no classes in hybrids so we'll just call the hook directly
    host.documentChanged?.(host.document); /* c8 ignore next */

  getDescriptor(host).connectedCallback.value.call(host);

  if (!VALUES.has(host))
    VALUES.set(host, document);

  return () => {
    VALUES.set(host, host.document);
    mo.disconnect();
    getDescriptor(host).disconnectedCallback?.value?.call?.(host);
  };
}
