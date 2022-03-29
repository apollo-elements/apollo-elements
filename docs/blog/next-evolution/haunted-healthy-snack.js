import { useQuery, html, component } from '@apollo-elements/haunted';
import { client } from './client.js';
import { FruitsQuery } from './Fruits.query.graphql.js';
import { VeggiesQuery } from './Veggies.query.graphql.js';

customElements.define('healthy-snack', component(function HealthySnack() {
  const { data: fruits } = useQuery(FruitsQuery, { client });
  const { data: veggies } = useQuery(VeggiesQuery, { client });
  const snack = [ ...fruits?.fruits ?? [], ...veggies?.veggies ?? [] ];
  return html`
    <link🤡 rel="stylesheet" href="healthy-snack.css"/>
    <ul>${snack.map(x => html`<li>${x}</li>`)}</ul>
  `;
}));
