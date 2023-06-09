/** @param{Document|ShadowRoot} x */
function polyfillDeclarativeShadowDOM(x) {
  /** @type {NodeListOf<HTMLTemplateElement>}*/
  const ts = x.querySelectorAll('template[shadowrootmode],template[shadowroot]');
  for (const t of ts) {
    const mode = /** @type {ShadowRootMode} */(t.getAttribute('shadowrootmode') ?? t.getAttribute('shadowroot'));
    const parent = t.parentElement;
    const shadowRoot = parent.shadowRoot ?? parent.attachShadow({ mode });
    for (const node of shadowRoot.children) node.remove();
    shadowRoot.appendChild(t.content);
    t.remove();
    polyfillDeclarativeShadowDOM(shadowRoot);
    parent.dispatchEvent(new Event('declarative-shadow-dom-stamped'));
  }
}

if (!HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot') || !HTMLTemplateElement.prototype.hasOwnProperty('shadowRootMode'))
  polyfillDeclarativeShadowDOM(document);
