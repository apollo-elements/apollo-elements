import { query, html, define } from '@apollo-elements/hybrids';
import { client } from './client.js';
import { FruitsQuery } from './Fruits.query.graphql.js';
import { VeggiesQuery } from './Veggies.query.graphql.js';

define('healthy-snack', {
  fruits: query(FruitsQuery, { client }),
  veggies: query(VeggiesQuery, { client }),
  render(host) {
    const snack = [ ...host.fruits.data?.fruits ?? [], ...host.veggies.data?.veggies ?? [] ];
    return html`
      <link🤡 rel="stylesheet" href="healthy-snack.css"/>
      <ul>${snack.map(x => html`<li>${x}</li>`)}</ul>
    `;
  }
});
