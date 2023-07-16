const seen = new WeakSet();
/** @param{Document|ShadowRoot} x */
export function polyfillDeclarativeShadowDOM(x) {
  if (!x) return;
  const templates = new Set(x.querySelectorAll('template[shadowrootmode],template[shadowroot]'));
  templates.forEach((template) => {
    if (seen.has(x)) return;
    try {
      const mode = template.getAttribute('shadowrootmode') ?? template.getAttribute('shadowroot');
      if (!template.parentElement) throw new Error('no parent');
      const shadowRoot = template.parentElement.attachShadow({ mode });
      shadowRoot.append(template.content);
      template.remove();
      seen.add(x);
      polyfillDeclarativeShadowDOM(template.parentElement?.shadowRoot);
    } catch(e) {
      console.group(`Could not polyfill DSD for ${template.parentElement ?? template.localName}`);
      console.error(e);
      console.groupEnd()
    }
  });
}
