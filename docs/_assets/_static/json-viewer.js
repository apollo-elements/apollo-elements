// node_modules/@power-elements/json-viewer/json-viewer.js
var compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
var isString = (x) => typeof x === "string";
var trim = (s) => s.trim();
var isObject = (x) => x !== null && `${x}` === "[object Object]";
var replace = (...args) => (s) => s.replace(...args);
var isAllStrings = (xs) => Array.isArray(xs) && xs.every(isString);
var fromEntries = (xs) => Object.fromEntries ? Object.fromEntries(xs) : xs.reduce((o, [k, v]) => ({ [k]: v, ...o }), {});
var flatMap = (f) => (xs) => "flatMap" in Array.prototype ? xs.flatMap(f) : xs.reduce((acc, x) => acc.concat(f(x)), []);
var pick = (keys, element) => keys.reduce((pojo, key) => Object.assign(pojo, { [key]: element[key] }), {});
var stripUndefinedVals = flatMap(([k, v]) => v === void 0 ? [] : [[k, v]]);
var stripUndefined = compose(fromEntries, stripUndefinedVals, Object.entries);
var mark = (x) => x instanceof Element ? `<mark part='string'>${x.outerHTML.replace(/</g, "&lt;").replace(/"/g, "'")}</mark>` : isObject(x) || Array.isArray(x) ? x : `<mark part='${x === null ? "null" : typeof x}'>${x}</mark>`;
var replacer = (k, v) => k === "" ? v : mark(v);
var pretty = (o) => JSON.stringify(o, replacer, 2);
var markKeys = replace(/"(.*)":/g, (_, key) => `<mark part="key">"${key}"</mark>:`);
var wrapStrings = replace(/"<mark(.*)>(.*)<\/mark>"/g, (_, attrs, content) => `<mark${attrs}>${attrs.includes("string") ? `"${content}"` : content}</mark>`);
var json = compose(wrapStrings, markKeys, pretty, stripUndefined);
var toStringList = (string) => (string || "").split(",").map(trim).filter(Boolean);
var css = `
[hidden],
:host([hidden]) {
  display: none !important;
}

:host {
  display: block;
  position: relative;
  color: var(--json-viewer-color, currentColor);
}

code { white-space: pre; }
mark { background: none; }

@media (prefers-color-scheme: dark), (prefers-color-scheme: no-preference) {
  :host { background: var(--json-viewer-background, #212529); }
  [part="key"] { color: var(--json-viewer-key-color, #ff922b); }
  [part="boolean"] { color: var(--json-viewer-boolean-color, #22b8cf); }
  [part="number"] { color: var(--json-viewer-number-color, #51cf66); }
  [part="null"] { color: var(--json-viewer-null-color, #ff6b6b); }
  [part="string"] { color: var(--json-viewer-string-color, #22b8cf); }
}

@media (prefers-color-scheme: light) {
  :host { background: var(--json-viewer-background, white); }
  [part="key"] { color: var(--json-viewer-key-color, #f76707); }
  [part="boolean"] { color: var(--json-viewer-boolean-color, #0c8599); }
  [part="number"] { color: var(--json-viewer-number-color, #0ca678); }
  [part="null"] { color: var(--json-viewer-null-color, #e03131); }
  [part="string"] { color: var(--json-viewer-string-color, #0c8599); }
}
`;
var template = document.createElement("template");
template.innerHTML = `<code hidden part="code"></code>`;
var AL_ATTR = "allowlist";
var OBJECT_ATTR = "object";
var JsonViewer = class extends HTMLElement {
  static get is() {
    return "json-viewer";
  }
  static get observedAttributes() {
    return [AL_ATTR, OBJECT_ATTR];
  }
  get object() {
    return this.__object;
  }
  set object(val) {
    if (val && typeof val === "string")
      val = this.tryParse(val);
    this.__object = val;
    this.render();
  }
  get allowlist() {
    return this.__allowlist;
  }
  set allowlist(val) {
    if (!isAllStrings(val))
      throw new Error("allowlist must be an array of strings");
    this.__allowlist = val;
    const attr = val.join(",");
    if (attr)
      this.setAttribute(AL_ATTR, attr);
    this.render();
  }
  get error() {
    return this.__error;
  }
  set error(error) {
    this.__error = error;
    if (error instanceof Error)
      this.dispatchEvent(new CustomEvent("json-parse-error"));
  }
  constructor() {
    super();
    this.__error = null;
    this.__allowlist = [];
    this.__mo = new MutationObserver(this.parse.bind(this));
    this.__mo.observe(this, { subtree: true, characterData: true, childList: true });
    this.attachShadow({ mode: "open" });
    if ("adoptedStyleSheets" in Document.prototype) {
      const styles = new CSSStyleSheet();
      styles.replaceSync(css);
      this.shadowRoot.adoptedStyleSheets = [styles];
    } else
      this.shadowRoot.innerHTML = `<style>${css}</style>`;
    this.shadowRoot.append(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.parse();
    if (this.object && this.shadowRoot.querySelector("code").hidden)
      this.render();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case AL_ATTR:
        return this.allowlistAttrChanged(newVal, oldVal);
      case OBJECT_ATTR:
        return this.objectAttrChanged(newVal, oldVal);
    }
  }
  allowlistAttrChanged(allowlist, oldVal) {
    const previous = this.allowlist;
    const next = allowlist;
    if (previous.join(",") === next)
      return;
    this.allowlist = toStringList(next);
  }
  objectAttrChanged(objectAttr, oldVal) {
    if (objectAttr !== oldVal)
      this.object = this.tryParse(objectAttr);
  }
  getHighlightedDomString() {
    const { allowlist, object } = this;
    if (object === void 0)
      return "";
    const hasAllowList = Array.isArray(allowlist) && allowlist.length;
    const objectToRender = hasAllowList ? pick(allowlist, object) : object;
    return json(objectToRender);
  }
  render() {
    const highlighted = this.getHighlightedDomString();
    this.shadowRoot.querySelector("code").hidden = !highlighted;
    this.shadowRoot.querySelector("code").innerHTML = highlighted;
  }
  parse() {
    const parent = this.querySelector('script[type="application/json"]') || this.querySelector('script[type="application/ld+json"]') || this;
    const { textContent = "" } = parent;
    if (!textContent.trim())
      return;
    this.object = this.tryParse(textContent);
  }
  tryParse(string) {
    let object;
    try {
      object = JSON.parse(string);
    } catch (error) {
      const { name, message } = error;
      object = { name, message, string };
      this.error = error;
    }
    return object;
  }
};
customElements.define(JsonViewer.is, JsonViewer);
export {
  JsonViewer
};
//# sourceMappingURL=json-viewer.js.map
