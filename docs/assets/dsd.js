const seen = new WeakSet();
/** @param{Document|ShadowRoot} x */
export function polyfillDeclarativeShadowDOM(x) {
  if (!x) return;
  const templates = new Set(x.querySelectorAll('template[shadowrootmode],template[shadowroot]'));
  templates.forEach((template) => {
    if (seen.has(x)) return;
    try {
      const mode = template.getAttribute('shadowrootmode') ?? template.getAttribute('shadowroot');
      const target = template.parentElement
      if (!target) throw new Error('no parent');
      if (target.shadowRoot && !target.shadowRoot.children.length) {
        console.log(target.tagName)
      } else {
        target.attachShadow({ mode });
      }
      if (!target.shadowRoot?.children?.length) {
        target.shadowRoot.append(template.content);
        template.remove();
        seen.add(x);
        polyfillDeclarativeShadowDOM(target?.shadowRoot);
      }
    } catch(e) {
      console.group(`Could not polyfill DSD for ${template.parentElement ?? template.localName}`);
      console.error(e);
      console.groupEnd()
    }
  });
}
