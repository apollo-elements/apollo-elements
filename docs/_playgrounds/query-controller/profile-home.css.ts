import { css } from 'lit';
export default css`
  :host { display: block; }
  .loading { opacity: 0.5; filter: grayscale(100%); }
  img { width: 100%; height: auto; background: lightgrey; min-height: 295px; }
  article { width: 100%; }
  figure { margin: 0; }
  form {
    display: grid;
    grid-template: 40px / max-content repeat(3, 40px);
    place-items: center;
  }
`;
