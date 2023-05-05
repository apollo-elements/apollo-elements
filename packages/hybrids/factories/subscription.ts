import type { DocumentNode, OperationVariables, TypedDocumentNode } from '@apollo/client/core';

import type { Descriptor } from 'hybrids';

import { controller } from './controller.js';

import {
  ApolloSubscriptionController,
  ApolloSubscriptionControllerOptions,
} from '@apollo-elements/core/apollo-subscription-controller';

/**
 * Hybrids property descriptor factory for GraphQL subscriptions.
 *
 * @param  subscriptionDocument The subscription document.
 * @param  options Options to control the subscription.
 * @return Hybrids descriptor for a [ApolloMutationController](/api/core/controllers/subscription/)
 */

export function subscription<E extends HTMLElement, D, V extends OperationVariables>(
  subscriptionDocument?: DocumentNode | null,
  options?: ApolloSubscriptionControllerOptions<D, V>,
): Descriptor<E, ApolloSubscriptionController<D, V>>
export function subscription<E extends HTMLElement, D extends TypedDocumentNode>(
  subscriptionDocument?: D | null,
  options?: ApolloSubscriptionControllerOptions<D>,
): Descriptor<E, ApolloSubscriptionController<D>> {
  return controller<E, ApolloSubscriptionController<D>>(
    ApolloSubscriptionController,
    subscriptionDocument,
    options
  );
}
