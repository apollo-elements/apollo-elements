import type { DocumentNode } from 'graphql';
import getGraphQLScriptChildDocument from '@apollo-elements/lib/get-graphql-script-child-document';
import isValidGql from '@apollo-elements/lib/is-valid-gql';
import type { ApolloSubscription } from '@apollo-elements/mixins/apollo-subscription';

type SubscriptionElement = HTMLElement & ApolloSubscription<unknown, unknown>;

export interface DocumentFactoryParams {
  errorMessage: string;
  onSet?: (host: SubscriptionElement, doc: DocumentNode) => void;
}

export interface DocumentDescriptor {
  connect: (host: SubscriptionElement, key: 'mutation'|'query') => () => void;
  get: (host: SubscriptionElement, previous: DocumentNode) => DocumentNode;
  set: (host: SubscriptionElement, next: DocumentNode) => DocumentNode;
}

const onMutation =
  (host: SubscriptionElement, key: string) =>
    (): void => {
      const doc = getGraphQLScriptChildDocument(host);
      if (doc)
        host[key] = doc;
    };

const makeInvalidateHandler =
  (host: SubscriptionElement, key: string) =>
    ({ target }): void => {
      if (key === 'mutation') return;
      if (host !== target || !(host[key])) return;
      // @ts-expect-error
      if (key === 'query' && host.observableQuery)
      // @ts-expect-error
        host.observableQuery.setVariables(host[key]);
      else
        host.subscribe();
    };

const makeSetter = ({ errorMessage, onSet }: DocumentFactoryParams, last: DocumentNode) =>
  (host: SubscriptionElement, next: DocumentNode): DocumentNode => {
    if (!next) return last ?? null;
    if (!isValidGql(next)) throw new Error(errorMessage);
    onSet?.(host, next);
    return next;
  };

const makeGetter = (_params: DocumentFactoryParams, doc: DocumentNode) =>
  (host: SubscriptionElement, previous: DocumentNode): DocumentNode =>
    previous ?? getGraphQLScriptChildDocument(host) ?? doc ?? null;

const makeConnect = (_params: DocumentFactoryParams, _doc: DocumentNode) =>
  (host: SubscriptionElement, key: 'mutation'|'query'): (() => void) => {
    const onInvalidate = makeInvalidateHandler(host, key);
    host.addEventListener('@invalidate', onInvalidate);

    if (!host[key])
      host[key] = getGraphQLScriptChildDocument(host);

    if (key !== 'mutation' && host[key])
      host.subscribe();

    const scriptChildMutation =
      new MutationObserver(onMutation(host, key));

    scriptChildMutation.observe(host, { characterData: true, childList: true, subtree: true });

    return (): void => {
      host.removeEventListener('@invalidate', onInvalidate);
      scriptChildMutation.disconnect();
    };
  };

export const documentFactory =
  (params: DocumentFactoryParams) =>
    (doc?: DocumentNode): DocumentDescriptor => ({
      connect: makeConnect(params, doc),
      get: makeGetter(params, doc),
      set: makeSetter(params, doc),
    });
