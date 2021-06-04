import type * as I from '@apollo-elements/interfaces';

import { gql } from '@apollo/client/core';

import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { stripHTMLComments } from '@apollo-elements/lib/helpers';

// HACK to get HTMLScriptElement interface on querySelector results
const SELECTORS = {
  GQL: 'script[type="application/graphql"]' as 'script',
  VAR: 'script[type="application/json"]' as 'script',
};

export declare class GQLScriptChild<
  D extends I.MaybeTDN = I.MaybeTDN,
  V = I.MaybeVariables<D>
> extends I.ApolloElementElement<D, V> {
  getDOMGraphQLDocument(): Promise<this['document']>;
  getDOMVariables(): Promise<this['variables']>;
}

function GraphQLScriptChildMixinImplementation<
  B extends I.Constructor<I.ApolloElementElement<any, any>>
>(superclass: B): B & I.Constructor<GQLScriptChild> {
  class GraphQLScriptChild extends superclass {
    declare _documentSetByJS: boolean;

    declare _variablesSetByJS: boolean;

    /** Updates the element state in reaction to GraphQL or JSON script child changes. */
    private mo?: MutationObserver;

    /**
     * When encountering a DOM Mutation, update the element's state if relevant.
     */
    private async matchNode(node: Node): Promise<void> {
      if (!(node instanceof HTMLScriptElement))
        return; /* c8 ignore next */ // it's covered
      if (node.matches(SELECTORS.GQL))
        this.document = await this.getDOMGraphQLDocument();
      if (node.matches(SELECTORS.VAR))
        this.variables = this.getDOMVariables();
    }

    /**
     * Update the element state in reaction to DOM updates that change the
     * declarative GraphQL document or JSON-variable scripts
     */
    private onDOMMutation(records: MutationRecord[]): void {
      // eslint-disable-next-line easy-loops/easy-loops
      for (const { target: node, addedNodes = [] } of records) {
        this.matchNode(node);
        for (const added of addedNodes)
          this.matchNode(added);
      }
    }

    /**
     * @summary Get a GraphQL DocumentNode from the element's GraphQL script child
     * @protected
     */
    async getDOMGraphQLDocument(): Promise<this['document']> {
      const script = this.querySelector(SELECTORS.GQL);
      /* c8 ignore start */ // covered
      if (script?.src)
        return await fetch(script?.src).then(x => x.text()).then(x => this.parseGQL(x));
      else if (!script?.innerText)
        return null;
      else
        return this.parseGQL(script.innerText);
    }

    private parseGQL(text: string): this['document'] {
      try {
        return gql(stripHTMLComments(text));
      } catch (err) {
        this.error = err;
        return null;
      }
    }

    private parseVariables(text: string): this['variables'] {
      try {
        return JSON.parse(text); /* c8 ignore next */ // covered
      } catch {
        return null;
      }
    }

    /**
     * @summary Gets operation variables from the element's JSON script child
     * @protected
     */
    getDOMVariables(): this['variables'] {
      const script = this.querySelector(SELECTORS.VAR);
      if (!script)
        return null;
      // TODO: Allow this to be async without breaking <apollo-mutation> (see constructor)
      // else if (script.src)
      //   return await fetch(script.src).then(x => x.json());
      else
        return this.parseVariables(script.innerText);
    }

    async connectedCallback(): Promise<void> {
      this.mo = new MutationObserver(this.onDOMMutation.bind(this));
      this.mo.observe(this, { characterData: true, childList: true, subtree: true });
      this.document ??= await this.getDOMGraphQLDocument();
      this.variables ??= this.getDOMVariables();
      super.connectedCallback?.();
    }

    disconnectedCallback(): void {
      super.disconnectedCallback?.();
      this.mo?.disconnect();
    }
  }

  return GraphQLScriptChild;
}

/**
 * `GraphQLScriptChildMixin`
 *  @summary Allows elements to read their GraphQL document and variables from HTML.
 */
export const GraphQLScriptChildMixin =
  dedupeMixin(GraphQLScriptChildMixinImplementation);
