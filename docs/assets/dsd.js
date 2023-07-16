const seen = new WeakSet();
/** @param{Document|ShadowRoot} x */
export function polyfillDeclarativeShadowDOM(x) {
  const templates = new Set(x.querySelectorAll('template[shadowrootmode],template[shadowroot]'));
  templates.forEach((template) => {
    if (seen.has(x)) return;
    const mode = template.getAttribute('shadowrootmode') ?? template.getAttribute('shadowroot');
    const shadowRoot = template.parentNode.attachShadow({ mode });
    shadowRoot.appendChild(template.content);
    template.remove();
    seen.add(x);
    polyfillDeclarativeShadowDOM(shadowRoot);
  });
}
