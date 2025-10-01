import { css } from '@microsoft/fast-element';
export const styles = css`
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

fast-card {
  display: grid;
  align-content: start;
  gap: 10px;
  padding: 10px;
}

h2 {
  margin: 0;
}
`;
