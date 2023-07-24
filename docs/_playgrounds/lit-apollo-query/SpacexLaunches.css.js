import { css } from 'lit';
export const style = css`
:host {
  --image-size: 40px;
}

li img {
  height: var(--image-size);
  width: auto;
}

li article {
  height: var(--image-size);
  display: flex;
  justify-content: space-between;
}
`;
