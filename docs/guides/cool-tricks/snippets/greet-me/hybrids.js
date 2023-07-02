// while you can't use the mixin, you can roll your own
import { query, define, html } from '@apollo-elements/hybrids';
import { gql } from '@apollo/client/core';

function matchNode(host, node) {
  if (!(node instanceof HTMLScriptElement))
    return; /* c8 ignore next */ // it's covered
  if (node.matches('[type="application/graphql"]'))
    host.query.document = gql(node.textContent);
  if (node.matches('[type="application/json"]'))
    host.query.variables = JSON.parse(node.textContent);
}

define('greet-me', {
  query: query(HelloQuery),
  _domQuery: {
    connect(host) {
      const mo = new MutationObserver(records => {
        for (const { target: node, addedNodes = [] } of records) {
          matchNode(host, node);
          for (const added of addedNodes)
            matchNode(host, added);
        }
      });

      mo.observe(host, { characterData: true, childList: true, subtree: true });

      return () => mo.disconnect();
    }
  }
  render: ({ query }) => html`
    <p>${query.data?.greeting ?? 'Hello'}, ${query.data?.name ?? 'friend'}</p>
  `
})
