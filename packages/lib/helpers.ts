const scriptSelector = 'script[type="application/graphql"]';

/**
 * Is it a <script type="application/graphql">
 */
export function isGraphQLScript(el: Element): boolean {
  return (
    el instanceof HTMLScriptElement &&
    el.getAttribute('type')?.toLowerCase?.() === 'application/graphql'
  );
}

/**
 * Get the child of the element that is a graphql script
 */
export function getGraphQLScriptChild(el: HTMLElement): HTMLScriptElement {
  if (!(el instanceof HTMLElement))
    return null;
  else
    return el.querySelector(scriptSelector);
}

const valueIsDefined =
  ([, v]): boolean => v !== undefined;

export function stripUndefinedValues<X>(o: X): X {
  return Object.fromEntries(Object.entries(o).filter(valueIsDefined)) as X;
}
