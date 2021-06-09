import type { DocumentNode, ApolloError } from '@apollo/client/core';

import type { Constructor, CustomElement } from '@apollo-elements/core/types';

import { gql } from '@apollo/client/core';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

// HACK to get HTMLScriptElement interface on querySelector results
const SELECTORS = {
  GQL: 'script[type="application/graphql"]' as 'script',
  VAR: 'script[type="application/json"]' as 'script',
};

function stripHTMLComments(string: string): string {
  return string.replace?.(/<!---->/g, '');
}

function GraphQLScriptChildMixinImplementation<
  B extends Constructor<CustomElement & {
    document: DocumentNode|null;
    variables: unknown|null;
    error: Error|ApolloError|null;
  }>
>(superclass: B): B {
  class GraphQLScriptChild extends superclass {
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

    private parseGQL(text: string): this['document'] {
      try {
        return gql(stripHTMLComments(text)); /* c8 ignore next */ // covered
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

    private async fetchDocument(url: string): Promise<this['document']> {
      return fetch(url)
        .then(x => x.text())
        .then(x => this.parseGQL(x));
    }

    /**
     * @summary Get a GraphQL DocumentNode from the element's GraphQL script child
     */
    protected async getDOMGraphQLDocument(): Promise<this['document']> {
      const script = this.querySelector(SELECTORS.GQL);
      /* c8 ignore start */ // covered
      if (script?.src)
        return this.fetchDocument(script.src);
      else if (!script?.innerText)
        return null;
      else
        return this.parseGQL(script.innerText);
    }

    /**
     * @summary Gets operation variables from the element's JSON script child
     */
    protected getDOMVariables(): this['variables'] {
      const script = this.querySelector(SELECTORS.VAR);
      if (!script)
        return null;
      // TODO: Allow this to be async without breaking <apollo-mutation> (see constructor)
      // else if (script.src)
      //   return await fetch(script.src).then(x => x.json());
      else
        return this.parseVariables(script.innerText);
    }

    /**
     * Initializes a `MutationObserver` which watches for changes the the element's children.
     * When a `<script type="application/graphql">` or `<script type="application/json">`
     * is appended, the mixin asynchrously sets the `document` or `variables`.
     */
    override async connectedCallback(): Promise<void> {
      this.mo = new MutationObserver(this.onDOMMutation.bind(this));
      this.mo.observe(this, { characterData: true, childList: true, subtree: true });
      this.document ??= await this.getDOMGraphQLDocument();
      this.variables ??= this.getDOMVariables();
      super.connectedCallback?.();
    }

    /**
     * Disconnects the `MutationObserver`.
     */
    override disconnectedCallback(): void {
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
